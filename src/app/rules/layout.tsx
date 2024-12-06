import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Spielregeln | Pick The Top - Das Mindgame",
  description:
    "Spielregeln für Pick The Top - Lerne, wie das Spiel funktioniert und wie du es richtig spielst, um zu gewinnen.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: React.ReactNode;
};

export default function RulesLayout({ children }: Props) {
  return <>{children}</>;
}
