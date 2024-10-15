import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";
import {
  deleteFileFromR2,
  getR2FileUrl,
  R2_BASE_URL,
  uploadFileToR2,
} from "~/server/services/r2";
import JSZip from "jszip";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { typeSenseClient } from "~/server/services/typesense";

async function uploadAndPersist(
  ctx: any,
  key: string,
  content: string,
  fileName: string,
  fileDir: string | null,
): Promise<{ path: string; contentUrl: string } | null> {
  try {
    const {
      $metadata: { httpStatusCode },
    } = await uploadFileToR2({
      key,
      content,
      contentType: "text/markdown",
    });

    if (httpStatusCode !== 200) {
      console.error(`Failed to upload file: ${key}`);
      return null;
    }

    const contentUrl = getR2FileUrl(key);

    const [insertedNote] = await ctx.db
      .insert(notes)
      .values({
        title: fileName,
        contentUrl,
        userId: ctx.session.user.id,
        folder: fileDir,
      })
      .returning();

    console.log("insertedNote", insertedNote);

    await indexNote({
      id: insertedNote.id,
      title: insertedNote.title,
      content: content,
      createdAt: Math.floor(new Date(insertedNote.createdAt).getTime() / 1000),
      userId: ctx.session.user.id,
      updatedAt: Math.floor(new Date(insertedNote.updatedAt).getTime() / 1000),
    });

    return { path: `${fileDir ? `${fileDir}/` : ""}${fileName}`, contentUrl };
  } catch (error) {
    console.error(`Error uploading and persisting file: ${key}`, error);
    // Optionally, delete the file from R2 if database insertion fails
    await deleteFileFromR2(key);
    return null;
  }
}

async function deleteNoteAndFile(
  ctx: any,
  note: { id: string; contentUrl: string },
): Promise<void> {
  try {
    const key = note.contentUrl.replace(`${R2_BASE_URL}/`, "");
    await deleteFileFromR2(key);
    await ctx.db.delete(notes).where(eq(notes.id, note.id));
    console.log(`Deleted note and file: ${note.id}`);
  } catch (error) {
    console.error(`Error deleting note and file: ${note.id}`, error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete some notes.",
    });
  }
}

export async function indexNote(note: {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  userId: string;
  updatedAt: number;
}) {
  try {
    await typeSenseClient.collections("notes").documents().upsert({
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      userId: note.userId,
      updatedAt: note.updatedAt,
    });

    console.log(`Indexed note with ID: ${note.id}`);
  } catch (error) {
    console.error(`Error indexing note with ID: ${note.id}`, error);
  }
}

export const notesRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.notes.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),

  create: protectedProcedure
    .input(
      z.object({
        zipFile: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const zip = new JSZip();
      const zipContent = Buffer.from(input.zipFile, "base64");
      const loadedZip = await zip.loadAsync(zipContent);

      const results = await Promise.all(
        Object.keys(loadedZip.files).map(async (filePath) => {
          if (filePath.startsWith("__MACOSX/")) {
            return null;
          }

          const file = loadedZip.files[filePath];
          if (!file || file.dir) {
            return null;
          }

          if (!file.name.endsWith(".md") && !file.name.endsWith(".markdown")) {
            return null;
          }

          const content = await file.async("string");

          const pathParts = file.name.split("/");
          const fileName = pathParts.pop() || file.name;
          const fileDir = pathParts.join("/") || null;

          const key = fileDir
            ? `notes/${ctx.session.user.id}/${fileDir}/${fileName}`
            : `notes/${ctx.session.user.id}/${fileName}`;

          return uploadAndPersist(ctx, key, content, fileName, fileDir);
        }),
      );

      return results.filter(
        (result): result is { path: string; contentUrl: string } =>
          result !== null,
      );
    }),
  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.query.notes.findMany({
      where: eq(notes.userId, userId),
    });
  }),
  getNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.session.user.id;

      const note = await ctx.db.query.notes.findFirst({
        where: eq(notes.id, id),
      });

      if (!note) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found.",
        });
      }

      if (note.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have access to this note.",
        });
      }

      return note;
    }),
  deleteAllNotes: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userNotes = await ctx.db.query.notes.findMany({
      where: eq(notes.userId, userId),
    });

    if (userNotes.length === 0) {
      return { message: "No notes to delete." };
    }

    try {
      await Promise.all(userNotes.map((note) => deleteNoteAndFile(ctx, note)));
      return { message: "All notes deleted successfully." };
    } catch (error) {
      throw error;
    }
  }),
});
