import React from "react";

import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  text: string | React.ReactNode;
  maxWidth?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  delayDuration?: number;
}

export default function Tooltipped({
  text,
  children,
  maxWidth,
  side,
  className,
  delayDuration,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration ?? 350}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          style={{ maxWidth }}
          className={cn(
            "z-50 w-auto max-w-[300px] rounded-lg bg-background p-2 text-sm text-foreground shadow-lg",
            className,
          )}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
