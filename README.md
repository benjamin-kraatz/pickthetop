# Pick The Top - Das Mindgame

> Pick The Top - Das Mindgame ist im Rahmen des Mini-Hackathon 2.0 von [Kevin Chromik](https://www.youtube.com/@KevinChromik) entstanden.

In Pick The Top spielst du ein Quiz - mit Twist! Du erhälst eine Reihe von Fragen, und du musst herausfinden, was die **Top-Antwort** ist. Aber **vorsicht**: du hast nur eine begrenzte Zeit zur Verfügung!

Finde so viele Top-Antworten wie möglich und messe dich mit anderen um den besten Platz im Ranking.  
Obendrein kannst du Trivia-Wissen zu den Top-Antworten **lernen**. Es ist also mehr als ein Quiz mit Twist: du lernst noch etwas dazu.

## Spielregeln

In der einfachen Variante gibt es eine feste Anzahl von Fragen, deren Antwort einen Hinweis auf die Top-Antwort gibt, die du finden musst. Dafür hast du insgesamt nur _30 Sekunden Zeit_!  
Die Antworten auf die einzelnen Fragen werden dir natürlich nicht angezeigt. Da musst du schon selbst drauf kommen.

Beispiel:

| Nr. | Frage                                                                              |
| --- | ---------------------------------------------------------------------------------- |
| 1   | Was ist die nationale Blume Japans?                                                |
| 2   | Wie viele rote Streifen sind auf der US-Flagge?                                    |
| 3   | Der Baum welches Steinobsts wird etwa 30 - 90 Jahre alt?                           |
| 4   | Was ist das Nationaltier Australiens?                                              |
| 5   | Der wievielte Monat ist der Juli?                                                  |
| 6   | Welcher Gattung gehört die Schattenmorelle an?                                     |
| 7   | Wie lautet das Ergebnis von 115514 / 16502?                                        |
| 8   | Wie viele Ecken hat ein Oktaeder?                                                  |
| 9   | "Geltung für Auslandstaten in anderen Fällen" ist der wievielte Paragraph im StGB? |
| 10  | Wie heißt der Schwestersender von Sat.1?                                           |

Du musst nun versuchen, die Top-Antwort zu finden, also die Antwort, die _am meisten_ vorkommt. Du musst nicht zwingend alle Fragen beantworten. Sobald du feststellst, dass eine Antwort häufiger vorkommt und du vermutest, dass sie die Top-Antwort ist, kannst du sie in das Textfeld eingeben.

**ACHTUNG**: gibst du die falsche Lösung ein, ist das Spiel _sofort vorbei und verloren_!

Du kannst die Top-Antwort unterhalb der Fragen-Tabelle in das Textfeld eingeben. Das Spiel prüft auf die _korrekte Schreibweise_ der Top-Antwort.  
Die Groß- und Kleinschreibung muss nicht beachtet werden.

Nehmen wir beispielsweise an, die Top-Antwort lautet _Karosserie_, so ist die Antwort _karosserie_ oder _KARossERiE_ auch korrekt. Falsch hingegen wäre _Karoserie_, da das Wort so nicht geschrieben wird.

Noch ein Hinweis: die _meisten_ Lösungen/Top-Antworten sind einzelne Wörter. Sollten Artikel wie "der", "die", oder "das" vorkommen, kannst du sie einfach weglassen. Zahlen sind als Zahlwort oder einfach als Zahl geschrieben gültig.

Lösung des Beispiels:

Die Top-Antwort ist **7** und ist damit die richtige Antwort. Hier sind die Antworten auf die Fragen:

1. Kirschblüte
2. 7
3. Kirsche
4. Rotes Känguru
5. 7
6. (Sauer)kirsche
7. 7
8. 8
9. 7
10. (Pro)Sieben

---

Manchmal kann es sein, dass du recht schnell auf die Top-Antwort kommst, weil kleine Hinweise versteckt sind. Manchmal aber können die Fragen so komplex sein, dass sie dich aufhalten wollen, oder die ersten Antworten führen dich auf eine falsche Fährte - es ist also Cleverness gefragt! Um auf die Top-Antwort zu kommen, musst du also wirklich genau hinsehen und denken. Du musst nicht jede Frage wirklich beantworten können - manchmal reicht auch deine Intuition.

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) mit Typescript
- [Drizzle ORM](https://orm.drizzle.team/)
- PostgreSQL
- [Clerk](https://clerk.com/)
- tRPC
- React 19

Die Basis dafür bildet der [T3-Stack](https://create.t3.gg/).

### Backend (Multiplayer-Feature)

_Das Repository zum Backend ist [hier](https://github.com/benjamin-kraatz/pickthetop_backend) zu finden_

- [Phoenix Framework](https://www.phoenixframework.org/)

## Development

### Voraussetzungen

Du benötigst mindestens [Node.js 20.14](https://nodejs.org/en/download/package-manager/current) und [pnpm 9.12.3](https://pnpm.io/installation#using-corepack).

### App starten

1. Klone das Repository

```bash
git clone git@github.com:benjamin-kraatz/pickthetop.git
cd pickthetop
```

2. Installiere die Abhängigkeiten und stelle sicher, dass alles vorhanden und funktionsfähig ist

```bash
pnpm prerun
```

3. Setze die Umgebungsvariablen

Kopiere die Datei `.env.example` in eine neue Datei `.env` und passe die Werte darin an.  
Folgende Umgebungsvariablen sind notwendig (du benötigst einen [Clerk](https://clerk.com/)-Account und eine [PostgreSQL-Datenbank]):

```bash
DATABASE_URL=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
```

4. Starte die App

```bash
pnpm dev
```

5. Spiel' drauf los!

Öffne `http://localhost:3000` in deinem Browser.

> Um die Multiplayer-Funktion zu verwenden, musst du das Backend starten. Das Repository zum Backend findest du [hier](https://github.com/benjamin-kraatz/pickthetop_backend).

### Datenbank

Wenn du Docker verwendest, kannst du die Datenbank mit [folgendem Befehl](./start-database.sh) starten:

```bash
sh ./start-database.sh
```
