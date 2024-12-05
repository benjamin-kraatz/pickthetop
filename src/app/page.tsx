import { currentUser } from "@clerk/nextjs/server";
import LandingHeader from "~/components/LandingHeader";

import { getUsername } from "~/server/auth/helpers";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const user = await currentUser();

  if (user?.id) {
    void api.post.getLatest.prefetch();
  }

  const username = getUsername(user);

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col">
        <LandingHeader />
      </main>
    </HydrateClient>
  );
}
