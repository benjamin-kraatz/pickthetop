"use client";

import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ timeLimit, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(timeLimit);
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
  }, [timeLeft, timeLimit, onTimeUp, isActive]);

  const progress = (timeLeft / timeLimit) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Zeit übrig:</span>
        <span className="font-mono">{timeLeft}s</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
