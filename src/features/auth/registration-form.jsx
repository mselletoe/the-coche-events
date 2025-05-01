import { useState } from "react";
import "./auth.scss";

function Register({ onToggle, onRegistrationSuccess }){
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

    const handleBackToLogin = (e) => {
        e.preventDefault();
        const hasInput = Object.values(form).some((value) => value.trim() !== "");
        
        if (!hasInput || window.confirm("You have unsaved information. Do you really want to cancel registration?")) {
            onToggle();
        }
    };
      
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegistrationSuccess();
        // setErrors({});

        // const validationErrors = validate();
        // if (Object.keys(validationErrors).length > 0) {
        //   setErrors(validationErrors);
        //   return;
        // }
    
        // fetch("/the_coche-events/registered_users.php", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(form),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.success) {
        //       onRegistrationSuccess();
        //       setForm({
        //         first_name: "",
        //         last_name: "",
        //         suffix: "",
        //         email: "",
        //         phone: "",
        //         password: "",
        //         confirmPassword: "",
        //       });
        //     } else {
        //       setErrors({ general: data.error });
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     setErrors({ general: "Server error. Please try again later." });
        //   });
      };
      
    return (
        <div className="regiform-container">
            <img id='coche-logo' src="src\assets\coche-logo.svg" alt="coche"/>
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
                    placeholder="Re-enter password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="login-error">{errors.confirmPassword}</p>}

                {errors.general && <p className="login-error">{errors.general}</p>}
    
                <div id="regi-buttons">
                    <button id="back-to-login" onClick={handleBackToLogin}>Login</button>
                    <button type="submit" id="register_button">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register