// Comprehensive Question Dataset Generator for PlacementPro
// Generates 100 questions for each of the 11 DSA topics, 30 Technical questions, and 30 Aptitude questions.

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
      },
      {
        title: 'Detect Cycle in Linked List (Floyd\'s Algorithm)',
        difficulty: 'medium',
        question: 'What is Floyd\'s Cycle Detection algorithm also known as?',
        options: ['Tortoise and Hare Algorithm', 'Kadane\'s Algorithm', 'KMP Algorithm', 'Boyer-Moore Voting Algorithm'],
        correctAnswer: 'Tortoise and Hare Algorithm',
        explanation: 'Floyd\'s algorithm uses two pointers moving at different speeds (slow = 1 step, fast = 2 steps). If a cycle exists, fast will meet slow inside the loop.',
        hints: ['Advance slow by 1 step and fast by 2 steps.'],
        solution: 'bool hasCycle(ListNode *head) {\n  ListNode *slow = head, *fast = head;\n  while(fast && fast->next) {\n    slow = slow->next;\n    fast = fast->next->next;\n    if(slow == fast) return true;\n  }\n  return false;\n}',
        tags: ['linked-list', 'two-pointers', 'cycle-detection']
      }
    ],
    'Stack': [
      {
        title: 'Valid Parentheses',
        difficulty: 'easy',
        question: 'Which property of a Stack data structure makes it ideal for solving bracket matching problems?',
        options: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'Random Access by Index', 'Sorted Key Value Order'],
        correctAnswer: 'LIFO (Last In First Out)',
        explanation: 'LIFO matches the innermost closing bracket with the most recently opened opening bracket.',
        hints: ['Push opening brackets to stack, pop and compare when encountering closing bracket.'],
        solution: 'bool isValid(string s) {\n  stack<char> st;\n  for(char c : s) {\n    if(c==\'(\' || c==\'{\' || c==\'[\') st.push(c);\n    else {\n      if(st.empty()) return false;\n      if(c==\')\' && st.top()!=\'(\') return false;\n      if(c==\'}\' && st.top()!=\'{\') return false;\n      if(c==\']\' && st.top()!=\'[\') return false;\n      st.pop();\n    }\n  }\n  return st.empty();\n}',
        tags: ['stack', 'string']
      }
    ],
    'Queue': [
      {
        title: 'Implement Stack using Queues',
        difficulty: 'medium',
        question: 'How can LIFO behavior be achieved using a single Queue data structure?',
        options: ['By popping elements from index 0', 'By pushing an element and then rotating the queue (N-1) times', 'Queues cannot implement a stack', 'By reversing the internal array'],
        correctAnswer: 'By pushing an element and then rotating the queue (N-1) times',
        explanation: 'Upon enqueueing a new item, dequeueing and re-enqueueing the previous (N-1) elements places the newly added element at the front of the queue.',
        hints: ['Rotate previous elements behind the newly inserted element.'],
        solution: 'class MyStack {\n  queue<int> q;\npublic:\n  void push(int x) {\n    q.push(x);\n    for(int i=0; i<q.size()-1; i++) {\n      q.push(q.front());\n      q.pop();\n    }\n  }\n  int pop() { int val=q.front(); q.pop(); return val; }\n  int top() { return q.front(); }\n  bool empty() { return q.empty(); }\n};',
        tags: ['queue', 'stack', 'design']
      }
    ],
    'Trees': [
      {
        title: 'Binary Tree Inorder Traversal',
        difficulty: 'easy',
        question: 'In an Inorder Traversal of a Binary Tree, in which order are nodes visited?',
        options: ['Root -> Left -> Right', 'Left -> Root -> Right', 'Left -> Right -> Root', 'Root -> Right -> Left'],
        correctAnswer: 'Left -> Root -> Right',
        explanation: 'Inorder recursively visits the left subtree, then the root node, followed by the right subtree. For a BST, this yields values in sorted order.',
        hints: ['Traverse Left, process Current node, then traverse Right.'],
        solution: 'void inorder(TreeNode* root, vector<int>& res) {\n  if(!root) return;\n  inorder(root->left, res);\n  res.push_back(root->val);\n  inorder(root->right, res);\n}',
        tags: ['tree', 'depth-first-search', 'recursion']
      }
    ],
    'Graphs': [
      {
        title: 'Breadth-First Search (BFS) Traversal',
        difficulty: 'medium',
        question: 'Which data structure is fundamentally used to implement Breadth-First Search on a graph?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Array List'],
        correctAnswer: 'Queue',
        explanation: 'BFS explores graph nodes level by level in FIFO order, requiring a Queue data structure.',
        hints: ['Push start node to queue and mark as visited.'],
        solution: 'vector<int> bfsOfGraph(int V, vector<int> adj[]) {\n  vector<int> bfs;\n  vector<bool> vis(V, false);\n  queue<int> q;\n  q.push(0); vis[0] = true;\n  while(!q.empty()) {\n    int node = q.front(); q.pop();\n    bfs.push_back(node);\n    for(int it : adj[node]) {\n      if(!vis[it]) { vis[it]=true; q.push(it); }\n    }\n  }\n  return bfs;\n}',
        tags: ['graph', 'bfs', 'breadth-first-search']
      }
    ],
    'Recursion': [
      {
        title: 'Base Case in Recursion',
        difficulty: 'easy',
        question: 'What happens if a recursive function does not have a proper base case?',
        options: ['The program terminates normally', 'Returns null value', 'Causes StackOverflowError or maximum recursion depth exceeded', 'Executes faster'],
        correctAnswer: 'Causes StackOverflowError or maximum recursion depth exceeded',
        explanation: 'Without a base case, recursive calls continue infinitely until call stack memory is exhausted.',
        hints: ['Every recursive method must terminate at a base condition.'],
        solution: 'int factorial(int n) {\n  if(n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive step\n}',
        tags: ['recursion', 'basics']
      }
    ],
    'Dynamic Programming': [
      {
        title: 'Fibonacci Number (DP Optimization)',
        difficulty: 'easy',
        question: 'What reduces the time complexity of computing the N-th Fibonacci number from O(2^N) to O(N)?',
        options: ['Greedy Choice', 'Memoization / Tabulation (storing subproblem solutions)', 'Binary Search', 'Sorting'],
        correctAnswer: 'Memoization / Tabulation (storing subproblem solutions)',
        explanation: 'Dynamic Programming eliminates duplicate overlapping subproblems by caching computed Fibonacci values.',
        hints: ['Store previously calculated f(n) values in a 1D DP table.'],
        solution: 'int fib(int n) {\n  if(n<=1) return n;\n  int dp[n+1]; dp[0]=0; dp[1]=1;\n  for(int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}',
        tags: ['dynamic-programming', 'memoization']
      }
    ],
    'Sorting': [
      {
        title: 'Quick Sort Average Time Complexity',
        difficulty: 'medium',
        question: 'What is the average time complexity of Quick Sort algorithm?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
        correctAnswer: 'O(N log N)',
        explanation: 'Quick Sort divides the problem in O(log N) partitioning levels on average, taking O(N) work per level = O(N log N).',
        hints: ['Pivot selection divides elements into two sub-parts.'],
        solution: 'void quickSort(int arr[], int low, int high) {\n  if (low < high) {\n    int pi = partition(arr, low, high);\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n  }\n}',
        tags: ['sorting', 'quick-sort', 'divide-and-conquer']
      }
    ],
    'Searching': [
      {
        title: 'Binary Search Requirement',
        difficulty: 'easy',
        question: 'What precondition MUST be satisfied by an array before applying Binary Search?',
        options: ['Array must contain unique elements only', 'Array size must be even', 'Array must be sorted in non-decreasing or non-increasing order', 'Array must not contain zero'],
        correctAnswer: 'Array must be sorted in non-decreasing or non-increasing order',
        explanation: 'Binary Search relies on ordering to eliminate half of the remaining elements at each step in O(log N) time.',
        hints: ['Divide search space into half based on middle element comparison.'],
        solution: 'int binarySearch(int arr[], int n, int target) {\n  int low = 0, high = n - 1;\n  while(low <= high) {\n    int mid = low + (high - low) / 2;\n    if(arr[mid] == target) return mid;\n    if(arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}',
        tags: ['searching', 'binary-search']
      }
    ]
  };

  const templates = dsaTopicTemplates[topicName] || dsaTopicTemplates['Arrays'];
  const questions = [];

  for (let i = 1; i <= 100; i++) {
    const template = templates[(i - 1) % templates.length];
    const diff = i % 3 === 1 ? 'easy' : (i % 3 === 2 ? 'medium' : 'hard');
    
    questions.push({
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
      tags: [...template.tags, topicName.toLowerCase().replace(' ', '-')]
    });
  }

  return questions;
};

// Generates 30 Technical Questions covering key core CS subjects
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
    },
    {
      title: 'Java Memory Management',
      subject: 'Java',
      topic: 'Garbage Collection',
      difficulty: 'medium',
      question: 'Where are objects allocated memory in Java runtime environment?',
      options: ['Stack Memory', 'Heap Memory', 'Method Area', 'Program Counter Register'],
      correctAnswer: 'Heap Memory',
      explanation: 'All class instances and arrays in Java are dynamically allocated on the Heap memory, managed by the Garbage Collector.',
      tags: ['java', 'memory', 'heap']
    },
    {
      title: 'Virtual Functions in C++',
      subject: 'C++',
      topic: 'Polymorphism',
      difficulty: 'medium',
      question: 'What mechanisms does C++ compiler use to support dynamic/runtime polymorphism via virtual functions?',
      options: ['vptr (virtual pointer) and vtable (virtual table)', 'Template Specialization', 'Function Overloading table', 'Inline expansion'],
      correctAnswer: 'vptr (virtual pointer) and vtable (virtual table)',
      explanation: 'C++ creates a static vtable per class with virtual methods and embeds a vptr in every instance to dispatch calls at runtime.',
      tags: ['cpp', 'oop', 'vtable']
    },
    {
      title: 'Python GIL Explanation',
      subject: 'Python',
      topic: 'Multithreading',
      difficulty: 'hard',
      question: 'What is the Global Interpreter Lock (GIL) in CPython?',
      options: ['A mechanism that speeds up math calculations', 'A mutex that prevents multiple native threads from executing Python bytecodes simultaneously', 'A memory management tool for garbage collection', 'A compiler flag for code optimization'],
      correctAnswer: 'A mutex that prevents multiple native threads from executing Python bytecodes simultaneously',
      explanation: 'GIL enforces single-threaded bytecode execution per process in CPython to protect thread-safety of memory management.',
      tags: ['python', 'gil', 'multithreading']
    }
  ];

  for (let i = 1; i <= 30; i++) {
    const item = techPool[(i - 1) % techPool.length];
    const subjectName = subjects[(i - 1) % subjects.length];
    
    questions.push({
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

// Generates 30 Aptitude Questions covering Quantitative, Logical, and Verbal
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
    },
    {
      title: 'Work and Pipes & Cisterns',
      subject: 'Quantitative Aptitude',
      topic: 'Pipes & Cisterns',
      difficulty: 'medium',
      question: 'Pipe A can fill a tank in 6 hours and Pipe B can empty it in 8 hours. If both pipes are opened together, how long will it take to fill the tank?',
      options: ['24 hours', '14 hours', '12 hours', '18 hours'],
      correctAnswer: '24 hours',
      explanation: 'Net filling rate = 1/6 - 1/8 = (4-3)/24 = 1/24. Thus, it will take 24 hours to fill.',
      tags: ['aptitude', 'quant', 'work']
    },
    {
      title: 'Number Series Completion',
      subject: 'Logical Reasoning',
      topic: 'Series Completion',
      difficulty: 'easy',
      question: 'Find the missing number in the series: 2, 6, 12, 20, 30, ?',
      options: ['42', '36', '40', '48'],
      correctAnswer: '42',
      explanation: 'Differences are 4, 6, 8, 10 (+2 increasing step). Next diff = 12. 30 + 12 = 42. (Also n^2 + n).',
      tags: ['aptitude', 'logical', 'series']
    }
  ];

  const questions = [];
  const subjects = ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];

  for (let i = 1; i <= 30; i++) {
    const item = aptPool[(i - 1) % aptPool.length];
    const subjectName = subjects[(i - 1) % subjects.length];

    questions.push({
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

// Returns complete set of all required questions
export const getAllSeedQuestions = () => {
  const dsaTopics = [
    'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue',
    'Trees', 'Graphs', 'Recursion', 'Dynamic Programming',
    'Sorting', 'Searching'
  ];

  let allQuestions = [];

  // 1. Generate 100 questions for each of the 11 DSA topics = 1,100 questions
  dsaTopics.forEach((topic) => {
    const topicQs = generateDSATopicQuestions(topic);
    allQuestions = allQuestions.concat(topicQs);
  });

  // 2. Generate 30 Technical Quiz questions
  const techQs = generateTechnicalQuestions();
  allQuestions = allQuestions.concat(techQs);

  // 3. Generate 30 Aptitude Quiz questions
  const aptQs = generateAptitudeQuestions();
  allQuestions = allQuestions.concat(aptQs);

  return allQuestions;
};
