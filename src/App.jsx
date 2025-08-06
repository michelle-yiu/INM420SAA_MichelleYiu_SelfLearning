import { useState } from 'react';
import './index.css';

const QUIZ = [
  {
    question: "How do you order coffee at Tim Hortons?",
    options: [
      { text: "A Double-Double, obviously.", value: 1 },
      { text: "Just a regular coffee.", value: 0.5 },
      { text: "I’ve never been to Timmies.", value: 0 }
    ]
  },
  {
    question: "What do you do when someone bumps into you?",
    options: [
      { text: "Give a quick nod and move on.", value: 0.5 },
      { text: "Say 'Sorry!' even if it was their fault.", value: 1 },
      { text: "Say nothing and keep walking.", value: 0 }
    ]
  },
  {
    question: "How do you feel about poutine?",
    options: [      
      { text: "It’s fine once in a while.", value: 0.5 },
      { text: "Fries and gravy? I’ll pass.", value: 0 },
      { text: "It’s a national treasure.", value: 1 }
    ]
  },
  {
    question: "Winter arrives. What’s your reaction?",
    options: [
      { text: "Layer up, shovel, and get on with it.", value: 1 },
      { text: "I’m not leaving the house for months.", value: 0 },
      { text: "Complain a little, but go out anyway.", value: 0.5 }
    ]
  },
  {
    question: "Which Canadian slang do you use most?",
    options: [
      { text: "Sometimes I say 'toque' or 'loonie'.", value: 0.5 },
      { text: "None of the above.", value: 0 }, 
      { text: "'Eh' sneaks in all the time.", value: 1 }
    ]
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;
    setScore(score + selectedValue);
    setSelectedValue(null);
    if (currentQuestion + 1 < QUIZ.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedValue(null);
    setFinished(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="container">
        <h1>How Canadian Are You?</h1>
        <button className="btn" onClick={() => setStarted(true)}>Start Quiz</button>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / QUIZ.length) * 100);
    return (
      <div className="container">
        <h1 className="result-title">Your Result</h1>
        <div className="result-score">
          <span className="percentage">{percentage}%</span>
          <span className="label">Canadian</span>
        </div>
        <button className="btn" onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  const question = QUIZ[currentQuestion];

  return (
    <div className="container">
      <h1>How Canadian Are You?</h1>
      <p>Question {currentQuestion + 1} of {QUIZ.length}</p>
      <h2>{question.question}</h2>
      <form>
        {question.options.map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              name="option"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleOptionChange(option.value)}
            />
            {option.text}
          </label>
        ))}
      </form>
      <button className="btn" onClick={handleNext} disabled={selectedValue === null}>
        {currentQuestion === QUIZ.length - 1 ? "See Result" : "Next"}
      </button>
    </div>
  );
}
