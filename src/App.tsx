import { Link, Outlet } from "react-router-dom";
import useAuth from "./hooks/authHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHome, faPencil, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const { logout, admin } = useAuth();

  return (
    <div className="nav-bar">
      {
        admin && (<h2>Admin</h2>)
      }
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </Link>

      {
        admin &&
        <Link to="/admin">
          <FontAwesomeIcon icon={faGear} />
          <p>Manage exams</p>
        </Link>
      }
      <Link to="/quizzes">
        <FontAwesomeIcon icon={faPencil} />
        <p>Take an exam</p>
      </Link>
      <div
        style={{
          flexGrow: 1,
        }}
      />
      {
        admin ?
          <button
            className="big-button"
            onClick={logout}
          >
            Logout
            <FontAwesomeIcon icon={faSignOut} />
          </button>
          :
          <Link to="/auth">
            <p>Login</p>
            <FontAwesomeIcon icon={faSignIn} />
          </Link>
      }
    </div>
  );
}

export default function App() {
  // return <Outlet />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
