import fs from "fs";

try {
  let content = fs.readFileSync("src/data/problems.js", "utf-8");
  let jsonStr = content.substring(content.indexOf("{"), content.lastIndexOf("}") + 1);
  let data = JSON.parse(jsonStr);

  let flat = [];
  for (let key in data) {
    flat.push(...data[key]);
  }

  let newContent = "export const problems = " + JSON.stringify(flat, null, 2) + ";\n";
  fs.writeFileSync("src/data/problems.js", newContent, "utf-8");
  console.log("Successfully fixed schema!");
} catch (e) {
  console.error("Failed:", e);
}
