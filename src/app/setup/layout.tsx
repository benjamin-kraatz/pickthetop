import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata.setupComplete === true) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
