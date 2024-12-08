import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { Badge } from "./ui/badge";

/* eslint-disable @next/next/no-img-element */
export default function LandingHeader() {
  return (
    <div className="w-full">
      <div className="relative isolate overflow-hidden bg-background px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <div className="relative mx-auto w-fit md:mx-0">
            <h2 className="w-fit bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              Pick The Top
              <br />
              Das Mindgame
            </h2>
            <div className="absolute -right-5 -top-2">
              <Badge>Beta</Badge>
            </div>
          </div>
          <p className="mt-6 text-pretty text-lg/8 text-muted-foreground">
            Finde die Top-Antwort aus einer Reihe an Fragen -{" "}
            <strong>aber Vorsicht!</strong> Du hast nicht viel Zeit!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Link
              href="/game"
              className={buttonVariants({ variant: "default" })}
            >
              Spiel starten
            </Link>
            <Link
              href="/rules"
              className={buttonVariants({
                variant: "ghost",
                className: "tracking-tight",
              })}
            >
              Spielregeln ansehen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          <img
            alt="App screenshot"
            src="demo_dark.png"
            width={1824}
            height={1080}
            className="bg-white/2 absolute left-0 top-0 hidden w-[57rem] max-w-none rounded-md rounded-tl-lg border border-muted/20 ring-1 ring-white/10 dark:block"
          />
          <img
            alt="App screenshot"
            src="demo_light.png"
            width={1824}
            height={1080}
            className="bg-white/2 absolute left-0 top-0 block w-[57rem] max-w-none rounded-md rounded-tl-lg border border-muted bg-[#f7f6ff] p-3 ring-1 ring-white/10 dark:hidden"
          />
        </div>
      </div>
    </div>
  );
}
