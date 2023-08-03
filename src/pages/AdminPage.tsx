import { Link } from "react-router-dom";


export default function AdminPage() {
  return (
    <div className="page admin-page">
      <h1>
        Manage Exams
      </h1>
      <div className="categories-container">
        <Link to={'/admin/statics'} className="category">
          Statics
        </Link>
        <Link to={'/admin/dynamics'} className="category">
          Dynamics
        </Link>
      </div>
    </div >
  );
}
