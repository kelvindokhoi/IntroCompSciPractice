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

// Helper to format milliseconds to mm:ss
const formatTime = (ms) => {
  if (!ms) return null;
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
};

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
        <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy} title="Copy to clipboard">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div className="copyable-content">
        <code>{code}</code>
      </div>
    </div>
  );
};

export default function ProblemView({ problem, onSolve, onPrev, onNext, hasPrev, hasNext }) {
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("problem"); // problem | hints | solution
  const [results, setResults] = useState(null); // null | { status, cases }
  const [isRunning, setIsRunning] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [runningCase, setRunningCase] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('pypractice-font-size')) || 20);
  const [errorLine, setErrorLine] = useState(null);
  const [revealedHints, setRevealedHints] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [personalBest, setPersonalBest] = useState(null);
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
      setRevealedHints(0);
      setErrorLine(null);
      setResults(null);
      setIsPassed(false);
      
      // Load personal best time for this problem
      const savedBest = localStorage.getItem(`pypractice-best-${problem.id}`);
      setPersonalBest(savedBest ? parseInt(savedBest, 10) : null);
      
      // Start timer when problem loads (if not already solved)
      const isSolved = localStorage.getItem(`pypractice-solved-${problem.id}`);
      if (!isSolved) {
        setStartTime(Date.now());
      } else {
        setStartTime(null);
      }
    }
  }, [problem.id, problem.starterCode]);

  // Persist font size
  useEffect(() => {
    localStorage.setItem('pypractice-font-size', String(fontSize));
  }, [fontSize]);

  // Ctrl+Enter keyboard shortcut
  const runTestsRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (runTestsRef.current && !runTestsRef.current.isRunning) runTestsRef.current.fn();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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

  const parseErrorLine = (msg) => {
    const match = msg?.match(/line\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const handleReset = () => {
    if (window.confirm("Reset to starter code? Your current solution will be lost.")) {
      setCode(problem.starterCode);
      localStorage.removeItem(`pypractice-solution-${problem.id}`);
      setErrorLine(null);
      setResults(null);
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setIsPassed(false);
    setRunningCase(0);
    setErrorLine(null);
    setResults(null);
    runTestsRef.current = { fn: runTests, isRunning: true };

    let pyodide;
    try {
      pyodide = await ensurePyodide();
    } catch (e) {
      setResults({
        status: "error",
        errorMessage: "Failed to load Python runtime: " + e.message,
        cases: [],
      });
      setFailCount(c => c + 1);
      setIsRunning(false);
      return;
    }

    if (problem.positiveKeywords) {
      for (const req of problem.positiveKeywords) {
        if (!code.includes(req.word)) {
          setResults({ status: "error", errorMessage: `Expected keyword missing: '${req.word}'\nReason: ${req.feedback}`, cases: [] });
          setFailCount(c => c + 1);
          setIsRunning(false); return;
        }
      }
    }

    if (problem.negativeKeywords) {
      for (const req of problem.negativeKeywords) {
        if (code.includes(req.word)) {
          setResults({ status: "error", errorMessage: `Forbidden keyword used: '${req.word}'\nReason: ${req.feedback}`, cases: [] });
          setFailCount(c => c + 1);
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
        
        // File I/O setup: clean current working directory and write input files
        try {
          const cwd = pyodide.FS.cwd();
          const existingFiles = pyodide.FS.readdir(cwd);
          for (const f of existingFiles) {
            if (f !== '.' && f !== '..') {
              try { pyodide.FS.unlink(cwd + '/' + f); } catch(e){}
            }
          }
        } catch(e) {}

        if (tc.files) {
          for (const [filename, content] of Object.entries(tc.files)) {
            pyodide.FS.writeFile(filename, String(content));
          }
        }

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
        let actualRaw = output;
        let expectedStr = String(tc.expected);
        let passed = false;

        // If the test case expects an output file instead of standard output
        if (tc.expectedFile) {
          const expectedFilename = tc.expectedFile.name;
          try {
            actualRaw = pyodide.FS.readFile(expectedFilename, { encoding: 'utf8' });
          } catch(e) {
            actualRaw = "FILE NOT FOUND or read error";
          }
          expectedStr = String(tc.expectedFile.content);
        }

        let actualRawStr = String(actualRaw).replace(/\r\n/g, '\n').trimEnd();
        let expectedStrNormalized = expectedStr.replace(/\r\n/g, '\n').trimEnd();
        passed = actualRawStr === expectedStrNormalized;

        caseResults.push({
          id: i + 1,
          passed,
          hidden: tc.hidden,
          input: tc.hidden ? "hidden" : tc.input,
          expected: tc.hidden ? "hidden" : expectedStrNormalized,
          actual: actualRawStr,
          label: tc.label || `Test ${i + 1}`,
        });

        // Stream live results after every test
        setRunningCase(i + 1);
        setResults({ status: passed ? "running" : "failed", failedAt: passed ? undefined : i + 1, cases: [...caseResults] });

        // Small stagger so animations are visible even on fast cases
        await new Promise(r => setTimeout(r, 80));

        if (!passed) {
          setFailCount(c => c + 1);
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
        setFailCount(c => c + 1);
        setErrorLine(parseErrorLine(err.message));
        setIsRunning(false);
        return;
      }
    }

    setResults({ status: "passed", cases: caseResults });
    setIsRunning(false);
    setIsPassed(true);
    
    // Calculate and save personal best time
    if (startTime) {
      const timeTaken = Date.now() - startTime;
      const savedBest = localStorage.getItem(`pypractice-best-${problem.id}`);
      const currentBest = savedBest ? parseInt(savedBest, 10) : null;
      
      if (!currentBest || timeTaken < currentBest) {
        localStorage.setItem(`pypractice-best-${problem.id}`, String(timeTaken));
        setPersonalBest(timeTaken);
      }
      localStorage.setItem(`pypractice-solved-${problem.id}`, 'true');
    }
    
    if (onSolve) onSolve(problem.id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="problem-view">
      {/* Left panel: problem description */}
      <div key={problem.id} className="description-panel" style={{ animation: "problemFade 0.25s ease" }}>
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
            <div className="problem-content" style={{ animation: "slideInTab 0.22s ease" }}>
              <div className="problem-meta">
                <span className={`difficulty-badge difficulty-${problem.difficulty}`}>
                  {problem.difficulty}
                </span>
                <span className="topic-badge">{problem.topic}</span>
              </div>
              <h1 className="problem-title">{problem.title}</h1>
              {personalBest && (
                <div className="personal-best-badge">
                  ⏱️ Personal best: {formatTime(personalBest)}
                </div>
              )}
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
              <div className="im-stuck-row">
                <button
                  className="im-stuck-btn"
                  onClick={() => {
                    setActiveTab("hints");
                    if (revealedHints < problem.hints.length) setRevealedHints(r => r + 1);
                  }}
                  disabled={revealedHints >= problem.hints.length}
                >
                  {revealedHints >= problem.hints.length ? "💡 All Hints Shown" : "💡 I'm Stuck — Get a Hint"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "hints" && (
            <div className="hints-content" style={{ animation: "slideInTab 0.22s ease" }}>
              {revealedHints === 0 ? (
                <div className="stuck-prompt">
                  <p>Try the problem first! Reveal hints one at a time when you're stuck.</p>
                  <button className="reveal-hint-btn" onClick={() => setRevealedHints(1)}>💡 Show First Hint</button>
                </div>
              ) : (
                <>
                  <div className="section-label">Hints</div>
                  {problem.hints.slice(0, revealedHints).map((hint, i) => (
                    <details key={i} className="hint-item">
                      <summary className="hint-summary"><span className="hint-num">Hint {i + 1}</span></summary>
                      <p className="hint-body">{hint}</p>
                    </details>
                  ))}
                  {revealedHints < problem.hints.length && (
                    <button className="reveal-hint-btn" onClick={() => setRevealedHints(r => r + 1)}>
                      💡 Reveal Hint {revealedHints + 1}
                    </button>
                  )}
                  {revealedHints >= problem.hints.length && <div className="all-hints-shown">✓ All hints revealed</div>}
                </>
              )}
            </div>
          )}

          {activeTab === "solution" && (
            <div className="solution-content" style={{ animation: "slideInTab 0.22s ease" }}>
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
          <div className="editor-header-left">
            <button className="editor-tool-btn" onClick={onPrev} disabled={!hasPrev} title="Previous Problem">‹</button>
            <span className="editor-filename">solution.py</span>
            <button className="editor-tool-btn" onClick={onNext} disabled={!hasNext} title="Next Problem">›</button>
          </div>
          <div className="editor-header-right">
            <button className="editor-tool-btn" onClick={() => setFontSize(f => Math.max(10, f - 1))} title="Decrease font">A-</button>
            <span className="font-size-label">{fontSize}</span>
            <button className="editor-tool-btn" onClick={() => setFontSize(f => Math.min(20, f + 1))} title="Increase font">A+</button>
            <button className="editor-tool-btn reset-btn" onClick={handleReset} title="Reset to starter code">↺</button>
            <button
              className={`run-btn ${isRunning ? "running" : ""} ${isPassed && !isRunning ? "passed" : ""}`}
              onClick={runTests}
              disabled={isRunning}
              title="Run Tests (Ctrl+Enter)"
            >
              {isRunning ? (
                <><span className="spinner" />{runningCase > 0 ? `Testing ${runningCase} / ${problem.testCases.length}…` : "Loading…"}</>
              ) : (
                <>▶ Run Tests</>
              )}
            </button>
          </div>
        </div>
        <div className="editor-area">
          <CodeEditor value={code} onChange={setCode} fontSize={fontSize} errorLine={errorLine} />
        </div>
        {(results || isRunning) && (
          <div
            className="results-wrapper"
            key={failCount}
            style={{
              animation: (results?.status === "failed" || results?.status === "error") && !isRunning
                ? "shake 0.4s ease, slideUp 0.3s ease"
                : "slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            <ResultsPanel 
              results={results} 
              isRunning={isRunning} 
              total={problem.testCases.length} 
              onClose={() => setResults(null)}
            />
          </div>
        )}

        {showConfetti && (
          <div className="confetti-container" ref={el => { if (el) el.inert = true; }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className={`confetti-piece shape-${i % 3}`} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
