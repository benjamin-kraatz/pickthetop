"use client";

import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
import { getWordSecond } from "~/lib/grammar";
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
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timeLimit, onTimeUp, isActive, isPaused]);

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
            "animate-pulse duration-700 bg-destructive",
            "animate-glow"
          ]
        )}
      />
    </div>
  );
}
