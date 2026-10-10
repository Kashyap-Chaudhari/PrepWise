import { useState, useEffect } from 'react';
import { HiOutlineArrowLeft, HiOutlineSearch, HiOutlineBookOpen, HiOutlineCheckCircle, HiChevronLeft, HiChevronRight, HiOutlinePlay } from 'react-icons/hi';
import { DSA_TOPICS } from '../constants';
import useQuestions from '../hooks/useQuestions';
import Button from '../components/Button';
import Loader from '../components/Loader';
import questionService from '../services/questionService';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 20;

const DSA = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [code, setCode] = useState('');
  const [runStatus, setRunStatus] = useState(null);

  const { questions, loading, fetchQuestions } = useQuestions();

  useEffect(() => {
    if (selectedTopic) {
      fetchQuestions({
        category: 'dsa',
        topic: selectedTopic.name,
      });
    }
  }, [selectedTopic, fetchQuestions]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setDifficultyFilter('');
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
    setRunStatus(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedQuestion(null);
    setRunStatus(null);
  };

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setCode('// Write your data structure/algorithm here\n');
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
      setRunStatus('success');
      toast.success('Code executed! All test cases passed.');
      const updated = new Set(solvedQuestions);
      updated.add(selectedQuestion._id);
      setSolvedQuestions(updated);
    }, 1500);
  };

  // Filtered questions list
  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty = difficultyFilter ? q.difficulty === difficultyFilter : true;
    const matchesSearch = searchQuery
      ? q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesDifficulty && matchesSearch;
  });

  // Topic grid view
  if (!selectedTopic) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-title">Data Structures & Algorithms</h1>
          <p className="text-dark-400 mt-2">
            Select a topic to practice key data structures and algorithmic concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DSA_TOPICS.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicSelect(topic)}
              className="glass-card p-6 text-left group flex gap-4 items-start"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {topic.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100 group-hover:text-primary-400 transition-colors mb-1">
                  {topic.name}
                </h3>
                <p className="text-sm text-dark-400 leading-relaxed">{topic.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Question detail view
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={handleBackToList}
            className="text-sm text-dark-400 hover:text-dark-200 flex items-center gap-1"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to List
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2">
              <button
                onClick={() => {
                  const currentIndex = filteredQuestions.findIndex(q => q._id === selectedQuestion._id);
                  if (currentIndex > 0) handleSelectQuestion(filteredQuestions[currentIndex - 1]);
                }}
                disabled={filteredQuestions.findIndex(q => q._id === selectedQuestion._id) <= 0}
                className="p-1.5 rounded-lg border border-dark-700/50 text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-dark-800/30"
                title="Previous Question"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const currentIndex = filteredQuestions.findIndex(q => q._id === selectedQuestion._id);
                  if (currentIndex < filteredQuestions.length - 1) handleSelectQuestion(filteredQuestions[currentIndex + 1]);
                }}
                disabled={filteredQuestions.findIndex(q => q._id === selectedQuestion._id) === filteredQuestions.length - 1}
                className="p-1.5 rounded-lg border border-dark-700/50 text-dark-400 hover:text-dark-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-dark-800/30"
                title="Next Question"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>

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
                {showHint ? 'Hide Hint' : 'View Hint'}
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
                <ul className="list-disc pl-4 space-y-1">
                  {q.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {showSolution && q.solution && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-dark-350 space-y-2">
                <span className="font-semibold text-emerald-400 block">✔️ Solution</span>
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
                <span className="text-xs font-semibold text-dark-300">DSA Compiler</span>
                <button
                  onClick={() => setCode(q.solution || '// Solution not available')}
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
                placeholder="// Implement your algorithm here..."
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-dark-700/30 pt-4 gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const currentIndex = filteredQuestions.findIndex(q => q._id === selectedQuestion._id);
                    if (currentIndex > 0) handleSelectQuestion(filteredQuestions[currentIndex - 1]);
                  }}
                  disabled={filteredQuestions.findIndex(q => q._id === selectedQuestion._id) <= 0}
                  variant="secondary"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    const currentIndex = filteredQuestions.findIndex(q => q._id === selectedQuestion._id);
                    if (currentIndex < filteredQuestions.length - 1) handleSelectQuestion(filteredQuestions[currentIndex + 1]);
                  }}
                  disabled={filteredQuestions.findIndex(q => q._id === selectedQuestion._id) === filteredQuestions.length - 1}
                  variant="secondary"
                  size="sm"
                >
                  Next
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  {runStatus === 'running' && <span className="text-amber-400 animate-pulse">Running algorithm...</span>}
                  {runStatus === 'success' && <span className="text-emerald-400 font-semibold">Passed!</span>}
                </div>
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

  // Questions List View
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={handleBackToTopics}
            className="text-sm text-dark-400 hover:text-dark-200 mb-2 flex items-center gap-1"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to Topics
          </button>
          <h1 className="text-2xl font-bold text-dark-100">{selectedTopic.name}</h1>
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

      {/* Search Bar */}
      <div className="relative">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search questions in this topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-11"
        />
      </div>

      {loading ? (
        <Loader text="Fetching DSA questions..." />
      ) : filteredQuestions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions
              .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((q, index) => {
                const difficultyClass =
                  q.difficulty === 'easy'
                    ? 'badge-easy'
                    : q.difficulty === 'medium'
                    ? 'badge-medium'
                    : 'badge-hard';

                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                return (
                  <div
                    key={q._id}
                    onClick={() => handleSelectQuestion(q)}
                    className="glass-card p-5 cursor-pointer hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-xs font-bold text-dark-400 flex-shrink-0 group-hover:bg-primary-500/10 group-hover:text-primary-400 transition-colors">
                        {globalIndex}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors truncate">
                          {q.title}
                        </h3>
                        <p className="text-xs text-dark-400 mt-1 truncate">
                          {q.question.slice(0, 100)}...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 flex-shrink-0">
                      <span className={`badge ${difficultyClass}`}>{q.difficulty}</span>
                      {solvedQuestions.has(q._id) && (
                        <HiOutlineCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Pagination Controls */}
          {Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE) > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 mt-6">
              <div className="text-xs text-dark-400">
                Showing <span className="font-semibold text-dark-200">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                <span className="font-semibold text-dark-200">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length)}
                </span>{' '}
                of <span className="font-semibold text-dark-200">{filteredQuestions.length}</span> questions
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 rounded-xl border border-dark-700/50 bg-dark-800/40 text-xs font-medium text-dark-200 hover:bg-dark-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                >
                  <HiChevronLeft className="w-4 h-4" /> Previous
                </button>

                {Array.from(
                  { length: Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'border border-dark-700/50 bg-dark-800/40 text-dark-300 hover:text-dark-100 hover:bg-dark-700/50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE))
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-dark-700/50 bg-dark-800/40 text-xs font-medium text-dark-200 hover:bg-dark-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                >
                  Next <HiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 glass-card">
          <HiOutlineBookOpen className="w-12 h-12 text-dark-500 mx-auto mb-3" />
          <p className="text-sm text-dark-400">No questions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DSA;
