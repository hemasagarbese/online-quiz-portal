import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CPlusPlusQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which feature is exclusive to C++?", options: ["Pointers", "Classes", "Loops", "Switch"], answer: "Classes" },
  { question: "What does STL stand for?", options: ["Standard Template Library", "Simple Type Library", "Standard Type Library", "Simple Template List"], answer: "Standard Template Library" },
  { question: "Which operator is used for scope resolution?", options: ["::", ".", "->", ":"], answer: "::" },
  { question: "Which keyword is used for inheritance?", options: ["extends", "inherits", ":", "class"], answer: ":" },
  { question: "Which of the following supports polymorphism?", options: ["Virtual Functions", "Static Functions", "Inline Functions", "Friend Functions"], answer: "Virtual Functions" },
  { question: "Which function is used to deallocate memory?", options: ["delete", "free", "del", "remove"], answer: "delete" },
  { question: "Which keyword is used for operator overloading?", options: ["operator", "overload", "function", "void"], answer: "operator" },
  { question: "Which access specifier allows members to be accessible only within class?", options: ["private", "public", "protected", "global"], answer: "private" },
  { question: "Which type of constructor has no arguments?", options: ["Default Constructor", "Parameterized Constructor", "Copy Constructor", "Destructor"], answer: "Default Constructor" },
  { question: "Which container is used in STL for key-value pairs?", options: ["map", "vector", "list", "stack"], answer: "map" },
  { question: "Which operator is used for pointer dereferencing?", options: ["*", "&", "->", "."], answer: "*" },
  { question: "Which keyword is used to define constants?", options: ["const", "constant", "define", "static"], answer: "const" },
  { question: "Which function is automatically called when an object is destroyed?", options: ["Destructor", "Constructor", "Finalizer", "delete"], answer: "Destructor" },
  { question: "Which loop executes at least once?", options: ["do-while", "while", "for", "if"], answer: "do-while" },
  { question: "Which operator is used for pointer member access?", options: ["->", ".", "*", "&"], answer: "->" },
  { question: "Which keyword is used for inline functions?", options: ["inline", "internal", "static", "virtual"], answer: "inline" },
  { question: "Which container provides FIFO?", options: ["queue", "stack", "vector", "list"], answer: "queue" },
  { question: "Which function copies an object?", options: ["Copy Constructor", "Assignment Operator", "Destructor", "Constructor"], answer: "Copy Constructor" },
  { question: "Which keyword is used for virtual inheritance?", options: ["virtual", "override", "friend", "abstract"], answer: "virtual" },
  { question: "Which type of polymorphism is resolved at runtime?", options: ["Dynamic", "Static", "Compile-time", "None"], answer: "Dynamic" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const CPlusPlusQuiz = () => {
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
        <h2>C++ Quiz</h2>
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

export default CPlusPlusQuiz;
