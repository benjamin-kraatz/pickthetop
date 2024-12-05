# Pick The Top - Das Mindgame

> Pick The Top - Das Mindgame ist im Rahmen des Mini-Hackathon 2.0 von [Kevin Chromik](https://www.youtube.com/@KevinChromik) entstanden. Vielen Dank auch an [Infomaniak](https://www.infomaniak.com/de), die den Mini-Hackathon sponsorn und damit die Infrastruktur für dieses Projekt bereitstellen.

In Pick The Top spielst du ein Quiz - mit Twist! Du erhälst eine Reihe von Fragen, und du musst herausfinden, was die **Top-Antwort** ist. Aber **vorsicht**: du hast nur eine begrenzte Zeit zur Verfügung!

Finde so viele Top-Antworten wie möglich und messe dich mit anderen um den besten Platz im Ranking.  
Obendrein kannst du Trivia-Wissen zu den Top-Antworten **lernen**. Es ist also mehr als ein Quiz mit Twist: du lernst noch etwas dazu.

## Spielregeln

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) mit Typescript
- [Drizzle ORM](https://orm.drizzle.team/)
- PostgreSQL
- [Clerk](https://clerk.com/)
- tRPC
- React 19

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
Folgende Umgebungsvariablen sind notwendig (du benötigst einen [Clerk](https://clerk.com/)-Account und eine PostgreSQL-Datenbank):

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
