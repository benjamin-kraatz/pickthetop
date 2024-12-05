import { currentUser } from "@clerk/nextjs/server";

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></main>
    </HydrateClient>
  );
}
