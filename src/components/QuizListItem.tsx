import { Link } from "react-router-dom";
import Quiz from "../models/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import useQuizzes from "../hooks/quizzesHook";

type QuizListItemProps = {
  quiz: Quiz;
  admin: boolean;
};

export default function QuizListItem({ quiz, admin }: QuizListItemProps) {
  const { deleteQuiz } = useQuizzes();

  return (
    <div className="quiz-list-item" >
      <h3 className="name">{quiz.name}</h3>
      <div
        style={{
          flexGrow: 1,
        }}
      />
      <Link to={`/${admin ? "edit" : "quiz"}/${quiz.id}`} className="quiz-list-item__edit">
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
