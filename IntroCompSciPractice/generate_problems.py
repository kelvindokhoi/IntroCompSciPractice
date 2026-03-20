import json
import os

def fmt_tc(lbl, inp_val, test_val, exp, hid):
    return {
        "label": lbl,
        "input": str(inp_val),
        "testInput": str(test_val),
        "expected": str(exp),
        "hidden": hid
    }

def mk_lists_1():
    tcs = []
    cases = [
        ("basic positive", [1,2,3,4,5], False),
        ("includes negatives", [-1,0,1], False),
        ("empty list", [], True),
        ("all zeros", [0,0,0,0,0], True),
        ("single element", [999], True),
        ("all negatives", [-5,-10,-15], True),
        ("alternating", [1,-1,1,-1], True),
        ("large range", list(range(100)), True),
        ("two elements", [42, 58], True),
        ("triple zero", [0,0,0], True),
    ]
    for i, (l, arr, h) in enumerate(cases):
        n = len(arr)
        inp = str(n) + ("\n" + "\n".join(map(str, arr)) if n > 0 else "")
        tcs.append(fmt_tc(f"Test {i+1} - {l}", inp, inp + "\n", sum(arr), h))
    return tcs

def mk_lists_2():
    tcs = []
    cases = [
        ("basic", ["a","b","c"], False),
        ("empty", [], True),
        ("single", ["x"], True),
        ("same", ["a","a","a"], True),
        ("numbers as strings", ["1","2","3","4"], True),
        ("special chars", ["@","#","$"], True),
        ("mixed lengths", ["apple","b","cat"], True),
        ("spaces", ["a b", "c d"], True),
        ("seven", ["a","b","c","d","e","f","g"], True),
        ("two", ["y","z"], True),
    ]
    for i, (l, arr, h) in enumerate(cases):
        n = len(arr)
        inp = str(n) + ("\n" + "\n".join(arr) if n > 0 else "")
        # The expected is the str() representation of the reversed python list
        exp = str(arr[::-1]).replace("'", '"')  # Python lists might use single quotes, ensure consistency if needed. Wait, python print(list) uses single quotes for strings. We should match python's exact output `str(["a", "b"])` -> `['a', 'b']`.
        exp = str(arr[::-1])
        tcs.append(fmt_tc(f"Test {i+1} - {l}", inp, inp + "\n", exp, h))
    return tcs

def mk_lists_3():
    tcs = []
    cases = [
        ("mixed", [1,2,3,4,5,6], False),
        ("none even", [1,3,5], True),
        ("all even", [2,4,6,8], True),
        ("empty", [], True),
        ("negatives", [-2,-4], True),
        ("zeros", [0,0,0,0,0], True),
        ("single even", [2], True),
        ("single odd", [3], True),
        ("mixed neg", [-1,-3,2,4], True),
        ("repeat", [2,2,2,2,2,2], True),
    ]
    for i, (l, arr, h) in enumerate(cases):
        n = len(arr)
        inp = str(n) + ("\n" + "\n".join(map(str, arr)) if n > 0 else "")
        exp = str([x**2 for x in arr if x % 2 == 0])
        tcs.append(fmt_tc(f"Test {i+1} - {l}", inp, inp + "\n", exp, h))
    return tcs

def mk_func_1():
    tcs = []
    cases = [
        ("freezing", 0, False),
        ("body temp", 37, False),
        ("boiling", 100, True),
        ("negative", -40, True),
        ("absolute zero", -273.15, True),
        ("mild", 10, True),
        ("float pos", 25.5, True),
        ("float neg", -10.5, True),
        ("large", 999.9, True),
        ("tiny", -0.1, True),
    ]
    for i, (l, c, h) in enumerate(cases):
        exp = f"{(c * 9/5) + 32:.2f}"
        tcs.append(fmt_tc(f"Test {i+1} - {l}", c, str(c) + "\n", exp, h))
    return tcs

def mk_func_2():
    tcs = []
    cases = [
        ("basic", "hello", False),
        ("uppercase", "AEIOU", False),
        ("empty", "", True),
        ("none", "rhythm", True),
        ("mixed short", "sky", True),
        ("mixed long", "abracadabra", True),
        ("numbers", "12345!", True),
        ("all vowels", "aaaaa", True),
        ("alternating case", "aEiOu", True),
        ("complex no vowels", "Tsk Tsk", True),
    ]
    for i, (l, s, h) in enumerate(cases):
        exp = sum(1 for ch in s.lower() if ch in 'aeiou')
        tcs.append(fmt_tc(f"Test {i+1} - {l}", s, s + "\n", exp, h))
    return tcs

def mk_func_3():
    tcs = []
    cases = [
        ("basic match", "racecar", False),
        ("mixed spaces", "race a car", False),
        ("capitals", "Madam", False),
        ("single", "a", True),
        ("empty", "", True),
        ("long sentence", "A man a plan a canal Panama", True),
        ("long sentence 2", "Was it a car or a cat I saw", True),
        ("none", "hello", True),
        ("false sentence", "No lemon no melon", True),
        ("number", "12321", True),
    ]
    for i, (l, s, h) in enumerate(cases):
        clean = s.replace(' ', '').lower()
        exp = "True" if clean == clean[::-1] else "False"
        tcs.append(fmt_tc(f"Test {i+1} - {l}", s, s + "\n", exp, h))
    return tcs

def mk_while_1():
    tcs = []
    for i, n in enumerate([3, 1, 5, 10, 2, 7, 4, 6, 8, 9]):
        h = i >= 1
        lines = [str(x) for x in range(n, 0, -1)] + ["Blast off!"]
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", "\n".join(lines), h))
    return tcs

def mk_while_2():
    tcs = []
    for i, n in enumerate([123, 405, 9, 10, 999, 1000000000, 123456789, 55555, 11, 2048]):
        h = i >= 1
        exp = sum(int(x) for x in str(n))
        tcs.append(fmt_tc(f"Test {i+1} - {n}", n, str(n)+"\n", exp, h))
    return tcs

def mk_for_1():
    tcs = []
    for i, n in enumerate([5, 15, 1, 3, 20, 30, 10, 14, 25, 9]):
        h = i >= 1
        lines = []
        for x in range(1, n+1):
            if x % 15 == 0: lines.append("FizzBuzz")
            elif x % 3 == 0: lines.append("Fizz")
            elif x % 5 == 0: lines.append("Buzz")
            else: lines.append(str(x))
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", "\n".join(lines), h))
    return tcs

def mk_for_2():
    tcs = []
    cases = [
        ("standard", [1,5,2], False),
        ("negatives", [-1,-5], False),
        ("all same", [10,10,10,10,10], True),
        ("single", [99], True),
        ("mixed", [-10,0,10,20], True),
        ("descending", [5,4,3,2,1,0], True),
        ("1 to 10", list(range(1,11)), True),
        ("zeros", [0,0,0], True),
        ("alternating", [1,-1,1,-1], True),
        ("all neg small", [-5,-4,-3,-2], True),
    ]
    for i, (l, arr, h) in enumerate(cases):
        n = len(arr)
        inp = str(n) + ("\n" + "\n".join(map(str, arr)) if n > 0 else "")
        exp = max(arr) if arr else ""
        tcs.append(fmt_tc(f"Test {i+1} - {l}", inp, inp + "\n", exp, h))
    return tcs

def mk_for_3():
    tcs = []
    for i, n in enumerate([2, 10, 1, 5, 0, 7, 9, -1, 100, 12]):
        h = i >= 1
        lines = [f"{x} x {n} = {x*n}" for x in range(1, 11)]
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", "\n".join(lines), h))
    return tcs

def mk_for_4():
    tcs = []
    for i, n in enumerate([4, 7, 2, 5, 3, 6, 8, 9, 10, 11]):
        h = i >= 2 # keep 2 public tests as currently 
        lines = ["-" * n]
        if n >= 2:
            for _ in range(n - 2):
                lines.append("|" + " " * (n - 2) + "|")
        lines.append("-" * n)
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", "\n".join(lines), h))
    return tcs

def mk_for_5():
    tcs = []
    for i, n in enumerate([3, 5, 1, 8, 2, 4, 6, 7, 9, 10]):
        h = i >= 1 # keep 1 public test mostly? user liked my 1/8 so 3 and 1 non-hidden.
        if i == 2: h = False # Test 3 (n=1) is public
        lines = []
        for r in range(1, n+1):
            lines.append(" "*(n-r) + " ".join(["*"]*r))
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", "\n".join(lines), h))
    return tcs

def mk_func_4():
    tcs = []
    cases = [
        ("mixed numbers", [2,4,5,8,11], False, [2,5,11]),
        ("no primes", [4,6,8], False, []),
        ("includes negatives and zero", [-3,0,1,2,7], True, [2,7]),
        ("empty list", [], True, []),
        ("all primes", [2,3,5,7,11], True, [2,3,5,7,11]),
        ("large primes", [97, 100, 101], True, [97, 101]),
        ("mostly ones and zeros", [0, 1, 1, 0, 2], True, [2]),
        ("negatives only", [-5, -7, -11], True, []),
        ("large range", list(range(10)), True, [2, 3, 5, 7]),
        ("repeated primes", [3, 3, 3, 4, 3], True, [3, 3, 3, 3]),
    ]
    for i, (l, arr, h, exp_arr) in enumerate(cases):
        n = len(arr)
        inp = str(n) + ("\n" + "\n".join(map(str, arr)) if n > 0 else "")
        exp = str(exp_arr)
        tcs.append(fmt_tc(f"Test {i+1} - {l}", inp, inp + "\n", exp, h))
    return tcs

def mk_for_6():
    tcs = []
    cases = [5, 3, 7, 9, 11, 13, 15, 17, 19, 21]
    for i, n in enumerate(cases):
        h = i >= 2
        lines = []
        mid = n // 2
        for r in range(n):
            spaces = abs(mid - r)
            stars = n - 2 * spaces
            lines.append(" " * spaces + "*" * stars)
        exp = "\n".join(lines)
        tcs.append(fmt_tc(f"Test {i+1} - n={n}", n, str(n)+"\n", exp, h))
    return tcs

flat_problems = [
    {
      "id": "lists-1",
      "title": "Sum of a List",
      "topic": "Lists",
      "difficulty": "easy",
      "description": "Read an integer N representing the number of elements. Then the next N lines are the elements in the list (integers). Print the total sum of these integers. Do not use the built-in sum() function.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [
        { "word": "sum(", "feedback": "You cannot use the built-in sum() function. You must manually loop and add the numbers." }
      ],
      "testCases": mk_lists_1(),
      "constraints": ["Do not use the built-in sum() function.", "Return 0 if N is 0."],
      "hints": ["Read N first. Then use a loop that runs N times to read the rest.", "Keep a running total."],
      "solution": "n = int(input())\ntotal = 0\nfor _ in range(n):\n    total += int(input())\nprint(total)",
      "solutionExplanation": "First read N. Then loop N times, reading an integer and adding it to the total, finally printing total."
    },
    {
      "id": "lists-2",
      "title": "Reverse a List",
      "topic": "Lists",
      "difficulty": "easy",
      "description": "Read an integer N, then the next N lines are the elements in the list (strings). Print the elements in reverse order, formatting the output strictly as a Python list like ['c', 'b', 'a'].",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [
        { "word": ".reverse(", "feedback": "You cannot use the .reverse() method. Do it manually." },
        { "word": "[::-1]", "feedback": "You cannot use Python slice reversal [::-1]. Iterate backward manually." },
        { "word": "reversed(", "feedback": "You cannot use the built-in reversed() iterator." }
      ],
      "testCases": mk_lists_2(),
      "constraints": ["Do not use .reverse() or [::-1]."],
      "hints": ["Store the inputs in a list, then build a new list backwards and print it."],
      "solution": "n = int(input())\nlst = []\nfor _ in range(n):\n    lst.append(input())\nresult = []\nfor i in range(n - 1, -1, -1):\n    result.append(lst[i])\nprint(result)",
      "solutionExplanation": "Read everything into a list, then iterate backwards to create the reversed list."
    },
    {
      "id": "lists-3",
      "title": "Even Squares",
      "topic": "Lists",
      "difficulty": "medium",
      "description": "Read an integer N, then the next N lines are the elements in the list (integers). Print a list containing the squares of only the even numbers. Use a list comprehension.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "[", "feedback": "Use a list comprehension to generate the result." },
        { "word": "for", "feedback": "A list comprehension requires a 'for' clause." },
        { "word": "if", "feedback": "A list comprehension requires an 'if' condition to filter evens." }
      ],
      "negativeKeywords": [],
      "testCases": mk_lists_3(),
      "constraints": ["Must use a list comprehension."],
      "hints": ["Gather inputs into a list first.", "Then apply a list comprehension: [x**2 for x in nums if x % 2 == 0]"],
      "solution": "n = int(input())\nnums = [int(input()) for _ in range(n)]\nresult = [x**2 for x in nums if x % 2 == 0]\nprint(result)",
      "solutionExplanation": "After reading the numbers, a single comprehension filters evens and squares them."
    },
    {
      "id": "func-1",
      "title": "Celsius to Fahrenheit",
      "topic": "Functions",
      "difficulty": "easy",
      "description": "Read a single float on one line representing Celsius. Print the Fahrenheit equivalent restricted to 2 decimal places. F = (C * 9/5) + 32.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": ":.2f", "feedback": "You must use the ':.2f' format specifier inside an f-string to pad the output to 2 decimal places." }
      ],
      "negativeKeywords": [
        { "word": "round(", "feedback": "Do not use the round() function. Use f-string formatting instead." }
      ],
      "testCases": mk_func_1(),
      "constraints": ["Input is a float.", "Must use f-strings."],
      "hints": ["Use an f-string like f'{val:.2f}'."],
      "solution": "c = float(input())\nfah = (c * 9/5) + 32\nprint(f\"{fah:.2f}\")",
      "solutionExplanation": "Calculate the conversion, then format it to 2 fixed decimal places strings."
    },
    {
      "id": "func-2",
      "title": "Count Vowels",
      "topic": "Functions",
      "difficulty": "easy",
      "description": "Read a single string. Print the number of vowels (a, e, i, o, u) present in the string. Ignore case.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [],
      "testCases": mk_func_2(),
      "constraints": ["Case-insensitive."],
      "hints": ["Iterate through the string lowercase and count matches against 'aeiou'."],
      "solution": "text = input().lower()\ncount = sum(1 for ch in text if ch in 'aeiou')\nprint(count)",
      "solutionExplanation": "String reading followed by counting occurrences of vowels."
    },
    {
      "id": "func-3",
      "title": "Is Palindrome",
      "topic": "Functions",
      "difficulty": "medium",
      "description": "Read a single string. Print 'True' if it is a palindrome, 'False' otherwise. Ignore case and spaces.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [],
      "testCases": mk_func_3(),
      "constraints": ["Ignore case and space."],
      "hints": ["Clean the string with .replace(' ', '').lower() before checking if it equals its reverse."],
      "solution": "s = input().replace(' ', '').lower()\nprint(s == s[::-1])",
      "solutionExplanation": "Clean the input first, then compare against its reversed slice."
    },
    {
      "id": "while-1",
      "title": "Countdown",
      "topic": "While Loop",
      "difficulty": "easy",
      "description": "Read a positive integer N. Print N down to 1 using a while loop, followed by 'Blast off!'.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "while", "feedback": "You must use a while loop for this problem." }
      ],
      "negativeKeywords": [
        { "word": "for ", "feedback": "Do not use a for loop in this problem." },
        { "word": "for\\t", "feedback": "Do not use a for loop in this problem." }
      ],
      "testCases": mk_while_1(),
      "constraints": ["Must use a while loop."],
      "hints": ["Loop while N > 0."],
      "solution": "n = int(input())\nwhile n > 0:\n    print(n)\n    n -= 1\nprint(\"Blast off!\")",
      "solutionExplanation": "Simple decrementing loop."
    },
    {
      "id": "while-2",
      "title": "Digit Sum",
      "topic": "While Loop",
      "difficulty": "medium",
      "description": "Read a positive integer N. Print the sum of its digits using a while loop and math operators (% and //). Do not convert to string.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "while", "feedback": "You must use a while loop." },
        { "word": "%", "feedback": "You must use the modulo operator (%) to get the remainder/last digit." },
        { "word": "//", "feedback": "You must use floor division (//) to chop off the last digit." }
      ],
      "negativeKeywords": [
        { "word": "str(", "feedback": "You cannot convert the number to a string to process digits." }
      ],
      "testCases": mk_while_2(),
      "constraints": ["Do not convert to a string."],
      "hints": ["Isolate the last digit with `% 10`.", "Remove the last digit with `// 10`."],
      "solution": "n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)",
      "solutionExplanation": "Repeatedly extract the last digit and add it to total."
    },
    {
      "id": "for-1",
      "title": "FizzBuzz",
      "topic": "For Loop",
      "difficulty": "easy",
      "description": "Read integer N. For 1 to N, print 'Fizz' if divisible by 3, 'Buzz' if by 5, 'FizzBuzz' if both, else print the number.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "for", "feedback": "You must use a for loop." },
        { "word": "range(", "feedback": "Use range() to generate the sequence of numbers." }
      ],
      "negativeKeywords": [],
      "testCases": mk_for_1(),
      "constraints": ["Use a for loop."],
      "hints": ["Check the combined condition (mod 15) first."],
      "solution": "n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print(\"FizzBuzz\")\n    elif i % 3 == 0:\n        print(\"Fizz\")\n    elif i % 5 == 0:\n        print(\"Buzz\")\n    else:\n        print(i)",
      "solutionExplanation": "Standard Fizzbuzz using modulo arithmetic."
    },
    {
      "id": "for-2",
      "title": "Find Maximum",
      "topic": "For Loop",
      "difficulty": "easy",
      "description": "Read an integer N, then the next N lines are the elements in the list. Print the largest number found. Do not use max().",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [
        { "word": "max(", "feedback": "You cannot use the built-in max() function. Keep track of the current highest score in a variable." },
        { "word": "sort(", "feedback": "You cannot sort the list to find the maximum." }
      ],
      "testCases": mk_for_2(),
      "constraints": ["Do not use max()."],
      "hints": ["Read the first number outside the loop and set it as the current maximum."],
      "solution": "n = int(input())\nbest = -float('inf')\nfor _ in range(n):\n    v = int(input())\n    if v > best:\n        best = v\nprint(best)",
      "solutionExplanation": "Maintain the highest seen value continuously."
    },
    {
      "id": "for-3",
      "title": "Multiplication Table",
      "topic": "For Loop",
      "difficulty": "medium",
      "description": "Read N. Print the multiplication table for N from 1 to 10 (e.g. '1 x 5 = 5').",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "for", "feedback": "You must use a for loop." }
      ],
      "negativeKeywords": [],
      "testCases": mk_for_3(),
      "constraints": ["Print exactly 10 lines."],
      "hints": ["Use formatting like f'{i} x {n} = {i*n}'."],
      "solution": "n = int(input())\nfor i in range(1, 11):\n    print(f\"{i} x {n} = {i*n}\")",
      "solutionExplanation": "Loop from 1 to 10 and format the string output."
    },
    {
      "id": "for-4",
      "title": "Box Pattern",
      "topic": "For Loop",
      "difficulty": "medium",
      "description": "Read an integer N (where N >= 2). Print an N x N box. The top and bottom borders should be made of hyphens '-' and the left/right borders of the middle rows should be pipes '|'.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [],
      "testCases": mk_for_4(),
      "constraints": ["N will be at least 2."],
      "hints": ["The top and bottom are strings of N hyphens.", "The middle rows use a pipe, N-2 spaces, and another pipe."],
      "solution": "n = int(input())\nprint(\"-\" * n)\nfor _ in range(n - 2):\n    print(\"|\" + \" \" * (n - 2) + \"|\")\nprint(\"-\" * n)",
      "solutionExplanation": "Use string multiplication to print the top and bottom borders. Use a loop to print the middle rows with pipes and spaces."
    },
    {
      "id": "for-5",
      "title": "Christmas Tree",
      "topic": "For Loop",
      "difficulty": "medium",
      "description": "Read an integer N. Print a Christmas tree of height N using stars '*'. Each star in a row should be separated by a space, and the tree should be centered. Notice that the first row has N-1 leading spaces and 1 star, the second has N-2 leading spaces and 2 stars, etc.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "for", "feedback": "You must use a for loop to iterate through the rows." }
      ],
      "negativeKeywords": [],
      "testCases": mk_for_5(),
      "constraints": ["N will be at least 1."],
      "hints": ["For row i (from 1 to N), print N-i spaces followed by i stars separated by a space."],
      "solution": "n = int(input())\nfor i in range(1, n + 1):\n    print(\" \" * (n - i) + \" \".join([\"*\"] * i))",
      "solutionExplanation": "Iterate from 1 to N. Calculate the leading spaces and join the stars with a space."
    },
    {
      "id": "func-4",
      "title": "Filter Primes",
      "topic": "Functions",
      "difficulty": "hard",
      "description": "Write a function filter_primes(lst) that accepts a list of integers and returns a new list containing only the prime numbers from the input list, preserving their original order. A prime number is a positive integer greater than 1 having no divisors other than 1 and itself.",
      "starterCode": "def filter_primes(lst):\n    # Write your code here\n    pass\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))\n",
      "positiveKeywords": [
        { "word": "def filter_primes(", "feedback": "You must define the function filter_primes(lst)." },
        { "word": "return", "feedback": "Your function must return the resulting list." }
      ],
      "negativeKeywords": [],
      "testCases": mk_func_4(),
      "constraints": ["Numbers like 0, 1, and negative numbers are NOT prime."],
      "hints": ["Create a helper function is_prime(n) that returns True if n is prime, False otherwise.", "Iterate over the input list and append to a new list if is_prime(x) is True."],
      "solution": "def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ndef filter_primes(lst):\n    result = []\n    for num in lst:\n        if is_prime(num):\n            result.append(num)\n    return result\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))",
      "solutionExplanation": "A helper function checks if a number is prime by attempting division up to its square root. The main function builds a new list by iterating through the original list and keeping only the primes."
    },
    {
      "id": "for-6",
      "title": "Diamond Pattern",
      "topic": "For Loop",
      "difficulty": "hard",
      "description": "Read an odd integer N (where N >= 3). Use a `for` loop to print a symmetrical diamond of stars (`*`) of height N. The top and bottom rows should have 1 star, the middle row must have N stars. The stars should NOT be separated by spaces, but you will need leading spaces to center them.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        { "word": "for", "feedback": "You must use at least one for loop." }
      ],
      "negativeKeywords": [],
      "testCases": mk_for_6(),
      "constraints": ["N will be an odd integer >= 3."],
      "hints": ["Consider calculating the distance from the middle row.", "If the middle index is mid = N // 2, the number of leading spaces for row i (0 to N-1) is abs(mid - i).", "The number of stars for row i is N - 2 * spaces."],
      "solution": "n = int(input())\nmid = n // 2\nfor i in range(n):\n    spaces = abs(mid - i)\n    stars = n - 2 * spaces\n    print(\" \" * spaces + \"*\" * stars)",
      "solutionExplanation": "By calculating the distance of the current row from the middle using abs(), we determine how many leading spaces are needed. The number of stars is simply the total width N minus twice the leading spaces."
    }
]

structured_problems = {
    "lists": [p for p in flat_problems if p["topic"] == "Lists"],
    "functions": [p for p in flat_problems if p["topic"] == "Functions"],
    "while_loop": [p for p in flat_problems if p["topic"] == "While Loop"],
    "for_loop": [p for p in flat_problems if p["topic"] == "For Loop"]
}

js_content = "export const problems = " + json.dumps(structured_problems, indent=2) + ";"
with open("c:\\\\Users\\\\BTB\\\\Desktop\\\\GitHub\\\\IntroCompSciPractice\\\\IntroCompSciPractice\\\\src\\\\data\\\\problems.js", "w", encoding="utf-8") as f:
    f.write(js_content)
