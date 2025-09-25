import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
