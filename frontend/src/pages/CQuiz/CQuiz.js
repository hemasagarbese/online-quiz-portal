import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which operator is used for bitwise AND?", options: ["&", "|", "^", "~"], answer: "&" },
  { question: "What is the default value of int in C?", options: ["0", "1", "NULL", "Undefined"], answer: "Undefined" },
  { question: "Which function is used to allocate memory dynamically?", options: ["malloc", "scanf", "printf", "alloc"], answer: "malloc" },
  { question: "Which loop executes at least once?", options: ["for", "while", "do-while", "if"], answer: "do-while" },
  { question: "Which keyword is used to define a constant?", options: ["const", "define", "final", "constant"], answer: "const" },
  { question: "Which header file is required for printf?", options: ["stdio.h", "conio.h", "math.h", "stdlib.h"], answer: "stdio.h" },
  { question: "Which operator is used for structure member access?", options: [".", "->", "&", "*"], answer: "." },
  { question: "Which storage class persists value throughout program execution?", options: ["auto", "register", "static", "extern"], answer: "static" },
  { question: "Which function terminates the program immediately?", options: ["exit()", "break", "return", "stop()"], answer: "exit()" },
  { question: "Which symbol is used for single line comment?", options: ["//", "/*", "#", "--"], answer: "//" },
  { question: "Which of the following is a valid identifier?", options: ["2var", "_var", "var-1", "var 1"], answer: "_var" },
  { question: "Which keyword is used for unconditional branching?", options: ["goto", "break", "continue", "return"], answer: "goto" },
  { question: "Which operator is used for logical OR?", options: ["||", "&&", "|", "&"], answer: "||" },
  { question: "Which operator is used for bitwise XOR?", options: ["^", "|", "&", "~"], answer: "^" },
  { question: "Which function reads a single character?", options: ["getchar()", "scanf()", "gets()", "putchar()"], answer: "getchar()" },
  { question: "Which function is used to free allocated memory?", options: ["free()", "delete()", "malloc()", "calloc()"], answer: "free()" },
  { question: "Which operator has highest precedence?", options: ["*", "+", "=", "=="], answer: "*" },
  { question: "Which keyword is used to define a function prototype?", options: ["void", "extern", "int", "define"], answer: "extern" },
  { question: "Which operator is used for address-of?", options: ["&", "*", "->", "."], answer: "&" },
  { question: "Which keyword is used to declare a pointer?", options: ["*", "&", "ptr", "pointer"], answer: "*" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const CQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => setQuestions(getRandomQuestions(allQuestions)), []);
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
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
        <h2>C Programming Quiz</h2>
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

export default CQuiz;
