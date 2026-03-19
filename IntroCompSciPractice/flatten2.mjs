import { problems } from "./src/data/problems.js";
import fs from "fs";

const flat = [];
if (!Array.isArray(problems)) {
  for (const key in problems) {
    flat.push(...problems[key]);
  }
} else {
  process.exit(0);
}

const jsContent = "export const problems = " + JSON.stringify(flat, null, 2) + ";\n";
fs.writeFileSync("src/data/problems.js", jsContent, "utf-8");
console.log("Flattened cleanly");
