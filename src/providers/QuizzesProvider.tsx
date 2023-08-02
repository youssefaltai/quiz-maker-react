import { PropsWithChildren, useEffect, useState } from "react";
import QuizzesContext from "../contexts/quizzesContext";
import Quiz, { quizFromJson } from "../models/quiz";

export default function QuizzesProvider({ children }: PropsWithChildren) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async () => {
    const response = await fetch("http://localhost:3000/quiz");
    const json = await response.json();
    const quizzes = json.map((quiz: any) => quizFromJson(quiz));
    setQuizzes(quizzes);
  }

  const getQuiz = async (quizId: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`http://localhost:3000/quiz/${quizId}`);
      const json = await response.json();
      return quizFromJson(json);
    } catch (e: any) {
      onError(e.message);
      return null;
    }
  }

  const createQuiz = async (quiz: Quiz, onError: (message: string) => void) => {
    try {
      if (!quiz.name)
        throw new Error("Quiz name is required");
      if (!quiz.question)
        throw new Error("Quiz question is required");
      if (!quiz.timer)
        throw new Error("Quiz timer is required");
      if (quiz.answers.length === 0)
        throw new Error("Quiz answers are required");
      if (!quiz.correctAnswer)
        throw new Error("Quiz correct answer is required");

      const formData = new FormData();
      formData.append("name", quiz.name);
      formData.append("question", quiz.question);
      formData.append("timer", quiz.timer.toString());
      formData.append("answers", JSON.stringify(quiz.answers));
      formData.append("correctAnswer", quiz.correctAnswer.toString());

      const response = await fetch("http://localhost:3000/quiz", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      const newQuiz = quizFromJson(json);

      await fetchQuizzes();

      return newQuiz;
    } catch (e: any) {
      onError(e.message);
      return null;
    }
  }

  const updateQuiz = async (quiz: Quiz, onError: (message: string) => void) => {
    try {
      const formData = new FormData();

      if (!quiz.id) {
        throw new Error("Quiz id is required");
      }

      if (quiz.name)
        formData.append("name", quiz.name);
      if (quiz.question)
        formData.append("question", quiz.question);
      if (quiz.timer)
        formData.append("timer", quiz.timer.toString());
      if (quiz.answers)
        formData.append("answers", JSON.stringify(quiz.answers));
      if (quiz.correctAnswer)
        formData.append("correctAnswer", quiz.correctAnswer.toString());

      const response = await fetch(`http://localhost:3000/quiz/${quiz.id}`, {
        method: "PUT",
        body: formData,
      });
      const json = await response.json();
      const updatedQuiz = quizFromJson(json);

      await fetchQuizzes();

      return updatedQuiz;

    } catch (e: any) {
      onError(e.message);

      return null;
    }
  }

  const answerQuiz = async (quizId: string, answerOrder: number, image: string, onError: (message: string) => void) => {
    try {
      const formData = new FormData();

      formData.append("answerOrder", answerOrder.toString());
      formData.append("image", image);

      const response = await fetch(`http://localhost:3000/quiz/${quizId}/answer`, {
        method: "POST",
        body: formData,
      });
      await response.json();
    } catch (e: any) {
      onError(e.message);
    }
  }

  const startQuiz = async (quizId: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`http://localhost:3000/quiz/${quizId}/start`, {
        method: "POST",
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }
    } catch (e: any) {
      onError(e.message);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <QuizzesContext.Provider value={{ quizzes, createQuiz, updateQuiz, answerQuiz, getQuiz, startQuiz }}>
      {children}
    </QuizzesContext.Provider>
  );
}
