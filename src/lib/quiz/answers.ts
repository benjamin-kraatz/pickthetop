import { type GameRound } from "~/lib/game-types";

export function validateAnswer(answer: string, round: GameRound) {
  const normalizedAnswer = answer.toLowerCase().trim();
  const normalizedTopAnswers = round.topAnswers.map((a) =>
    a.toLowerCase().trim(),
  );
  return normalizedTopAnswers.includes(normalizedAnswer);
}
