import React from 'react';
import { Link } from 'react-router-dom';
import BrainAnimation from '../../components/BrainAnimation';
import './HomePage.css';

const quizzes = [
  { id: 'c', name: 'C Programming' },
  { id: 'cpp', name: 'C++ Programming' },
  { id: 'java', name: 'Java Programming' },
  { id: 'python', name: 'Python Programming' },
  { id: 'javascript', name: 'JavaScript Programming' },
  { id: 'algorithms', name: 'Algorithms' },
  { id: 'computer-networks', name: 'Computer Networks' },
  { id: 'compiler-design', name: 'Compiler Design' },
];

const HomePage = () => {
  return (
    <div className="main-container">
      <BrainAnimation />

      {/* Top Login/Register Buttons */}
      <div className="top-buttons">
        <Link to="/login">
          <button className="auth-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="auth-btn">Register</button>
        </Link>
      </div>

      <div className="main-content">
        <h1>Welcome to Online Quiz Portal</h1>
        <h3>"Learn, Practice, and Excel in Coding & Computer Subjects!"</h3>
        <p className="description">
          Our portal is designed exclusively for B.Tech students who want to improve their skills in programming and core computer subjects. 
          Take quick 15-minute quizzes to test your knowledge in coding and important subjects like Algorithms, Computer Networks, and Compiler Design. 
          Each quiz contains 15 carefully curated questions to challenge and enhance your knowledge.
        </p>

        <div className="quiz-cards">
          {quizzes.map((quiz) => (
            <div className="quiz-card" key={quiz.id}>
              <h2>{quiz.name}</h2>
              <p>Questions: 15</p>
              <p>Time: 15 Minutes</p>
              <Link to={`/quiz/${quiz.id}`}>
                <button className="start-btn">Start Quiz</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
