import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JavaScriptQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which type of language is JavaScript?", options: ["Interpreted", "Compiled", "Both", "None"], answer: "Interpreted" },
  { question: "Which symbol is used for comments?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//" },
  { question: "Which method is used to parse JSON?", options: ["JSON.parse()", "JSON.stringify()", "JSON.encode()", "JSON.decode()"], answer: "JSON.parse()" },
  { question: "Which keyword is used to declare a constant?", options: ["const", "let", "var", "final"], answer: "const" },
  { question: "Which function is used to call another function after delay?", options: ["setTimeout()", "setInterval()", "delay()", "callLater()"], answer: "setTimeout()" },
  { question: "Which method adds element at the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
  { question: "Which operator is used for strict equality?", options: ["===", "==", "!=", "!=="], answer: "===" },
  { question: "Which method removes last element of an array?", options: ["pop()", "push()", "shift()", "unshift()"], answer: "pop()" },
  { question: "Which function converts a number to string?", options: ["toString()", "String()", "parseInt()", "valueOf()"], answer: "toString()" },
  { question: "Which scope is block scoped?", options: ["let", "var", "function", "global"], answer: "let" },
  { question: "Which event triggers when page is fully loaded?", options: ["window.onload", "document.ready", "DOMContentLoaded", "window.ready"], answer: "window.onload" },
  { question: "Which object stores key-value pairs?", options: ["Map", "Set", "Array", "Object"], answer: "Map" },
  { question: "Which operator is used for optional chaining?", options: ["?.", "??", "?.:", "?=", "."], answer: "?." },
  { question: "Which function is used to execute repeatedly after interval?", options: ["setInterval()", "setTimeout()", "repeat()", "loop()"], answer: "setInterval()" },
  { question: "Which keyword declares variable with function scope?", options: ["var", "let", "const", "function"], answer: "var" },
  { question: "Which method removes first element of array?", options: ["shift()", "pop()", "unshift()", "slice()"], answer: "shift()" },
  { question: "Which keyword is used to define class?", options: ["class", "function", "object", "struct"], answer: "class" },
  { question: "Which operator is used to spread elements?", options: ["...", "++", "--", "**"], answer: "..." },
  { question: "Which object provides current date/time?", options: ["Date", "Time", "Calendar", "Clock"], answer: "Date" },
  { question: "Which method converts array to string?", options: ["join()", "toString()", "concat()", "slice()"], answer: "join()" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const JavaScriptQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => setQuestions(getRandomQuestions(allQuestions)), []);
  useEffect(() => {
    if (timeLeft <= 0) { handleFinish(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].answer) setScore(score + 1);
    setSelectedOption('');
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    navigate("/result", { state: { score: score + (selectedOption === questions[currentIndex]?.answer ? 1 : 0), total: questions.length } });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };

  if (questions.length === 0) return null;

  return (
    <div className="quiz-container">
      <BrainAnimation />
      <div className="quiz-box">
        <h2>JavaScript Quiz</h2>
        <p className="timer">Time Left: {formatTime(timeLeft)}</p>
        <div className="question-box">
          <p>{questions[currentIndex].question}</p>
          <div className="options">
            {questions[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${selectedOption===opt?'selected':''}`}
                onClick={() => setSelectedOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default JavaScriptQuiz;
