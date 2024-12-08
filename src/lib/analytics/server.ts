import "server-only";

import { PostHog } from "posthog-node";
import { env } from "~/env";

export const posthog = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: "https://eu.i.posthog.com",
});
