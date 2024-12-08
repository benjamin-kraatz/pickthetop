"use client";

import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
import { getWordSecond } from "~/lib/grammar";
import { useQuizStore } from "~/lib/quiz/store";
import { cn } from "~/lib/utils";

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
  isPaused?: boolean;
}

export function Timer({
  timeLimit,
  onTimeUp,
  isActive,
  isPaused = false,
}: TimerProps) {
  const updateTimeLeft = useQuizStore((state) => state.setTimeLeft);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const isUrgent = timeLeft <= 4 && timeLeft > 0;

  useEffect(() => {
    if (!isActive || isPaused) {
      if (!isActive) {
        setTimeLeft(timeLimit);
      }
      return;
    }

    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = Math.max(0, timeLeft - 1);
      updateTimeLeft(newTimeLeft);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timeLimit, onTimeUp, isActive, isPaused, updateTimeLeft]);

  const progress = (timeLeft / timeLimit) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Zeit übrig:</span>
        <span className={cn("font-mono", isUrgent && "text-destructive")}>
          {timeLeft} {getWordSecond(timeLeft)}
        </span>
      </div>
      <Progress
        value={progress}
        className={cn(
          "h-2",
          isUrgent && [
            "animate-pulse bg-destructive duration-700",
            "animate-glow",
          ],
        )}
      />
    </div>
  );
}
