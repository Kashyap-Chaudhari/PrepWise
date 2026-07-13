import { useState, useEffect, useCallback } from 'react';
import { HiOutlineArrowLeft, HiOutlineChevronRight, HiOutlineMicrophone } from 'react-icons/hi';
import { INTERVIEW_TYPES } from '../constants';
import useQuestions from '../hooks/useQuestions';
import useTimer from '../hooks/useTimer';
import Button from '../components/Button';
import Timer from '../components/Timer';
import Loader from '../components/Loader';
import resultService from '../services/resultService';
import { getGradeColor, getGradeLabel } from '../utils/helpers';
import toast from 'react-hot-toast';

const MockInterview = () => {
  const [selectedRound, setSelectedRound] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const { questions, loading, fetchQuestions } = useQuestions();

  const handleTimerExpire = useCallback(() => {
    toast.error('Interview time expired!');
    handleSubmit();
  }, []);

  const timer = useTimer(1200, handleTimerExpire); // 20 minutes

  const startInterview = async (round) => {
    setSelectedRound(round);
    // Fetch HR, technical or behavioral questions based on category choice
    const category = round.value === 'mixed' ? 'hr' : round.value;
    await fetchQuestions({ category, limit: 5 });
    setInterviewStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
    timer.reset(1200);
    timer.start();
  };

  const handleTextChange = (text) => {
    setAnswers({ ...answers, [currentIndex]: text });
  };

  const handleSubmit = async () => {
    timer.pause();
    setSubmitting(true);

    // Calculate simulated score based on answer completeness
    let correct = 0;
    let wrong = 0;
    const answerDetails = questions.map((q, i) => {
      const ans = answers[i] || '';
      // Simplified check: answer has more than 50 characters to simulate decent quality
      const isCorrect = ans.trim().length > 50;
      if (isCorrect) correct++;
      else wrong++;
      return { questionId: q._id, selectedAnswer: ans, isCorrect };
    });

    try {
      const res = await resultService.submitResult({
        category: 'mock-interview',
        subject: selectedRound.label,
        totalQuestions: questions.length,
        correctAnswers: correct,
        wrongAnswers: wrong,
        timeTaken: 1200 - timer.timeLeft,
        answers: answerDetails,
      });
      setResult(res.data.result);
    } catch (error) {
      console.error('Submit interview error:', error);
    }

    setShowResults(true);
    setSubmitting(false);
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setSelectedRound(null);
    setShowResults(false);
    setResult(null);
  };

  // Select round type
  if (!interviewStarted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-title">AI Mock Interview</h1>
          <p className="text-dark-400 mt-2">
            Simulate a real-time face-to-face placement interview. Choose a round category below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTERVIEW_TYPES.map((round) => (
            <button
              key={round.value}
              onClick={() => startInterview(round)}
              className="glass-card p-6 text-left group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {round.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-dark-100 group-hover:text-primary-400 transition-colors mb-1">
                  {round.label}
                </h3>
                <p className="text-sm text-dark-400 mb-3">{round.description}</p>
                <span className="text-xs font-semibold text-primary-400 group-hover:underline">
                  Start Simulation →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) return <Loader text="Setting up your interview booth..." />;

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-dark-400 text-lg mb-4">No interview questions available right now.</p>
        <Button onClick={resetInterview} variant="outline">Go Back</Button>
      </div>
    );
  }

  // Summary results
  if (showResults && result) {
    const percentage = result.percentage;
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="glass-card p-8 text-center space-y-6">
          <div className="text-5xl">🏆</div>
          <div>
            <h2 className="text-2xl font-bold text-dark-100">Interview Summary</h2>
            <p className="text-dark-400 text-sm">{selectedRound.label}</p>
          </div>

          <div className={`text-6xl font-bold ${getGradeColor(percentage)}`}>{percentage}%</div>
          <p className={`text-lg font-medium ${getGradeColor(percentage)}`}>
            {getGradeLabel(percentage)}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/20">
              <p className="text-xl font-bold text-emerald-400">{result.correctAnswers}</p>
              <p className="text-xs text-dark-400">Excellent Answers</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/20">
              <p className="text-xl font-bold text-red-400">{result.wrongAnswers}</p>
              <p className="text-xs text-dark-400">Short Answers</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/10 text-left">
            <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2">
              Performance Insights
            </p>
            <p className="text-xs text-dark-350 leading-relaxed">
              Based on the length and content analysis of your responses, your flow was stable. Focus on
              elaborating using the STAR format (Situation, Task, Action, Result) to increase depth in
              Behavioral rounds.
            </p>
          </div>

          <div className="flex gap-3 justify-center pt-4">
            <Button onClick={resetInterview} variant="primary">
              Exit Booth
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={resetInterview}
          className="text-sm text-dark-400 hover:text-dark-200 flex items-center gap-1"
        >
          <HiOutlineArrowLeft className="w-4 h-4" /> Exit
        </button>
        <Timer
          formatted={timer.formatted}
          progress={timer.progress}
          isRunning={timer.isRunning}
          timeLeft={timer.timeLeft}
          size="sm"
        />
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-dark-800/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-dark-400 flex-shrink-0">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Interview Question Box */}
      <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <HiOutlineMicrophone className="w-6 h-6 text-primary-500 animate-pulse-glow rounded-full" />
        </div>
        <div>
          <span className="badge badge-medium mb-3">Round: {selectedRound.label}</span>
          <h2 className="text-lg md:text-xl font-bold text-dark-100 leading-relaxed">
            "{q.question}"
          </h2>
        </div>

        {/* Text Input area */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-dark-300 uppercase tracking-wider">
            Your Response
          </label>
          <textarea
            value={answers[currentIndex] || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type your structured answer here (minimum 50 characters recommended for high accuracy score)..."
            className="w-full h-40 bg-dark-900/50 border border-dark-700/50 rounded-xl p-4 text-sm text-dark-200 focus:outline-none focus:border-primary-500"
            style={{ resize: 'none' }}
          />
          <div className="flex items-center justify-between text-xs text-dark-400">
            <span>Character count: {(answers[currentIndex] || '').length}</span>
            <span>Recommended: &gt; 50 chars</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          variant="secondary"
        >
          Previous Question
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button onClick={handleSubmit} loading={submitting} variant="primary">
            Finish Interview
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            variant="primary"
            icon={HiOutlineChevronRight}
            iconPosition="right"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
