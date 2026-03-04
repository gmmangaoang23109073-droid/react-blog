import React, { useState } from "react";
import "../App.css";


function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    accountType: "",
    level: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, name, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (calculateAge(formData.dob) < 18) {
      newErrors.dob = "You must be at least 18 years old to register";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Please select an account type";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("🎉 Successfully registered!");
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
        accountType: "",
        level: "",
        terms: false,
      });
    }
  };

  return (
    <div>
      <section className="intro">
        <h2>Join My Blog</h2>
        <p>
          By registering, you will receive updates about my personal blog,
          including new posts and special content.
        </p>

      </section>
      <div className="join-wrapper">
        <div className="decor"><img src="/images/decor.jpg" alt="" /></div>
        <div className="form-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            <span className="error">{errors.fullname}</span>

            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error">{errors.email}</span>

            <label>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="error">{errors.password}</span>

            <label>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className="error">{errors.confirmPassword}</span>

            <label>Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <span className="error">{errors.dob}</span>

            <p>Gender:</p>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <span className="error">{errors.gender}</span>

            <label>Account Type</label>
            <select
              id="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Select Account Type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </select>
            <span className="error">{errors.accountType}</span>

            <label>
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
              />{" "}
              I agree to the terms and conditions
            </label>
            <span className="error">{errors.terms}</span>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;