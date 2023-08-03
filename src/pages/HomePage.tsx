import { faGear, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page home-page">
      <h1>Home</h1>
      <Link to="/admin">
        <FontAwesomeIcon icon={faGear} />
        <p>Manage exams</p>
      </Link>
      <Link to="/quizzes">
        <FontAwesomeIcon icon={faPencil} />
        <p>Take an exam</p>
      </Link>
    </div>
  );
}
