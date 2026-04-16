import { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import ProblemView from "./components/ProblemView";
import StatsModal from "./components/StatsModal";
import { problems } from "./data/problems";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "dark";
  });
  
  const [animating, setAnimating] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);
  
  const handleThemeChange = (newTheme) => {
    if (newTheme === theme) return;
    
    const newBubbles = Array.from({length: 45}).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: 20 + Math.random() * 100,
      duration: 0.6 + Math.random() * 0.4,
      delay: Math.random() * 0.2
    }));
    setBubbles(newBubbles);
    setAnimating(true);
    
    setTimeout(() => setTheme(newTheme), 350);
    setTimeout(() => {
       setAnimating(false);
       setBubbles([]);
    }, 1200);
  };
  
  const [selectedTopic, setSelectedTopic] = useState("lists");
  const [selectedProblem, setSelectedProblem] = useState(problems["lists"][0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState(() => {
    return JSON.parse(localStorage.getItem("pypractice-solved")) || [];
  });
  const [sessionStreak, setSessionStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const TOPIC_LABELS = {
    lists: "Lists", functions: "Functions", while_loop: "While Loop",
    for_loop: "For Loop", list_comprehensions: "List Comps",
    multidimensional_lists: "Multi Lists", objects_and_classes: "Objects & Classes",
    files_and_exceptions: "Files & Exceptions", tuples_sets_dictionaries: "Tuples/Sets/Dicts",
    recursion: "Recursion"
  };

  // Flat problem list for Prev/Next navigation
  const allProblems = useMemo(() =>
    Object.entries(problems).flatMap(([topic, list]) => list.map(p => ({ ...p, topic })))
  , []);
  const currentIndex = allProblems.findIndex(p => p.id === selectedProblem?.id);

  const handleNext = () => {
    if (currentIndex < allProblems.length - 1) {
      const next = allProblems[currentIndex + 1];
      handleSelectProblem(next.topic, next);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prev = allProblems[currentIndex - 1];
      handleSelectProblem(prev.topic, prev);
    }
  };

  // Stats computation
  const stats = useMemo(() => {
    const byDiff = { easy: { solved: 0, total: 0 }, medium: { solved: 0, total: 0 }, hard: { solved: 0, total: 0 } };
    const byTopic = {};
    Object.entries(problems).forEach(([topic, list]) => {
      let s = 0;
      list.forEach(p => {
        byDiff[p.difficulty].total++;
        if (solvedProblems.includes(p.id)) { byDiff[p.difficulty].solved++; s++; }
      });
      byTopic[topic] = { solved: s, total: list.length };
    });
    return { byDiff, byTopic };
  }, [solvedProblems]);

  const handleSolveProblem = (id) => {
    if (!solvedProblems.includes(id)) {
      const nextIds = [...solvedProblems, id];
      setSolvedProblems(nextIds);
      localStorage.setItem("pypractice-solved", JSON.stringify(nextIds));
      setSessionStreak(s => s + 1);
    }
  };

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
        <div className="header-right">
          <div className="header-subtitle">Intro to CS · Exam Prep</div>
          <button className="theme-toggle" onClick={() => setShowStats(true)} title="View your stats">🏆</button>
          <a
            href="https://github.com/kelvindokhoi"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle"
            title="Creator's GitHub Profile"
            style={{ textDecoration: 'none', fontSize: '13px', fontWeight: '500', padding: '4px 8px' }}
          >
            Author
          </a>
          <select 
            className="theme-select" 
            value={theme} 
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
            <option value="dracula">Dracula</option>
            <option value="hacker">Hacker Mode</option>
            <option value="solarized">Solarized</option>
          </select>
        </div>
      </header>
      <div className="app-body">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <Sidebar
          problems={problems}
          selectedProblem={selectedProblem}
          onSelect={handleSelectProblem}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          solvedProblems={solvedProblems}
          streak={sessionStreak}
        />
        <ProblemView
          problem={selectedProblem}
          onSolve={handleSolveProblem}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < allProblems.length - 1}
        />
      </div>
    </div>
    
    {animating && (
      <div className="bubbles-overlay" inert="">
        {bubbles.map(b => (
          <div key={b.id} className="bubble" style={{
            left: `${b.left}vw`, width: `${b.size}px`, height: `${b.size}px`,
            animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s`
          }} />
        ))}
      </div>
    )}

    {showStats && (
      <StatsModal
        problems={problems}
        solvedProblems={solvedProblems}
        onClose={() => setShowStats(false)}
      />
    )}
    </>
  );
}
