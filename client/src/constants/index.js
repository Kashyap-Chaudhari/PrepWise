import {
  HiOutlineHome,
  HiOutlineAcademicCap,
  HiOutlineCode,
  HiOutlineChartBar,
  HiOutlineUser,
  HiOutlineChatAlt2,
  HiOutlineDesktopComputer,
  HiOutlineLightningBolt,
  HiOutlineBookOpen,
} from 'react-icons/hi';
import {
  FaJava,
  FaPython,
  FaDatabase,
  FaNetworkWired,
  FaCogs,
  FaCode,
  FaBrain,
  FaRobot,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiJavascript,
  SiC,
} from 'react-icons/si';

export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: HiOutlineHome },
  { name: 'Dashboard', path: '/dashboard', icon: HiOutlineHome, protected: true },
  { name: 'Aptitude', path: '/aptitude', icon: HiOutlineAcademicCap, protected: true },
  { name: 'Technical', path: '/technical', icon: HiOutlineDesktopComputer, protected: true },
  { name: 'DSA', path: '/dsa', icon: HiOutlineCode, protected: true },
  { name: 'Coding', path: '/coding', icon: HiOutlineLightningBolt, protected: true },
  { name: 'Mock Interview', path: '/mock-interview', icon: HiOutlineChatAlt2, protected: true },
  { name: 'Analytics', path: '/analytics', icon: HiOutlineChartBar, protected: true },
  { name: 'Profile', path: '/profile', icon: HiOutlineUser, protected: true },
];

export const SIDEBAR_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: HiOutlineHome },
  { name: 'Aptitude', path: '/aptitude', icon: HiOutlineAcademicCap },
  { name: 'Technical', path: '/technical', icon: HiOutlineDesktopComputer },
  { name: 'DSA', path: '/dsa', icon: HiOutlineCode },
  { name: 'Coding', path: '/coding', icon: HiOutlineLightningBolt },
  { name: 'Mock Interview', path: '/mock-interview', icon: HiOutlineChatAlt2 },
  { name: 'Analytics', path: '/analytics', icon: HiOutlineChartBar },
  { name: 'Profile', path: '/profile', icon: HiOutlineUser },
];

export const APTITUDE_TOPICS = [
  {
    name: 'Quantitative Aptitude',
    subject: 'Quantitative Aptitude',
    description: 'Numbers, algebra, geometry, and arithmetic reasoning',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Logical Reasoning',
    subject: 'Logical Reasoning',
    description: 'Patterns, puzzles, deductions, and analytical thinking',
    icon: '🧩',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Verbal Ability',
    subject: 'Verbal Ability',
    description: 'Vocabulary, grammar, comprehension, and communication',
    icon: '📝',
    color: 'from-amber-500 to-orange-500',
  },
];

export const TECHNICAL_SUBJECTS = [
  { name: 'C', subject: 'C', icon: SiC, color: 'from-blue-600 to-blue-800' },
  { name: 'C++', subject: 'C++', icon: SiCplusplus, color: 'from-blue-500 to-indigo-600' },
  { name: 'Java', subject: 'Java', icon: FaJava, color: 'from-red-500 to-orange-500' },
  { name: 'Python', subject: 'Python', icon: FaPython, color: 'from-yellow-500 to-green-500' },
  { name: 'JavaScript', subject: 'JavaScript', icon: SiJavascript, color: 'from-yellow-400 to-yellow-600' },
  { name: 'DBMS', subject: 'DBMS', icon: FaDatabase, color: 'from-emerald-500 to-teal-600' },
  { name: 'Operating System', subject: 'Operating System', icon: FaCogs, color: 'from-gray-500 to-slate-600' },
  { name: 'Computer Networks', subject: 'Computer Networks', icon: FaNetworkWired, color: 'from-cyan-500 to-blue-500' },
  { name: 'SQL', subject: 'SQL', icon: FaDatabase, color: 'from-orange-500 to-red-500' },
  { name: 'OOP', subject: 'OOP', icon: FaCode, color: 'from-violet-500 to-purple-600' },
  { name: 'Software Engineering', subject: 'Software Engineering', icon: FaCogs, color: 'from-pink-500 to-rose-600' },
  { name: 'Machine Learning', subject: 'Machine Learning Basics', icon: FaRobot, color: 'from-green-500 to-emerald-600' },
];

export const DSA_TOPICS = [
  { name: 'Arrays', icon: '📋', color: 'from-blue-500 to-cyan-500', description: 'Array manipulation and searching' },
  { name: 'Strings', icon: '🔤', color: 'from-green-500 to-emerald-500', description: 'String operations and patterns' },
  { name: 'Linked List', icon: '🔗', color: 'from-purple-500 to-violet-500', description: 'Singly and doubly linked lists' },
  { name: 'Stack', icon: '📚', color: 'from-amber-500 to-orange-500', description: 'LIFO operations and applications' },
  { name: 'Queue', icon: '🎫', color: 'from-red-500 to-pink-500', description: 'FIFO operations and variants' },
  { name: 'Trees', icon: '🌳', color: 'from-emerald-500 to-green-600', description: 'Binary trees, BST, traversals' },
  { name: 'Graphs', icon: '🕸️', color: 'from-indigo-500 to-blue-600', description: 'BFS, DFS, shortest paths' },
  { name: 'Recursion', icon: '🔄', color: 'from-teal-500 to-cyan-600', description: 'Recursive problem solving' },
  { name: 'Dynamic Programming', icon: '💎', color: 'from-yellow-500 to-amber-600', description: 'Optimization and memoization' },
  { name: 'Sorting', icon: '📊', color: 'from-rose-500 to-red-600', description: 'Sorting algorithms and analysis' },
  { name: 'Searching', icon: '🔍', color: 'from-slate-500 to-gray-600', description: 'Binary search and variations' },
];

export const CODING_LANGUAGES = [
  { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-green-500', description: 'Lists, Dictionaries, Lambdas, OOP, Algorithms' },
  { name: 'Java', icon: '☕', color: 'from-red-500 to-orange-500', description: 'OOP, Collections, Threads, Stream API, Generics' },
  { name: 'C++', icon: '⚡', color: 'from-blue-500 to-indigo-600', description: 'STL, Pointers, Templates, Memory, References' },
  { name: 'C', icon: '🔵', color: 'from-blue-600 to-blue-800', description: 'Pointers, Structs, Dynamic Memory, Macros' },
  { name: 'JavaScript', icon: '🟨', color: 'from-yellow-400 to-amber-500', description: 'ES6+, Promises, Closures, Async/Await, Array Methods' },
  { name: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-cyan-600', description: 'Interfaces, Generics, Tuples, Enums, Type Guards' },
  { name: 'C#', icon: '💎', color: 'from-purple-600 to-violet-700', description: 'LINQ, Delegates, Properties, Async Task, Memory' },
  { name: 'PHP', icon: '🐘', color: 'from-indigo-400 to-purple-500', description: 'Arrays, Classes, Exceptions, String Manipulation' },
  { name: 'SQL', icon: '🧠', color: 'from-amber-500 to-orange-600', description: 'JOINs, Aggregation, Subqueries, Indexes, Grouping' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  { value: 'hard', label: 'Hard', color: 'text-red-400', bg: 'bg-red-500/15' },
];

export const INTERVIEW_TYPES = [
  { value: 'hr', label: 'HR Round', icon: '👤', description: 'Personal and situational questions', color: 'from-blue-500 to-indigo-500' },
  { value: 'technical', label: 'Technical Round', icon: '💻', description: 'Technical concepts and problem solving', color: 'from-green-500 to-emerald-500' },
  { value: 'behavioral', label: 'Behavioral Round', icon: '🎯', description: 'Past experiences and competencies', color: 'from-purple-500 to-violet-500' },
  { value: 'mixed', label: 'Mixed Round', icon: '🎲', description: 'Combination of all question types', color: 'from-amber-500 to-orange-500' },
];

export const BADGE_DEFINITIONS = {
  newcomer: { name: 'Newcomer', icon: '🌟', description: 'Welcome to PlacementPro!' },
  'solver-10': { name: 'Problem Solver', icon: '🧮', description: 'Solved 10 questions' },
  'solver-50': { name: 'Expert Solver', icon: '🏅', description: 'Solved 50 questions' },
  'solver-100': { name: 'Master Solver', icon: '🏆', description: 'Solved 100 questions' },
  'perfect-score': { name: 'Perfectionist', icon: '💯', description: 'Scored 100% in a test' },
  'streak-7': { name: 'Streak Master', icon: '🔥', description: '7-day learning streak' },
  admin: { name: 'Admin', icon: '👑', description: 'Administrator privileges' },
};

export const STATS_COUNTERS = [
  { label: 'Questions', value: 500, suffix: '+' },
  { label: 'Topics', value: 30, suffix: '+' },
  { label: 'Students', value: 10000, suffix: '+' },
  { label: 'Success Rate', value: 95, suffix: '%' },
];

export const FEATURES = [
  {
    title: 'Aptitude Training',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability with curated questions.',
    icon: '🎯',
  },
  {
    title: 'Technical Practice',
    description: 'Practice questions across 12+ technical subjects from C to Machine Learning.',
    icon: '💻',
  },
  {
    title: 'DSA Mastery',
    description: 'Sharpen your data structures and algorithms skills with topic-wise problems.',
    icon: '🧠',
  },
  {
    title: 'Mock Interviews',
    description: 'Simulate real interview experience with timed HR, technical, and behavioral rounds.',
    icon: '🎤',
  },
  {
    title: 'Progress Analytics',
    description: 'Track your performance with detailed charts, accuracy metrics, and improvement insights.',
    icon: '📊',
  },
  {
    title: 'Smart Learning',
    description: 'AI-powered recommendations, daily challenges, and adaptive difficulty to accelerate learning.',
    icon: '🚀',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    college: 'IIT Bombay',
    quote: 'PlacementPro helped me crack my dream company! The mock interviews and analytics were game-changers.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    college: 'NIT Trichy',
    quote: 'The aptitude section is incredibly well-structured. I improved my scores by 40% in just 2 weeks.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    college: 'BITS Pilani',
    quote: 'Daily challenges and streak tracking kept me motivated throughout my preparation journey.',
    rating: 5,
  },
];

export const FAQ_DATA = [
  {
    question: 'Is PlacementPro free to use?',
    answer: 'Yes! PlacementPro is completely free for all students. We believe quality education should be accessible to everyone.',
  },
  {
    question: 'How many questions are available?',
    answer: 'We have 500+ curated questions across aptitude, technical, DSA, coding, and interview categories, with new questions added regularly.',
  },
  {
    question: 'Can I track my progress?',
    answer: 'Absolutely! Our analytics dashboard provides detailed insights into your daily, weekly, and monthly progress with accuracy graphs and topic-wise performance.',
  },
  {
    question: 'What topics are covered in technical questions?',
    answer: 'We cover 12+ subjects including C, C++, Java, Python, JavaScript, DBMS, OS, Computer Networks, SQL, OOP, Software Engineering, and ML Basics.',
  },
  {
    question: 'How do mock interviews work?',
    answer: 'Our mock interviews simulate real placement rounds with timed questions across HR, Technical, and Behavioral categories. You receive an instant score and detailed summary.',
  },
  {
    question: 'Can I bookmark questions for later review?',
    answer: 'Yes! You can bookmark any question to revisit later. Your bookmarks are saved and accessible from your dashboard.',
  },
];
