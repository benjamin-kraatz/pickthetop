"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PauseTimer } from "~/components/game/pause-timer";
import { QuestionsTable } from "~/components/game/questions-table";
import { Timer } from "~/components/game/timer";
import Tooltipped from "~/components/Tooltipped";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { exampleRounds } from "~/lib/game-types";

export default function GamePage() {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState("");

  const [isPaused, setIsPaused] = useState(false);
  const [canPause, setCanPause] = useState(true);

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
      setIsPaused(false);
      if (currentRound < exampleRounds.length - 1) {
        setCurrentRound((prev) => prev + 1);
      }
    } else {
      toast.error("Falsch", {
        description: `Die richtige Antwort wäre "${round.topAnswers[0]!}" gewesen.`,
        className: "bg-red-600 text-white",
      });
      setIsPlaying(false);
      setIsPaused(false);
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
    setIsPaused(false);
    setAnswer("");
  };

  const handlePauseTimeUp = () => {
    setIsPaused(false);
    setCanPause(false);
    toast.info("Pausenzeit abgelaufen!", {
      description: "Die Fragen sind jetzt wieder sichtbar.",
    });
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setAnswer("");
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
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
          isPaused={isPaused}
        />

        <PauseTimer
          timeLimit={15}
          isActive={isPaused}
          onTimeUp={handlePauseTimeUp}
        />

        {isPlaying && !isPaused && (
          <QuestionsTable questions={round.questions} />
        )}
        {(!isPlaying || isPaused) && (
          <div className="flex min-h-[415px] border-separate flex-col items-center justify-center rounded-md border text-center">
            <span className="text-sm font-semibold">
              {!isPlaying
                ? "Starte das Spiel, um die Fragen zu sehen."
                : "Timer pausiert. Klicke auf das Auge, um die Fragen wieder zu sehen."}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Deine Antwort..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!isPlaying}
              className="flex-1"
            />
            {isPlaying && (
              <Tooltipped text="Pausieren, um Antwort einzugeben">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={togglePause}
                  disabled={!isPlaying || !canPause}
                >
                  {isPaused ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4" />
                  )}
                </Button>
              </Tooltipped>
            )}
          </div>
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
