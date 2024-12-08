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
