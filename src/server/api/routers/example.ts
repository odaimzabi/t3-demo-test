import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const examples = await ctx.prisma.example.findMany();
    return {
      success: true,
      examples: examples,
    };
  }),
  deleteSingle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const exampleId = input?.id;
      const example = await ctx.prisma.example.findFirst({
        where: {
          id: exampleId,
        },
      });
      if (!example) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Example that you provided does not exist",
        });
      }
      await ctx.prisma.example.delete({
        where: {
          id: exampleId,
        },
      });
      return {
        success: true,
        message: "Successfully deleted the example",
      };
    }),
});
