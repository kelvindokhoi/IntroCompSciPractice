import { useState } from "react";
import "./Sidebar.css";

const TOPIC_META = {
  lists: { label: "Lists", icon: "[ ]", color: "#bc8cff" },
  functions: { label: "Functions", icon: "fn()", color: "#58a6ff" },
  while_loop: { label: "While Loop", icon: "⟳", color: "#d29922" },
  for_loop: { label: "For Loop", icon: "↺", color: "#3fb950" },
  list_comprehensions: { label: "List Comps", icon: "[x]", color: "#3572A5" },
  multidimensional_lists: { label: "Multi Lists", icon: "[][]", color: "#e34c26" },
  objects_and_classes: { label: "Objects & Classes", icon: "{}", color: "#f1e05a" },
  files_and_exceptions: { label: "Files & Excs", icon: "📄", color: "#89e051" },
  tuples_sets_dictionaries: { label: "Tuples/Sets/Dicts", icon: "()", color: "#e44b23" },
  recursion: { label: "Recursion", icon: "↻", color: "#b07219" },
};

export default function Sidebar({ problems, selectedProblem, onSelect, isOpen, onClose, solvedProblems = [], streak = 0 }) {
  const [expandedTopics, setExpandedTopics] = useState(
    Object.keys(problems).reduce((acc, k) => ({ ...acc, [k]: true }), {})
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [diffFilter, setDiffFilter] = useState("all"); // all | easy | medium | hard | unsolved

  const toggleTopic = (topic) =>
    setExpandedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));

  const totalProblems = Object.values(problems).reduce((acc, list) => acc + list.length, 0);
  const progressPercent = totalProblems > 0 ? Math.round((solvedProblems.length / totalProblems) * 100) : 0;

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-guide">
        <span className="dot dot-easy" /> Easy&nbsp;&nbsp;
        <span className="dot dot-medium" /> Medium&nbsp;&nbsp;
        <span className="dot dot-hard" /> Hard
      </div>
      
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-label">Course Progress</span>
          <span key={solvedProblems.length} className="progress-text score-roll">
            {solvedProblems.length} / {totalProblems}
            {streak >= 2 && <span className="streak-fire" title={`${streak} solved this session!`}> 🔥</span>}
          </span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} title={`${progressPercent}% Completed`} />
        </div>
      </div>

      <div className="sidebar-search">
        <input
          className="search-input"
          type="text"
          placeholder="Search problems…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="filter-chips">
          {["all","easy","medium","hard","unsolved"].map(f => (
            <button
              key={f}
              className={`filter-chip ${diffFilter === f ? "active" : ""} ${f !== "all" && f !== "unsolved" ? `chip-${f}` : ""}`}
              onClick={() => setDiffFilter(f)}
            >{f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
      </div>

      <div className="sidebar-label">Topics</div>
      {Object.entries(problems).map(([topic, problemList]) => {
        const meta = TOPIC_META[topic] || { label: topic, icon: "#", color: "#8b949e" };
             const expanded = expandedTopics[topic];
             const filteredList = problemList.filter(p => {
                const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesDiff = diffFilter === "all" ? true
                  : diffFilter === "unsolved" ? !solvedProblems.includes(p.id)
                  : p.difficulty === diffFilter;
                return matchesSearch && matchesDiff;
              });
              if (filteredList.length === 0) return null;
        return (
          <div key={topic} className="topic-group">
            <button
              className="topic-header"
              onClick={() => toggleTopic(topic)}
              style={{ "--topic-color": meta.color }}
            >
              <span className="topic-icon">{meta.icon}</span>
              <span className="topic-label">{meta.label}</span>
              <span className={`topic-chevron ${expanded ? "open" : ""}`}>›</span>
            </button>
            {(expanded || searchQuery || diffFilter !== "all") && (
              <div className="problem-list">
                {filteredList.map((problem) => {
                  const active = selectedProblem?.id === problem.id;
                  return (
                    <button
                      key={problem.id}
                      className={`problem-item ${active ? "active" : ""}`}
                      onClick={() => {
                        onSelect(topic, problem);
                        if (onClose) onClose();
                      }}
                      style={{ "--topic-color": meta.color }}
                    >
                      <span className="problem-number">
                        {String(problemList.indexOf(problem) + 1).padStart(2, "0")}
                      </span>
                      <span className="problem-title">{problem.title}</span>
                      {solvedProblems.includes(problem.id) ? (
                        <span className="difficulty-solved" title="Solved" style={{ fontSize: "10px" }}>✅</span>
                      ) : (
                        <span className={`difficulty-dot difficulty-${problem.difficulty}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
