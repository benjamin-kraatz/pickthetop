import { Github } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

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
        <form
          action={async () => {
            "use server";
            await api.quiz.completeRound({ roundId: "r000" });
            redirect("/game");
          }}
        >
          <Button type="submit">Nochmal spielen</Button>
        </form>
      </div>
      <div className="h-4" />
      <div className="flex items-center gap-2">
        <Link
          href="https://github.com/benjamin-kraatz/pickthetop"
          target="_blank"
          className={buttonVariants({
            variant: "outline",
            className: "space-x-1",
          })}
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </Link>
      </div>
    </div>
  );
}
