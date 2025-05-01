import { useState } from "react";
import "./auth.scss";

function Login({ onToggle }){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateIdentifier = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
    
        // Validate email or phone format
        if (!validateIdentifier(identifier)) {
          setEmailError("Enter a valid email address/phone number.");
          return;
        }
    
        // Send to server
        fetch("/the_coche-events/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Welcome, " + data.user);
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
          })
          .catch((err) => {
            console.error("Error:", err);
            setPasswordError("Server error. Try again later.");
          });
    };

    return (
        <div className="loginform-container">
          <img id='coche-logo' src="src\assets\coche-logo.svg" alt="coche"/>
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
              
            <button className="login_button" type="submit">Login</button>
          </form>
            <button className="google_signin">Sign in with google</button>
            <p className="register_q">Don’t have an account? <span onClick={onToggle}>Register for free</span></p>
        </div>   
    )       
}

export default Login