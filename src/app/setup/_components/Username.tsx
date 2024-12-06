import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getUsername } from "~/server/auth/helpers";

export default async function Username() {
  const user = await currentUser();
  return <>{getUsername(user)}</>;
}
