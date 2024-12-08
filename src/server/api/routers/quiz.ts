import { sql } from "drizzle-orm";
import { z } from "zod";
import { getQuestions } from "~/lib/quiz/questions/actions";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { quizAnswers } from "~/server/db/schema";

export const quizRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ roundId: z.string(), randomize: z.boolean().optional() }))
    .query(async ({ input }) => {
      const questions = await getQuestions(input.roundId, input.randomize);
      return questions;
    }),

  giveAnswer: protectedProcedure
    .input(
      z.object({
        roundId: z.string(),
        questionId: z.string(),
        state: z.enum(["correct", "incorrect"]),
        timeLeft: z.number().min(0).max(199),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const answer = await ctx.db
        .insert(quizAnswers)
        .values({
          roundId: input.roundId,
          questionId: input.questionId,
          state: input.state,
          timeLeft: input.timeLeft,
          userId: ctx.userId!,
        })
        .onConflictDoUpdate({
          target: [
            quizAnswers.userId,
            quizAnswers.roundId,
            quizAnswers.questionId,
          ],
          set: {
            state: input.state,
            timeLeft: input.timeLeft,
            timestamp: sql`CURRENT_TIMESTAMP`,
          },
        })
        .returning();
      return answer;
    }),
});
