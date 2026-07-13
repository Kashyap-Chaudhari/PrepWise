import { useState, useEffect } from 'react';
import { HiOutlineArrowLeft, HiOutlineSearch, HiOutlineBookOpen, HiOutlineCheckCircle } from 'react-icons/hi';
import { DSA_TOPICS } from '../constants';
import useQuestions from '../hooks/useQuestions';
import Button from '../components/Button';
import Loader from '../components/Loader';
import questionService from '../services/questionService';
import toast from 'react-hot-toast';

const DSA = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

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
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedQuestion(null);
  };

  const handleBackToList = () => {
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const toggleSolved = (qId) => {
    const updated = new Set(solvedQuestions);
    if (updated.has(qId)) {
      updated.delete(qId);
      toast.success('Marked as unsolved');
    } else {
      updated.add(qId);
      toast.success('Marked as solved! Great job.');
    }
    setSolvedQuestions(updated);
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
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="text-sm text-dark-400 hover:text-dark-200 flex items-center gap-1"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to List
          </button>
          <button
            onClick={() => toggleSolved(q._id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              solvedQuestions.has(q._id)
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-dark-800/40 border-dark-700/30 text-dark-400 hover:text-dark-200'
            }`}
          >
            <HiOutlineCheckCircle className="w-4 h-4" />
            {solvedQuestions.has(q._id) ? 'Solved' : 'Mark Solved'}
          </button>
        </div>

        <div className="glass-card p-6 md:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`badge ${difficultyClass}`}>{q.difficulty}</span>
              <span className="badge bg-dark-700/50 text-dark-300 border border-dark-600/30">
                {q.topic}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-dark-100">{q.title}</h1>
          </div>

          <div className="border-t border-dark-700/30 pt-6">
            <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">
              Problem Description
            </h2>
            <p className="text-sm text-dark-200 leading-relaxed whitespace-pre-wrap">{q.question}</p>
          </div>

          {q.constraints && (
            <div className="border-t border-dark-700/30 pt-6">
              <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-2">
                Constraints
              </h2>
              <code className="block bg-dark-900/50 border border-dark-800 p-3 rounded-xl text-xs font-mono text-amber-400 whitespace-pre-wrap">
                {q.constraints}
              </code>
            </div>
          )}

          {q.sampleInput && (
            <div className="border-t border-dark-700/30 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-2">
                  Sample Input
                </h2>
                <pre className="bg-dark-900/50 border border-dark-800 p-3 rounded-xl text-xs font-mono text-dark-200 overflow-x-auto">
                  {q.sampleInput}
                </pre>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-2">
                  Sample Output
                </h2>
                <pre className="bg-dark-900/50 border border-dark-800 p-3 rounded-xl text-xs font-mono text-dark-200 overflow-x-auto">
                  {q.sampleOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Action buttons (Hints & Solutions) */}
          <div className="border-t border-dark-700/30 pt-6 flex flex-wrap gap-3">
            {q.hints && q.hints.length > 0 && (
              <Button onClick={() => setShowHint(!showHint)} variant="secondary" size="sm">
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}
            {q.solution && (
              <Button onClick={() => setShowSolution(!showSolution)} variant="outline" size="sm">
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
            )}
          </div>

          {/* Hint Panel */}
          {showHint && q.hints && q.hints.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 animate-fade-in">
              <p className="text-xs font-semibold text-amber-400 mb-1">💡 Hint</p>
              <ul className="list-disc pl-4 space-y-1">
                {q.hints.map((hint, index) => (
                  <li key={index} className="text-xs text-dark-300 leading-relaxed">
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solution Panel */}
          {showSolution && q.solution && (
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 animate-fade-in">
              <p className="text-xs font-semibold text-emerald-400 mb-2">💻 Code Solution (JavaScript)</p>
              <pre className="bg-dark-900/50 border border-dark-800 p-4 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {q.solution}
              </pre>
              {q.explanation && (
                <div className="mt-4 border-t border-dark-700/30 pt-4">
                  <p className="text-xs font-semibold text-emerald-400 mb-1">Complexity & Explanation</p>
                  <p className="text-xs text-dark-300 leading-relaxed whitespace-pre-wrap">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
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
                onClick={() => setSelectedQuestion(q)}
                className="glass-card p-5 cursor-pointer hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center text-xs font-bold text-dark-400 flex-shrink-0 group-hover:bg-primary-500/10 group-hover:text-primary-400 transition-colors">
                    {index + 1}
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
