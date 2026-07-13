import { useState, useEffect } from 'react';
import { HiOutlineArrowLeft, HiOutlineSearch, HiOutlineLightBulb, HiOutlineCheckCircle, HiOutlinePlay } from 'react-icons/hi';
import useQuestions from '../hooks/useQuestions';
import Button from '../components/Button';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Coding = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [runStatus, setRunStatus] = useState(null); // null, 'running', 'success', 'fail'

  const { questions, loading, fetchQuestions } = useQuestions();

  useEffect(() => {
    fetchQuestions({ category: 'coding' });
  }, [fetchQuestions]);

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setCode(
      q.correctAnswer.includes('function')
        ? q.correctAnswer.split('\n')[0] + '\n  // Write your code here\n}'
        : '// Write your code here'
    );
    setShowHint(false);
    setShowSolution(false);
    setRunStatus(null);
  };

  const handleBackToList = () => {
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
    setRunStatus(null);
  };

  const handleRunCode = () => {
    setRunStatus('running');
    setTimeout(() => {
      // Simulate code execution
      setRunStatus('success');
      toast.success('All sample test cases passed!');
      const updated = new Set(solvedQuestions);
      updated.add(selectedQuestion._id);
      setSolvedQuestions(updated);
    }, 1500);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty = difficultyFilter ? q.difficulty === difficultyFilter : true;
    const matchesSearch = searchQuery
      ? q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesDifficulty && matchesSearch;
  });

  // Detailed Code Editor Layout
  if (selectedQuestion) {
    const q = selectedQuestion;
    const difficultyClass =
      q.difficulty === 'easy'
        ? 'badge-easy'
        : q.difficulty === 'medium'
        ? 'badge-medium'
        : 'badge-hard';

    return (
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="text-sm text-dark-400 hover:text-dark-200 flex items-center gap-1"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to Problems
          </button>
          <div className="flex items-center gap-2">
            <span className={`badge ${difficultyClass}`}>{q.difficulty}</span>
            {solvedQuestions.has(q._id) && (
              <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                <HiOutlineCheckCircle className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Panel: Description */}
          <div className="glass-card p-6 space-y-6 overflow-y-auto max-h-[70vh]">
            <div>
              <h1 className="text-xl font-bold text-dark-100">{q.title}</h1>
              <p className="text-xs text-dark-400 mt-1">Topic: {q.topic || q.subject}</p>
            </div>

            <div className="border-t border-dark-700/30 pt-4 space-y-3">
              <h2 className="text-xs font-semibold text-dark-300 uppercase tracking-wider">
                Problem Statement
              </h2>
              <p className="text-sm text-dark-200 leading-relaxed whitespace-pre-wrap">{q.question}</p>
            </div>

            {q.constraints && (
              <div className="border-t border-dark-700/30 pt-4">
                <h2 className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2">
                  Constraints
                </h2>
                <code className="block bg-dark-900/50 border border-dark-800 p-3 rounded-xl text-xs font-mono text-amber-400 whitespace-pre-wrap">
                  {q.constraints}
                </code>
              </div>
            )}

            {q.sampleInput && (
              <div className="border-t border-dark-700/30 pt-4 space-y-3">
                <h2 className="text-xs font-semibold text-dark-300 uppercase tracking-wider">
                  Example Testcase
                </h2>
                <div className="p-3 bg-dark-900/50 border border-dark-850 rounded-xl space-y-2">
                  <div>
                    <span className="text-xs text-dark-400 font-semibold">Input:</span>
                    <pre className="text-xs font-mono text-dark-200 mt-1">{q.sampleInput}</pre>
                  </div>
                  <div>
                    <span className="text-xs text-dark-400 font-semibold">Output:</span>
                    <pre className="text-xs font-mono text-dark-200 mt-1">{q.sampleOutput}</pre>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-dark-700/30 pt-4 flex gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <HiOutlineLightBulb className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'View Hint'}
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
              >
                {showSolution ? 'Hide Solution' : 'View Solution'}
              </button>
            </div>

            {showHint && q.hints && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-dark-350 leading-relaxed">
                <span className="font-semibold text-amber-400 block mb-1">💡 Hint</span>
                {q.hints.join(', ')}
              </div>
            )}

            {showSolution && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-dark-350 space-y-2">
                <span className="font-semibold text-emerald-400 block">✔️ Correct Solution</span>
                <pre className="bg-dark-900/50 p-3 rounded-xl font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                  {q.solution}
                </pre>
                {q.explanation && <p className="mt-2 text-dark-400">{q.explanation}</p>}
              </div>
            )}
          </div>

          {/* Right Panel: Code Editor Simulation */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-dark-700/30">
                <span className="text-xs font-semibold text-dark-300">JavaScript Compiler</span>
                <button
                  onClick={() => setCode(q.correctAnswer)}
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Autofill Answer
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full flex-1 min-h-[300px] mt-4 p-4 bg-dark-950/80 border border-dark-700/50 rounded-xl font-mono text-xs text-indigo-300 focus:outline-none focus:border-primary-500"
                style={{ resize: 'none' }}
              />
            </div>

            <div className="flex items-center justify-between border-t border-dark-700/30 pt-4">
              <div className="text-xs">
                {runStatus === 'running' && <span className="text-amber-400 animate-pulse">Running test cases...</span>}
                {runStatus === 'success' && <span className="text-emerald-400 font-semibold">Test cases passed! (100%)</span>}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleRunCode}
                  loading={runStatus === 'running'}
                  variant="primary"
                  icon={HiOutlinePlay}
                >
                  Submit Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problems List View
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Coding Practice</h1>
        <p className="text-dark-400 mt-2">
          Solve programming challenges, compile answers, and prepare for design rounds.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search coding challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-11"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-dark-800/50 border border-dark-700/50 rounded-xl px-3 py-2 text-sm text-dark-200 focus:outline-none focus:border-primary-500"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading challenges..." />
      ) : filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.map((q, index) => {
            const difficultyClass =
              q.difficulty === 'easy'
                ? 'badge-easy'
                : q.difficulty === 'medium'
                ? 'badge-medium'
                : 'badge-hard';

            return (
              <div
                key={q._id}
                onClick={() => handleSelectQuestion(q)}
                className="glass-card p-5 cursor-pointer hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-xs text-dark-400 mt-1">Topic: {q.topic || q.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${difficultyClass}`}>{q.difficulty}</span>
                  {solvedQuestions.has(q._id) && (
                    <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 glass-card">
          <p className="text-sm text-dark-400">No coding challenges found.</p>
        </div>
      )}
    </div>
  );
};

export default Coding;
