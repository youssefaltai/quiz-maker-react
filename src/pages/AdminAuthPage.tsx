import { useRef } from "react";
import useAuth from "../hooks/authHook";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function AdminAuthPage() {
  const { login } = useAuth();
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page admin-auth-page">
      <h1>Admin Login</h1>
      <label
        htmlFor="password"
      >
        Enter your password
      </label>
      <input
        id="password"
        type="password" ref={passwordRef} />
      <button className="big-button"
        onClick={() => {
          login(passwordRef.current?.value || "").then((success) => {
            if (success)
              navigate((location.state as any)?.from || "/admin");
            else
              alert("Incorrect password");
          });
        }}
      >
      <p>Login</p>
      <FontAwesomeIcon icon={faSignInAlt} />
      </button>
    </div>
  );
}
