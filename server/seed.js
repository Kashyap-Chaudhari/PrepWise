import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';
import User from './models/User.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const questions = [
  // =========================================================================
  // ===================== APTITUDE - Quantitative =====================
  // =========================================================================
  {
    title: 'Profit and Loss Percentage',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Profit and Loss',
    difficulty: 'easy',
    type: 'mcq',
    question: 'A shopkeeper buys an article for ₹500 and sells it for ₹600. What is the profit percentage?',
    options: ['15%', '20%', '25%', '10%'],
    correctAnswer: '20%',
    explanation: 'Profit = 600 - 500 = ₹100. Profit% = (100 / 500) × 100 = 20%.',
    tags: ['profit-loss', 'percentage', 'arithmetic'],
  },
  {
    title: 'Simple Interest Calculation',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Simple Interest',
    difficulty: 'easy',
    type: 'mcq',
    question: 'Find the simple interest on ₹5000 at 8% per annum for 3 years.',
    options: ['₹1200', '₹1000', '₹800', '₹1500'],
    correctAnswer: '₹1200',
    explanation: 'SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = ₹1200.',
    tags: ['simple-interest', 'arithmetic'],
  },
  {
    title: 'Time and Work - Joint Work Rate',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Time and Work',
    difficulty: 'medium',
    type: 'mcq',
    question: 'A can complete a task in 12 days, and B can complete the same task in 18 days. If they work together for 4 days and then A leaves, how many days will B take to complete the remaining work alone?',
    options: ['8 days', '10 days', '6 days', '7 days'],
    correctAnswer: '8 days',
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Combined 1-day work = 1/12 + 1/18 = 5/36. Work done in 4 days = 4 × (5/36) = 5/9. Remaining work = 1 - 5/9 = 4/9. Time required by B = (4/9) / (1/18) = 8 days.",
    tags: ['time-work', 'fractions', 'arithmetic'],
  },
  {
    title: 'Speed, Distance & Time - Relative Speed of Trains',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Speed Distance Time',
    difficulty: 'medium',
    type: 'mcq',
    question: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:',
    options: ['3:2', '2:3', '1:2', '3:4'],
    correctAnswer: '3:2',
    explanation: 'Let the speeds of the two trains be u and v. Lengths = 27u and 17v. Relative speed in opposite direction = u + v. Time to cross each other = (27u + 17v) / (u + v) = 23. Solving 27u + 17v = 23u + 23v gives 4u = 6v => u/v = 3/2.',
    tags: ['trains', 'speed', 'relative-speed'],
  },
  {
    title: 'Permutations & Combinations - Committee Formation',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Permutations & Combinations',
    difficulty: 'hard',
    type: 'mcq',
    question: 'In how many ways can a committee of 5 people be formed from 6 men and 4 women such that the committee contains at least 3 men?',
    options: ['186', '246', '120', '196'],
    correctAnswer: '186',
    explanation: 'Cases for at least 3 men: 1) 3 Men & 2 Women = 6C3 × 4C2 = 20 × 6 = 120. 2) 4 Men & 1 Woman = 6C4 × 4C1 = 15 × 4 = 60. 3) 5 Men = 6C5 = 6. Total = 120 + 60 + 6 = 186.',
    tags: ['combinations', 'probability', 'advanced-aptitude'],
  },
  {
    title: 'Probability - Drawing Balls without Replacement',
    category: 'aptitude',
    subject: 'Quantitative Aptitude',
    topic: 'Probability',
    difficulty: 'hard',
    type: 'mcq',
    question: 'A box contains 5 red, 4 green, and 3 blue balls. If 3 balls are drawn at random without replacement, what is the probability that all three balls are of different colors?',
    options: ['3/11', '6/11', '2/11', '12/55'],
    correctAnswer: '3/11',
    explanation: 'Total ways to pick 3 balls = 12C3 = (12 × 11 × 10) / (3 × 2 × 1) = 220. Favorable ways (1 Red, 1 Green, 1 Blue) = 5C1 × 4C1 × 3C1 = 5 × 4 × 3 = 60. Probability = 60 / 220 = 3/11.',
    tags: ['probability', 'combinations'],
  },

  // =========================================================================
  // ===================== APTITUDE - Logical Reasoning =====================
  // =========================================================================
  {
    title: 'Number Series Pattern',
    category: 'aptitude',
    subject: 'Logical Reasoning',
    topic: 'Number Series',
    difficulty: 'easy',
    type: 'mcq',
    question: 'What comes next in the series: 2, 6, 12, 20, 30, ?',
    options: ['42', '40', '38', '44'],
    correctAnswer: '42',
    explanation: 'Pattern: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30. Next term is 6×7 = 42.',
    tags: ['number-series', 'patterns'],
  },
  {
    title: 'Coding Decoding - Shift Cipher Pattern',
    category: 'aptitude',
    subject: 'Logical Reasoning',
    topic: 'Coding-Decoding',
    difficulty: 'medium',
    type: 'mcq',
    question: 'In a certain code language, "SYSTEM" is written as "SYSMET" and "NEARER" is written as "AENRER". How will "FRACTION" be written in that code?',
    options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'FRACNOIT'],
    correctAnswer: 'CARFNOIT',
    explanation: 'Split the word into two equal halves of 4 letters each. SYSTEM -> SYS / TEM -> reverse second half -> SYSMET. FRACTION (8 letters) -> FRAC / TION -> Reverse first half (CARF), Reverse second half (NOIT) -> CARFNOIT.',
    tags: ['coding-decoding', 'reasoning'],
  },
  {
    title: 'Seating Arrangement - Circular Desk',
    category: 'aptitude',
    subject: 'Logical Reasoning',
    topic: 'Seating Arrangement',
    difficulty: 'hard',
    type: 'mcq',
    question: 'A, B, C, D, E, and F are sitting around a circular table facing the center. A is second to the left of F. C is not an immediate neighbor of A or F. B is sitting second to the right of E. Who is sitting opposite to A?',
    options: ['E', 'B', 'D', 'C'],
    correctAnswer: 'E',
    explanation: 'By placing A and F, and ensuring C is not next to A/F, E and B fall into position such that E sits directly opposite A.',
    tags: ['seating-arrangement', 'logical-reasoning'],
  },

  // =========================================================================
  // ===================== TECHNICAL - JavaScript =====================
  // =========================================================================
  {
    title: 'JavaScript Event Loop & Microtasks',
    category: 'technical',
    subject: 'JavaScript',
    topic: 'Async JavaScript',
    difficulty: 'easy',
    type: 'mcq',
    question: 'What is the output of the following JavaScript code?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);',
    options: ['1 4 3 2', '1 2 3 4', '1 4 2 3', '1 3 4 2'],
    correctAnswer: '1 4 3 2',
    explanation: 'Synchronous statements execute first (1, 4). Microtasks (Promises) execute before Macrotasks (setTimeout timer queue). Therefore, 3 logs before 2.',
    tags: ['javascript', 'event-loop', 'async'],
  },
  {
    title: 'JavaScript Lexical Closures & Scope',
    category: 'technical',
    subject: 'JavaScript',
    topic: 'Closures',
    difficulty: 'medium',
    type: 'mcq',
    question: 'What will be printed to the console?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
    options: ['3 3 3', '0 1 2', 'undefined undefined undefined', '0 0 0'],
    correctAnswer: '3 3 3',
    explanation: 'Because `var` is function-scoped (or globally scoped here), all callbacks in `setTimeout` reference the exact same mutated variable `i`, which equals 3 after the loop finishes. Using `let` would create a new binding per iteration printing `0 1 2`.',
    tags: ['javascript', 'closures', 'scoping'],
  },
  {
    title: 'JavaScript Prototype & Memory Leak',
    category: 'technical',
    subject: 'JavaScript',
    topic: 'Prototypes',
    difficulty: 'hard',
    type: 'mcq',
    question: 'Which of the following scenarios in JavaScript can cause memory leaks in single-page web applications?',
    options: [
      'Forgotten global variables and uncleaned event listeners/timers',
      'Using const instead of let',
      'Using Arrow functions inside Array.map()',
      'Destructuring deeply nested objects'
    ],
    correctAnswer: 'Forgotten global variables and uncleaned event listeners/timers',
    explanation: 'Accidental global variables attach to `window` and remain in memory indefinitely. Similarly, unremoved event listeners or intervals retain references to DOM nodes and enclosed closures.',
    tags: ['javascript', 'memory-leaks', 'performance'],
  },

  // =========================================================================
  // ===================== TECHNICAL - Python =====================
  // =========================================================================
  {
    title: 'Python Decorators & Wrapper Metadata',
    category: 'technical',
    subject: 'Python',
    topic: 'Decorators',
    difficulty: 'medium',
    type: 'mcq',
    question: 'Why should `@functools.wraps(func)` be used when writing custom Python function decorators?',
    options: [
      'To preserve original function attributes like __name__ and __doc__',
      'To make the decorated function execute asynchronously',
      'To enforce static typing on function parameters',
      'To prevent memory leak in recursive calls'
    ],
    correctAnswer: 'To preserve original function attributes like __name__ and __doc__',
    explanation: '`functools.wraps` copies the original docstring, function name, module, and argument list from the decorated function to the wrapper function.',
    tags: ['python', 'decorators', 'functools'],
  },
  {
    title: 'Python Multiprocessing vs Threading & GIL',
    category: 'technical',
    subject: 'Python',
    topic: 'Concurrency',
    difficulty: 'hard',
    type: 'mcq',
    question: 'Why does multi-threaded CPU-bound Python code (using standard `threading`) fail to utilize multiple CPU cores in CPython?',
    options: [
      'Due to CPython\'s Global Interpreter Lock (GIL)',
      'Because Python operating systems prohibit kernel threads',
      'Because Python lists are non-thread-safe',
      'Because Python uses cooperative multitasking only'
    ],
    correctAnswer: 'Due to CPython\'s Global Interpreter Lock (GIL)',
    explanation: 'The GIL prevents true parallel execution of bytecode across multiple CPU cores within a single CPython process. CPU-intensive tasks require `multiprocessing` to run on multiple cores.',
    tags: ['python', 'gil', 'multiprocessing'],
  },

  // =========================================================================
  // ===================== TECHNICAL - Java =====================
  // =========================================================================
  {
    title: 'Java HashMap Internal Mechanics',
    category: 'technical',
    subject: 'Java',
    topic: 'Collections',
    difficulty: 'medium',
    type: 'mcq',
    question: 'What structural change occurs in Java 8 HashMap when a single bucket bin exceeds the TREEIFY_THRESHOLD (8 entries) and total table capacity is at least 64?',
    options: [
      'The linked list in the bucket converts into a Red-Black Tree',
      'The array size automatically doubles',
      'An OutOfMemoryError is thrown',
      'The bucket entries are converted to a SkipList'
    ],
    correctAnswer: 'The linked list in the bucket converts into a Red-Black Tree',
    explanation: 'In Java 8+, HashMaps optimize high-collision buckets by converting linked lists (O(N) search) into balanced Red-Black Trees (O(log N) search).',
    tags: ['java', 'hashmap', 'data-structures'],
  },
  {
    title: 'Java Memory Architecture - Heap vs Stack',
    category: 'technical',
    subject: 'Java',
    topic: 'JVM',
    difficulty: 'easy',
    type: 'mcq',
    question: 'Where are object instances stored in Java JVM architecture?',
    options: ['Heap Memory', 'Stack Memory', 'Method Area / Metaspace', 'Program Counter Register'],
    correctAnswer: 'Heap Memory',
    explanation: 'All instantiated objects and their instance variables reside in the JVM Heap memory, while primitive local variables and method call frames are stored on the Stack.',
    tags: ['java', 'jvm', 'memory-management'],
  },

  // =========================================================================
  // ===================== TECHNICAL - DBMS & SQL =====================
  // =========================================================================
  {
    title: 'Database Isolation Levels & Anomalies',
    category: 'technical',
    subject: 'DBMS',
    topic: 'Transactions',
    difficulty: 'hard',
    type: 'mcq',
    question: 'Which ANSI SQL Isolation Level completely prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?',
    options: ['Serializable', 'Repeatable Read', 'Read Committed', 'Read Uncommitted'],
    correctAnswer: 'Serializable',
    explanation: '`Serializable` is the highest isolation level. It enforces strict locking/range locks or MVCC order, preventing all transaction concurrency anomalies.',
    tags: ['dbms', 'acid', 'isolation-levels'],
  },
  {
    title: 'SQL Left Join vs Inner Join Behavior',
    category: 'technical',
    subject: 'SQL',
    topic: 'Joins',
    difficulty: 'easy',
    type: 'mcq',
    question: 'What is returned by a LEFT JOIN when there are no matching rows in the right table?',
    options: [
      'All left table rows with NULL values for right table columns',
      'Only the matching rows from both tables',
      'An empty result set',
      'An error code'
    ],
    correctAnswer: 'All left table rows with NULL values for right table columns',
    explanation: 'LEFT JOIN guarantees that all rows from the left table appear in the output. Unmatched right table columns are populated with NULL values.',
    tags: ['sql', 'joins', 'databases'],
  },

  // =========================================================================
  // ===================== TECHNICAL - Operating System =====================
  // =========================================================================
  {
    title: 'OS Deadlock - Banker\'s Algorithm',
    category: 'technical',
    subject: 'Operating System',
    topic: 'Deadlock Avoidance',
    difficulty: 'medium',
    type: 'mcq',
    question: 'What is the primary purpose of the Banker\'s Algorithm in Operating Systems?',
    options: [
      'Deadlock Avoidance',
      'Deadlock Recovery',
      'CPU Scheduling',
      'Virtual Page Replacement'
    ],
    correctAnswer: 'Deadlock Avoidance',
    explanation: 'The Banker\'s algorithm tests for safety by simulating resource allocation for maximum possible claims before deciding whether allocation should be granted.',
    tags: ['operating-system', 'deadlock', 'bankers-algorithm'],
  },

  // =========================================================================
  // ===================== TECHNICAL - Computer Networks =====================
  // =========================================================================
  {
    title: 'TCP 3-Way Handshake Flags',
    category: 'technical',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    difficulty: 'medium',
    type: 'mcq',
    question: 'What is the correct sequence of TCP flag packets exchanged during a connection establishment?',
    options: [
      'SYN -> SYN-ACK -> ACK',
      'SYN -> ACK -> SYN-ACK',
      'ACK -> SYN -> FIN',
      'SYN -> PUSH -> ACK'
    ],
    correctAnswer: 'SYN -> SYN-ACK -> ACK',
    explanation: 'Client sends SYN, server responds with SYN-ACK, and client completes handshake by returning ACK.',
    tags: ['networking', 'tcp', 'protocols'],
  },

  // =========================================================================
  // ===================== DSA - Arrays & Two Pointers =====================
  // =========================================================================
  {
    title: 'Trapping Rain Water - Space Complexity',
    category: 'dsa',
    subject: 'Arrays',
    topic: 'Two Pointers',
    difficulty: 'hard',
    type: 'mcq',
    question: 'Given an array representing elevation maps, what is the optimal Time and Space complexity to calculate total trapped rain water?',
    options: [
      'Time: O(N), Space: O(1) using Two-Pointers',
      'Time: O(N²), Space: O(1)',
      'Time: O(N log N), Space: O(N)',
      'Time: O(N), Space: O(N) using DP table only'
    ],
    correctAnswer: 'Time: O(N), Space: O(1) using Two-Pointers',
    explanation: 'By maintaining `left_max` and `right_max` pointers moving inward from both ends, trapped water can be computed in O(N) time with zero auxiliary memory O(1).',
    tags: ['dsa', 'arrays', 'two-pointers', 'hard'],
  },
  {
    title: 'Subarray with Given Sum (Kadane\'s Algorithm)',
    category: 'dsa',
    subject: 'Arrays',
    topic: 'Dynamic Programming / Greedy',
    difficulty: 'medium',
    type: 'mcq',
    question: 'Kadane\'s algorithm runs in O(N) time by keeping track of current max and global max. What happens to current max when it becomes negative?',
    options: [
      'Reset current max to 0 (or current element)',
      'Terminate the loop immediately',
      'Multiply current max by -1',
      'Add current max to global max'
    ],
    correctAnswer: 'Reset current max to 0 (or current element)',
    explanation: 'A negative contiguous sum decreases the value of any future subarray. Hence, Kadane\'s resets current sum to 0 whenever it drops below 0.',
    tags: ['dsa', 'kadane', 'arrays'],
  },

  // =========================================================================
  // ===================== DSA - Linked List & Trees =====================
  // =========================================================================
  {
    title: 'Lowest Common Ancestor (LCA) in BST',
    category: 'dsa',
    subject: 'Trees',
    topic: 'Binary Search Tree',
    difficulty: 'medium',
    type: 'mcq',
    question: 'In a Binary Search Tree (BST), how do you find the Lowest Common Ancestor (LCA) of two nodes p and q?',
    options: [
      'Traverse from root: if both p and q are smaller, go left; if both are larger, go right; otherwise current node is LCA',
      'Perform Postorder traversal and count child nodes',
      'Use BFS queue to find node with maximum height',
      'Convert tree into array and find median index'
    ],
    correctAnswer: 'Traverse from root: if both p and q are smaller, go left; if both are larger, go right; otherwise current node is LCA',
    explanation: 'Leveraging BST property (left < root < right), the split point where p and q lie on opposite sides of the current root is guaranteed to be the LCA.',
    tags: ['dsa', 'bst', 'trees'],
  },

  // =========================================================================
  // ===================== CODING - Hands-On Problems =====================
  // =========================================================================
  {
    title: 'Two Sum Problem',
    category: 'coding',
    subject: 'Arrays',
    topic: 'Hash Map',
    difficulty: 'easy',
    type: 'coding',
    question: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target` in O(N) time.',
    correctAnswer: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
    explanation: 'Maintain a hash map storing value -> index. For each element `x`, check if `target - x` exists in map. Time: O(N), Space: O(N).',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0, 1]',
    hints: ['Can you do this in one pass using a Hash Map?'],
    solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
    tags: ['coding', 'two-sum', 'hash-table', 'easy'],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    category: 'coding',
    subject: 'Strings',
    topic: 'Sliding Window',
    difficulty: 'medium',
    type: 'coding',
    question: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    correctAnswer: 'function lengthOfLongestSubstring(s) {\n  let maxLen = 0, left = 0;\n  const set = new Set();\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}',
    explanation: 'Use Sliding Window technique with two pointers `left` and `right`. Maintain a Set of active window characters. Shrink window when duplicate appears.',
    constraints: '0 <= s.length <= 5 * 10^4',
    sampleInput: '"abcabcbb"',
    sampleOutput: '3',
    hints: ['Use sliding window pointers and a Set or Map to track unique chars'],
    solution: 'function lengthOfLongestSubstring(s) {\n  let maxLen = 0, left = 0;\n  const set = new Set();\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}',
    tags: ['coding', 'sliding-window', 'strings', 'medium'],
  },
  {
    title: 'Merge K Sorted Lists',
    category: 'coding',
    subject: 'Linked List',
    topic: 'Heap / Priority Queue',
    difficulty: 'hard',
    type: 'coding',
    question: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    correctAnswer: 'function mergeKLists(lists) {\n  if (!lists || lists.length === 0) return null;\n  while (lists.length > 1) {\n    const merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i];\n      const l2 = i + 1 < lists.length ? lists[i + 1] : null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}',
    explanation: 'Using Divide & Conquer (merge lists in pairs) merges K lists of length N in O(N log K) time complexity.',
    constraints: 'k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500',
    sampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
    sampleOutput: '[1,1,2,3,4,4,5,6]',
    hints: ['Divide and conquer or use a Min Heap'],
    solution: 'function mergeKLists(lists) {\n  if (!lists || lists.length === 0) return null;\n  while (lists.length > 1) {\n    const merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i];\n      const l2 = i + 1 < lists.length ? lists[i + 1] : null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}\n\nfunction mergeTwoLists(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n    else { curr.next = l2; l2 = l2.next; }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}',
    tags: ['coding', 'linked-list', 'divide-and-conquer', 'hard'],
  },

  // =========================================================================
  // ===================== HR & BEHAVIORAL QUESTIONS =====================
  // =========================================================================
  {
    title: 'Handling Architectural Shift & Tight Deadline',
    category: 'behavioral',
    subject: 'Behavioral',
    topic: 'Adaptability & Resilience',
    difficulty: 'medium',
    type: 'subjective',
    question: 'Describe a situation where a critical requirement changed days before a production release. How did you adapt?',
    correctAnswer: 'Use STAR format: 1) Situation: Product changed data format right before deadline. 2) Task: Prevent production downtime while updating core APIs. 3) Action: Created a backward-compatible translation layer, conducted rapid integration testing. 4) Result: Deployed seamlessly with 0 downtime.',
    explanation: 'Highlight adaptability, clear team communication, risk assessment, and technical composure under tight deadlines.',
    tags: ['behavioral', 'adaptability', 'production-challenges'],
  },
  {
    title: 'Conflict Resolution with Senior Developers',
    category: 'hr',
    subject: 'HR',
    topic: 'Professional Ethics & Communication',
    difficulty: 'medium',
    type: 'subjective',
    question: 'How do you approach a technical design conflict when you disagree with a senior team member on technical implementation?',
    correctAnswer: 'Focus on evidence-based technical metrics: 1) Request a 1-on-1 code review session. 2) Benchmark performance/scalability metrics of both solutions. 3) Align on overall business requirements rather than ego. 4) Respect team decision once consensus is reached.',
    explanation: 'Demonstrates professional maturity, objective evaluation using benchmarks, collaborative mindset, and commitment to team goals.',
    tags: ['hr', 'conflict-resolution', 'teamwork'],
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions database');

    // Insert rich realistic questions
    const insertedQuestions = await Question.insertMany(questions);
    console.log(`✅ Successfully inserted ${insertedQuestions.length} real-world placement questions across Easy, Medium, and Hard difficulty levels!`);

    // Create demo users if not present
    const existingAdmin = await User.findOne({ email: 'admin@placementpro.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@placementpro.com',
        password: 'admin123456',
        role: 'admin',
        college: 'PlacementPro University',
        branch: 'Computer Science',
        graduationYear: 2025,
        badges: ['newcomer', 'admin'],
        achievements: ['Registered on PlacementPro', 'Admin privileges granted'],
      });
      console.log('✅ Created admin user (admin@placementpro.com / admin123456)');
    }

    const existingUser = await User.findOne({ email: 'demo@placementpro.com' });
    if (!existingUser) {
      await User.create({
        name: 'Demo Student',
        email: 'demo@placementpro.com',
        password: 'demo123456',
        college: 'IIT Delhi',
        branch: 'Computer Science',
        graduationYear: 2025,
        badges: ['newcomer'],
        achievements: ['Registered on PlacementPro'],
      });
      console.log('✅ Created demo user (demo@placementpro.com / demo123456)');
    }

    console.log('\n🎉 Real-World Questions Database Seeded Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Easy, Medium & Hard Placement Questions added across Quantitative Aptitude, Logical Reasoning, Verbal, Technical, DSA & HR!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
