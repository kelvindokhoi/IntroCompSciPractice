import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import ResultsPanel from "./ResultsPanel";
import "./ProblemView.css";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CopyableCode = ({ label, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copyable-block">
      <div className="copyable-header">
        <span className="copyable-label">{label}</span>
        <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div className="copyable-content">
        <code>{code}</code>
      </div>
    </div>
  );
};

export default function ProblemView({ problem }) {
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("problem"); // problem | hints | solution
  const [results, setResults] = useState(null); // null | { status, cases }
  const [isRunning, setIsRunning] = useState(false);
  const pyodideRef = useRef(null);
  const pyodideLoadingRef = useRef(null);
  const currentProblemId = useRef(null);

  // Load saved code when problem changes or on initial mount
  useEffect(() => {
    if (currentProblemId.current !== problem.id) {
      // Save current code before switching
      if (currentProblemId.current && code) {
        localStorage.setItem(`pypractice-solution-${currentProblemId.current}`, code);
      }
      
      // Load saved code for new problem
      const savedCode = localStorage.getItem(`pypractice-solution-${problem.id}`);
      setCode(savedCode || problem.starterCode);
      currentProblemId.current = problem.id;
    }
  }, [problem.id, problem.starterCode]);

  // Save code to localStorage whenever it changes (but only if we have a current problem)
  useEffect(() => {
    if (currentProblemId.current && code) {
      localStorage.setItem(`pypractice-solution-${currentProblemId.current}`, code);
    }
  }, [code]);

  const ensurePyodide = async () => {
    if (pyodideRef.current) return pyodideRef.current;
    if (pyodideLoadingRef.current) return pyodideLoadingRef.current;

    pyodideLoadingRef.current = (async () => {
      const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
      });
      pyodideRef.current = pyodide;
      return pyodide;
    })();

    return pyodideLoadingRef.current;
  };

  const runTests = async () => {
    setIsRunning(true);
    setResults(null);

    let pyodide;
    try {
      pyodide = await ensurePyodide();
    } catch (e) {
      setResults({
        status: "error",
        errorMessage: "Failed to load Python runtime: " + e.message,
        cases: [],
      });
      setIsRunning(false);
      return;
    }

    if (problem.positiveKeywords) {
      for (const req of problem.positiveKeywords) {
        if (!code.includes(req.word)) {
          setResults({ status: "error", errorMessage: `Expected keyword missing: '${req.word}'\nReason: ${req.feedback}`, cases: [] });
          setIsRunning(false); return;
        }
      }
    }

    if (problem.negativeKeywords) {
      for (const req of problem.negativeKeywords) {
        if (code.includes(req.word)) {
          setResults({ status: "error", errorMessage: `Forbidden keyword used: '${req.word}'\nReason: ${req.feedback}`, cases: [] });
          setIsRunning(false); return;
        }
      }
    }

    const caseResults = [];

    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];
      try {
        // Reset namespace each run
        await pyodide.runPythonAsync("import sys, io");

        // Check if there's explicit testInput, otherwise use input string
        const stdinInput = tc.testInput !== undefined ? tc.testInput : (tc.input || "");
        
        // Capture stdout and override stdin
        const runCode = `
import sys, io as _io, time as _time
_stdout = _io.StringIO()
_stdin = _io.StringIO(${JSON.stringify(stdinInput)})
sys.stdout = _stdout
sys.stdin = _stdin

_start_time = _time.time()
def _trace(frame, event, arg):
    if _time.time() - _start_time > 1.5:
        raise TimeoutError("Execution timed out (possible infinite loop)")
    return _trace
sys.settrace(_trace)

_user_code = ${JSON.stringify(code)}

try:
    exec(_user_code, globals())
except Exception as _e:
    raise _e
finally:
    sys.settrace(None)
    sys.stdout = sys.__stdout__
    sys.stdin = sys.__stdin__

_printed = _stdout.getvalue()
`;

        await pyodide.runPythonAsync(runCode);

        // Get printed output
        let output = pyodide.globals.get("_printed") || "";
        let actualRaw = output.trim();

        const expected = String(tc.expected).trim();
        const actual = String(actualRaw).trim();
        const passed = actual === expected;

        caseResults.push({
          id: i + 1,
          passed,
          hidden: tc.hidden,
          input: tc.hidden ? "hidden" : tc.input,
          expected: tc.hidden ? "hidden" : expected,
          actual,
          label: tc.label || `Test ${i + 1}`,
        });

        if (!passed) {
          // Stop on first failure
          setResults({
            status: "failed",
            failedAt: i + 1,
            cases: caseResults,
          });
          setIsRunning(false);
          return;
        }
      } catch (err) {
        caseResults.push({
          id: i + 1,
          passed: false,
          hidden: tc.hidden,
          input: tc.hidden ? "hidden" : tc.input,
          expected: tc.hidden ? "hidden" : String(tc.expected),
          actual: null,
          error: err.message,
          label: tc.label || `Test ${i + 1}`,
        });
        setResults({
          status: "error",
          failedAt: i + 1,
          cases: caseResults,
        });
        setIsRunning(false);
        return;
      }
    }

    setResults({ status: "passed", cases: caseResults });
    setIsRunning(false);
  };

  return (
    <div className="problem-view">
      {/* Left panel: problem description */}
      <div className="description-panel">
        <div className="tab-bar">
          {["problem", "hints", "solution"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "problem" && "📄 "}
              {tab === "hints" && "💡 "}
              {tab === "solution" && "🔑 "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === "problem" && (
            <div className="problem-content" style={{ animation: "fadeSlideIn 0.2s ease" }}>
              <div className="problem-meta">
                <span className={`difficulty-badge difficulty-${problem.difficulty}`}>
                  {problem.difficulty}
                </span>
                <span className="topic-badge">{problem.topic}</span>
              </div>
              <h1 className="problem-title">{problem.title}</h1>
              <p className="problem-description">{problem.description}</p>

              <div className="section-label">Examples</div>
              {problem.testCases
                .filter((tc) => !tc.hidden)
                .slice(0, 3)
                .map((tc, i) => (
                  <div key={i} className="example-block-wrapper">
                    <div className="example-title">Example {i + 1}</div>
                    <CopyableCode label="Input" code={tc.input} />
                    <CopyableCode label="Output" code={String(tc.expected)} />
                    {tc.explanation && (
                      <div className="example-explanation-block">
                        <span className="example-key">Explanation:</span>
                        <span className="example-explanation-text">{tc.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}

              <div className="section-label">Constraints</div>
              <ul className="constraints-list">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "hints" && (
            <div className="hints-content" style={{ animation: "fadeSlideIn 0.2s ease" }}>
              <div className="section-label">Hints</div>
              {problem.hints.map((hint, i) => (
                <details key={i} className="hint-item">
                  <summary className="hint-summary">
                    <span className="hint-num">Hint {i + 1}</span>
                  </summary>
                  <p className="hint-body">{hint}</p>
                </details>
              ))}
            </div>
          )}

          {activeTab === "solution" && (
            <div className="solution-content" style={{ animation: "fadeSlideIn 0.2s ease" }}>
              <div className="solution-warning">
                ⚠️ Try solving it yourself first!
              </div>
              <div className="section-label">Solution</div>
              <CopyableCode label="Python Solution" code={problem.solution} />
              {problem.solutionExplanation && (
                <>
                  <div className="section-label">Explanation</div>
                  <p className="solution-explanation">{problem.solutionExplanation}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel: editor + results */}
      <div className="editor-panel">
        <div className="editor-header">
          <span className="editor-filename">solution.py</span>
          <button
            className={`run-btn ${isRunning ? "running" : ""}`}
            onClick={runTests}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="spinner" /> Running…
              </>
            ) : (
              <>▶ Run Tests</>
            )}
          </button>
        </div>
        <div className="editor-area">
          <CodeEditor value={code} onChange={setCode} />
        </div>
        {(results || isRunning) && (
          <ResultsPanel 
            results={results} 
            isRunning={isRunning} 
            total={problem.testCases.length} 
            onClose={() => setResults(null)}
          />
        )}
      </div>
    </div>
  );
}
