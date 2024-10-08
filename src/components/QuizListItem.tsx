import { Link, useLocation } from "react-router-dom";
import Quiz from "../models/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import useQuizzes from "../hooks/quizzesHook";

type QuizListItemProps = {
  quiz: Quiz;
  admin: boolean;
  onDelete: () => void;
};

export default function QuizListItem({ quiz, admin, onDelete }: QuizListItemProps) {
  const { deleteQuiz } = useQuizzes();
  const location = useLocation();

  return (
    <div className="quiz-list-item" >
      <h3 className="name">{quiz.name}</h3>
      <div
        style={{
          flexGrow: 1,
        }}
      />
      <Link to={`/${admin ? "edit" : "quiz"}/${quiz.id}`}
        state={{ from: location.pathname }}
        className="quiz-list-item__edit">
        {admin ?
          <FontAwesomeIcon icon={faEdit} />
          :
          (
            <>
              <p>Take exam</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </>
          )
        }
      </Link>
      {
        admin &&
        <button
          className="big-button red"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this exam?")) {
              deleteQuiz(quiz.id, (message) => {
                alert(message);
              }).then(() => {
                onDelete();
              });
            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      }
    </div>
  );
}
