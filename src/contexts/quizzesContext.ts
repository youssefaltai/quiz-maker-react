import { createContext } from "react";
import Quiz from "../models/quiz";

type QuizzesContextType = {
  quizzes: Quiz[];
  getQuiz: (quizId: string, onError: (message: string) => void) => Promise<Quiz | null>;
  createQuiz: (quiz: Quiz, onError: (message: string) => void) => Promise<Quiz | null>;
  updateQuiz: (quiz: Quiz, onError: (message: string) => void) => Promise<Quiz | null>;
  answerQuiz: (quizId: string, answerOrder: number, image: string, onError: (message: string) => void) => Promise<void>;
  startQuiz: (quizId: string, onError: (message: string) => void) => Promise<void>;
};

const QuizzesContext = createContext<QuizzesContextType>({
  quizzes: [],
  getQuiz: async (_: string, __: (message: string) => void) => null,
  createQuiz: async (_: Quiz, __: (message: string) => void) => null,
  updateQuiz: async (_: Quiz, __: (message: string) => void) => null,
  answerQuiz: async (_: string, __: number, ___: string, ____: (message: string) => void) => { },
  startQuiz: async (_: string, __: (message: string) => void) => { },
});

export default QuizzesContext;
