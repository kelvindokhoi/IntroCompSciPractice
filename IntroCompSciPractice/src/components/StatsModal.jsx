import "./StatsModal.css";

export default function StatsModal({ problems, solvedProblems, onClose }) {
  // Calculate stats
  const allProblems = Object.values(problems).flat();
  const totalProblems = allProblems.length;
  const solvedCount = solvedProblems.length;
  const solvedPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  // Count by difficulty
  const byDifficulty = { easy: 0, medium: 0, hard: 0 };
  allProblems.forEach(p => {
    if (solvedProblems.includes(p.id)) {
      byDifficulty[p.difficulty]++;
    }
  });

  // Count total by difficulty
  const totalByDifficulty = { easy: 0, medium: 0, hard: 0 };
  allProblems.forEach(p => {
    totalByDifficulty[p.difficulty]++;
  });

  // Stats by topic
  const topicStats = Object.entries(problems).map(([topic, list]) => {
    const solvedInTopic = list.filter(p => solvedProblems.includes(p.id)).length;
    const percentage = list.length > 0 ? Math.round((solvedInTopic / list.length) * 100) : 0;
    return { topic, total: list.length, solved: solvedInTopic, percentage };
  }).sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="stats-modal-overlay" onClick={onClose}>
      <div className="stats-modal" onClick={e => e.stopPropagation()}>
        <div className="stats-header">
          <h2>🏆 Your Progress</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stats-content">
          {/* Overall Progress */}
          <div className="stats-section overall">
            <div className="big-stat">
              <span className="big-number">{solvedCount}</span>
              <span className="big-label">/ {totalProblems} solved</span>
            </div>
            <div className="percentage-ring">
              <svg viewBox="0 0 36 36">
                <path className="ring-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path className="ring-fill"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${solvedPercentage}, 100`}
                />
              </svg>
              <span className="percentage-text">{solvedPercentage}%</span>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="stats-section">
            <h3>Solved by Difficulty</h3>
            <div className="difficulty-breakdown">
              <div className="diff-stat easy">
                <span className="diff-count">{byDifficulty.easy}</span>
                <span className="diff-total">/ {totalByDifficulty.easy}</span>
                <span className="diff-label">Easy</span>
              </div>
              <div className="diff-stat medium">
                <span className="diff-count">{byDifficulty.medium}</span>
                <span className="diff-total">/ {totalByDifficulty.medium}</span>
                <span className="diff-label">Medium</span>
              </div>
              <div className="diff-stat hard">
                <span className="diff-count">{byDifficulty.hard}</span>
                <span className="diff-total">/ {totalByDifficulty.hard}</span>
                <span className="diff-label">Hard</span>
              </div>
            </div>
          </div>

          {/* Topic Progress */}
          <div className="stats-section">
            <h3>Progress by Topic</h3>
            <div className="topic-bars">
              {topicStats.map(({ topic, total, solved, percentage }) => (
                <div key={topic} className="topic-bar-row">
                  <span className="topic-name">{topic.replace(/_/g, ' ')}</span>
                  <div className="topic-bar-container">
                    <div className="topic-bar-bg">
                      <div
                        className="topic-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="topic-fraction">{solved}/{total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
