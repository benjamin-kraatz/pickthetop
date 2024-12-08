import { redirect } from "next/navigation";
import GameShell from "~/components/game/GameShell";
import { api } from "~/trpc/server";

export default async function GamePage() {
  // get the current game state for the user, if it exists.
  // If none exists, we start a new game.
  // We start with the last round the user was on, and the last
  // question they were on, so the user cannot cheat by going back.
  const gameState = await api.quiz.getCurrentGameState();

  const lastRound = gameState?.lastRoundId ?? "r001";
  const lastQuestion = gameState?.lastQuestionId;

  const gameRounds = await api.quiz.getQuestions({
    roundId: lastRound,
    randomize: false,
  });

  if (gameRounds.length === 0) {
    return redirect("/game/end");
  }

  return (
    <GameShell
      roundId={lastRound}
      game={gameRounds}
      initialQuestionId={lastQuestion ?? undefined}
    />
  );
}
