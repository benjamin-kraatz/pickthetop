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
};
