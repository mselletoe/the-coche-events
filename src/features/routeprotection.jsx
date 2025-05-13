import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => { // childred -> components nested inside this route
  const user = JSON.parse(localStorage.getItem("user")); // checks localstorage is a user is logged in
  return user ? children : <Navigate to="/auth/login" replace />;
  // If a user is found in localStorage, it returns the children and rendered it with protection
  // If no user is found, it renders a <Navigate /> component, which redirects the user to the login page
};

export default ProtectedRoute;