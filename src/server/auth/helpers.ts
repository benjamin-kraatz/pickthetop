import { type User } from "@clerk/nextjs/server";

/**
 * Get the username or email address of a user.
 * It first tries the username, then the primary email address.
 *
 * @param user - The user to get the username or email address from.
 * @returns The username or email address of the user.
 */
export function getUsername(user?: User | null) {
  return user?.username ?? user?.primaryEmailAddress?.emailAddress;
}

/**
 * Get the email address of a user.
 * It first tries the primary email address, then the first secondary email address.
 *
 * @param user - The user to get the email address from.
 * @returns The email address of the user.
 */
export function getEmailAddress(user?: User | null) {
  const primary = user?.primaryEmailAddress?.emailAddress;
  const secondary = user?.emailAddresses?.[0]?.emailAddress;

  return primary ?? secondary;
}
