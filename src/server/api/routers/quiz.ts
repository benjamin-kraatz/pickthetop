import { z } from "zod";
import { getQuestions } from "~/lib/quiz/questions/actions";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ roundId: z.string(), randomize: z.boolean().optional() }))
    .query(async ({ input }) => {
      const questions = await getQuestions(input.roundId, input.randomize);
      return questions;
    }),
});
