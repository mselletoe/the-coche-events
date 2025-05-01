import { useState } from "react";
import LoginForm from "./login-form.jsx";
import RegisterForm from "./registration-form";
import AccountSetup from "../account_setup/account-setup";
import "./auth.scss";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleRegistrationStatus = () => {
    setIsRegistered(true);  // Set isRegistered to true after registration
  };

  return (
    <div className="auth-page-wrapper">
      <div className={`auth-container ${isLogin ? "login" : "register"}`}>
      {isRegistered ? (
          <AccountSetup />
        ) : isLogin ? (
          <LoginForm onToggle={toggleAuthMode} />
        ) : (
          <RegisterForm onToggle={toggleAuthMode} onRegistrationSuccess={handleRegistrationStatus} />
        )}
      </div>

      <div id="side-image-container">
        <img src="src/assets/image 3.png" alt="coche" />
      </div>
    </div>
  );
}

export default Auth;