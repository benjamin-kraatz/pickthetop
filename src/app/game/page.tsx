import GameShell from "~/components/game/GameShell";
import { api } from "~/trpc/server";

export default async function GamePage() {
  const gameRounds = await api.quiz.getQuestions({
    roundId: "r001",
    randomize: false,
  });
  return <GameShell roundId="r001" game={gameRounds} />;
}
