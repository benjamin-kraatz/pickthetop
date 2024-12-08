import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <SignIn />
      <div className="h-8" />
      <div className="max-w-lg">
        <h1 className="text-2xl font-semibold">
          Warum muss ich mich anmelden?
        </h1>
        <p className="text-muted-foreground">
          Um deinen Spielstand zu sichern und dir die bestmögliche
          Spielerfahrung zu gewährleisten, benötigst du ein Konto.
        </p>
        <div className="h-4" />
        <p className="text-xs text-muted-foreground">
          Dein Konto wird über den Anmelde-Service von{" "}
          <Link href="https://clerk.com" className="underline">
            Clerk
          </Link>{" "}
          verwaltet. Wir verknpüfen lediglich deine <code>userId</code> mit
          deinen Spielständen. Innerhalb der Systeme von Pick The Top haben wir{" "}
          <b>zu keinem Zeitpunkt Informationen</b> über deine E-Mail-Adresse
          oder andere Geräte- oder Zugangsdaten. Nach der Anmeldung hast du über
          den Nutzer-Button in der rechten oberen Ecke die Möglichkeit, dein
          Konto zu verwalten, inklusive der Abmeldung und der Löschung deines
          Kontos.
        </p>
      </div>
    </div>
  );
}
