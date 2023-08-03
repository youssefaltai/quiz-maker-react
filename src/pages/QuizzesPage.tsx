import { Link } from "react-router-dom";

export default function QuizzesPage() {
  return (
    <div className="page quizzes-page">
      <h1>Exams</h1>
      <div className="categories-container">
        <Link to={'/quizzes/statics'} className="category">
          Statics
        </Link>
        <Link to={'/quizzes/dynamics'} className="category">
          Dynamics
        </Link>
      </div>
    </div>
  );

}
