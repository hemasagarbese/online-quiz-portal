// src/pages/LoginPage/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import BrainAnimation from '../../components/BrainAnimation';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Mock users
  const mockUsers = [
    {
      email: 'sagar@gmail.com',
      password: 'password123',
      name: 'Sagar',
    },
    {
      email: 'renuka@gmail.com',
      password: 'password123',
      name: 'Renuka',
    },
  ];

  // Quiz options
  const quizzes = [
    { name: 'C', path: '/quiz/c' },
    { name: 'C++', path: '/quiz/cplusplus' },
    { name: 'Java', path: '/quiz/java' },
    { name: 'JavaScript', path: '/quiz/javascript' },
    { name: 'Python', path: '/quiz/python' },
    { name: 'Algorithms', path: '/quiz/algorithms' },
    { name: 'Computer Networks', path: '/quiz/networks' },
    { name: 'Compiler Design', path: '/quiz/compiler' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Login successful! Welcome ${user.name}`);
      if (onLogin) onLogin();
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      setLoggedIn(true); // Show quizzes
    } else {
      alert('Invalid email or password.');
    }
  };

  const handleQuizSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="login-container">
      <BrainAnimation />
      <div className="login-box">
        {!loggedIn ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>

            <p className="signup-text">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>

            <Link to="/">
              <button className="back-home-btn">Back to Home</button>
            </Link>
          </>
        ) : (
          <>
            <h2>Select a Quiz</h2>
            <div className="quiz-list">
              {quizzes.map((quiz) => (
                <button
                  key={quiz.path}
                  className="quiz-btn"
                  onClick={() => handleQuizSelect(quiz.path)}
                >
                  {quiz.name} Quiz
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
