import { createContext } from "react";
import Quiz from "../models/quiz";

type QuizzesContextType = {
  quizzes: Quiz[];
  pageLimit: number;
  quizzesCount: number;
  fetchQuizzes: (page: number, category: string, onError: (message: string) => void) => Promise<void>;
  getQuiz: (quizId: string, onError: (message: string) => void) => Promise<Quiz | null>;
  createQuiz: (quiz: Quiz, onError: (message: string) => void) => Promise<Quiz | null>;
  updateQuiz: (quiz: Quiz, onError: (message: string) => void) => Promise<Quiz | null>;
  answerQuiz: (quizId: string, answerOrder: number, image: string, onError: (message: string) => void) => Promise<void>;
  deleteQuiz: (quizId: string, onError: (message: string) => void) => Promise<void>;
  deleteMultipleQuizzes: (quizIds: string[], onError: (message: string) => void) => Promise<void>;
};

const QuizzesContext = createContext<QuizzesContextType>({
  quizzes: [],
  pageLimit: 0,
  quizzesCount: 0,
  fetchQuizzes: async (_: number, __: string, ___: (message: string) => void) => { },
  getQuiz: async (_: string, __: (message: string) => void) => null,
  createQuiz: async (_: Quiz, __: (message: string) => void) => null,
  updateQuiz: async (_: Quiz, __: (message: string) => void) => null,
  answerQuiz: async (_: string, __: number, ___: string, ____: (message: string) => void) => { },
  deleteQuiz: async (_: string, __: (message: string) => void) => { },
  deleteMultipleQuizzes: async (_: string[], __: (message: string) => void) => { },
});

export default QuizzesContext;
