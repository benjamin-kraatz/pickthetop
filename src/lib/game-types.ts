export interface Question {
  id: number;
  text: string;
  answer: string;
}

export interface GameRound {
  id: string;
  questions: Question[];

  // Contains different versions that are possible top answers.
  // The validation always tolowercases the input.
  topAnswers: string[];
  timeLimit: number;
}

export const exampleRounds: GameRound[] = [
  {
    id: "round1",
    questions: [
      {
        id: 1,
        text: "Was ist die nationale Blume Japans?",
        answer: "Kirschblüte",
      },
      {
        id: 2,
        text: "Wie viele rote Streifen sind auf der US-Flagge?",
        answer: "7",
      },
      {
        id: 3,
        text: "Der Baum welches Steinobsts wird etwa 30 - 90 Jahre alt?",
        answer: "Kirsche",
      },
      {
        id: 4,
        text: "Was ist das Nationaltier Australiens?",
        answer: "Känguru",
      },
      { id: 5, text: "Der wievielte Monat ist der Juli?", answer: "7" },
      {
        id: 6,
        text: "Welcher Gattung gehört die Schattenmorelle an?",
        answer: "Kirsche",
      },
      {
        id: 7,
        text: "Wie lautet das Ergebnis von 115514 / 16502?",
        answer: "7",
      },
      { id: 8, text: "Wie viele Ecken hat ein Oktaeder?", answer: "6" },
      {
        id: 9,
        text: '"Geltung für Auslandstaten in anderen Fällen" ist der wievielte Paragraph im StGB?',
        answer: "7",
      },
      {
        id: 10,
        text: "Wie heißt der Schwestersender von Sat.1?",
        answer: "ProSieben",
      },
    ],
    topAnswers: ["7", "sieben"],
    timeLimit: 30,
  },
  {
    id: "round2",
    questions: [
      {
        id: 1,
        text: "Welcher Planet ist der vierte von der Sonne aus?",
        answer: "Mars",
      },
      {
        id: 2,
        text: "In welchem Monat ist der Frühlingsanfang?",
        answer: "März",
      },
      { id: 3, text: "Wie heißt der römische Kriegsgott?", answer: "Mars" },
      { id: 4, text: "Welcher Monat hat 31 Tage?", answer: "März" },
      {
        id: 5,
        text: "Wie heißt der bekannteste Schokoriegel von Mars Inc.?",
        answer: "Mars",
      },
      { id: 6, text: "In welchem Monat ist der Josefstag?", answer: "März" },
      {
        id: 7,
        text: "Welcher Planet wird auch der 'Rote Planet' genannt?",
        answer: "Mars",
      },
      { id: 8, text: "Welcher Monat ist der dritte im Jahr?", answer: "März" },
      { id: 9, text: "Wie heißt Bruno Mars mit Vornamen?", answer: "Peter" },
      {
        id: 10,
        text: "Welcher Planet hat zwei Monde namens Phobos und Deimos?",
        answer: "Mars",
      },
    ],
    topAnswers: ["Mars", "mars"],
    timeLimit: 30,
  },
];
