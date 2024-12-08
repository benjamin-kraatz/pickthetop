"use server";

import { type GameRound } from "~/lib/game-types";

export async function getQuestions(roundId: string) {
  const questions = (await import(`./${roundId}.json`)) as GameRound;
  return questions;
}
