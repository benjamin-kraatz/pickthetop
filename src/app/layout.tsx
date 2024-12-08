import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { deDE } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/components/ui/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import Link from "next/link";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Pick The Top - Das Mindgame",
  description:
    "Pick The Top - Finde die Top-Antwort aus einer Reihe von Fragen und messe dich mit anderen.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={deDE}>
      <html
        lang="de"
        className={`${GeistSans.variable}`}
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-b-muted/20 bg-background px-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <span className="text-lg font-semibold">Pick The Top</span>
                </Link>
                <div className="h-8 w-px bg-muted" />
                <Link
                  href="https://github.com/benjamin-kraatz/pickthetop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <Github className="size-4" />
                  <span>GitHub</span>
                </Link>
              </div>
              <ThemeToggle />
            </nav>
            <Toaster richColors position="top-center" />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
