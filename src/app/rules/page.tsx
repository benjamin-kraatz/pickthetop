import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableCaption,
  TableHeader,
} from "~/components/ui/table";

export default function RulesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-2 md:p-6">
      <h1 className="mb-4 text-center text-4xl font-bold">
        Spielregeln für Pick The Top
      </h1>
      <p className="mb-6 text-center text-lg">
        Willkommen zu Pick The Top! Hier sind die detaillierten Regeln, um dir
        den Einstieg zu erleichtern.
      </p>
      <div className="my-4 max-w-3xl">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Aufgepasst!</AlertTitle>
          <AlertDescription>
            Diese Seite ist noch nicht vollständig. Es fehlen noch einige
            Hinweise, Tipps und Beispiele.{" "}
            <Link
              href="https://github.com/benjamin-kraatz/pickthetop"
              target="_blank"
              className="underline"
              rel="noreferrer noopener"
            >
              Hilf doch mit
            </Link>{" "}
            und verbessere diese Seite für alle anderen Spieler.
          </AlertDescription>
        </Alert>
      </div>
      <div className="w-full max-w-2xl rounded-lg px-2 shadow-md md:p-6">
        <h2 className="mb-4 text-2xl font-semibold">Spielübersicht</h2>
        <p className="mb-4">
          In Pick The Top spielst du ein spannendes Quiz, bei dem du die{" "}
          <b>Top-Antwort</b> aus einer Reihe von Fragen finden musst. Das Ziel
          ist es, so viele Top-Antworten wie möglich zu erraten, bevor die Zeit
          abläuft. Du hast nur eine begrenzte Zeit, um die Antworten zu finden,
          also sei schnell und clever!
        </p>

        <div className="h-4" />

        <h2 className="my-4 text-2xl font-semibold">
          Ein Beispiel zur Erklärung
        </h2>
        <p className="mb-4">
          Am einfachsten ist es, direkt mal loszulegen, um zu sehen, wie das
          Spiel funktioniert:
        </p>

        <Table>
          <TableCaption>Ein Beispiel für eine Runde.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Nr.</TableHead>
              <TableHead className="w-full">Frage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Wie heißt die Hauptstadt von Deutschland?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell>Was ist die nationale Blume Japans?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3</TableCell>
              <TableCell>
                Wie viele rote Streifen sind auf der US-Flagge?
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4</TableCell>
              <TableCell>
                Der Baum welches Steinobsts wird etwa 30 - 90 Jahre alt?
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">5</TableCell>
              <TableCell>Was ist das Nationaltier Australiens?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">6</TableCell>
              <TableCell>Der wievielte Monat ist der Juli?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">7</TableCell>
              <TableCell>
                Welcher Gattung gehört die Schattenmorelle an?
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">8</TableCell>
              <TableCell>Wie lautet das Ergebnis von 115514 / 16502?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">9</TableCell>
              <TableCell>Wie viele Ecken hat ein Oktaeder?</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">10</TableCell>
              <TableCell>
                &quot;Geltung für Auslandstaten in anderen Fällen&quot; ist der
                wievielte Paragraph im StGB?
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="mt-4">Finde hier die Top-Antwort.</p>
        <p>
          Es gibt eine Antwort, die öfter vorkommt als andere, und genau die
          gilt es zu finden. Dabei kannst du von oben nach unten die Fragen für
          dich beantworten und feststellen, welche Antwort wohl öfter vorkommt.
          Manchmal kann es aber auch sein, dass du eine Frage nicht beantworten
          kannst - das ist nicht schlimm! Versuche es einfach mit der nächsten
          Frage.
        </p>
        <p>
          Manche Fragen wollen dir einfach nur die Zeit stehlen, weil sie
          komplex sind und/oder deren Antwort gar nichts mit der Top-Antwort zu
          tun hat.
        </p>
        <br />
        <p>
          Beispiel Frage 8: sie ist etwas komplexer und will dich vielleicht
          aufhalten. Sie <i>kann</i> ein Teil der Top-Antwort sein, muss aber
          nicht.
        </p>
        <br />
        <p>
          Manche Antworten können die Top-Antwort auch lediglich{" "}
          <i>beinhalten</i>: nehmen wir an, die Top-Antwort ist 7. Dann kann es
          sein, dass es eine Frage mit der Antwort &quot;Siebengebierge&quot;
          gibt; sie beinhaltet also die 7 als Zahlwort und gibt somit einen
          Hinweis auf die richtige Top-Antwort.
        </p>

        <p className="mt-4">
          Schauen wir uns nun die Lösung für das obige Beispiel an:
        </p>
        <p>
          Die Top-Antwort ist: <b>7</b> (oder <b>sieben</b>). Du hast die
          Möglichkeit, die Antwort als Zahl oder als Wort einzugeben - Sowohl
          Groß- als auch Kleinschreibung ist erlaubt.
        </p>

        <div className="h-8" />

        <h2 className="mb-4 text-2xl font-semibold">Spielablauf</h2>
        <ol className="mb-4 list-inside list-decimal space-y-2">
          <li>
            <strong>Fragen beantworten:</strong> Du erhältst eine Reihe von
            Fragen, die dir Hinweise auf die Top-Antwort geben. Jede Frage ist
            so formuliert, dass sie dich auf die richtige Antwort hinführt, oder
            sie hat das Ziel, dich aufzuhalten, weil sie eher komplex gestaltet
            ist.
          </li>
          <li>
            <strong>Top-Antwort finden:</strong> Deine Aufgabe ist es, die
            Antwort zu finden, die am häufigsten vorkommt. Dabei musst du nicht
            zwingend jede aufgelistete Frage beantworten; manchmal reicht ein
            gutes Bauchgefühl oder auch ein bisschen Glück.
          </li>
          <li>
            <strong>Zeitlimit:</strong> Du hast insgesamt nur begrenzt Zeit, um
            deine Antworten einzugeben. Die Zeit pro Runde wird dir immer
            angezeigt, und du musst schnell denken und handeln.
          </li>
          <li>
            <strong>Antwort eingeben:</strong> Du kannst deine vermutete
            Top-Antwort in das Textfeld eingeben. Achte darauf, dass du die
            Antwort korrekt schreibst.
          </li>
          <li>
            <strong>Runden:</strong> Das Spiel besteht aus mehreren Runden. Jede
            Runde hat ihre eigenen Fragen, und die Schwierigkeit kann variieren.
            Du musst in jeder Runde die Top-Antworten finden, um im Spiel zu
            bleiben.
          </li>
        </ol>

        <h2 className="mb-4 text-2xl font-semibold">Wichtige Hinweise</h2>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <strong>Falsche Antworten:</strong> Wenn du eine falsche Antwort
            eingibst, ist das Spiel sofort vorbei. Du erhältst keine Punkte für
            falsche Antworten, also überlege gut, bevor du eingibst.
          </li>
          <li>
            <strong>Groß- und Kleinschreibung:</strong> Die Schreibweise der
            Antworten ist nicht entscheidend. Du kannst die Antwort in
            beliebiger Groß- und Kleinschreibung eingeben. Zum Beispiel sind
            &quot;berlin&quot;, &quot;Berlin&quot; und &quot;BERLIN&quot; alle
            gültige Eingaben für eine mögliche Top-Antwort.
          </li>
          <li>
            <strong>Artikel und Zahlen:</strong> Artikel wie &quot;der&quot;,
            &quot;die&quot; oder &quot;das&quot; können weggelassen werden. Wenn
            die Top-Antwort eine Zahl ist, kannst du die Antwort sowohl als Zahl
            (z.B. &quot;5&quot;) als auch als Wort (z.B. &quot;fünf&quot;)
            eingeben.
          </li>
        </ul>

        <div className="h-8" />

        <h2 className="mb-4 text-2xl font-semibold">Viel Spaß!</h2>
        <p>
          Wir wünschen dir viel Spaß beim Spielen und viel Erfolg beim Finden
          der Top-Antworten! Denke daran, dass es nicht nur um Wissen geht,
          sondern auch um Schnelligkeit und Intuition. Lass dich nicht
          entmutigen, wenn du nicht sofort die richtige Antwort findest. Übung
          macht den Meister!
        </p>

        <div className="h-4" />
      </div>
    </div>
  );
}
