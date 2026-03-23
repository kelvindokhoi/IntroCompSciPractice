import sys

file_path = r"c:\Users\BTB\Desktop\GitHub\IntroCompSciPractice\IntroCompSciPractice\src\data\problems.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

start_tag = '  "list_comprehensions": ['
start_idx = content.find(start_tag)

if start_idx == -1:
    print("Could not find list_comprehensions")
    sys.exit(1)

# Find the comma before "list_comprehensions" that separates it from the previous topic
comma_idx = content.rfind(',', 0, start_idx)

part1 = content[:comma_idx]

# The chunk goes from start_tag up to just before the final };
# Let's find the closing of the list_comprehensions array.
# Because it's at the end of the file, it ends right before `};\n` or `};`
end_idx = content.rfind('\n};')
end_char = content.rfind('};')
if end_idx == -1:
    end_idx = end_char

list_comp_chunk = content[start_idx:end_idx]

top_tag = 'export const problems = {\n'
top_idx = part1.find(top_tag) + len(top_tag)

new_content = (
    part1[:top_idx] +
    list_comp_chunk + ',\n' +
    part1[top_idx:] +
    '\n};\n'
)

with open(file_path, "w", encoding="utf-8", newline='\n') as f:
    f.write(new_content)
print("Moved successfully")
