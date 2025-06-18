import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return user
    ? children
    : <Navigate to="/auth/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;