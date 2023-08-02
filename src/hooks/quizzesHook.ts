import { useContext } from "react";
import QuizzesContext from "../contexts/quizzesContext";

export default function useQuizzes() {
  return useContext(QuizzesContext);
}
