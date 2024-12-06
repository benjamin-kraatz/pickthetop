import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pick The Top - Das Mindgame",
  description:
    "Pick The Top - Finde die Top-Antwort aus einer Reihe von Fragen und messe dich mit anderen.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function GameRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
