import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getEmailAddress, getUsername } from "~/server/auth/helpers";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  completeSetup: protectedProcedure.mutation(async ({ ctx }) => {
    const client = await clerkClient();
    const userId = ctx.session.userId;

    try {
      await client.users.updateUser(userId, {
        publicMetadata: {
          setupComplete: true,
        },
      });

      const user = await currentUser();
      const name = getUsername(user);
      const emailAddress = getEmailAddress(user);
      if (!emailAddress) {
        throw new Error("No email address found");
      }

      await ctx.db
        .insert(users)
        .values({
          name,
          id: userId,
          completedSetup: true,
          email: emailAddress,
        })
        .onConflictDoUpdate({
          target: [users.id],
          set: {
            completedSetup: true,
            updatedAt: new Date(),
          },
        });

      revalidatePath("/setup");
      return { success: true };
    } catch {
      return {
        success: false,
        error: "setup-failed",
      };
    }
  }),
});
