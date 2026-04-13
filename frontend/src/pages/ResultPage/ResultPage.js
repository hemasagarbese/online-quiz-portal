import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ResultPage.css'; // Separate CSS for styling

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // Expecting score to be passed via state from quiz page
  const score = location.state?.score || 0;

  // Determine theme based on score
  let themeClass = "";
  let message = "";
  if (score >= 13) {
    themeClass = "gold";
    message = "Excellent! You earned Gold 🎖️";
  } else if (score >= 9) {
    themeClass = "silver";
    message = "Good Job! You earned Silver 🥈";
  } else if (score >= 4) {
    themeClass = "bronze";
    message = "You earned Bronze 🥉";
  } else {
    themeClass = "fail";
    message = "Oops! You Failed ❌";
  }

  return (
    <div className={`result-page ${themeClass}`}>
      <h2>Quiz Result</h2>
      <p>Your Score: {score} / 15</p>
      <p>{message}</p>
      <button onClick={() => navigate("/")} className="back-home-btn">
        Back to Home
      </button>
    </div>
  );
}

export default ResultPage;
