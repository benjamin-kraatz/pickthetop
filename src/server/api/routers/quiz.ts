import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { posthog } from "~/lib/analytics/server";
import { getQuestions } from "~/lib/quiz/questions/actions";
import { getNextRoundId } from "~/lib/quiz/utils";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { gameStates, quizAnswers } from "~/server/db/schema";

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

      if (!answer) {
        return null;
      }

      posthog.capture({
        event: "quiz_answer",
        distinctId: ctx.userId!,
        properties: {
          roundId: input.roundId,
          questionId: input.questionId,
          state: input.state,
          timeLeft: input.timeLeft,
        },
      });

      // now, store the last game state for the user,
      // but only if the user has given the correct answer.
      if (input.state === "correct") {
        await ctx.db
          .insert(gameStates)
          .values({
            userId: ctx.userId!,
            lastRoundId: input.roundId,
            lastQuestionId: input.questionId,
          })
          .onConflictDoUpdate({
            target: [gameStates.userId],
            set: {
              lastRoundId: input.roundId,
              lastQuestionId: input.questionId,
            },
          });
      } else {
        // if the answer is incorrect, we delete the last game state's question id
        // for the user, so the user has to start over.
        await ctx.db
          .update(gameStates)
          .set({
            lastQuestionId: null,
          })
          .where(eq(gameStates.userId, ctx.userId!));
      }

      return answer;
    }),

  completeRound: protectedProcedure
    .input(z.object({ roundId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("completeRound", input);
      const nextRoundId = getNextRoundId(input.roundId);
      console.log("nextRoundId", nextRoundId);
      await ctx.db
        .update(gameStates)
        .set({ lastRoundId: nextRoundId, lastQuestionId: null })
        .where(eq(gameStates.userId, ctx.userId!));

      posthog.capture({
        event: "quiz_round_completed",
        distinctId: ctx.userId!,
        properties: {
          roundId: input.roundId,
        },
      });

      revalidatePath("/game");
    }),

  getCurrentGameState: protectedProcedure.query(async ({ ctx }) => {
    const gameState = await ctx.db.query.gameStates.findFirst({
      where: (fields, { eq }) => eq(fields.userId, ctx.userId!),
    });
    return gameState;
  }),
});
