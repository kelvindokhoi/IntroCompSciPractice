export const problems = {
  "lists": [
    {
      "id": "lists-1",
      "title": "Sum of a List",
      "topic": "Lists",
      "difficulty": "easy",
      "description": "Read an integer N representing the number of elements. Then the next N lines are the elements in the list (integers). Print the total sum of these integers. Do not use the built-in sum() function.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [],
      "negativeKeywords": [
        {
          "word": "sum(",
          "feedback": "You cannot use the built-in sum() function. You must manually loop and add the numbers."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - basic positive",
          "input": "5\n1\n2\n3\n4\n5",
          "testInput": "5\n1\n2\n3\n4\n5\n",
          "expected": "15",
          "hidden": false
        },
        {
          "label": "Test 2 - includes negatives",
          "input": "3\n-1\n0\n1",
          "testInput": "3\n-1\n0\n1\n",
          "expected": "0",
          "hidden": false
        },
        {
          "label": "Test 3 - empty list",
          "input": "0",
          "testInput": "0\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 4 - all zeros",
          "input": "5\n0\n0\n0\n0\n0",
          "testInput": "5\n0\n0\n0\n0\n0\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 5 - single element",
          "input": "1\n999",
          "testInput": "1\n999\n",
          "expected": "999",
          "hidden": true
        },
        {
          "label": "Test 6 - all negatives",
          "input": "3\n-5\n-10\n-15",
          "testInput": "3\n-5\n-10\n-15\n",
          "expected": "-30",
          "hidden": true
        },
        {
          "label": "Test 7 - alternating",
          "input": "4\n1\n-1\n1\n-1",
          "testInput": "4\n1\n-1\n1\n-1\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 8 - large range",
          "input": "100\n0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99",
          "testInput": "100\n0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n",
          "expected": "4950",
          "hidden": true
        },
        {
          "label": "Test 9 - two elements",
          "input": "2\n42\n58",
          "testInput": "2\n42\n58\n",
          "expected": "100",
          "hidden": true
        },
        {
          "label": "Test 10 - triple zero",
          "input": "3\n0\n0\n0",
          "testInput": "3\n0\n0\n0\n",
          "expected": "0",
          "hidden": true
        }
      ],
      "constraints": [
        "Do not use the built-in sum() function.",
        "Return 0 if N is 0."
      ],
      "hints": [
        "Read N first. Then use a loop that runs N times to read the rest.",
        "Keep a running total."
      ],
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
        {
          "word": ".reverse(",
          "feedback": "You cannot use the .reverse() method. Do it manually."
        },
        {
          "word": "[::-1]",
          "feedback": "You cannot use Python slice reversal [::-1]. Iterate backward manually."
        },
        {
          "word": "reversed(",
          "feedback": "You cannot use the built-in reversed() iterator."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - basic",
          "input": "3\na\nb\nc",
          "testInput": "3\na\nb\nc\n",
          "expected": "['c', 'b', 'a']",
          "hidden": false
        },
        {
          "label": "Test 2 - empty",
          "input": "0",
          "testInput": "0\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 3 - single",
          "input": "1\nx",
          "testInput": "1\nx\n",
          "expected": "['x']",
          "hidden": true
        },
        {
          "label": "Test 4 - same",
          "input": "3\na\na\na",
          "testInput": "3\na\na\na\n",
          "expected": "['a', 'a', 'a']",
          "hidden": true
        },
        {
          "label": "Test 5 - numbers as strings",
          "input": "4\n1\n2\n3\n4",
          "testInput": "4\n1\n2\n3\n4\n",
          "expected": "['4', '3', '2', '1']",
          "hidden": true
        },
        {
          "label": "Test 6 - special chars",
          "input": "3\n@\n#\n$",
          "testInput": "3\n@\n#\n$\n",
          "expected": "['$', '#', '@']",
          "hidden": true
        },
        {
          "label": "Test 7 - mixed lengths",
          "input": "3\napple\nb\ncat",
          "testInput": "3\napple\nb\ncat\n",
          "expected": "['cat', 'b', 'apple']",
          "hidden": true
        },
        {
          "label": "Test 8 - spaces",
          "input": "2\na b\nc d",
          "testInput": "2\na b\nc d\n",
          "expected": "['c d', 'a b']",
          "hidden": true
        },
        {
          "label": "Test 9 - seven",
          "input": "7\na\nb\nc\nd\ne\nf\ng",
          "testInput": "7\na\nb\nc\nd\ne\nf\ng\n",
          "expected": "['g', 'f', 'e', 'd', 'c', 'b', 'a']",
          "hidden": true
        },
        {
          "label": "Test 10 - two",
          "input": "2\ny\nz",
          "testInput": "2\ny\nz\n",
          "expected": "['z', 'y']",
          "hidden": true
        }
      ],
      "constraints": [
        "Do not use .reverse() or [::-1]."
      ],
      "hints": [
        "Store the inputs in a list, then build a new list backwards and print it."
      ],
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
        {
          "word": "[",
          "feedback": "Use a list comprehension to generate the result."
        },
        {
          "word": "for",
          "feedback": "A list comprehension requires a 'for' clause."
        },
        {
          "word": "if",
          "feedback": "A list comprehension requires an 'if' condition to filter evens."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - mixed",
          "input": "6\n1\n2\n3\n4\n5\n6",
          "testInput": "6\n1\n2\n3\n4\n5\n6\n",
          "expected": "[4, 16, 36]",
          "hidden": false
        },
        {
          "label": "Test 2 - none even",
          "input": "3\n1\n3\n5",
          "testInput": "3\n1\n3\n5\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 3 - all even",
          "input": "4\n2\n4\n6\n8",
          "testInput": "4\n2\n4\n6\n8\n",
          "expected": "[4, 16, 36, 64]",
          "hidden": true
        },
        {
          "label": "Test 4 - empty",
          "input": "0",
          "testInput": "0\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 5 - negatives",
          "input": "2\n-2\n-4",
          "testInput": "2\n-2\n-4\n",
          "expected": "[4, 16]",
          "hidden": true
        },
        {
          "label": "Test 6 - zeros",
          "input": "5\n0\n0\n0\n0\n0",
          "testInput": "5\n0\n0\n0\n0\n0\n",
          "expected": "[0, 0, 0, 0, 0]",
          "hidden": true
        },
        {
          "label": "Test 7 - single even",
          "input": "1\n2",
          "testInput": "1\n2\n",
          "expected": "[4]",
          "hidden": true
        },
        {
          "label": "Test 8 - single odd",
          "input": "1\n3",
          "testInput": "1\n3\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 9 - mixed neg",
          "input": "4\n-1\n-3\n2\n4",
          "testInput": "4\n-1\n-3\n2\n4\n",
          "expected": "[4, 16]",
          "hidden": true
        },
        {
          "label": "Test 10 - repeat",
          "input": "6\n2\n2\n2\n2\n2\n2",
          "testInput": "6\n2\n2\n2\n2\n2\n2\n",
          "expected": "[4, 4, 4, 4, 4, 4]",
          "hidden": true
        }
      ],
      "constraints": [
        "Must use a list comprehension."
      ],
      "hints": [
        "Gather inputs into a list first.",
        "Then apply a list comprehension: [x**2 for x in nums if x % 2 == 0]"
      ],
      "solution": "n = int(input())\nnums = [int(input()) for _ in range(n)]\nresult = [x**2 for x in nums if x % 2 == 0]\nprint(result)",
      "solutionExplanation": "After reading the numbers, a single comprehension filters evens and squares them."
    }
  ],
  "functions": [
    {
      "id": "func-1",
      "title": "Celsius to Fahrenheit",
      "topic": "Functions",
      "difficulty": "easy",
      "description": "Read a single float on one line representing Celsius. Print the Fahrenheit equivalent restricted to 2 decimal places. F = (C * 9/5) + 32.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        {
          "word": ":.2f",
          "feedback": "You must use the ':.2f' format specifier inside an f-string to pad the output to 2 decimal places."
        }
      ],
      "negativeKeywords": [
        {
          "word": "round(",
          "feedback": "Do not use the round() function. Use f-string formatting instead."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - freezing",
          "input": "0",
          "testInput": "0\n",
          "expected": "32.00",
          "hidden": false
        },
        {
          "label": "Test 2 - body temp",
          "input": "37",
          "testInput": "37\n",
          "expected": "98.60",
          "hidden": false
        },
        {
          "label": "Test 3 - boiling",
          "input": "100",
          "testInput": "100\n",
          "expected": "212.00",
          "hidden": true
        },
        {
          "label": "Test 4 - negative",
          "input": "-40",
          "testInput": "-40\n",
          "expected": "-40.00",
          "hidden": true
        },
        {
          "label": "Test 5 - absolute zero",
          "input": "-273.15",
          "testInput": "-273.15\n",
          "expected": "-459.67",
          "hidden": true
        },
        {
          "label": "Test 6 - mild",
          "input": "10",
          "testInput": "10\n",
          "expected": "50.00",
          "hidden": true
        },
        {
          "label": "Test 7 - float pos",
          "input": "25.5",
          "testInput": "25.5\n",
          "expected": "77.90",
          "hidden": true
        },
        {
          "label": "Test 8 - float neg",
          "input": "-10.5",
          "testInput": "-10.5\n",
          "expected": "13.10",
          "hidden": true
        },
        {
          "label": "Test 9 - large",
          "input": "999.9",
          "testInput": "999.9\n",
          "expected": "1831.82",
          "hidden": true
        },
        {
          "label": "Test 10 - tiny",
          "input": "-0.1",
          "testInput": "-0.1\n",
          "expected": "31.82",
          "hidden": true
        }
      ],
      "constraints": [
        "Input is a float.",
        "Must use f-strings."
      ],
      "hints": [
        "Use an f-string like f'{val:.2f}'."
      ],
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
      "testCases": [
        {
          "label": "Test 1 - basic",
          "input": "hello",
          "testInput": "hello\n",
          "expected": "2",
          "hidden": false
        },
        {
          "label": "Test 2 - uppercase",
          "input": "AEIOU",
          "testInput": "AEIOU\n",
          "expected": "5",
          "hidden": false
        },
        {
          "label": "Test 3 - empty",
          "input": "",
          "testInput": "\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 4 - none",
          "input": "rhythm",
          "testInput": "rhythm\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 5 - mixed short",
          "input": "sky",
          "testInput": "sky\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 6 - mixed long",
          "input": "abracadabra",
          "testInput": "abracadabra\n",
          "expected": "5",
          "hidden": true
        },
        {
          "label": "Test 7 - numbers",
          "input": "12345!",
          "testInput": "12345!\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 8 - all vowels",
          "input": "aaaaa",
          "testInput": "aaaaa\n",
          "expected": "5",
          "hidden": true
        },
        {
          "label": "Test 9 - alternating case",
          "input": "aEiOu",
          "testInput": "aEiOu\n",
          "expected": "5",
          "hidden": true
        },
        {
          "label": "Test 10 - complex no vowels",
          "input": "Tsk Tsk",
          "testInput": "Tsk Tsk\n",
          "expected": "0",
          "hidden": true
        }
      ],
      "constraints": [
        "Case-insensitive."
      ],
      "hints": [
        "Iterate through the string lowercase and count matches against 'aeiou'."
      ],
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
      "testCases": [
        {
          "label": "Test 1 - basic match",
          "input": "racecar",
          "testInput": "racecar\n",
          "expected": "True",
          "hidden": false
        },
        {
          "label": "Test 2 - mixed spaces",
          "input": "race a car",
          "testInput": "race a car\n",
          "expected": "False",
          "hidden": false
        },
        {
          "label": "Test 3 - capitals",
          "input": "Madam",
          "testInput": "Madam\n",
          "expected": "True",
          "hidden": false
        },
        {
          "label": "Test 4 - single",
          "input": "a",
          "testInput": "a\n",
          "expected": "True",
          "hidden": true
        },
        {
          "label": "Test 5 - empty",
          "input": "",
          "testInput": "\n",
          "expected": "True",
          "hidden": true
        },
        {
          "label": "Test 6 - long sentence",
          "input": "A man a plan a canal Panama",
          "testInput": "A man a plan a canal Panama\n",
          "expected": "True",
          "hidden": true
        },
        {
          "label": "Test 7 - long sentence 2",
          "input": "Was it a car or a cat I saw",
          "testInput": "Was it a car or a cat I saw\n",
          "expected": "True",
          "hidden": true
        },
        {
          "label": "Test 8 - none",
          "input": "hello",
          "testInput": "hello\n",
          "expected": "False",
          "hidden": true
        },
        {
          "label": "Test 9 - false sentence",
          "input": "No lemon no melon",
          "testInput": "No lemon no melon\n",
          "expected": "True",
          "hidden": true
        },
        {
          "label": "Test 10 - number",
          "input": "12321",
          "testInput": "12321\n",
          "expected": "True",
          "hidden": true
        }
      ],
      "constraints": [
        "Ignore case and space."
      ],
      "hints": [
        "Clean the string with .replace(' ', '').lower() before checking if it equals its reverse."
      ],
      "solution": "s = input().replace(' ', '').lower()\nprint(s == s[::-1])",
      "solutionExplanation": "Clean the input first, then compare against its reversed slice."
    },
    {
      "id": "func-4",
      "title": "Filter Primes",
      "topic": "Functions",
      "difficulty": "hard",
      "description": "Write a function filter_primes(lst) that accepts a list of integers and returns a new list containing only the prime numbers from the input list, preserving their original order. A prime number is a positive integer greater than 1 having no divisors other than 1 and itself.",
      "starterCode": "def filter_primes(lst):\n    # Write your code here\n    pass\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))\n",
      "positiveKeywords": [
        {
          "word": "def filter_primes(",
          "feedback": "You must define the function filter_primes(lst)."
        },
        {
          "word": "return",
          "feedback": "Your function must return the resulting list."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - mixed numbers",
          "input": "5\n2\n4\n5\n8\n11",
          "testInput": "5\n2\n4\n5\n8\n11\n",
          "expected": "[2, 5, 11]",
          "hidden": false
        },
        {
          "label": "Test 2 - no primes",
          "input": "3\n4\n6\n8",
          "testInput": "3\n4\n6\n8\n",
          "expected": "[]",
          "hidden": false
        },
        {
          "label": "Test 3 - includes negatives and zero",
          "input": "5\n-3\n0\n1\n2\n7",
          "testInput": "5\n-3\n0\n1\n2\n7\n",
          "expected": "[2, 7]",
          "hidden": true
        },
        {
          "label": "Test 4 - empty list",
          "input": "0",
          "testInput": "0\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 5 - all primes",
          "input": "5\n2\n3\n5\n7\n11",
          "testInput": "5\n2\n3\n5\n7\n11\n",
          "expected": "[2, 3, 5, 7, 11]",
          "hidden": true
        },
        {
          "label": "Test 6 - large primes",
          "input": "3\n97\n100\n101",
          "testInput": "3\n97\n100\n101\n",
          "expected": "[97, 101]",
          "hidden": true
        },
        {
          "label": "Test 7 - mostly ones and zeros",
          "input": "5\n0\n1\n1\n0\n2",
          "testInput": "5\n0\n1\n1\n0\n2\n",
          "expected": "[2]",
          "hidden": true
        },
        {
          "label": "Test 8 - negatives only",
          "input": "3\n-5\n-7\n-11",
          "testInput": "3\n-5\n-7\n-11\n",
          "expected": "[]",
          "hidden": true
        },
        {
          "label": "Test 9 - large range",
          "input": "10\n0\n1\n2\n3\n4\n5\n6\n7\n8\n9",
          "testInput": "10\n0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
          "expected": "[2, 3, 5, 7]",
          "hidden": true
        },
        {
          "label": "Test 10 - repeated primes",
          "input": "5\n3\n3\n3\n4\n3",
          "testInput": "5\n3\n3\n3\n4\n3\n",
          "expected": "[3, 3, 3, 3]",
          "hidden": true
        }
      ],
      "constraints": [
        "Numbers like 0, 1, and negative numbers are NOT prime."
      ],
      "hints": [
        "Create a helper function is_prime(n) that returns True if n is prime, False otherwise.",
        "Iterate over the input list and append to a new list if is_prime(x) is True."
      ],
      "solution": "def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\ndef filter_primes(lst):\n    result = []\n    for num in lst:\n        if is_prime(num):\n            result.append(num)\n    return result\n\n# --- Do not modify below this line ---\nn = int(input())\nnums = []\nfor _ in range(n):\n    nums.append(int(input()))\nprint(filter_primes(nums))",
      "solutionExplanation": "A helper function checks if a number is prime by attempting division up to its square root. The main function builds a new list by iterating through the original list and keeping only the primes."
    }
  ],
  "while_loop": [
    {
      "id": "while-1",
      "title": "Countdown",
      "topic": "While Loop",
      "difficulty": "easy",
      "description": "Read a positive integer N. Print N down to 1 using a while loop, followed by 'Blast off!'.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        {
          "word": "while",
          "feedback": "You must use a while loop for this problem."
        }
      ],
      "negativeKeywords": [
        {
          "word": "for ",
          "feedback": "Do not use a for loop in this problem."
        },
        {
          "word": "for\\t",
          "feedback": "Do not use a for loop in this problem."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - n=3",
          "input": "3",
          "testInput": "3\n",
          "expected": "3\n2\n1\nBlast off!",
          "hidden": false
        },
        {
          "label": "Test 2 - n=1",
          "input": "1",
          "testInput": "1\n",
          "expected": "1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 3 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 4 - n=10",
          "input": "10",
          "testInput": "10\n",
          "expected": "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 5 - n=2",
          "input": "2",
          "testInput": "2\n",
          "expected": "2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 6 - n=7",
          "input": "7",
          "testInput": "7\n",
          "expected": "7\n6\n5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 7 - n=4",
          "input": "4",
          "testInput": "4\n",
          "expected": "4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 8 - n=6",
          "input": "6",
          "testInput": "6\n",
          "expected": "6\n5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 9 - n=8",
          "input": "8",
          "testInput": "8\n",
          "expected": "8\n7\n6\n5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        },
        {
          "label": "Test 10 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "9\n8\n7\n6\n5\n4\n3\n2\n1\nBlast off!",
          "hidden": true
        }
      ],
      "constraints": [
        "Must use a while loop."
      ],
      "hints": [
        "Loop while N > 0."
      ],
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
        {
          "word": "while",
          "feedback": "You must use a while loop."
        },
        {
          "word": "%",
          "feedback": "You must use the modulo operator (%) to get the remainder/last digit."
        },
        {
          "word": "//",
          "feedback": "You must use floor division (//) to chop off the last digit."
        }
      ],
      "negativeKeywords": [
        {
          "word": "str(",
          "feedback": "You cannot convert the number to a string to process digits."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - 123",
          "input": "123",
          "testInput": "123\n",
          "expected": "6",
          "hidden": false
        },
        {
          "label": "Test 2 - 405",
          "input": "405",
          "testInput": "405\n",
          "expected": "9",
          "hidden": true
        },
        {
          "label": "Test 3 - 9",
          "input": "9",
          "testInput": "9\n",
          "expected": "9",
          "hidden": true
        },
        {
          "label": "Test 4 - 10",
          "input": "10",
          "testInput": "10\n",
          "expected": "1",
          "hidden": true
        },
        {
          "label": "Test 5 - 999",
          "input": "999",
          "testInput": "999\n",
          "expected": "27",
          "hidden": true
        },
        {
          "label": "Test 6 - 1000000000",
          "input": "1000000000",
          "testInput": "1000000000\n",
          "expected": "1",
          "hidden": true
        },
        {
          "label": "Test 7 - 123456789",
          "input": "123456789",
          "testInput": "123456789\n",
          "expected": "45",
          "hidden": true
        },
        {
          "label": "Test 8 - 55555",
          "input": "55555",
          "testInput": "55555\n",
          "expected": "25",
          "hidden": true
        },
        {
          "label": "Test 9 - 11",
          "input": "11",
          "testInput": "11\n",
          "expected": "2",
          "hidden": true
        },
        {
          "label": "Test 10 - 2048",
          "input": "2048",
          "testInput": "2048\n",
          "expected": "14",
          "hidden": true
        }
      ],
      "constraints": [
        "Do not convert to a string."
      ],
      "hints": [
        "Isolate the last digit with `% 10`.",
        "Remove the last digit with `// 10`."
      ],
      "solution": "n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)",
      "solutionExplanation": "Repeatedly extract the last digit and add it to total."
    }
  ],
  "for_loop": [
    {
      "id": "for-1",
      "title": "FizzBuzz",
      "topic": "For Loop",
      "difficulty": "easy",
      "description": "Read integer N. For 1 to N, print 'Fizz' if divisible by 3, 'Buzz' if by 5, 'FizzBuzz' if both, else print the number.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        {
          "word": "for",
          "feedback": "You must use a for loop."
        },
        {
          "word": "range(",
          "feedback": "Use range() to generate the sequence of numbers."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "1\n2\nFizz\n4\nBuzz",
          "hidden": false
        },
        {
          "label": "Test 2 - n=15",
          "input": "15",
          "testInput": "15\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
          "hidden": true
        },
        {
          "label": "Test 3 - n=1",
          "input": "1",
          "testInput": "1\n",
          "expected": "1",
          "hidden": true
        },
        {
          "label": "Test 4 - n=3",
          "input": "3",
          "testInput": "3\n",
          "expected": "1\n2\nFizz",
          "hidden": true
        },
        {
          "label": "Test 5 - n=20",
          "input": "20",
          "testInput": "20\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz",
          "hidden": true
        },
        {
          "label": "Test 6 - n=30",
          "input": "30",
          "testInput": "30\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz",
          "hidden": true
        },
        {
          "label": "Test 7 - n=10",
          "input": "10",
          "testInput": "10\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz",
          "hidden": true
        },
        {
          "label": "Test 8 - n=14",
          "input": "14",
          "testInput": "14\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14",
          "hidden": true
        },
        {
          "label": "Test 9 - n=25",
          "input": "25",
          "testInput": "25\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz",
          "hidden": true
        },
        {
          "label": "Test 10 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz",
          "hidden": true
        }
      ],
      "constraints": [
        "Use a for loop."
      ],
      "hints": [
        "Check the combined condition (mod 15) first."
      ],
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
        {
          "word": "max(",
          "feedback": "You cannot use the built-in max() function. Keep track of the current highest score in a variable."
        },
        {
          "word": "sort(",
          "feedback": "You cannot sort the list to find the maximum."
        }
      ],
      "testCases": [
        {
          "label": "Test 1 - standard",
          "input": "3\n1\n5\n2",
          "testInput": "3\n1\n5\n2\n",
          "expected": "5",
          "hidden": false
        },
        {
          "label": "Test 2 - negatives",
          "input": "2\n-1\n-5",
          "testInput": "2\n-1\n-5\n",
          "expected": "-1",
          "hidden": false
        },
        {
          "label": "Test 3 - all same",
          "input": "5\n10\n10\n10\n10\n10",
          "testInput": "5\n10\n10\n10\n10\n10\n",
          "expected": "10",
          "hidden": true
        },
        {
          "label": "Test 4 - single",
          "input": "1\n99",
          "testInput": "1\n99\n",
          "expected": "99",
          "hidden": true
        },
        {
          "label": "Test 5 - mixed",
          "input": "4\n-10\n0\n10\n20",
          "testInput": "4\n-10\n0\n10\n20\n",
          "expected": "20",
          "hidden": true
        },
        {
          "label": "Test 6 - descending",
          "input": "6\n5\n4\n3\n2\n1\n0",
          "testInput": "6\n5\n4\n3\n2\n1\n0\n",
          "expected": "5",
          "hidden": true
        },
        {
          "label": "Test 7 - 1 to 10",
          "input": "10\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          "testInput": "10\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
          "expected": "10",
          "hidden": true
        },
        {
          "label": "Test 8 - zeros",
          "input": "3\n0\n0\n0",
          "testInput": "3\n0\n0\n0\n",
          "expected": "0",
          "hidden": true
        },
        {
          "label": "Test 9 - alternating",
          "input": "4\n1\n-1\n1\n-1",
          "testInput": "4\n1\n-1\n1\n-1\n",
          "expected": "1",
          "hidden": true
        },
        {
          "label": "Test 10 - all neg small",
          "input": "4\n-5\n-4\n-3\n-2",
          "testInput": "4\n-5\n-4\n-3\n-2\n",
          "expected": "-2",
          "hidden": true
        }
      ],
      "constraints": [
        "Do not use max()."
      ],
      "hints": [
        "Read the first number outside the loop and set it as the current maximum."
      ],
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
        {
          "word": "for",
          "feedback": "You must use a for loop."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - n=2",
          "input": "2",
          "testInput": "2\n",
          "expected": "1 x 2 = 2\n2 x 2 = 4\n3 x 2 = 6\n4 x 2 = 8\n5 x 2 = 10\n6 x 2 = 12\n7 x 2 = 14\n8 x 2 = 16\n9 x 2 = 18\n10 x 2 = 20",
          "hidden": false
        },
        {
          "label": "Test 2 - n=10",
          "input": "10",
          "testInput": "10\n",
          "expected": "1 x 10 = 10\n2 x 10 = 20\n3 x 10 = 30\n4 x 10 = 40\n5 x 10 = 50\n6 x 10 = 60\n7 x 10 = 70\n8 x 10 = 80\n9 x 10 = 90\n10 x 10 = 100",
          "hidden": true
        },
        {
          "label": "Test 3 - n=1",
          "input": "1",
          "testInput": "1\n",
          "expected": "1 x 1 = 1\n2 x 1 = 2\n3 x 1 = 3\n4 x 1 = 4\n5 x 1 = 5\n6 x 1 = 6\n7 x 1 = 7\n8 x 1 = 8\n9 x 1 = 9\n10 x 1 = 10",
          "hidden": true
        },
        {
          "label": "Test 4 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "1 x 5 = 5\n2 x 5 = 10\n3 x 5 = 15\n4 x 5 = 20\n5 x 5 = 25\n6 x 5 = 30\n7 x 5 = 35\n8 x 5 = 40\n9 x 5 = 45\n10 x 5 = 50",
          "hidden": true
        },
        {
          "label": "Test 5 - n=0",
          "input": "0",
          "testInput": "0\n",
          "expected": "1 x 0 = 0\n2 x 0 = 0\n3 x 0 = 0\n4 x 0 = 0\n5 x 0 = 0\n6 x 0 = 0\n7 x 0 = 0\n8 x 0 = 0\n9 x 0 = 0\n10 x 0 = 0",
          "hidden": true
        },
        {
          "label": "Test 6 - n=7",
          "input": "7",
          "testInput": "7\n",
          "expected": "1 x 7 = 7\n2 x 7 = 14\n3 x 7 = 21\n4 x 7 = 28\n5 x 7 = 35\n6 x 7 = 42\n7 x 7 = 49\n8 x 7 = 56\n9 x 7 = 63\n10 x 7 = 70",
          "hidden": true
        },
        {
          "label": "Test 7 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "1 x 9 = 9\n2 x 9 = 18\n3 x 9 = 27\n4 x 9 = 36\n5 x 9 = 45\n6 x 9 = 54\n7 x 9 = 63\n8 x 9 = 72\n9 x 9 = 81\n10 x 9 = 90",
          "hidden": true
        },
        {
          "label": "Test 8 - n=-1",
          "input": "-1",
          "testInput": "-1\n",
          "expected": "1 x -1 = -1\n2 x -1 = -2\n3 x -1 = -3\n4 x -1 = -4\n5 x -1 = -5\n6 x -1 = -6\n7 x -1 = -7\n8 x -1 = -8\n9 x -1 = -9\n10 x -1 = -10",
          "hidden": true
        },
        {
          "label": "Test 9 - n=100",
          "input": "100",
          "testInput": "100\n",
          "expected": "1 x 100 = 100\n2 x 100 = 200\n3 x 100 = 300\n4 x 100 = 400\n5 x 100 = 500\n6 x 100 = 600\n7 x 100 = 700\n8 x 100 = 800\n9 x 100 = 900\n10 x 100 = 1000",
          "hidden": true
        },
        {
          "label": "Test 10 - n=12",
          "input": "12",
          "testInput": "12\n",
          "expected": "1 x 12 = 12\n2 x 12 = 24\n3 x 12 = 36\n4 x 12 = 48\n5 x 12 = 60\n6 x 12 = 72\n7 x 12 = 84\n8 x 12 = 96\n9 x 12 = 108\n10 x 12 = 120",
          "hidden": true
        }
      ],
      "constraints": [
        "Print exactly 10 lines."
      ],
      "hints": [
        "Use formatting like f'{i} x {n} = {i*n}'."
      ],
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
      "testCases": [
        {
          "label": "Test 1 - n=4",
          "input": "4",
          "testInput": "4\n",
          "expected": "----\n|  |\n|  |\n----",
          "hidden": false
        },
        {
          "label": "Test 2 - n=7",
          "input": "7",
          "testInput": "7\n",
          "expected": "-------\n|     |\n|     |\n|     |\n|     |\n|     |\n-------",
          "hidden": false
        },
        {
          "label": "Test 3 - n=2",
          "input": "2",
          "testInput": "2\n",
          "expected": "--\n--",
          "hidden": true
        },
        {
          "label": "Test 4 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "-----\n|   |\n|   |\n|   |\n-----",
          "hidden": true
        },
        {
          "label": "Test 5 - n=3",
          "input": "3",
          "testInput": "3\n",
          "expected": "---\n| |\n---",
          "hidden": true
        },
        {
          "label": "Test 6 - n=6",
          "input": "6",
          "testInput": "6\n",
          "expected": "------\n|    |\n|    |\n|    |\n|    |\n------",
          "hidden": true
        },
        {
          "label": "Test 7 - n=8",
          "input": "8",
          "testInput": "8\n",
          "expected": "--------\n|      |\n|      |\n|      |\n|      |\n|      |\n|      |\n--------",
          "hidden": true
        },
        {
          "label": "Test 8 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "---------\n|       |\n|       |\n|       |\n|       |\n|       |\n|       |\n|       |\n---------",
          "hidden": true
        },
        {
          "label": "Test 9 - n=10",
          "input": "10",
          "testInput": "10\n",
          "expected": "----------\n|        |\n|        |\n|        |\n|        |\n|        |\n|        |\n|        |\n|        |\n----------",
          "hidden": true
        },
        {
          "label": "Test 10 - n=11",
          "input": "11",
          "testInput": "11\n",
          "expected": "-----------\n|         |\n|         |\n|         |\n|         |\n|         |\n|         |\n|         |\n|         |\n|         |\n-----------",
          "hidden": true
        }
      ],
      "constraints": [
        "N will be at least 2."
      ],
      "hints": [
        "The top and bottom are strings of N hyphens.",
        "The middle rows use a pipe, N-2 spaces, and another pipe."
      ],
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
        {
          "word": "for",
          "feedback": "You must use a for loop to iterate through the rows."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - n=3",
          "input": "3",
          "testInput": "3\n",
          "expected": "  *\n * *\n* * *",
          "hidden": false
        },
        {
          "label": "Test 2 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "    *\n   * *\n  * * *\n * * * *\n* * * * *",
          "hidden": true
        },
        {
          "label": "Test 3 - n=1",
          "input": "1",
          "testInput": "1\n",
          "expected": "*",
          "hidden": false
        },
        {
          "label": "Test 4 - n=8",
          "input": "8",
          "testInput": "8\n",
          "expected": "       *\n      * *\n     * * *\n    * * * *\n   * * * * *\n  * * * * * *\n * * * * * * *\n* * * * * * * *",
          "hidden": true
        },
        {
          "label": "Test 5 - n=2",
          "input": "2",
          "testInput": "2\n",
          "expected": " *\n* *",
          "hidden": true
        },
        {
          "label": "Test 6 - n=4",
          "input": "4",
          "testInput": "4\n",
          "expected": "   *\n  * *\n * * *\n* * * *",
          "hidden": true
        },
        {
          "label": "Test 7 - n=6",
          "input": "6",
          "testInput": "6\n",
          "expected": "     *\n    * *\n   * * *\n  * * * *\n * * * * *\n* * * * * *",
          "hidden": true
        },
        {
          "label": "Test 8 - n=7",
          "input": "7",
          "testInput": "7\n",
          "expected": "      *\n     * *\n    * * *\n   * * * *\n  * * * * *\n * * * * * *\n* * * * * * *",
          "hidden": true
        },
        {
          "label": "Test 9 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "        *\n       * *\n      * * *\n     * * * *\n    * * * * *\n   * * * * * *\n  * * * * * * *\n * * * * * * * *\n* * * * * * * * *",
          "hidden": true
        },
        {
          "label": "Test 10 - n=10",
          "input": "10",
          "testInput": "10\n",
          "expected": "         *\n        * *\n       * * *\n      * * * *\n     * * * * *\n    * * * * * *\n   * * * * * * *\n  * * * * * * * *\n * * * * * * * * *\n* * * * * * * * * *",
          "hidden": true
        }
      ],
      "constraints": [
        "N will be at least 1."
      ],
      "hints": [
        "For row i (from 1 to N), print N-i spaces followed by i stars separated by a space."
      ],
      "solution": "n = int(input())\nfor i in range(1, n + 1):\n    print(\" \" * (n - i) + \" \".join([\"*\"] * i))",
      "solutionExplanation": "Iterate from 1 to N. Calculate the leading spaces and join the stars with a space."
    },
    {
      "id": "for-6",
      "title": "Diamond Pattern",
      "topic": "For Loop",
      "difficulty": "hard",
      "description": "Read an odd integer N (where N >= 3). Use a `for` loop to print a symmetrical diamond of stars (`*`) of height N. The top and bottom rows should have 1 star, the middle row must have N stars. The stars should NOT be separated by spaces, but you will need leading spaces to center them.",
      "starterCode": "# Write your code here\n",
      "positiveKeywords": [
        {
          "word": "for",
          "feedback": "You must use at least one for loop."
        }
      ],
      "negativeKeywords": [],
      "testCases": [
        {
          "label": "Test 1 - n=5",
          "input": "5",
          "testInput": "5\n",
          "expected": "  *\n ***\n*****\n ***\n  *",
          "hidden": false
        },
        {
          "label": "Test 2 - n=3",
          "input": "3",
          "testInput": "3\n",
          "expected": " *\n***\n *",
          "hidden": false
        },
        {
          "label": "Test 3 - n=7",
          "input": "7",
          "testInput": "7\n",
          "expected": "   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
          "hidden": true
        },
        {
          "label": "Test 4 - n=9",
          "input": "9",
          "testInput": "9\n",
          "expected": "    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *",
          "hidden": true
        },
        {
          "label": "Test 5 - n=11",
          "input": "11",
          "testInput": "11\n",
          "expected": "     *\n    ***\n   *****\n  *******\n *********\n***********\n *********\n  *******\n   *****\n    ***\n     *",
          "hidden": true
        },
        {
          "label": "Test 6 - n=13",
          "input": "13",
          "testInput": "13\n",
          "expected": "      *\n     ***\n    *****\n   *******\n  *********\n ***********\n*************\n ***********\n  *********\n   *******\n    *****\n     ***\n      *",
          "hidden": true
        },
        {
          "label": "Test 7 - n=15",
          "input": "15",
          "testInput": "15\n",
          "expected": "       *\n      ***\n     *****\n    *******\n   *********\n  ***********\n *************\n***************\n *************\n  ***********\n   *********\n    *******\n     *****\n      ***\n       *",
          "hidden": true
        },
        {
          "label": "Test 8 - n=17",
          "input": "17",
          "testInput": "17\n",
          "expected": "        *\n       ***\n      *****\n     *******\n    *********\n   ***********\n  *************\n ***************\n*****************\n ***************\n  *************\n   ***********\n    *********\n     *******\n      *****\n       ***\n        *",
          "hidden": true
        },
        {
          "label": "Test 9 - n=19",
          "input": "19",
          "testInput": "19\n",
          "expected": "         *\n        ***\n       *****\n      *******\n     *********\n    ***********\n   *************\n  ***************\n *****************\n*******************\n *****************\n  ***************\n   *************\n    ***********\n     *********\n      *******\n       *****\n        ***\n         *",
          "hidden": true
        },
        {
          "label": "Test 10 - n=21",
          "input": "21",
          "testInput": "21\n",
          "expected": "          *\n         ***\n        *****\n       *******\n      *********\n     ***********\n    *************\n   ***************\n  *****************\n *******************\n*********************\n *******************\n  *****************\n   ***************\n    *************\n     ***********\n      *********\n       *******\n        *****\n         ***\n          *",
          "hidden": true
        }
      ],
      "constraints": [
        "N will be an odd integer >= 3."
      ],
      "hints": [
        "Consider calculating the distance from the middle row.",
        "If the middle index is mid = N // 2, the number of leading spaces for row i (0 to N-1) is abs(mid - i).",
        "The number of stars for row i is N - 2 * spaces."
      ],
      "solution": "n = int(input())\nmid = n // 2\nfor i in range(n):\n    spaces = abs(mid - i)\n    stars = n - 2 * spaces\n    print(\" \" * spaces + \"*\" * stars)",
      "solutionExplanation": "By calculating the distance of the current row from the middle using abs(), we determine how many leading spaces are needed. The number of stars is simply the total width N minus twice the leading spaces."
    }
  ]
};