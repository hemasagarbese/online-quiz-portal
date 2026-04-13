import React from "react";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const quizzes = [
    { title: "C Programming", path: "/quiz/c" },
    { title: "C++ Programming", path: "/quiz/cplusplus" },
    { title: "Java", path: "/quiz/java" },
    { title: "Python", path: "/quiz/python" },
    { title: "JavaScript", path: "/quiz/javascript" },
    { title: "Algorithms", path: "/quiz/algorithms" },
    { title: "Computer Networks", path: "/quiz/networks" },
    { title: "Compiler Design", path: "/quiz/compiler" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎓 Welcome to Your Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="quiz-section">
        <h2>Available Quizzes</h2>
        <div className="quiz-grid">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="quiz-card"
              onClick={() => navigate(quiz.path)}
            >
              {quiz.title}
            </div>
          ))}
        </div>
      </section>

      <footer className="dashboard-footer">
        © 2025 Online Quiz Portal | All Rights Reserved
      </footer>
    </div>
  );
};

export default DashboardPage;
