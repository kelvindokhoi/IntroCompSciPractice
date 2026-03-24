import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProblemView from "./components/ProblemView";
import { problems } from "./data/problems";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState("lists");
  const [selectedProblem, setSelectedProblem] = useState(problems["lists"][0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectProblem = (topic, problem) => {
    setSelectedTopic(topic);
    setSelectedProblem(problem);
  };

  return (
    <>
    <Analytics />
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="header-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">PyPractice</span>
            <span className="logo-bracket">/&gt;</span>
          </div>
        </div>
        <div className="header-subtitle">Intro to CS · Exam Prep</div>
      </header>
      <div className="app-body">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <Sidebar
          problems={problems}
          selectedProblem={selectedProblem}
          onSelect={handleSelectProblem}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <ProblemView problem={selectedProblem} />
      </div>
    </div>
    </>
  );
}
