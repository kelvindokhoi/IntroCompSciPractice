export const problems = {
  lists: [
    {
      id: "lists-1",
      title: "Sum of a List",
      topic: "Lists",
      difficulty: "easy",
      description: "Read an integer N representing the number of elements. Then the next N lines are the elements in the list (integers). Print the total sum of these integers. Do not use the built-in sum() function.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [
        { word: "sum(", feedback: "You cannot use the built-in sum() function. You must manually loop and add the numbers." }
      ],
      testCases: [
        { label: "Test 1 – basic positive", input: "5\n1\n2\n3\n4\n5", testInput: "5\n1\n2\n3\n4\n5\n", expected: "15", hidden: false, explanation: "1+2+3+4+5 = 15" },
        { label: "Test 2 – includes negatives", input: "3\n-1\n0\n1", testInput: "3\n-1\n0\n1\n", expected: "0", hidden: false },
        { label: "Test 3 – empty list (hidden)", input: "0", testInput: "0\n", expected: "0", hidden: true }
      ],
      constraints: ["Do not use the built-in sum() function.", "Return 0 if N is 0."],
      hints: ["Read N first. Then use a loop that runs N times to read the rest.", "Keep a running total."],
      solution: `n = int(input())\ntotal = 0\nfor _ in range(n):\n    total += int(input())\nprint(total)`,
      solutionExplanation: "First read N. Then loop N times, reading an integer and adding it to the total, finally printing total."
    },
    {
      id: "lists-2",
      title: "Reverse a List",
      topic: "Lists",
      difficulty: "easy",
      description: "Read an integer N, then the next N lines are the elements in the list (strings). Print the elements in reverse order, formatting the output strictly as a Python list like ['c', 'b', 'a'].",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [
        { word: ".reverse(", feedback: "You cannot use the .reverse() method. Do it manually." },
        { word: "[::-1]", feedback: "You cannot use Python slice reversal [::-1]. Iterate backward manually." },
        { word: "reversed(", feedback: "You cannot use the built-in reversed() iterator." }
      ],
      testCases: [
        { label: "Test 1 – basic", input: "3\na\nb\nc", testInput: "3\na\nb\nc\n", expected: "['c', 'b', 'a']", hidden: false },
        { label: "Test 2 – empty (hidden)", input: "0", testInput: "0\n", expected: "[]", hidden: true }
      ],
      constraints: ["Do not use .reverse() or [::-1]."],
      hints: ["Store the inputs in a list, then build a new list backwards and print it."],
      solution: `n = int(input())\nlst = []\nfor _ in range(n):\n    lst.append(input())\nresult = []\nfor i in range(n - 1, -1, -1):\n    result.append(lst[i])\nprint(result)`,
      solutionExplanation: "Read everything into a list, then iterate backwards to create the reversed list."
    },
    {
      id: "lists-3",
      title: "Even Squares",
      topic: "Lists",
      difficulty: "medium",
      description: "Read an integer N, then the next N lines are the elements in the list (integers). Print a list containing the squares of only the even numbers. Use a list comprehension.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "[", feedback: "Use a list comprehension to generate the result." },
        { word: "for", feedback: "A list comprehension requires a 'for' clause." },
        { word: "if", feedback: "A list comprehension requires an 'if' condition to filter evens." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – mixed", input: "6\n1\n2\n3\n4\n5\n6", testInput: "6\n1\n2\n3\n4\n5\n6\n", expected: "[4, 16, 36]", hidden: false },
        { label: "Test 2 – none even (hidden)", input: "3\n1\n3\n5", testInput: "3\n1\n3\n5\n", expected: "[]", hidden: true }
      ],
      constraints: ["Must use a list comprehension."],
      hints: ["Gather inputs into a list first.", "Then apply a list comprehension: [x**2 for x in nums if x % 2 == 0]"],
      solution: `n = int(input())\nnums = [int(input()) for _ in range(n)]\nresult = [x**2 for x in nums if x % 2 == 0]\nprint(result)`,
      solutionExplanation: "After reading the numbers, a single comprehension filters evens and squares them."
    }
  ],
  functions: [
    {
      id: "func-1",
      title: "Celsius to Fahrenheit",
      topic: "Functions",
      difficulty: "easy",
      description: "Read a single float on one line representing Celsius. Print the Fahrenheit equivalent restricted to 2 decimal places. F = (C * 9/5) + 32.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: ":.2f", feedback: "You must use the ':.2f' format specifier inside an f-string to pad the output to 2 decimal places." }
      ],
      negativeKeywords: [
        { word: "round(", feedback: "Do not use the round() function. Use f-string formatting instead." }
      ],
      testCases: [
        { label: "Test 1 – freezing", input: "0", testInput: "0\n", expected: "32.00", hidden: false },
        { label: "Test 2 – body temp", input: "37", testInput: "37\n", expected: "98.60", hidden: false }
      ],
      constraints: ["Input is a float.", "Must use f-strings."],
      hints: ["Use an f-string like f'{val:.2f}'."],
      solution: `c = float(input())\nfah = (c * 9/5) + 32\nprint(f"{fah:.2f}")`,
      solutionExplanation: "Calculate the conversion, then format it to 2 fixed decimal places strings."
    },
    {
      id: "func-2",
      title: "Count Vowels",
      topic: "Functions",
      difficulty: "easy",
      description: "Read a single string. Print the number of vowels (a, e, i, o, u) present in the string. Ignore case.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – basic", input: "hello", testInput: "hello\n", expected: "2", hidden: false },
        { label: "Test 2 – uppercase", input: "AEIOU", testInput: "AEIOU\n", expected: "5", hidden: false },
        { label: "Test 3 – empty (hidden)", input: "", testInput: "\n", expected: "0", hidden: true }
      ],
      constraints: ["Case-insensitive."],
      hints: ["Iterate through the string lowercase and count matches against 'aeiou'."],
      solution: `text = input().lower()\ncount = sum(1 for ch in text if ch in 'aeiou')\nprint(count)`,
      solutionExplanation: "String reading followed by counting occurrences of vowels."
    },
    {
      id: "func-3",
      title: "Is Palindrome",
      topic: "Functions",
      difficulty: "medium",
      description: "Read a single string. Print 'True' if it is a palindrome, 'False' otherwise. Ignore case and spaces.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – basic match", input: "racecar", testInput: "racecar\n", expected: "True", hidden: false },
        { label: "Test 2 – mixed spaces", input: "race a car", testInput: "race a car\n", expected: "False", hidden: false },
        { label: "Test 3 – capitals", input: "Madam", testInput: "Madam\n", expected: "True", hidden: false }
      ],
      constraints: ["Ignore case and space."],
      hints: ["Clean the string with .replace(' ', '').lower() before checking if it equals its reverse."],
      solution: `s = input().replace(' ', '').lower()\nprint(s == s[::-1])`,
      solutionExplanation: "Clean the input first, then compare against its reversed slice."
    },
    {
      id: "func-4",
      title: "Filter Primes",
      topic: "Functions",
      difficulty: "hard",
      description: "Write a function filter_primes(lst) that accepts a list of integers and returns a new list containing only the prime numbers from the input list, preserving their original order. A prime number is a positive integer greater than 1 having no divisors other than 1 and itself.",
      starterCode: `def filter_primes(lst):\n    # Write your code here\n    pass\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))\n`,
      positiveKeywords: [
        { word: "def filter_primes(", feedback: "You must define the function filter_primes(lst)." },
        { word: "return", feedback: "Your function must return the resulting list." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – mixed numbers", input: "5\n2\n4\n5\n8\n11", testInput: "5\n2\n4\n5\n8\n11\n", expected: "[2, 5, 11]", hidden: false },
        { label: "Test 2 – no primes", input: "3\n4\n6\n8", testInput: "3\n4\n6\n8\n", expected: "[]", hidden: false },
        { label: "Test 3 – minimum edge cases", input: "5\n-3\n0\n1\n2\n7", testInput: "5\n-3\n0\n1\n2\n7\n", expected: "[2, 7]", hidden: true },
        { label: "Test 4 – empty list", input: "0", testInput: "0\n", expected: "[]", hidden: true }
      ],
      constraints: ["Numbers like 0, 1, and negative numbers are NOT prime."],
      hints: ["Create a helper function is_prime(n) that returns True if n is prime, False otherwise.", "Iterate over the input list and append to a new list if is_prime(x) is True."],
      solution: `def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ndef filter_primes(lst):\n    result = []\n    for num in lst:\n        if is_prime(num):\n            result.append(num)\n    return result\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))`,
      solutionExplanation: "A helper function checks if a number is prime by attempting division up to its square root. The main function builds a new list by iterating through the original list and keeping only the primes."
    }
  ],
  while_loop: [
    {
      id: "while-1",
      title: "Countdown",
      topic: "While Loop",
      difficulty: "easy",
      description: "Read a positive integer N. Print N down to 1 using a while loop, followed by 'Blast off!'.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "while", feedback: "You must use a while loop for this problem." }
      ],
      negativeKeywords: [
        { word: "for ", feedback: "Do not use a for loop in this problem." }
      ],
      testCases: [
        { label: "Test 1 – n=3", input: "3", testInput: "3\n", expected: "3\n2\n1\nBlast off!", hidden: false },
        { label: "Test 2 – n=1 (hidden)", input: "1", testInput: "1\n", expected: "1\nBlast off!", hidden: true }
      ],
      constraints: ["Must use a while loop."],
      hints: ["Loop while N > 0."],
      solution: `n = int(input())\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Blast off!")`,
      solutionExplanation: "Simple decrementing loop."
    },
    {
      id: "while-2",
      title: "Digit Sum",
      topic: "While Loop",
      difficulty: "medium",
      description: "Read a positive integer N. Print the sum of its digits using a while loop and math operators (% and //). Do not convert to string.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "while", feedback: "You must use a while loop." },
        { word: "%", feedback: "You must use the modulo operator (%) to get the remainder/last digit." },
        { word: "//", feedback: "You must use floor division (//) to chop off the last digit." }
      ],
      negativeKeywords: [
        { word: "str(", feedback: "You cannot convert the number to a string to process digits." }
      ],
      testCases: [
        { label: "Test 1 – 123", input: "123", testInput: "123\n", expected: "6", hidden: false },
        { label: "Test 2 – 405 (hidden)", input: "405", testInput: "405\n", expected: "9", hidden: true }
      ],
      constraints: ["Do not convert to a string."],
      hints: ["Isolate the last digit with `% 10`.", "Remove the last digit with `// 10`."],
      solution: `n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)`,
      solutionExplanation: "Repeatedly extract the last digit and add it to total."
    }
  ],
  for_loop: [
    {
      id: "for-1",
      title: "FizzBuzz",
      topic: "For Loop",
      difficulty: "easy",
      description: "Read integer N. For 1 to N, print 'Fizz' if divisible by 3, 'Buzz' if by 5, 'FizzBuzz' if both, else print the number.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "for", feedback: "You must use a for loop." },
        { word: "range(", feedback: "Use range() to generate the sequence of numbers." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – n=5", input: "5", testInput: "5\n", expected: "1\n2\nFizz\n4\nBuzz", hidden: false },
        { label: "Test 2 – n=15 (hidden)", input: "15", testInput: "15\n", expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", hidden: true }
      ],
      constraints: ["Use a for loop."],
      hints: ["Check the combined condition (mod 15) first."],
      solution: `n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)`,
      solutionExplanation: "Standard Fizzbuzz using modulo arithmetic."
    },
    {
      id: "for-2",
      title: "Find Maximum",
      topic: "For Loop",
      difficulty: "easy",
      description: "Read an integer N, then the next N lines are the elements in the list. Print the largest number found. Do not use max().",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [
        { word: "max(", feedback: "You cannot use the built-in max() function. Keep track of the current highest score in a variable." },
        { word: "sort(", feedback: "You cannot sort the list to find the maximum." }
      ],
      testCases: [
        { label: "Test 1 – standard", input: "3\n1\n5\n2", testInput: "3\n1\n5\n2\n", expected: "5", hidden: false },
        { label: "Test 2 – negatives", input: "2\n-1\n-5", testInput: "2\n-1\n-5\n", expected: "-1", hidden: false }
      ],
      constraints: ["Do not use max()."],
      hints: ["Read the first number outside the loop and set it as the current maximum."],
      solution: `n = int(input())\nbest = -float('inf')\nfor _ in range(n):\n    v = int(input())\n    if v > best:\n        best = v\nprint(best)`,
      solutionExplanation: "Maintain the highest seen value continuously."
    },
    {
      id: "for-3",
      title: "Multiplication Table",
      topic: "For Loop",
      difficulty: "medium",
      description: "Read N. Print the multiplication table for N from 1 to 10 (e.g. '1 x 5 = 5').",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "for", feedback: "You must use a for loop." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – n=2", input: "2", testInput: "2\n", expected: "1 x 2 = 2\n2 x 2 = 4\n3 x 2 = 6\n4 x 2 = 8\n5 x 2 = 10\n6 x 2 = 12\n7 x 2 = 14\n8 x 2 = 16\n9 x 2 = 18\n10 x 2 = 20", hidden: false },
        { label: "Test 2 – n=10 (hidden)", input: "10", testInput: "10\n", expected: "1 x 10 = 10\n2 x 10 = 20\n3 x 10 = 30\n4 x 10 = 40\n5 x 10 = 50\n6 x 10 = 60\n7 x 10 = 70\n8 x 10 = 80\n9 x 10 = 90\n10 x 10 = 100", hidden: true }
      ],
      constraints: ["Print exactly 10 lines."],
      hints: ["Use formatting like f'{i} x {n} = {i*n}'."],
      solution: `n = int(input())\nfor i in range(1, 11):\n    print(f"{i} x {n} = {i*n}")`,
      solutionExplanation: "Loop from 1 to 10 and format the string output."
    },
    {
      id: "for-4",
      title: "Box Pattern",
      topic: "For Loop",
      difficulty: "medium",
      description: "Read an integer N (where N >= 2). Print an N x N box. The top and bottom borders should be made of hyphens '-' and the left/right borders of the middle rows should be pipes '|'.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – n=4", input: "4", testInput: "4\n", expected: "----\n|  |\n|  |\n----", hidden: false },
        { label: "Test 2 – n=7", input: "7", testInput: "7\n", expected: "-------\n|     |\n|     |\n|     |\n|     |\n|     |\n-------", hidden: false },
        { label: "Test 3 – minimum (n=2)", input: "2", testInput: "2\n", expected: "--\n--", hidden: false },
        { label: "Test 4 – n=5 (hidden)", input: "5", testInput: "5\n", expected: "-----\n|   |\n|   |\n|   |\n-----", hidden: true }
      ],
      constraints: ["N will be at least 2."],
      hints: ["The top and bottom are strings of N hyphens.", "The middle rows use a pipe, N-2 spaces, and another pipe."],
      solution: `n = int(input())\nprint("-" * n)\nfor _ in range(n - 2):\n    print("|" + " " * (n - 2) + "|")\nprint("-" * n)`,
      solutionExplanation: "Use string multiplication to print the top and bottom borders. Use a loop to print the middle rows with pipes and spaces."
    },
    {
      id: "for-5",
      title: "Christmas Tree",
      topic: "For Loop",
      difficulty: "medium",
      description: "Read an integer N. Print a Christmas tree of height N using stars '*'. Each star in a row should be separated by a space, and the tree should be centered. Notice that the first row has N-1 leading spaces and 1 star, the second has N-2 leading spaces and 2 stars, etc.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "for", feedback: "You must use a for loop to iterate through the rows." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – n=3", input: "3", testInput: "3\n", expected: "  *\n * *\n* * *", hidden: false },
        { label: "Test 2 – n=5 (hidden)", input: "5", testInput: "5\n", expected: "    *\n   * *\n  * * *\n * * * *\n* * * * *", hidden: true },
        { label: "Test 3 – minimum (n=1)", input: "1", testInput: "1\n", expected: "*", hidden: false },
        { label: "Test 4 – n=8 (hidden)", input: "8", testInput: "8\n", expected: "       *\n      * *\n     * * *\n    * * * *\n   * * * * *\n  * * * * * *\n * * * * * * *\n* * * * * * * *", hidden: true }
      ],
      constraints: ["N will be at least 1."],
      hints: ["For row i (from 1 to N), print N-i spaces followed by i stars separated by a space."],
      solution: `n = int(input())\nfor i in range(1, n + 1):\n    print(" " * (n - i) + " ".join(["*"] * i))`,
      solutionExplanation: "Iterate from 1 to N. Calculate the leading spaces and join the stars with a space."
    },
    {
      id: "for-6",
      title: "Diamond Pattern",
      topic: "For Loop",
      difficulty: "hard",
      description: "Read an odd integer N (where N >= 3). Use a `for` loop to print a symmetrical diamond of stars (`*`) of height N. The top and bottom rows should have 1 star, the middle row must have N stars. The stars should NOT be separated by spaces, but you will need leading spaces to center them.",
      starterCode: `# Write your code here\n`,
      positiveKeywords: [
        { word: "for", feedback: "You must use at least one for loop." }
      ],
      negativeKeywords: [],
      testCases: [
        { label: "Test 1 – n=5", input: "5", testInput: "5\n", expected: "  *\n ***\n*****\n ***\n  *", hidden: false },
        { label: "Test 2 – n=3", input: "3", testInput: "3\n", expected: " *\n***\n *", hidden: false },
        { label: "Test 3 – n=7 (hidden)", input: "7", testInput: "7\n", expected: "   *\n  ***\n *****\n*******\n *****\n  ***\n   *", hidden: true },
        { label: "Test 4 – n=9 (hidden)", input: "9", testInput: "9\n", expected: "    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *", hidden: true }
      ],
      constraints: ["N will be an odd integer >= 3."],
      hints: ["Consider calculating the distance from the middle row.", "If the middle index is mid = N // 2, the number of leading spaces for row i (0 to N-1) is abs(mid - i).", "The number of stars for row i is N - 2 * spaces."],
      solution: `n = int(input())\nmid = n // 2\nfor i in range(n):\n    spaces = abs(mid - i)\n    stars = n - 2 * spaces\n    print(" " * spaces + "*" * stars)`,
      solutionExplanation: "By calculating the distance of the current row from the middle using abs(), we determine how many leading spaces are needed. The number of stars is simply the total width N minus twice the leading spaces."
    }
  ]
};
