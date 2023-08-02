import { PropsWithChildren } from "react";
import useAuth from "../hooks/authHook";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { admin } = useAuth();
  const location = useLocation();

  if (admin) {
    return <>{children}</>;
  }
  return <Navigate replace to="/auth" state={
    { from: location.pathname }
  } />;
}
