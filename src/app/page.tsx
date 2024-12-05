import LandingHeader from "~/components/LandingHeader";
import { ThemeToggle } from "~/components/ui/theme-toggle";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="absolute right-5 top-5 z-50">
        <ThemeToggle />
      </div>
      <main className="flex min-h-screen flex-col">
        <LandingHeader />
      </main>
    </HydrateClient>
  );
}
