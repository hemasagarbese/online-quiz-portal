// src/pages/RegisterPage/RegisterPage.js
import React, { useState } from 'react';
import './RegisterPage.css';
import BrainAnimation from '../../components/BrainAnimation';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    year: '',
    rollNumber: '',
    contact: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! You can now login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error! Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <BrainAnimation />
      <div className="register-box">
        <h2>B.Tech Student Registration</h2>
        <form onSubmit={handleRegister}>
          {Object.keys(formData).map((field) => (
            <div className="input-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/">
          <button className="back-home-btn">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
