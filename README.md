# PyPractice - Intro to CS Exam Prep 🐍

PyPractice is a web-based Python programming practice platform designed specifically for introductory Computer Science students. It provides an interactive, in-browser environment to solve algorithmic problems, prep for exams, and strengthen fundamental programming concepts.

## Features

- **In-Browser Code Editor:** Write and execute Python code seamlessly right from your browser, powered by `react-simple-code-editor` and `prismjs`.
- **Rigorous Test Cases:** Each problem is backed by comprehensive test suites (minimum 10 test cases per problem) including hidden and edge-case scenarios to thoroughly validate solution robustness.
- **Categorized Problem Sets:** Practice problems organized by key CS concepts (e.g., Lists, Strings, Data Structures).
- **Responsive UI:** Fully responsive design that works beautifully on both desktop and mobile devices. Includes a collapsible sidebar drawer and stacked layouts for mobile viewports.
- **Real-Time Results:** Scrollable test results panel indicating pass/fail outcomes for each submitted solution.

## Tech Stack

- **Framework:** React 19 / Vite
- **Styling:** Vanilla CSS 
- **Code Highlighting & Editing:** `react-simple-code-editor` and `prismjs`
- **Deployment:** Vercel Analytics included

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/IntroCompSciPractice.git
   cd IntroCompSciPractice/IntroCompSciPractice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `MVP/`: Contains the original Minimum Viable Product files before the main Vite app initialization.
- `IntroCompSciPractice/`: The main Vite React application.
  - `src/components/`: Reusable React components (Sidebar, CodeEditor, ProblemView, ResultsPanel).
  - `src/data/`: Contains `problems.js` which serves as the database for all problem descriptions, starter code, and test cases.
- `copy_files.py`: Script to migrate components and data from the MVP folder to the main React application structure.

## Contributing

If you'd like to contribute new problems or improve the test coverage:
1. Navigate to `IntroCompSciPractice/src/data/problems.js`.
2. Add your problem following the existing schema.
3. Ensure you provide at least 10 thorough test cases, including edge cases. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
