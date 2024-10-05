import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";
import { getR2FileUrl, uploadFileToR2 } from "~/server/utils/r2";
import JSZip from "jszip";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

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
            // Skip directories
            return null;
          }

          // Only process markdown files
          if (!file.name.endsWith(".md") && !file.name.endsWith(".markdown")) {
            return null;
          }

          const content = await file.async("string");

          // Extract directory and file name
          const pathParts = file.name.split("/");
          const fileName = pathParts.pop() || file.name;
          const fileDir = pathParts.join("/"); // This will be empty string if no directory

          // Construct the key with directory
          const key = fileDir
            ? `notes/${ctx.session.user.id}/${fileDir}/${fileName}`
            : `notes/${ctx.session.user.id}/${fileName}`;

          const {
            $metadata: { httpStatusCode },
          } = await uploadFileToR2({
            key,
            content,
            contentType: "text/markdown",
          });

          if (httpStatusCode !== 200) {
            return null;
          }

          const contentUrl = getR2FileUrl(key);

          console.log("uploaded file to:", contentUrl);

          await ctx.db.insert(notes).values({
            title: fileName,
            contentUrl,
            userId: ctx.session.user.id,
            folder: fileDir ?? null,
          });

          return { path: file.name, contentUrl };
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
});
