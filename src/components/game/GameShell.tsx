"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { PauseTimer } from "~/components/game/pause-timer";
import { QuestionsTable } from "~/components/game/questions-table";
import { Timer } from "~/components/game/timer";
import Tooltipped from "~/components/Tooltipped";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type GameRound } from "~/lib/game-types";
import { validateAnswer } from "~/lib/quiz/answers";

export default function GameShell({ game }: { game: GameRound[] }) {
  const router = useRouter();
  // start at -1 as we increment on pressing "play".
  const [currentRound, setCurrentRound] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showingResults, setShowingResults] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [canPause, setCanPause] = useState(true);

  const question = game[Math.max(currentRound, 0)];

  if (!question) {
    return (
      <main className="container space-y-8 py-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-2xl font-bold">Keine Fragen mehr!</h1>
          <p className="text-muted-foreground">
            Du hast alle Fragen beantwortet. Du kannst das Spiel jetzt wieder
            starten.
          </p>
        </div>
      </main>
    );
  }

  const handleTimeUp = () => {
    toast.error("Zeit abgelaufen!", {
      description: `Die richtige Antwort wäre "${question.topAnswers[0]!}" gewesen.`,
      className: "bg-orange-600 text-white",
    });
    setHasLost(true);
    resetGame();
    router.push("/game/end");
  };

  const handlePauseTimeUp = () => {
    setIsPaused(false);
    setCanPause(false);
    toast.info("Pausenzeit abgelaufen!", {
      description: "Die Fragen sind jetzt wieder sichtbar.",
    });
  };

  const startGame = () => {
    // increment the round as we start the game or go to the next round.
    // this is necessary so we don't show the next question in the answer submit function
    // (where incrementing would make more sense).
    setCurrentRound((prev) => prev + 1);
    setShowingResults(false);
    setIsPlaying(true);
    setIsPaused(false);
    setAnswer("");
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleAnswerSubmit = (answer: string) => {
    const correct = validateAnswer(answer, question);

    setLastAnswer(answer);
    setIsCorrect(correct);
    setShowingResults(true);
    setIsPlaying(false);

    if (!correct) {
      toast.error("Das war leider falsch!", {
        description: "Das Spiel ist vorbei. Du kannst von vorne starten",
      });
      setHasLost(true);
      setTimeout(() => {
        resetGame();
        router.refresh();
      }, 5000);
      return;
    }

    if (currentRound === question.questions.length - 1) {
      toast.success("Glückwunsch! Du hast alle Runden geschafft!");
      setHasWon(true);
      router.push("/");
      setTimeout(() => {
        resetGame();
        router.refresh();
      }, 5000);
      return;
    }
  };

  const resetGame = () => {
    startTransition(() => {
      setCurrentRound(0);
      setIsPlaying(false);
      setShowingResults(false);
      setIsPaused(false);
      setIsCorrect(false);
      setAnswer("");
    });
    router.refresh();
  };

  return (
    <main className="container space-y-8 py-6">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Finde die Top-Antwort!</h1>
          <p className="text-muted-foreground">
            Finde die Antwort, die am häufigsten vorkommt. Du hast{" "}
            <strong>{question.timeLimit} Sekunden</strong> Zeit!
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            Runde {currentRound + 2} von {question.questions.length}
          </p>
        </div>

        <Timer
          timeLimit={question.timeLimit}
          onTimeUp={handleTimeUp}
          isActive={isPlaying}
          isPaused={isPaused}
        />

        <PauseTimer
          timeLimit={8}
          isActive={isPaused}
          onTimeUp={handlePauseTimeUp}
        />

        {showingResults ? (
          <div className="space-y-4 rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {isCorrect ? "Richtig!" : "Falsch!"}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Deine Antwort:
                </span>
                <span
                  className={`rounded px-4 py-0.5 ${
                    isCorrect
                      ? "bg-green-100 font-medium text-green-700"
                      : "bg-red-100 font-medium text-red-700"
                  }`}
                >
                  {lastAnswer}
                </span>
              </div>
            </div>

            {!isCorrect && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Richtige Antworten:
                </span>
                <div className="flex gap-2">
                  {question.topAnswers.map((answer) => (
                    <span
                      key={answer}
                      className="rounded bg-green-100 px-2 py-0.5 font-medium text-green-700"
                    >
                      {answer}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <QuestionsTable
              questions={question.questions}
              showAnswers
              topAnswers={question.topAnswers}
            />
          </div>
        ) : (
          ((!isPlaying || isPaused) && (
            <div className="flex min-h-[415px] border-separate flex-col items-center justify-center rounded-md border text-center">
              <span className="text-sm font-semibold">
                {!isPlaying
                  ? "Starte das Spiel, um die Fragen zu sehen."
                  : "Timer pausiert. Klicke auf das Auge, um die Fragen wieder zu sehen."}
              </span>
            </div>
          )) || <QuestionsTable questions={question.questions} />
        )}

        {isPlaying && (
          <form
            onSubmit={() => handleAnswerSubmit(answer)}
            className="space-y-4"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Deine Top-Antwort..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!isPlaying}
                className="flex-1"
              />
              {isPlaying && (
                <Tooltipped text="Pausieren, um Top-Antwort einzugeben">
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
            <Button type="submit" className="w-full" disabled={!answer}>
              Antwort einreichen
            </Button>
          </form>
        )}

        {!isPlaying && !showingResults && !isPaused && (
          <Button
            type="button"
            onClick={startGame}
            className="w-full"
            variant="outline"
            disabled={hasLost || hasWon}
          >
            {currentRound <= 1 ? "Spiel starten" : "Nächste Runde"}
          </Button>
        )}
        {showingResults && !isPaused && !isPlaying && (
          <Button
            type="button"
            onClick={startGame}
            className="w-full"
            variant="outline"
            disabled={hasLost || hasWon}
          >
            Weiter zur nächste Runde
          </Button>
        )}
      </div>
    </main>
  );
}
