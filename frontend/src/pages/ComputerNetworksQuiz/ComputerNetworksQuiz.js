import React, { useState, useEffect } from 'react';
import './ComputerNetworksQuiz.css';
import BrainAnimation from '../../components/BrainAnimation';

const allQuestions = [
  { question: "What is the main protocol of the Internet?", options: ["TCP/IP", "UDP", "FTP", "HTTP"], answer: "TCP/IP" },
  { question: "Which layer is responsible for routing?", options: ["Network Layer", "Data Link Layer", "Transport Layer", "Application Layer"], answer: "Network Layer" },
  { question: "Which protocol provides reliable communication?", options: ["TCP", "UDP", "IP", "ICMP"], answer: "TCP" },
  { question: "Which device connects different networks?", options: ["Router", "Switch", "Hub", "Repeater"], answer: "Router" },
  { question: "Which protocol is connectionless?", options: ["UDP", "TCP", "HTTP", "FTP"], answer: "UDP" },
  { question: "Which protocol is used for email?", options: ["SMTP", "FTP", "HTTP", "DNS"], answer: "SMTP" },
  { question: "IP stands for?", options: ["Internet Protocol", "Internal Process", "Internet Program", "Interconnected Packet"], answer: "Internet Protocol" },
  { question: "Which layer handles error detection?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"], answer: "Data Link Layer" },
  { question: "Which protocol resolves IP addresses to MAC addresses?", options: ["ARP", "RARP", "DNS", "ICMP"], answer: "ARP" },
  { question: "Which topology is used in Ethernet LAN?", options: ["Star", "Ring", "Bus", "Mesh"], answer: "Star" },
  { question: "Which protocol is used for file transfer?", options: ["FTP", "SMTP", "HTTP", "DNS"], answer: "FTP" },
  { question: "Which layer provides end-to-end delivery?", options: ["Transport Layer", "Network Layer", "Data Link Layer", "Physical Layer"], answer: "Transport Layer" },
  { question: "Ping command uses which protocol?", options: ["ICMP", "TCP", "UDP", "ARP"], answer: "ICMP" },
  { question: "Which is a wireless network standard?", options: ["IEEE 802.11", "IEEE 802.3", "IEEE 802.5", "IEEE 802.15"], answer: "IEEE 802.11" },
  { question: "DHCP is used for?", options: ["IP Address Assignment", "File Transfer", "Routing", "Email Delivery"], answer: "IP Address Assignment" },
  { question: "DNS translates?", options: ["Domain Names to IPs", "MAC to IP", "Packets to Frames", "URLs to Protocols"], answer: "Domain Names to IPs" },
  { question: "OSI has how many layers?", options: ["7", "5", "6", "4"], answer: "7" },
  { question: "TCP uses which mechanism?", options: ["Three-way handshake", "Sliding window", "Checksum", "All of the above"], answer: "All of the above" },
  { question: "Which device amplifies signals?", options: ["Repeater", "Router", "Switch", "Hub"], answer: "Repeater" },
  { question: "Which layer is closest to the user?", options: ["Application Layer", "Physical Layer", "Data Link Layer", "Network Layer"], answer: "Application Layer" },
];

function getRandomQuestions(pool, count = 15) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const ComputerNetworksQuiz = () => {
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
        <h2>Computer Networks Quiz</h2>
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

export default ComputerNetworksQuiz;
