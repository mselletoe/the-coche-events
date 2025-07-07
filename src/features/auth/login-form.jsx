import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../api';
import "./auth.scss";

function Login(){
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    // Stores user information (email/phone number & password)
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    // Display error messages when login fails.
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Check if the user is already logged in
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        console.log("Already logged in:", user);
        navigate("/account", { replace: true });
      }
    }, [navigate]);

    // Validates user input
    const validateIdentifier = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    // Submit login credentials to backend then check and verify
    const handleSubmit = async (e) => {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");

      if (!validateIdentifier(identifier)) {
        setEmailError("Enter a valid email address or phone number.");
        return;
      }

      try {
        const response = await api.post("/login.php", {
          identifier,
          password,
        });

        const data = response.data;

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Save user info
          console.log("User data:", data.user);
          navigate(from, { replace: true });
          // ####################################################################
          // ###                                                              ###
          // ###           Redirect or session logic can go here              ###
          // ###                                                              ###
          // ####################################################################
        } else if (data.field === "email") {
          setEmailError(data.error);
          setPasswordError("");
        } else if (data.field === "password") {
          setPasswordError(data.error);
          setEmailError("");
        } else {
          setEmailError("");
          setPasswordError("Login failed. Try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        setPasswordError("Server error. Try again later.");
      }
    };

    return (
      <div className="loginform-container">
        <p className="login-header">Sign in to The Coche Events</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
              required 
              type="text" 
              placeholder="Email Address or Phone Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
          />
          {emailError && <p className="login-error">{emailError}</p>}

          <input 
                required 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="login-error">{passwordError}</p>}
            
          <button className="login_button" type="submit">Sign In</button>
        </form>

        <p className="register_q">Don’t have an account? <span onClick={() => navigate("/auth/register")}>Register for free</span></p>
      </div>
    )       
}

export default Login