import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";
import { getR2FileUrl, uploadFileToR2 } from "~/server/utils/r2";

export const notesRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.notes.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const key = `notes/${ctx.session.user.id}/${input.title}.md`;
      const {
        $metadata: { httpStatusCode },
      } = await uploadFileToR2({
        key,
        content: input.content,
        contentType: "text/markdown",
      });

      if (httpStatusCode !== 200) {
        return null;
      }

      const contentUrl = getR2FileUrl(key);

      console.log("uploaded file to:", contentUrl);

      await ctx.db.insert(notes).values({
        title: input.title,
        contentUrl,
        userId: ctx.session.user.id,
      });
    }),
});
