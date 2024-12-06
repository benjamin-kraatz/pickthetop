"use client";

import { useState } from "react";
import { QuestionsTable } from "~/components/game/questions-table";
import { Timer } from "~/components/game/timer";
import { exampleRounds } from "~/lib/game-types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState("");

  const round = exampleRounds[currentRound];

  if (!round) {
    return (
      <main className="container space-y-8 py-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-2xl font-bold">Keine Runden mehr!</h1>
          <p className="text-muted-foreground">
            Du hast alle Runden beendet. Du kannst das Spiel jetzt wieder
            starten.
          </p>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) return;

    const hasMoreRounds = currentRound < exampleRounds.length - 1;

    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedTopAnswers = round.topAnswers.map((a) =>
      a.toLowerCase().trim(),
    );
    const isInTopAnswers = normalizedTopAnswers.includes(normalizedAnswer);

    if (isInTopAnswers) {
      toast.success("Richtig", {
        description: "Du hast die Top-Antwort gefunden!",
        className: "bg-green-600 text-white",
      });
      setIsPlaying(false);
      if (currentRound < exampleRounds.length - 1) {
        setCurrentRound((prev) => prev + 1);
      }
    } else {
      toast.error("Falsch", {
        description: `Die richtige Antwort wäre "${round.topAnswers[0]!}" gewesen.`,
        className: "bg-red-600 text-white",
      });
      setIsPlaying(false);
    }

    if (!hasMoreRounds) {
      router.push("/game/end");
    }
    setAnswer("");
  };

  const handleTimeUp = () => {
    toast.error("Zeit abgelaufen!", {
      description: `Die richtige Antwort wäre "${round.topAnswers[0]!}" gewesen.`,
      className: "bg-orange-600 text-white",
    });
    setIsPlaying(false);
    setAnswer("");
  };

  const startGame = () => {
    setIsPlaying(true);
    setAnswer("");
  };

  return (
    <main className="container space-y-8 py-6">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Finde die Top-Antwort!</h1>
          <p className="text-muted-foreground">
            Finde die Antwort, die am häufigsten vorkommt. Du hast{" "}
            {round.timeLimit} Sekunden Zeit!
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            Runde {currentRound + 1} von {exampleRounds.length}
          </p>
        </div>

        <Timer
          timeLimit={round.timeLimit}
          onTimeUp={handleTimeUp}
          isActive={isPlaying}
        />

        {isPlaying && <QuestionsTable questions={round.questions} />}
        {!isPlaying && (
          <div className="flex min-h-[415px] border-separate flex-col items-center justify-center rounded-md border text-center">
            <span className="text-sm font-semibold">
              Starte das Spiel, um die Fragen zu sehen.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Deine Antwort..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!isPlaying}
          />
          {isPlaying ? (
            <Button type="submit" className="w-full" disabled={!answer}>
              Antwort einreichen
            </Button>
          ) : (
            <Button
              type="button"
              onClick={startGame}
              className="w-full"
              variant="outline"
            >
              {currentRound === 0 ? "Spiel starten" : "Nächste Runde"}
            </Button>
          )}
        </form>
      </div>
    </main>
  );
}
