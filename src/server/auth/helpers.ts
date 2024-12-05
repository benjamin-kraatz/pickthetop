import { type User } from "@clerk/nextjs/server";

/**
 * Get the username or email address of a user.
 * It first tries the username, then the primary email address.
 *
 * @param user - The user to get the username or email address from.
 * @returns The username or email address of the user.
 */
export const getUsername = (user?: User | null) => {
  return user?.username ?? user?.primaryEmailAddress?.emailAddress;
};
