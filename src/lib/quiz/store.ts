import { create } from "zustand";

interface QuizStore {
  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;
}

export const useQuizStore = create<QuizStore>()((set) => ({
  timeLeft: 0,
  setTimeLeft: (timeLeft) => set({ timeLeft }),
}));
