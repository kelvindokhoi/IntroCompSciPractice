import { useState } from "react";
import "./Sidebar.css";

const TOPIC_META = {
  lists: { label: "Lists", icon: "[ ]", color: "#bc8cff" },
  functions: { label: "Functions", icon: "fn()", color: "#58a6ff" },
  while_loop: { label: "While Loop", icon: "⟳", color: "#d29922" },
  for_loop: { label: "For Loop", icon: "↺", color: "#3fb950" },
};

export default function Sidebar({ problems, selectedProblem, onSelect, isOpen, onClose }) {
  const [expandedTopics, setExpandedTopics] = useState(
    Object.keys(problems).reduce((acc, k) => ({ ...acc, [k]: true }), {})
  );

  const toggleTopic = (topic) =>
    setExpandedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-guide">
        <span className="dot dot-easy" /> Easy&nbsp;&nbsp;
        <span className="dot dot-medium" /> Medium&nbsp;&nbsp;
        <span className="dot dot-hard" /> Hard
      </div>
      <div className="sidebar-label">Topics</div>
      {Object.entries(problems).map(([topic, problemList]) => {
        const meta = TOPIC_META[topic] || { label: topic, icon: "#", color: "#8b949e" };
        const expanded = expandedTopics[topic];
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
            {expanded && (
              <div className="problem-list">
                {problemList.map((problem) => {
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
                      <span className={`difficulty-dot difficulty-${problem.difficulty}`} />
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
