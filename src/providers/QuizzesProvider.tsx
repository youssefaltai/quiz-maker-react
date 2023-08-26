import { PropsWithChildren, useState } from "react";
import QuizzesContext from "../contexts/quizzesContext";
import Quiz, { quizFromJson } from "../models/quiz";
import { API_URL } from "../env";

export default function QuizzesProvider({ children }: PropsWithChildren) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizzesCount, setQuizzesCount] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(0);
  const [dynamicsPage, setDynamicsPage] = useState<number>(1);
  const [staticsPage, setStaticsPage] = useState<number>(1);

  const fetchQuizzes = async (page: number = 1, category: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`${API_URL}/quiz?page=${page}&category=${category}`);
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      setQuizzes(json.quizzes.map((quiz: any) => quizFromJson(quiz)));
      setPageLimit(json.pageSize);
      setQuizzesCount(json.count);
    } catch (e: any) {
      onError(e.message);
    }
  }

  const deleteMultipleQuizzes = async (quizIds: string[], onError: (message: string) => void) => {
    try {
      const formData = new FormData();

      formData.append("quizzes", JSON.stringify(quizIds));

      const response = await fetch(`${API_URL}/quiz`, {
        method: "DELETE",
        body: formData,
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }
    } catch (e: any) {
      onError(e.message);
    }
  }


  const deleteQuiz = async (quizId: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`${API_URL}/quiz/${quizId}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }
    } catch (e: any) {
      onError(e.message);
    }
  }

  const getQuiz = async (quizId: string, onError: (message: string) => void) => {
    try {
      const response = await fetch(`${API_URL}/quiz/${quizId}`);
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
      if (quiz.answers.length === 0)
        throw new Error("Quiz answers are required");
      if (!quiz.correctAnswer)
        throw new Error("Quiz correct answer is required");
      if (!quiz.category)
        throw new Error("Quiz category is required");

      const formData = new FormData();
      formData.append("name", quiz.name);
      formData.append("question", quiz.question);
      formData.append("answers", JSON.stringify(quiz.answers));
      formData.append("correctAnswer", quiz.correctAnswer.toString());
      formData.append("category", quiz.category);

      const response = await fetch(`${API_URL}/quiz`, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      const newQuiz = quizFromJson(json);

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
      if (quiz.answers)
        formData.append("answers", JSON.stringify(quiz.answers));
      if (quiz.correctAnswer)
        formData.append("correctAnswer", quiz.correctAnswer.toString());
      if (quiz.category)
        formData.append("category", quiz.category.toString());

      const response = await fetch(`${API_URL}/quiz/${quiz.id}`, {
        method: "PUT",
        body: formData,
      });
      const json = await response.json();
      const updatedQuiz = quizFromJson(json);

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

      const response = await fetch(`${API_URL}/quiz/${quizId}/answer`, {
        method: "POST",
        body: formData,
      });
      await response.json();
    } catch (e: any) {
      onError(e.message);
    }
  }

  return (
    <QuizzesContext.Provider value={{
      quizzes,
      pageLimit,
      quizzesCount,
      fetchQuizzes,
      createQuiz,
      updateQuiz,
      answerQuiz,
      getQuiz,
      deleteQuiz,
      deleteMultipleQuizzes,
      dynamicsPage,
      setDynamicsPage,
      staticsPage,
      setStaticsPage,
    }}>
      {children}
    </QuizzesContext.Provider>
  );
}
