import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProblemView from "./components/ProblemView";
import { problems } from "./data/problems";
import "./App.css";
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState("lists");
  const [selectedProblem, setSelectedProblem] = useState(problems["lists"][0]);

  const handleSelectProblem = (topic, problem) => {
    setSelectedTopic(topic);
    setSelectedProblem(problem);
  };

  return (
    <>
    <Analytics />
    <div className="app">
      <header className="app-header">
        <div className="header-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">PyPractice</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <div className="header-subtitle">Intro to CS · Exam Prep</div>
      </header>
      <div className="app-body">
        <Sidebar
          problems={problems}
          selectedProblem={selectedProblem}
          onSelect={handleSelectProblem}
        />
        <ProblemView key={selectedProblem.id} problem={selectedProblem} />
      </div>
    </div>
    </>
  );
}
