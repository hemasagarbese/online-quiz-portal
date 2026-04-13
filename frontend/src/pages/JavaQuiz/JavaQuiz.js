import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JavaQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which method is entry point of a Java program?", options: ["main()", "start()", "run()", "init()"], answer: "main()" },
  { question: "Which is the superclass of all classes in Java?", options: ["Object", "Class", "Parent", "Base"], answer: "Object" },
  { question: "Which keyword is used for inheritance?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
  { question: "Which package contains Scanner class?", options: ["java.util", "java.lang", "java.io", "javax.swing"], answer: "java.util" },
  { question: "Which operator is used for object reference?", options: [".", "->", "::", "*"], answer: "." },
  { question: "Which type of memory is shared among all objects?", options: ["static", "heap", "stack", "instance"], answer: "static" },
  { question: "Which exception is checked at compile-time?", options: ["IOException", "NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException"], answer: "IOException" },
  { question: "Which keyword is used to prevent inheritance?", options: ["final", "static", "abstract", "const"], answer: "final" },
  { question: "Which interface supports multiple inheritance?", options: ["Interface", "Class", "Abstract Class", "Enum"], answer: "Interface" },
  { question: "Which collection stores unique elements?", options: ["Set", "List", "Map", "Queue"], answer: "Set" },
  { question: "Which method is used to start a thread?", options: ["start()", "run()", "init()", "execute()"], answer: "start()" },
  { question: "Which keyword is used for constants?", options: ["final", "const", "static", "constant"], answer: "final" },
  { question: "Which method is used to compare strings?", options: ["equals()", "==", "compare()", "compareToString()"], answer: "equals()" },
  { question: "Which operator is used for conditional expressions?", options: ["?", ":", "&&", "||"], answer: "?" },
  { question: "Which keyword is used to create objects?", options: ["new", "create", "init", "malloc"], answer: "new" },
  { question: "Which exception is thrown for invalid casts?", options: ["ClassCastException", "IOException", "ArithmeticException", "NullPointerException"], answer: "ClassCastException" },
  { question: "Which keyword is used for abstract classes?", options: ["abstract", "interface", "virtual", "final"], answer: "abstract" },
  { question: "Which keyword is used to implement interface?", options: ["implements", "extends", "inherits", "override"], answer: "implements" },
  { question: "Which method is used to finalize objects?", options: ["finalize()", "destroy()", "delete()", "free()"], answer: "finalize()" },
  { question: "Which keyword is used for synchronized methods?", options: ["synchronized", "static", "final", "lock"], answer: "synchronized" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const JavaQuiz = () => {
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
        <h2>Java Quiz</h2>
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

export default JavaQuiz;
