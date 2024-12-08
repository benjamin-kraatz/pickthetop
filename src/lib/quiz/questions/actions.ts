"use server";

import { type GameRound } from "~/lib/game-types";

/**
 * Get the questions for a given round.
 * Questions are stored in the `src/lib/quiz/questions` directory.
 * @param roundId The id of the round to get the questions for.
 * @returns The questions for the given round.
 */
export async function getQuestions(roundId: string, randomize = false) {
  const questions = (await import(`./${roundId}.json`)) as GameRound[];

  if (randomize) {
    return questions.sort(() => Math.random() - 0.5);
  }

  return questions;
}
