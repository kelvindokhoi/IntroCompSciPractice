import "./ResultsPanel.css";

export default function ResultsPanel({ results, isRunning, total, onClose }) {
  if (isRunning && !results) {
    return (
      <div className="results-panel">
        <div className="results-loading">
          <span className="spinner-lg" />
          <span>Running tests…</span>
        </div>
      </div>
    );
  }

  if (!results) return null;

  const { status, cases, failedAt, errorMessage } = results;

  return (
    <div className="results-panel" style={{ animation: "fadeSlideIn 0.25s ease" }}>
      <div className={`results-header status-${status}`}>
        {status === "passed" && (
          <>
            <span className="status-icon">✓</span>
            <span className="status-text">All {total} tests passed!</span>
          </>
        )}
        {status === "failed" && (
          <>
            <span className="status-icon">✗</span>
            <span className="status-text">
              Failed on Test {failedAt} · {cases.filter((c) => c.passed).length}/{total} passed
            </span>
          </>
        )}
        {status === "error" && (
          <>
            <span className="status-icon">⚠</span>
            <span className="status-text">
              Error on Test {failedAt || "?"}
            </span>
          </>
        )}
        {onClose && (
          <button className="close-btn" onClick={onClose} title="Close Panel">✕</button>
        )}
      </div>

      <div className="cases-list">
        {errorMessage && (
          <div style={{ padding: '12px', background: 'var(--accent-red-dim)', color: 'var(--accent-red)', borderRadius: '6px', marginBottom: '12px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>
            <strong>Code Constraint Violation</strong><br/>
            {errorMessage}
          </div>
        )}
        {cases.map((c) => (
          <div
            key={c.id}
            className={`case-row ${c.passed ? "case-pass" : "case-fail"}`}
          >
            <div className="case-summary">
              <span className={`case-icon ${c.passed ? "pass" : "fail"}`}>
                {c.passed ? "✓" : "✗"}
              </span>
              <span className="case-label">{c.label}</span>
              {c.hidden && (
                <span className="hidden-badge">hidden</span>
              )}
              <span className={`case-verdict ${c.passed ? "pass" : "fail"}`}>
                {c.passed ? "Passed" : c.error ? "Runtime Error" : "Wrong Answer"}
              </span>
            </div>

            {!c.passed && (
              <div className="case-detail">
                {c.error ? (
                  <div className="error-block">
                    <div className="diff-label">Error</div>
                    <pre className="diff-value error-text">{c.error}</pre>
                  </div>
                ) : (
                  <div className="diff-grid">
                    {c.input !== "hidden" && (
                      <div className="diff-block">
                        <div className="diff-label">Input</div>
                        <code className="diff-value input-text">{c.input}</code>
                      </div>
                    )}
                    <div className="diff-block">
                      <div className="diff-label">Your Output</div>
                      <code className="diff-value actual-text">{c.actual ?? "<no output>"}</code>
                    </div>
                    {c.expected !== "hidden" && (
                      <div className="diff-block">
                        <div className="diff-label">Expected Output</div>
                        <code className="diff-value expected-text">{c.expected}</code>
                      </div>
                    )}
                    {c.expected === "hidden" && (
                      <div className="diff-block">
                        <div className="diff-label">Expected Output</div>
                        <pre className="diff-value hidden-text">[ hidden ]</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Remaining tests that weren't run */}
        {cases.length < total && (
          <div className="skipped-notice">
            {total - cases.length} remaining test{total - cases.length !== 1 ? "s" : ""} not run
          </div>
        )}
      </div>
    </div>
  );
}
