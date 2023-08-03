import { Link } from "react-router-dom";
import QuizList from "../components/QuizList";
import QuizListItem from "../components/QuizListItem";
import useQuizzes from "../hooks/quizzesHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/authHook";
import { useState } from "react";

export default function AdminPage() {
  const { admin } = useAuth();
  const { quizzes, deleteMultipleQuizzes } = useQuizzes();
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);

  return (
    <div className="page admin-page">
      <div className="header">
        <h1>Exams</h1>
        <div
          style={{
            flexGrow: 1,
          }}
        />
        <Link to="/new" >
          <FontAwesomeIcon icon={faAdd} />
          <p>Create</p>
        </Link>
        <button
          className="big-button red"
          onClick={() => {
            if (selectedQuizzes.length > 0) {
              if (window.confirm("Are you sure you want to delete these exams?")) {
                deleteMultipleQuizzes(selectedQuizzes, (message) => {
                  alert(message);
                });
              }
            } else {
              alert("No exams selected");
            }
          }}
        >
          Delete selected
        </button>
      </div>
      <QuizList>
        {
          quizzes.length === 0 && (
            <p>You have no exams</p>
          )
        }
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-list-item-container">
            {
              admin &&
              <label className="container">
                <input type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedQuizzes([...selectedQuizzes, quiz.id]);
                    } else {
                      setSelectedQuizzes(selectedQuizzes.filter((id) => id !== quiz.id));
                    }
                  }}
                />
                <span className="checkmark"></span>
              </label>
            }
            <QuizListItem quiz={quiz} admin={true} />
          </div>
        ))}
      </QuizList>
    </div>
  );

}
