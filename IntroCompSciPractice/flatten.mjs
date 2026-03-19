import fs from "fs";

const content = fs.readFileSync("src/data/problems.js", "utf-8");
// Strip 'export const problems = ' and ';'
const jsonStr = content.replace("export const problems = ", "").replace(/;\s*$/, "");
const problemsObj = JSON.parse(jsonStr);

const flat = [];
if (!Array.isArray(problemsObj)) {
  for (const key in problemsObj) {
    flat.push(...problemsObj[key]);
  }
} else {
  // Already flat
  console.log("Already flat");
  process.exit(0);
}

const jsContent = "export const problems = " + JSON.stringify(flat, null, 2) + ";\n";
fs.writeFileSync("src/data/problems.js", jsContent, "utf-8");
console.log("Successfully flattened!");
