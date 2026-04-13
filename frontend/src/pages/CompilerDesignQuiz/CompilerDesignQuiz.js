import React, { useState, useEffect } from 'react';
import './CompilerDesignQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "What is lexical analysis?", options: ["Tokenizing source code", "Parsing code", "Generating machine code", "Optimizing code"], answer: "Tokenizing source code" },
  { question: "Which component generates intermediate code?", options: ["Syntax Analyzer", "Code Generator", "Lexical Analyzer", "Semantic Analyzer"], answer: "Code Generator" },
  { question: "Which phase detects syntax errors?", options: ["Syntax Analysis", "Lexical Analysis", "Code Generation", "Optimization"], answer: "Syntax Analysis" },
  { question: "Which data structure is used for parsing?", options: ["Stack", "Queue", "Heap", "Graph"], answer: "Stack" },
  { question: "Which parser is top-down?", options: ["LL Parser", "LR Parser", "SLR Parser", "LALR Parser"], answer: "LL Parser" },
  { question: "Which parser is bottom-up?", options: ["LR Parser", "LL Parser", "Recursive Descent", "Predictive Parser"], answer: "LR Parser" },
  { question: "Which phase performs syntax-directed translation?", options: ["Semantic Analysis", "Lexical Analysis", "Code Optimization", "Code Generation"], answer: "Semantic Analysis" },
  { question: "Which automaton is used in lexical analysis?", options: ["Finite Automata", "Pushdown Automata", "Turing Machine", "Stack Automata"], answer: "Finite Automata" },
  { question: "Which grammar type is context-free?", options: ["CFG", "Regular", "Unrestricted", "Context-sensitive"], answer: "CFG" },
  { question: "Which phase detects semantic errors?", options: ["Semantic Analysis", "Syntax Analysis", "Lexical Analysis", "Code Generation"], answer: "Semantic Analysis" },
  { question: "Which technique is used in code optimization?", options: ["Peephole Optimization", "Backtracking", "Topological Sorting", "Dynamic Programming"], answer: "Peephole Optimization" },
  { question: "Which table stores parsing info?", options: ["Parsing Table", "Symbol Table", "Token Table", "Lexeme Table"], answer: "Parsing Table" },
  { question: "Which parser uses shift-reduce?", options: ["LR Parser", "LL Parser", "Recursive Descent", "Predictive Parser"], answer: "LR Parser" },
  { question: "What is a symbol table used for?", options: ["Storing identifiers", "Generating code", "Parsing", "Optimizing code"], answer: "Storing identifiers" },
  { question: "Which phase produces target code?", options: ["Code Generation", "Lexical Analysis", "Syntax Analysis", "Semantic Analysis"], answer: "Code Generation" },
  { question: "Which automaton accepts regular expressions?", options: ["Finite Automata", "Pushdown Automata", "Turing Machine", "Stack Automata"], answer: "Finite Automata" },
  { question: "Which grammar is used for LL parsing?", options: ["LL Grammar", "LR Grammar", "CFG", "Regular Grammar"], answer: "LL Grammar" },
  { question: "Which optimization reduces instruction count?", options: ["Peephole Optimization", "Loop Unrolling", "Inlining", "All of the above"], answer: "All of the above" },
  { question: "Which phase checks type compatibility?", options: ["Semantic Analysis", "Lexical Analysis", "Syntax Analysis", "Code Generation"], answer: "Semantic Analysis" },
  { question: "Which parser uses predictive parsing?", options: ["LL Parser", "LR Parser", "SLR Parser", "LALR Parser"], answer: "LL Parser" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const CompilerDesignQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => setQuestions(getRandomQuestions(allQuestions)), []);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].answer) setScore(score + 1);
    setSelectedOption('');
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else window.location.href = `/result/${score + (selectedOption === questions[currentIndex].answer ? 1 : 0)}`;
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
        <h2>Compiler Design Quiz</h2>
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

export default CompilerDesignQuiz;
