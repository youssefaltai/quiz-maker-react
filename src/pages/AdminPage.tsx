import { Link } from "react-router-dom";
import QuizList from "../components/QuizList";
import QuizListItem from "../components/QuizListItem";
import useQuizzes from "../hooks/quizzesHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function AdminPage() {
  const { quizzes } = useQuizzes();

  return (
    <div className="page admin-page">
      <div className="header">
        <h1>Exams</h1>
        <Link to="/new" >
          <FontAwesomeIcon icon={faAdd} />
          <p>Create</p>
        </Link>
      </div>
      <QuizList>
        {
          quizzes.length === 0 && (
            <p>You have not created any quizzes yet</p>
          )
        }
        {quizzes.map((quiz) => (
          <QuizListItem key={quiz.id} quiz={quiz} admin={true} />
        ))}
      </QuizList>
    </div>
  );

}
