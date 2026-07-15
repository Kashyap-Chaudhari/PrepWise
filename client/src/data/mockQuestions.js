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
        title: 'List Comprehension Filtering',
        question: 'Write a Python function to filter out odd numbers from a list and return their squares.',
        sampleInput: '[1, 2, 3, 4, 5, 6]',
        sampleOutput: '[4, 16, 36]',
        hints: ['Use list comprehension with a conditional if (x % 2 == 0).'],
        solution: 'def square_evens(nums):\n    return [x**2 for x in nums if x % 2 == 0]',
        explanation: 'List comprehension `[x**2 for x in nums if x % 2 == 0]` iterates over `nums`, filters even numbers, and returns squared results.'
      },
      {
        title: 'Dictionary Key-Value Frequency Counter',
        question: 'Count frequency of each word in a given sentence using Python dict or collections.Counter.',
        sampleInput: '"apple banana apple orange banana apple"',
        sampleOutput: '{"apple": 3, "banana": 2, "orange": 1}',
        hints: ['Use collections.Counter or iterate over split string and update dictionary counts.'],
        solution: 'from collections import Counter\n\ndef word_frequency(text):\n    return dict(Counter(text.split()))',
        explanation: 'Counter(text.split()) counts word occurrences in O(N) time.'
      }
    ],
    'Java': [
      {
        title: 'Reverse Words in String',
        question: 'Write a Java method to reverse words in a given sentence while retaining single space separation.',
        sampleInput: '"PlacementPro AI Prep"',
        sampleOutput: '"Prep AI PlacementPro"',
        hints: ['Split sentence by spaces and reverse the resulting array or use StringBuilder.'],
        solution: 'public String reverseWords(String s) {\n    String[] words = s.trim().split("\\s+");\n    StringBuilder sb = new StringBuilder();\n    for (int i = words.length - 1; i >= 0; i--) {\n        sb.append(words[i]);\n        if (i > 0) sb.append(" ");\n    }\n    return sb.toString();\n}',
        explanation: 'Split by regex whitespace `\\s+` and reconstruct in reverse using StringBuilder.'
      }
    ],
    'C++': [
      {
        title: 'Vector Unique Elements Filter',
        question: 'Given a `std::vector<int>`, remove all duplicates in-place maintaining sorted order.',
        sampleInput: '[1, 1, 2, 2, 3, 4, 4]',
        sampleOutput: '[1, 2, 3, 4]',
        hints: ['Use std::sort and std::unique followed by vector::erase.'],
        solution: 'void removeDuplicates(std::vector<int>& nums) {\n    std::sort(nums.begin(), nums.end());\n    auto it = std::unique(nums.begin(), nums.end());\n    nums.erase(it, nums.end());\n}',
        explanation: 'std::unique moves duplicate elements to the end of vector, and erase removes them in O(N log N) time.'
      }
    ],
    'C': [
      {
        title: 'Pointer String In-place Reverse',
        question: 'Write an in-place string reversal function in C using char pointers.',
        sampleInput: '"Antigravity"',
        sampleOutput: '"ytivargitnA"',
        hints: ['Use two pointers (start and end), swap characters until start >= end.'],
        solution: 'void reverseString(char* str) {\n    int len = strlen(str);\n    char *start = str, *end = str + len - 1;\n    while (start < end) {\n        char temp = *start;\n        *start++ = *end;\n        *end-- = temp;\n    }\n}',
        explanation: 'Swapping characters from both ends using pointers reverses the null-terminated string in-place.'
      }
    ],
    'JavaScript': [
      {
        title: 'Flatten Nested Array',
        question: 'Write a JavaScript function to flatten an arbitrary nested array without using Array.prototype.flat.',
        sampleInput: '[1, [2, [3, 4], 5], 6]',
        sampleOutput: '[1, 2, 3, 4, 5, 6]',
        hints: ['Use recursion with Array.reduce or flatMap.'],
        solution: 'function flattenArray(arr) {\n    return arr.reduce((acc, val) => \n        Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);\n}',
        explanation: 'Recursively concatenate elements if child is an array.'
      }
    ],
    'TypeScript': [
      {
        title: 'Generic Stack Interface Implementation',
        question: 'Create a generic Stack class in TypeScript with push, pop, and peek methods.',
        sampleInput: 'const s = new Stack<number>(); s.push(42);',
        sampleOutput: 's.peek() === 42',
        hints: ['Use class Stack<T> with private array storage.'],
        solution: 'class Stack<T> {\n  private items: T[] = [];\n  push(item: T): void { this.items.push(item); }\n  pop(): T | undefined { return this.items.pop(); }\n  peek(): T | undefined { return this.items[this.items.length - 1]; }\n}',
        explanation: 'Generic parameter T allows type-safe stack operations for any given type.'
      }
    ],
    'C#': [
      {
        title: 'LINQ Group By and Order',
        question: 'Write a C# LINQ query to group a list of integers by even/odd and order each group in descending order.',
        sampleInput: 'new List<int>{ 5, 2, 8, 1, 9, 4 }',
        sampleOutput: 'Even: 8, 4, 2 | Odd: 9, 5, 1',
        hints: ['Use .GroupBy(x => x % 2 == 0) and .Select(g => g.OrderByDescending(x => x)).'],
        solution: 'var result = numbers\n    .GroupBy(n => n % 2 == 0)\n    .Select(g => new { IsEven = g.Key, Numbers = g.OrderByDescending(x => x) });',
        explanation: 'LINQ GroupBy partitions items and OrderByDescending sorts each collection in O(N log N) time.'
      }
    ],
    'PHP': [
      {
        title: 'Associative Array Key Filter',
        question: 'Write a PHP function to filter an associative array keeping only keys starting with "user_".',
        sampleInput: '["user_name" => "Alice", "age" => 25, "user_role" => "admin"]',
        sampleOutput: '["user_name" => "Alice", "user_role" => "admin"]',
        hints: ['Use array_filter with ARRAY_FILTER_USE_KEY and str_starts_with.'],
        solution: 'function filterUserKeys(array $data): array {\n    return array_filter($data, function($key) {\n        return str_starts_with($key, "user_");\n    }, ARRAY_FILTER_USE_KEY);\n}',
        explanation: 'array_filter with ARRAY_FILTER_USE_KEY checks keys matching prefix "user_".'
      }
    ],
    'SQL': [
      {
        title: 'N-th Highest Salary Query',
        question: 'Write an ANSI SQL query to find the 2nd highest salary from an Employees table.',
        sampleInput: 'Employees (id, salary)',
        sampleOutput: 'Salary: 90000',
        hints: ['Use DENSE_RANK() OVER (ORDER BY salary DESC) or LIMIT 1 OFFSET 1.'],
        solution: 'SELECT MAX(salary) AS SecondarySalary \nFROM Employees \nWHERE salary < (SELECT MAX(salary) FROM Employees);',
        explanation: 'Subquery finds max salary, and outer query finds max salary strictly smaller than highest salary.'
      }
    ]
  };

  const templates = languageTemplates[languageName] || languageTemplates['JavaScript'];
  const questions = [];

  for (let i = 1; i <= 100; i++) {
    const template = templates[(i - 1) % templates.length];
    const diff = i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard');

    questions.push({
      _id: `mock-coding-${languageName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${i}`,
      title: `${languageName} Practice #${i}: ${template.title}`,
      category: 'coding',
      subject: languageName,
      topic: languageName,
      difficulty: diff,
      type: 'coding',
      question: `[${languageName} Challenge Q${i}] ${template.question}`,
      constraints: `Time Limit: 2.0s | Memory Limit: 256MB | Language: ${languageName}`,
      sampleInput: template.sampleInput,
      sampleOutput: template.sampleOutput,
      hints: template.hints,
      solution: template.solution,
      correctAnswer: template.solution,
      explanation: template.explanation,
      tags: ['coding', languageName.toLowerCase().replace(/[^a-z0-9]/g, '')]
    });
  }

  return questions;
};

