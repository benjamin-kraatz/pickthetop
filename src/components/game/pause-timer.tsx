"use client";

import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
import { getWordSecond } from "~/lib/grammar";
import { cn } from "~/lib/utils";

interface PauseTimerProps {
  timeLimit: number;
  isActive: boolean;
  onTimeUp: () => void;
}

export function PauseTimer({ timeLimit, isActive, onTimeUp }: PauseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isOver, setIsOver] = useState(false);
  const isUrgent = timeLeft <= 4 && timeLeft > 0;

  useEffect(() => {
    if (!isActive) {
      setIsOver(false);
      return;
    }

    if (timeLeft === 0) {
      onTimeUp();
      setIsOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timeLimit, onTimeUp, isActive]);

  const progress = (timeLeft / timeLimit) * 100;

  if (!isActive) return null;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Pausenzeit übrig:</span>
        <span className={cn("font-mono", isUrgent && "text-amber-500")}>
          {isOver && "keine"}
          {!isOver && `${timeLeft} ${getWordSecond(timeLeft)}`}
        </span>
      </div>
      <Progress
        value={isOver ? 0 : progress}
        className={cn(
          "h-2",
          isOver ? "bg-yellow-200" : "bg-yellow-500",
          isUrgent && [
            "animate-pulse bg-amber-200 duration-700",
            "animate-glow",
          ],
        )}
      />
    </div>
  );
}
