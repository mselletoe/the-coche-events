import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import "./auth.scss";

function Register(){
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        console.log("Already logged in:", user);
        navigate("/account", { replace: true });
      }
    }, [navigate]);

    // Manages form input values
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        suffix: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // If the form has content, it warns user before leaving
    const handleBackToLogin = (e) => {
        e.preventDefault();
        const hasInput = Object.values(form).some((value) => value.trim() !== "");
        
        if (!hasInput || window.confirm("You have unsaved information. Do you really want to cancel registration?")) {
            navigate("/auth/login");
        }
    };

    // Validates user info
    const validate = () => {
        const newErrors = {};
        const {
            first_name,
            last_name,
            email,
            phone,
            password,
            confirmPassword
        } = form;

        // Basic validations
        if (!first_name.trim()) newErrors.first_name = "First name is required.";
        if (!last_name.trim()) newErrors.last_name = "Last name is required.";
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
        if (!/^\d{10}$/.test(phone)) newErrors.phone = "Enter a 10-digit phone number.";

        // Password length
        if (password.length < 8 || password.length > 16) {
            newErrors.password = "Password must be 8–16 characters.";
        }

        // Password requirements
        const upper = /[A-Z]/.test(password);
        const lower = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|]/.test(password);

        if (!(upper && lower && number && special)) {
            newErrors.password = "Password must include uppercase, lowercase, number, and special character.";
        }

        // Common passwords
        const commonPasswords = ["password", "123456", "qwerty", "111111", "abc123"];
        if (commonPasswords.includes(password.toLowerCase())) {
            newErrors.password = "Password is too common. Choose a more secure one.";
        }

        // Avoid using personal info
        const lowerPassword = password.toLowerCase();
        if (
            lowerPassword.includes(first_name.toLowerCase()) ||
            lowerPassword.includes(last_name.toLowerCase()) ||
            lowerPassword.includes(email.toLowerCase()) ||
            lowerPassword.includes(phone)
        ) {
            newErrors.password = "Password should not include your name, email, or phone number.";
        }

        // Confirm password
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        return newErrors;
    };

    // Submit user info to database
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        try {
            const response = await api.post("/registered_users.php", form);
            const data = response.data;

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Save user session
                navigate("/account", { replace: true });
                setForm({
                    first_name: "",
                    last_name: "",
                    suffix: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setErrors({ general: data.error });
            }
        } catch (err) {
            console.error("Registration error:", err);
            setErrors({ general: "Server error. Please try again later." });
        }
    };

    return (
        <div className="regiform-container">
            <p className="regi-header">Create your account</p>
            <p className="signin_q">Already have an account? <span onClick={handleBackToLogin}>Sign In</span></p>

            <form className="regi-form" onSubmit={handleSubmit}>

                {/* First Name */}
                <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                />
                {errors.first_name && <p className="login-error">{errors.first_name}</p>}

                {/* Last Name and Suffix */}
                <div className="name-2">
                    <input
                        type="text" 
                        placeholder="Last Name"
                        className="last_name"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                    />
                    <input  
                        type="text" 
                        placeholder="Suffix"
                        className="suffix"
                        name="suffix"
                        value={form.suffix}
                        onChange={handleChange}
                    />
                </div>
                {errors.last_name && <p className="login-error">{errors.last_name}</p>}
                
                {/* Email Address */}
                <input
                    type="email" 
                    placeholder="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="login-error">{errors.email}</p>}

                {/* Phone Number */}
                <div className="phoneNum-container">
                    <div>
                        <p>+63</p>
                    </div>
                    <input
                        type="number" 
                        placeholder="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    
                </div>
                {errors.phone && <p className="login-error">{errors.phone}</p>}

                {/* Password */}
                <input
                    type="password" 
                    placeholder="Enter password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="login-error">{errors.password}</p>}
                <input
                    type="password" 
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="login-error">{errors.confirmPassword}</p>}

                {errors.general && <p className="login-error">{errors.general}</p>}
    
                <button type="submit" className="register_button">Register</button>
            </form>
        </div>
    )
}

export default Register