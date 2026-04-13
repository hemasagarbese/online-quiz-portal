import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PythonQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which keyword defines a function?", options: ["def", "function", "fun", "lambda"], answer: "def" },
  { question: "Which is immutable data type?", options: ["tuple", "list", "dict", "set"], answer: "tuple" },
  { question: "Which operator is used for exponentiation?", options: ["**", "^", "pow", "%"], answer: "**" },
  { question: "Which keyword is used to create class?", options: ["class", "def", "object", "struct"], answer: "class" },
  { question: "Which function reads input from user?", options: ["input()", "read()", "scanf()", "gets()"], answer: "input()" },
  { question: "Which method adds an element at the end of a list?", options: ["append()", "insert()", "extend()", "add()"], answer: "append()" },
  { question: "Which method removes an element from list?", options: ["remove()", "pop()", "del", "All"], answer: "All" },
  { question: "Which keyword is used for exceptions?", options: ["try", "catch", "except", "handle"], answer: "except" },
  { question: "Which data type is used for key-value pairs?", options: ["dict", "list", "tuple", "set"], answer: "dict" },
  { question: "Which operator checks equality?", options: ["==", "=", "===", "!="], answer: "==" },
  { question: "Which keyword exits loop?", options: ["break", "exit", "stop", "return"], answer: "break" },
  { question: "Which function converts string to integer?", options: ["int()", "str()", "float()", "parseInt()"], answer: "int()" },
  { question: "Which module is used for random numbers?", options: ["random", "math", "sys", "os"], answer: "random" },
  { question: "Which method returns length of list?", options: ["len()", "size()", "length()", "count()"], answer: "len()" },
  { question: "Which keyword is used to inherit class?", options: ["class Subclass(Parent):", "inherits", "extends", "super"], answer: "class Subclass(Parent):" },
  { question: "Which function exits the program?", options: ["exit()", "quit()", "sys.exit()", "All"], answer: "All" },
  { question: "Which keyword defines anonymous function?", options: ["lambda", "def", "fun", "anon"], answer: "lambda" },
  { question: "Which collection stores unique elements?", options: ["set", "list", "tuple", "dict"], answer: "set" },
  { question: "Which method adds multiple elements to list?", options: ["extend()", "append()", "insert()", "add()"], answer: "extend()" },
  { question: "Which keyword declares global variable?", options: ["global", "static", "extern", "var"], answer: "global" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const PythonQuiz = () => {
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
        <h2>Python Quiz</h2>
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

export default PythonQuiz;
