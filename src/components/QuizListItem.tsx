import { Link } from "react-router-dom";
import Quiz from "../models/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEdit } from "@fortawesome/free-solid-svg-icons";

type QuizListItemProps = {
  quiz: Quiz;
  admin: boolean;
};

export default function QuizListItem({ quiz, admin }: QuizListItemProps) {
  return (
    <div className="quiz-list-item" >
      <h3 className="name">{quiz.name}</h3>
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
    </div>
  );
}
