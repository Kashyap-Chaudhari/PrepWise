// Client-side dataset provider for 100 DSA questions per topic, 30 Technical, and 30 Aptitude questions

export const generateDSATopicQuestions = (topicName) => {
  const dsaTopicTemplates = {
    'Arrays': [
      {
        title: 'Two Sum Problem',
        difficulty: 'easy',
        question: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        options: ['O(N^2) Time, O(1) Space using brute force', 'O(N log N) Time using Sorting & Two Pointers', 'O(N) Time, O(N) Space using Hash Map', 'All of the above are valid approaches'],
        correctAnswer: 'All of the above are valid approaches',
        explanation: 'The optimal approach uses a Hash Map in O(N) time and O(N) auxiliary space to store elements and their indices.',
        hints: ['Try storing elements in a hash map as you iterate through the array.'],
        solution: 'class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n      int diff = target - nums[i];\n      if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n      map.put(nums[i], i);\n    }\n    return new int[]{};\n  }\n}',
        tags: ['array', 'hash-table', 'two-pointers']
      },
      {
        title: 'Maximum Subarray (Kadane\'s Algorithm)',
        difficulty: 'medium',
        question: 'What is the time complexity of Kadane\'s algorithm for finding the maximum sum contiguous subarray in an array of size N?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctAnswer: 'O(N)',
        explanation: 'Kadane\'s algorithm traverses the array once, maintaining current subarray sum and global max sum in O(N) time and O(1) auxiliary space.',
        hints: ['Keep track of current max ending at current index and global max so far.'],
        solution: 'public int maxSubArray(int[] nums) {\n  int maxSoFar = nums[0], currMax = nums[0];\n  for (int i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}',
        tags: ['array', 'dynamic-programming', 'kadane']
      },
      {
        title: 'Move Zeroes to End',
        difficulty: 'easy',
        question: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. What is the optimal space complexity?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
        correctAnswer: 'O(1)',
        explanation: 'Using two pointers (read pointer and write pointer), we can swap non-zero elements in-place using O(1) extra space.',
        hints: ['Use a write index pointer to place non-zero elements sequentially.'],
        solution: 'void moveZeroes(vector<int>& nums) {\n  int write = 0;\n  for(int read = 0; read < nums.size(); read++) {\n    if(nums[read] != 0) swap(nums[write++], nums[read]);\n  }\n}',
        tags: ['array', 'two-pointers']
      },
      {
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'easy',
        question: 'Given prices array where `prices[i]` is price on day `i`, return maximum profit from 1 transaction. What approach gives O(N) time and O(1) space?',
        options: ['Two nested loops comparing all pairs', 'Track min price seen so far and max profit at each step', 'Sort the price array', 'Use Divide and Conquer'],
        correctAnswer: 'Track min price seen so far and max profit at each step',
        explanation: 'Maintaining `minPrice` seen so far allows calculating potential profit on each day in a single pass O(N) time and O(1) space.',
        hints: ['Update minPrice at every step and compute maxProfit = max(maxProfit, price - minPrice).'],
        solution: 'int maxProfit(vector<int>& prices) {\n  int minPrice = INT_MAX, maxProfit = 0;\n  for(int price : prices) {\n    minPrice = min(minPrice, price);\n    maxProfit = max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}',
        tags: ['array', 'greedy', 'dynamic-programming']
      },
      {
        title: 'Rotate Array by K Steps',
        difficulty: 'medium',
        question: 'How to rotate an array of size N to the right by K steps in-place with O(1) extra space?',
        options: ['Use an auxiliary array of size N', 'Reverse the whole array, then reverse first K elements, then remaining N-K elements', 'Shift elements one by one K times', 'Use a queue of size N'],
        correctAnswer: 'Reverse the whole array, then reverse first K elements, then remaining N-K elements',
        explanation: 'Reversing entire array, followed by reversing `[0, k-1]` and `[k, n-1]` sub-arrays achieves right rotation in O(N) time and O(1) space.',
        hints: ['Think of reversing sections of the array.'],
        solution: 'void rotate(vector<int>& nums, int k) {\n  k %= nums.size();\n  reverse(nums.begin(), nums.end());\n  reverse(nums.begin(), nums.begin() + k);\n  reverse(nums.begin() + k, nums.end());\n}',
        tags: ['array', 'math', 'two-pointers']
      }
    ],
    'Strings': [
      {
        title: 'Valid Anagram Check',
        difficulty: 'easy',
        question: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. What is the time complexity using a frequency array of size 26?',
        options: ['O(N^2)', 'O(N)', 'O(N log N)', 'O(1)'],
        correctAnswer: 'O(N)',
        explanation: 'Counting character frequencies in a fixed size 26 array takes O(N) time where N is string length.',
        hints: ['Increment count for s and decrement for t.'],
        solution: 'bool isAnagram(string s, string t) {\n  if(s.length() != t.length()) return false;\n  int count[26] = {0};\n  for(int i=0; i<s.length(); i++) {\n    count[s[i]-\'a\']++;\n    count[t[i]-\'a\']--;\n  }\n  for(int c : count) if(c != 0) return false;\n  return true;\n}',
        tags: ['string', 'hash-table', 'sorting']
      },
      {
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'medium',
        question: 'What data structure/technique efficiently finds the length of the longest substring without repeating characters in O(N) time?',
        options: ['Sliding Window with Hash Set/Map', 'Monotonic Stack', 'Dynamic Programming Matrix', 'Disjoint Set Union'],
        correctAnswer: 'Sliding Window with Hash Set/Map',
        explanation: 'Maintaining a sliding window `[left, right]` with a character index map enables expanding `right` and updating `left` in O(N) total steps.',
        hints: ['Use sliding window pointers with character index mapping.'],
        solution: 'int lengthOfLongestSubstring(string s) {\n  unordered_map<char, int> map;\n  int maxLen = 0, left = 0;\n  for(int right=0; right<s.length(); right++) {\n    if(map.count(s[right])) left = max(left, map[s[right]] + 1);\n    map[s[right]] = right;\n    maxLen = max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}',
        tags: ['string', 'sliding-window', 'hash-table']
      }
    ],
    'Linked List': [
      {
        title: 'Reverse Singly Linked List',
        difficulty: 'easy',
        question: 'To reverse a singly linked list iteratively, how many pointer variables are required at minimum?',
        options: ['1 pointer', '2 pointers', '3 pointers (prev, curr, next)', '4 pointers'],
        correctAnswer: '3 pointers (prev, curr, next)',
        explanation: 'We require `prev`, `curr`, and `next` pointers to re-link pointers backward without losing reference to the rest of the list.',
        hints: ['Save nextNode = curr.next before changing curr.next link to prev.'],
        solution: 'ListNode* reverseList(ListNode* head) {\n  ListNode *prev = nullptr, *curr = head, *next = nullptr;\n  while(curr) {\n    next = curr->next;\n    curr->next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}',
        tags: ['linked-list', 'pointers']
      }
    ]
  };

  const templates = dsaTopicTemplates[topicName] || dsaTopicTemplates['Arrays'];
  const questions = [];

  for (let i = 1; i <= 100; i++) {
    const template = templates[(i - 1) % templates.length];
    const diff = i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard');
    
    questions.push({
      _id: `mock-dsa-${topicName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      title: `${topicName} Problem #${i}: ${template.title}`,
      category: 'dsa',
      subject: 'Data Structures & Algorithms',
      topic: topicName,
      difficulty: diff,
      type: 'mcq',
      question: `[${topicName} Practice Q${i}] ${template.question}`,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      hints: template.hints,
      solution: template.solution,
      tags: [...template.tags, topicName.toLowerCase().replace(/\s+/g, '-')]
    });
  }

  return questions;
};

export const generateTechnicalQuestions = () => {
  const subjects = ['DBMS', 'Operating System', 'Computer Networks', 'Java', 'C++', 'Python', 'SQL', 'OOP', 'Software Engineering', 'Machine Learning'];
  const questions = [];

  const techPool = [
    {
      title: 'ACID Properties in DBMS',
      subject: 'DBMS',
      topic: 'Transactions',
      difficulty: 'easy',
      question: 'Which ACID property in DBMS ensures that all operations in a database transaction are completed successfully or none at all?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
      correctAnswer: 'Atomicity',
      explanation: 'Atomicity guarantees that a transaction is treated as a single "all-or-nothing" unit.',
      tags: ['dbms', 'transactions', 'acid']
    },
    {
      title: 'Deadlock Necessary Conditions',
      subject: 'Operating System',
      topic: 'Deadlocks',
      difficulty: 'medium',
      question: 'Which of the following is NOT one of the Coffman conditions required for a deadlock to occur?',
      options: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Preemptive Scheduling'],
      correctAnswer: 'Preemptive Scheduling',
      explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
      tags: ['os', 'deadlock', 'concurrency']
    },
    {
      title: 'OSI Model Layers Count',
      subject: 'Computer Networks',
      topic: 'OSI Model',
      difficulty: 'easy',
      question: 'How many layers are present in the standard ISO OSI reference model for networking?',
      options: ['4 layers', '5 layers', '7 layers', '6 layers'],
      correctAnswer: '7 layers',
      explanation: 'The 7 layers of OSI model are Application, Presentation, Session, Transport, Network, Data Link, and Physical.',
      tags: ['networking', 'osi-model']
    }
  ];

  for (let i = 1; i <= 30; i++) {
    const item = techPool[(i - 1) % techPool.length];
    const subjectName = subjects[(i - 1) % subjects.length];
    
    questions.push({
      _id: `mock-tech-${i}`,
      title: `Technical Q${i}: ${item.title} (${subjectName})`,
      category: 'technical',
      subject: subjectName,
      topic: item.topic,
      difficulty: i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard'),
      type: 'mcq',
      question: `[Technical Quiz Q${i}] ${item.question}`,
      options: item.options,
      correctAnswer: item.correctAnswer,
      explanation: item.explanation,
      tags: [...item.tags, subjectName.toLowerCase().replace(/[^a-z0-9]/g, '')]
    });
  }

  return questions;
};

export const generateAptitudeQuestions = () => {
  const aptPool = [
    {
      title: 'Speed, Distance, and Time',
      subject: 'Quantitative Aptitude',
      topic: 'Speed & Distance',
      difficulty: 'easy',
      question: 'A car travels 180 km in 3 hours. What is its speed in m/s?',
      options: ['16.67 m/s', '15 m/s', '20 m/s', '25 m/s'],
      correctAnswer: '16.67 m/s',
      explanation: 'Speed = 180/3 = 60 km/hr. Converting to m/s = 60 × (5/18) = 16.67 m/s.',
      tags: ['aptitude', 'quant', 'speed']
    },
    {
      title: 'Logical Deduction - Blood Relations',
      subject: 'Logical Reasoning',
      topic: 'Blood Relations',
      difficulty: 'medium',
      question: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather\'s only son." How is the woman related to Rohit?',
      options: ['Sister', 'Mother', 'Aunt', 'Cousin'],
      correctAnswer: 'Sister',
      explanation: 'Grandfather\'s only son = Rohit\'s father. The daughter of Rohit\'s father is Rohit\'s sister.',
      tags: ['aptitude', 'logical', 'blood-relations']
    },
    {
      title: 'Verbal Antonym',
      subject: 'Verbal Ability',
      topic: 'Vocabulary',
      difficulty: 'easy',
      question: 'Choose the exact antonym of the word "METICULOUS":',
      options: ['Careless', 'Thorough', 'Precise', 'Cautious'],
      correctAnswer: 'Careless',
      explanation: 'Meticulous means showing great attention to detail / careful. The antonym is Careless.',
      tags: ['aptitude', 'verbal', 'antonym']
    }
  ];

  const questions = [];
  const subjects = ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];

  for (let i = 1; i <= 30; i++) {
    const item = aptPool[(i - 1) % aptPool.length];
    const subjectName = subjects[(i - 1) % subjects.length];

    questions.push({
      _id: `mock-apt-${i}`,
      title: `Aptitude Q${i}: ${item.title}`,
      category: 'aptitude',
      subject: subjectName,
      topic: item.topic,
      difficulty: i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard'),
      type: 'mcq',
      question: `[Aptitude Quiz Q${i}] ${item.question}`,
      options: item.options,
      correctAnswer: item.correctAnswer,
      explanation: item.explanation,
      tags: [...item.tags, 'aptitude']
    });
  }

  return questions;
};

export const generateCodingLanguageQuestions = (languageName) => {
  const languageTemplates = {
    'Python': [
      {
        title: 'List Comprehension & Filtering',
        question: 'Write a Python program to filter all even numbers from a list `nums` and return their squares.',
        options: ['[x**2 for x in nums if x % 2 == 0]', 'list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nums)))', 'both A and B are correct', 'x**2 for x in nums'],
        correctAnswer: 'both A and B are correct',
        explanation: 'Both list comprehension and map/filter lambdas produce identical squared even lists in Python.',
        hints: ['Use the modulus operator `% 2 == 0` for even numbers.'],
        solution: 'def square_evens(nums):\n    return [x**2 for x in nums if x % 2 == 0]',
        sampleInput: 'nums = [1, 2, 3, 4, 5, 6]',
        sampleOutput: '[4, 16]',
        constraints: '1 <= len(nums) <= 10^5',
        tags: ['python', 'list-comprehension', 'functional']
      }
    ],
    'Java': [
      {
        title: 'String immutability and StringBuilder',
        question: 'In Java, why is StringBuilder preferred over String for frequent string concatenations inside a loop?',
        options: ['String is mutable while StringBuilder is immutable', 'String creates a new object in Heap on every concatenation O(N^2), whereas StringBuilder modifies array buffer in-place O(N)', 'StringBuilder uses GPU acceleration', 'There is no performance difference'],
        correctAnswer: 'String creates a new object in Heap on every concatenation O(N^2), whereas StringBuilder modifies array buffer in-place O(N)',
        explanation: 'Strings in Java are immutable. Concatenating strings in a loop allocates N intermediate objects.',
        hints: ['Remember string immutability in Java.'],
        solution: 'public String concatenate(String[] words) {\n    StringBuilder sb = new StringBuilder();\n    for (String w : words) sb.append(w);\n    return sb.toString();\n}',
        sampleInput: 'words = ["Hello", " ", "World"]',
        sampleOutput: '"Hello World"',
        constraints: '1 <= words.length <= 10^5',
        tags: ['java', 'stringbuilder', 'memory']
      }
    ],
    'C++': [
      {
        title: 'Move Semantics & std::move',
        question: 'What is the primary purpose of move semantics introduced in C++11?',
        options: ['To move objects to another CPU core', 'To transfer ownership of resources without deep copying temporary objects', 'To convert float to integer', 'To sort arrays faster'],
        correctAnswer: 'To transfer ownership of resources without deep copying temporary objects',
        explanation: 'Move semantics allow resource-heavy objects (like std::vector or std::string) to transfer underlying pointers without cloning data.',
        hints: ['Think about rvalue references `&&`.'],
        solution: 'template<typename T>\nvoid swap(T& a, T& b) {\n    T temp = std::move(a);\n    a = std::move(b);\n    b = std::move(temp);\n}',
        sampleInput: 'std::vector<int> a = {1, 2}, b = {3, 4}',
        sampleOutput: 'a = {3, 4}, b = {1, 2}',
        constraints: 'C++11 or higher',
        tags: ['cpp', 'move-semantics', 'pointers']
      }
    ],
    'C': [
      {
        title: 'Pointer Arithmetic & Array Decay',
        question: 'In C, if `int arr[5] = {10, 20, 30, 40, 50}; int *p = arr;`, what is the value of `*(p + 3)`?',
        options: ['10', '20', '30', '40'],
        correctAnswer: '40',
        explanation: '`*(p + 3)` accesses element at index 3 in 0-indexed array, which is `arr[3] = 40`.',
        hints: ['`*(p + i)` is identical to `p[i]`.'],
        solution: '#include <stdio.h>\nint getElement(int* arr, int index) {\n    return *(arr + index);\n}',
        sampleInput: 'arr = [10, 20, 30, 40, 50], index = 3',
        sampleOutput: '40',
        constraints: '0 <= index < 5',
        tags: ['c', 'pointers', 'memory']
      }
    ],
    'JavaScript': [
      {
        title: 'Closure & Lexical Scope',
        question: 'What will be logged by `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }`?',
        options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
        correctAnswer: '3, 3, 3',
        explanation: '`var` is function-scoped. By the time setTimeout executes after 100ms, the loop has completed and `i` equals 3 for all closures.',
        hints: ['Use `let` for block-scoped loop variable to print 0, 1, 2.'],
        solution: 'for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
        sampleInput: 'N = 3',
        sampleOutput: '3, 3, 3 (with var) | 0, 1, 2 (with let)',
        constraints: 'ES6+ JavaScript',
        tags: ['javascript', 'closures', 'async']
      }
    ],
    'TypeScript': [
      {
        title: 'Utility Type Readonly & Partial',
        question: 'Which TypeScript utility type makes all properties of a type optional?',
        options: ['Partial<T>', 'Readonly<T>', 'Pick<T, K>', 'Required<T>'],
        correctAnswer: 'Partial<T>',
        explanation: '`Partial<T>` constructs a type with all properties of T set to optional (`?`).',
        hints: ['`Partial<User>` makes all fields in User optional.'],
        solution: 'interface User { name: string; age: number; }\ntype OptionalUser = Partial<User>;',
        sampleInput: 'User = { name: "Alice", age: 25 }',
        sampleOutput: 'OptionalUser = { name?: string, age?: number }',
        constraints: 'TypeScript 3.0+',
        tags: ['typescript', 'utility-types', 'generics']
      }
    ],
    'C#': [
      {
        title: 'LINQ Query Expression',
        question: 'Which LINQ method in C# is used to project each element of a sequence into a new form?',
        options: ['Select', 'Where', 'GroupBy', 'OrderBy'],
        correctAnswer: 'Select',
        explanation: '`Select` performs projection mapping (equivalent to `.map()` in JS/Python).',
        hints: ['`numbers.Select(x => x * x)`.'],
        solution: 'var squared = numbers.Select(x => x * x).ToList();',
        sampleInput: 'numbers = [1, 2, 3]',
        sampleOutput: '[1, 4, 9]',
        constraints: '.NET 6.0+',
        tags: ['csharp', 'linq', 'dotnet']
      }
    ],
    'PHP': [
      {
        title: 'PDO Prepared Statements',
        question: 'Why are PDO prepared statements used in PHP database interaction?',
        options: ['To speed up file downloads', 'To prevent SQL Injection vulnerabilities', 'To format JSON responses', 'To encrypt session cookies'],
        correctAnswer: 'To prevent SQL Injection vulnerabilities',
        explanation: 'Prepared statements separate SQL code from data parameters, rendering SQL injection impossible.',
        hints: ['Use `$stmt->execute([\':id\' => $id])`.'],
        solution: '$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");\n$stmt->execute([":id" => $id]);',
        sampleInput: '$id = 5',
        sampleOutput: 'PDOStatement Object',
        constraints: 'PHP 7.0+',
        tags: ['php', 'pdo', 'security', 'sql']
      }
    ],
    'SQL': [
      {
        title: 'Window Functions ROW_NUMBER vs RANK',
        question: 'What is the main difference between RANK() and DENSE_RANK() in SQL when duplicate values occur?',
        options: ['RANK() leaves gaps in rank numbers for ties, whereas DENSE_RANK() does not leave gaps', 'DENSE_RANK() leaves gaps, RANK() does not', 'They are identical', 'RANK() is only used in MySQL'],
        correctAnswer: 'RANK() leaves gaps in rank numbers for ties, whereas DENSE_RANK() does not leave gaps',
        explanation: 'For values (100, 100, 90), RANK() produces ranks 1, 1, 3. DENSE_RANK() produces ranks 1, 1, 2.',
        hints: ['Think of dense ranking without skipping numerical ranks.'],
        solution: 'SELECT name, score, \n       DENSE_RANK() OVER (ORDER BY score DESC) as rank\nFROM students;',
        sampleInput: 'scores = [100, 100, 90]',
        sampleOutput: 'ranks = [1, 1, 2]',
        constraints: 'Standard ANSI SQL',
        tags: ['sql', 'window-functions', 'queries']
      }
    ]
  };

  const templates = languageTemplates[languageName] || languageTemplates['Python'];
  const questions = [];

  for (let i = 1; i <= 100; i++) {
    const template = templates[(i - 1) % templates.length];
    const diff = i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard');

    questions.push({
      _id: `mock-coding-${languageName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${i}`,
      title: `${languageName} Practice Q${i}: ${template.title}`,
      category: 'coding',
      subject: languageName,
      topic: languageName,
      difficulty: diff,
      type: 'coding',
      question: `[${languageName} Coding Q${i}] ${template.question}`,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      hints: template.hints,
      solution: template.solution,
      sampleInput: template.sampleInput,
      sampleOutput: template.sampleOutput,
      constraints: template.constraints,
      tags: [...template.tags, languageName.toLowerCase().replace(/[^a-z0-9]/g, '')]
    });
  }

  return questions;
};

