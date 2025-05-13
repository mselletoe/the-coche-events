import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cocheLogo } from '../../assets/images.js';
import "./auth.scss";

function Register(){
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        console.log("Already logged in:", user);
        navigate("/setup", { replace: true });
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
        if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
        if (!form.last_name.trim()) newErrors.last_name = "Last name is required.";
        if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email.";
        if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a 10-digit phone number.";
        if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        return newErrors;
    };

    // Submit user info to database
    const handleSubmit = async (e) => {
        e.preventDefault();
        // navigate("/setup"); // bypass
        setErrors({});
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        try {
            const response = await axios.post("/the_coche-events/registered_users.php", form);
            const data = response.data;

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Save user session
                navigate("/setup", { replace: true });
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
            <img id='coche-logo' src={cocheLogo} alt="coche"/>
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
                    {errors.last_name && <p className="login-error">{errors.last_name}</p>}
                </div>
                
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
    
                <div id="regi-buttons">
                    <i class="fa-solid fa-arrow-left" onClick={handleBackToLogin}></i>
                    <button type="submit" id="register_button">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register