import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";

export default function GameEndPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-3xl font-medium">
        Das Spiel ist vorbei!
      </div>
      <div className="h-4" />
      <div className="text-center text-muted-foreground">
        Vielen Dank für&apos;s Mitspielen!
      </div>
      <div className="h-4" />
      <div className="flex items-center gap-2">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Zur Startseite
        </Link>
        <Link href="/game" className={buttonVariants({ variant: "default" })}>
          Nochmal spielen
        </Link>
      </div>
    </div>
  );
}
