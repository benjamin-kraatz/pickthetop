import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Loader2Icon className="h-6 w-6 animate-spin" />
      <p className="text-muted-foreground">
        Die Runden werden geladen. Bitte warte einen Moment.
      </p>
    </main>
  );
}
