import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlgorithmsQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "Which algorithm is used for finding the shortest path in a graph?", options: ["Dijkstra", "Prim", "Kruskal", "DFS"], answer: "Dijkstra" },
  { question: "Which sorting algorithm has the best average case performance?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Selection Sort"], answer: "Merge Sort" },
  { question: "Which algorithm is used for searching in a sorted array?", options: ["Binary Search", "Linear Search", "DFS", "BFS"], answer: "Binary Search" },
  { question: "Which is a divide and conquer algorithm?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Linear Search"], answer: "Merge Sort" },
  { question: "Which algorithm is used to detect cycles in a graph?", options: ["DFS", "BFS", "Dijkstra", "Prim"], answer: "DFS" },
  { question: "Which data structure is used in BFS?", options: ["Queue", "Stack", "Priority Queue", "Heap"], answer: "Queue" },
  { question: "Which algorithm finds the minimum spanning tree?", options: ["Kruskal", "Dijkstra", "Binary Search", "DFS"], answer: "Kruskal" },
  { question: "Which sorting algorithm is stable?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], answer: "Merge Sort" },
  { question: "Which algorithm is used for topological sorting?", options: ["DFS", "BFS", "Dijkstra", "Prim"], answer: "DFS" },
  { question: "Which of the following is O(n log n) time complexity?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"], answer: "Merge Sort" },
  { question: "Which algorithm is greedy?", options: ["Prim", "Dijkstra", "Kruskal", "All of the above"], answer: "All of the above" },
  { question: "Which algorithm uses dynamic programming?", options: ["Floyd-Warshall", "DFS", "BFS", "Prim"], answer: "Floyd-Warshall" },
  { question: "Which algorithm is used for string matching?", options: ["KMP", "DFS", "BFS", "Dijkstra"], answer: "KMP" },
  { question: "Which data structure is used in recursion?", options: ["Stack", "Queue", "Heap", "Array"], answer: "Stack" },
  { question: "Which algorithm is used for shortest path with negative weights?", options: ["Bellman-Ford", "Dijkstra", "Prim", "Kruskal"], answer: "Bellman-Ford" },
  { question: "Which is a backtracking algorithm?", options: ["N-Queens", "Merge Sort", "Binary Search", "Prim"], answer: "N-Queens" },
  { question: "Which algorithm finds all pairs shortest path?", options: ["Floyd-Warshall", "Dijkstra", "Bellman-Ford", "DFS"], answer: "Floyd-Warshall" },
  { question: "Which data structure is used in BFS and DFS?", options: ["Queue & Stack", "Heap & Stack", "Array & Queue", "Linked List & Heap"], answer: "Queue & Stack" },
  { question: "Which algorithm is used in Huffman coding?", options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"], answer: "Greedy" },
  { question: "Which algorithm finds strongly connected components?", options: ["Kosaraju", "Dijkstra", "Prim", "Kruskal"], answer: "Kosaraju" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const AlgorithmsQuiz = () => {
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
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
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
        <h2>Algorithms Quiz</h2>
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

export default AlgorithmsQuiz;
