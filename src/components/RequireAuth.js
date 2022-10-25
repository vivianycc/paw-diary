import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
