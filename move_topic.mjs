import fs from 'fs';

const filePath = "c:\\Users\\BTB\\Desktop\\GitHub\\IntroCompSciPractice\\IntroCompSciPractice\\src\\data\\problems.js";
let text = fs.readFileSync(filePath, 'utf8');

const startTag = '  "list_comprehensions": [';
const startIdx = text.indexOf(startTag);

if (startIdx === -1) {
    console.error("Not found");
    process.exit(1);
}

const commaIdx = text.lastIndexOf(',', startIdx);
let endIdx = text.lastIndexOf('\n};');
if (endIdx === -1) endIdx = text.lastIndexOf('};');

const listCompChunk = text.slice(startIdx, endIdx);
const part1 = text.slice(0, commaIdx);

const topTag = 'export const problems = {\n';
const topIdx = part1.indexOf(topTag) + topTag.length;

const newText = part1.slice(0, topIdx) + listCompChunk + ',\n' + part1.slice(topIdx) + '\n};\n';

fs.writeFileSync(filePath, newText, 'utf8');
console.log("Moved successfully");
