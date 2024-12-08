import "@testing-library/jest-dom";
import { type GameRound } from "~/lib/game-types";
import { validateAnswer } from "~/lib/quiz/answers";

describe("Game Logic", () => {
  const mockRound: GameRound = {
    id: "1",
    topAnswers: ["Katze", "Hund"],
    timeLimit: 30,
    questions: [
      { id: 1, text: "Was ist ein beliebtes Haustier?", answer: "Katze" },
      { id: 2, text: "Welches Tier ist treu?", answer: "Hund" },
      { id: 3, text: "Was fängt Mäuse?", answer: "Katze" },
    ],
  };

  describe("Answer Validation", () => {
    test("should accept exact match answers", () => {
      expect(validateAnswer("Katze", mockRound)).toBe(true);
      expect(validateAnswer("Hund", mockRound)).toBe(true);
    });

    test("should accept case-insensitive answers", () => {
      expect(validateAnswer("katze", mockRound)).toBe(true);
      expect(validateAnswer("HUND", mockRound)).toBe(true);
      expect(validateAnswer("KaTzE", mockRound)).toBe(true);
    });

    test("should accept answers with extra whitespace", () => {
      expect(validateAnswer("  Katze  ", mockRound)).toBe(true);
      expect(validateAnswer("Hund ", mockRound)).toBe(true);
      expect(validateAnswer(" Katze", mockRound)).toBe(true);
    });

    test("should reject incorrect answers", () => {
      expect(validateAnswer("Maus", mockRound)).toBe(false);
      expect(validateAnswer("Vogel", mockRound)).toBe(false);
      expect(validateAnswer("", mockRound)).toBe(false);
    });

    test("should reject partial matches", () => {
      expect(validateAnswer("Katz", mockRound)).toBe(false);
      expect(validateAnswer("Hun", mockRound)).toBe(false);
    });
  });

  describe("Answer Frequency Analysis", () => {
    test("should identify most frequent answers", () => {
      const topAnswers = findTopAnswers(mockRound);
      expect(topAnswers).toContain("katze");
      expect(topAnswers).not.toContain("hund");
      expect(topAnswers.length).toBe(1);
    });

    test("should handle multiple top answers with equal frequency", () => {
      const equalFrequencyRound: GameRound = {
        id: "1",
        timeLimit: 30,
        topAnswers: ["Rot", "Blau"],
        questions: [
          { id: 1, text: "Farbe des Himmels?", answer: "Blau" },
          { id: 2, text: "Farbe einer Rose?", answer: "Rot" },
          { id: 3, text: "Farbe einer Tomate?", answer: "Rot" },
          { id: 4, text: "Farbe des Meeres?", answer: "Blau" },
        ],
      };

      const topAnswers = findTopAnswers(equalFrequencyRound);
      expect(topAnswers).toContain("rot");
      expect(topAnswers).toContain("blau");
      expect(topAnswers.length).toBe(2);
    });
  });

  describe("Additional Answer Validation Tests", () => {
    const additionalMockRound: GameRound = {
      id: "2",
      topAnswers: ["Katze", "Hund"],
      timeLimit: 30,
      questions: [
        { id: 1, text: "Was ist ein beliebtes Haustier?", answer: "Katze" },
        { id: 2, text: "Welches Tier ist treu?", answer: "Hund" },
        { id: 3, text: "Was fängt Mäuse?", answer: "Katze" },
      ],
    };

    test("should accept answers with mixed case and whitespace", () => {
      expect(validateAnswer("  Katze  ", additionalMockRound)).toBe(true);
      expect(validateAnswer("  HuNd  ", additionalMockRound)).toBe(true);
    });

    test("should reject answers not in the questions", () => {
      expect(validateAnswer("Fisch", additionalMockRound)).toBe(false);
      expect(validateAnswer("Katze und Hund", additionalMockRound)).toBe(false);
    });

    test("should reject empty answers", () => {
      expect(validateAnswer("", additionalMockRound)).toBe(false);
    });

    test("should reject answers with special characters", () => {
      expect(validateAnswer("Katze!", additionalMockRound)).toBe(false);
      expect(validateAnswer("Hund?", additionalMockRound)).toBe(false);
    });
  });
});

const findTopAnswers = (round: GameRound): string[] => {
  const answerCount = new Map<string, number>();

  // Count occurrences of each answer
  round.questions.forEach((question) => {
    const answer = question.answer.toLowerCase().trim();
    answerCount.set(answer, (answerCount.get(answer) ?? 0) + 1);
  });

  // Find the maximum frequency
  const maxCount = Math.max(...Array.from(answerCount.values()));

  // Return all answers that appear with maximum frequency
  return Array.from(answerCount.entries())
    .filter(([_, count]) => count === maxCount)
    .map(([answer]) => answer);
};
