import { useRef } from "react";
import EditorModule from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-twilight.css";
import "./CodeEditor.css";

const Editor = EditorModule.default || EditorModule;

export default function CodeEditor({ value, onChange }) {
  const editorRef = useRef(null);

  // Handle IDE-like key strokes
  const handleKeyDown = (e) => {
    const el = editorRef.current?._input || document.querySelector(".code-textarea");
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    // Paired backspace and soft tabs
    if (e.key === "Backspace" && start === end && start > 0) {
      const charBefore = value[start - 1];
      const charAfter = value[start];
      const matchMap = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"' };
      
      // 1. Paired bracket/quote deletion
      if (matchMap[charBefore] && matchMap[charBefore] === charAfter) {
        e.preventDefault();
        const newVal = value.substring(0, start - 1) + value.substring(end + 1);
        onChange(newVal);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start - 1;
        });
        return;
      }

      // 2. Soft Tab Backspace (delete 4 spaces at once)
      if (start >= 4 && value.substring(start - 4, start) === "    ") {
        e.preventDefault();
        const newVal = value.substring(0, start - 4) + value.substring(end);
        onChange(newVal);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start - 4;
        });
        return;
      }
    }

    // Step-over closing brackets and quotes
    if ([")", "]", "}", "'", '"'].includes(e.key)) {
      if (start === end && value[start] === e.key) {
        e.preventDefault();
        el.selectionStart = el.selectionEnd = start + 1;
        return;
      }
    }

    // Auto-brackets and Auto-quotes
    const pairs = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"' };
    if (e.key in pairs) {
      e.preventDefault();
      const selectedText = value.substring(start, end);
      const insertText = e.key + selectedText + pairs[e.key];
      const newVal = value.substring(0, start) + insertText + value.substring(end);
      
      onChange(newVal);
      requestAnimationFrame(() => {
        if (start === end) {
          el.selectionStart = el.selectionEnd = start + 1; // place inside
        } else {
          el.selectionStart = start;
          el.selectionEnd = start + insertText.length; // select wrapped
        }
      });
      return;
    }

    // Tab indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const newVal = value.substring(0, start) + "    " + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
      return;
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      e.preventDefault();
      const textBeforeCursor = value.substring(0, start);
      const lastNewlineIndex = textBeforeCursor.lastIndexOf("\n");
      const currentLine = textBeforeCursor.substring(lastNewlineIndex + 1);

      const match = currentLine.match(/^\s*/);
      let indent = match ? match[0] : "";

      // Increase indent if line ends with a colon
      if (currentLine.trim().endsWith(":")) {
        indent += "    ";
      }

      const insertText = "\n" + indent;
      const newVal = value.substring(0, start) + insertText + value.substring(end);

      onChange(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + insertText.length;
      });
      return;
    }
  };

  const lines = value.split("\n").length;

  return (
    <div className="code-editor">
      <div className="line-numbers" aria-hidden="true">
        {Array.from({ length: Math.max(lines, 20) }, (_, i) => (
          <div key={i} className="line-num">{i + 1}</div>
        ))}
      </div>
      <div className="editor-container">
        <Editor
          ref={editorRef}
          value={value}
          onValueChange={onChange}
          highlight={(code) => Prism.highlight(code, Prism.languages.python, "python")}
          padding={16}
          textareaClassName="code-textarea"
          preClassName="code-pre"
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: "var(--mono)",
            fontSize: "13px",
            lineHeight: "1.6",
            minHeight: "100%",
            outline: "none"
          }}
        />
      </div>
    </div>
  );
}
