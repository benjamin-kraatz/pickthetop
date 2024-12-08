export type Question = {
  id: number;
  text: string;
  answer: string;
};

export type GameRound = {
  id: string;
  questions: Question[];

  // Contains different versions that are possible top answers.
  // The validation always tolowercases the input.
  topAnswers: string[];
  timeLimit: number;

  /**
   * Some trivia about the round,
   * regarding the top answer.
   *
   * For example:
   * When the top answer is "29", the trivia could be:
   * "29 is the only number between 1 and 100 that is divisible by 29 (because 29 is a prime number)."
   */
  trivia?: string;
};
