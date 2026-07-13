import { useState, useEffect, useCallback } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi';
import { APTITUDE_TOPICS } from '../constants';
import useQuestions from '../hooks/useQuestions';
import useTimer from '../hooks/useTimer';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import resultService from '../services/resultService';
import { calculateAccuracy, getGradeColor, getGradeLabel } from '../utils/helpers';
import toast from 'react-hot-toast';

const Aptitude = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);

  const { questions, loading, fetchQuestions } = useQuestions();

  const handleTimerExpire = useCallback(() => {
    toast.error('Time is up!');
    handleSubmit();
  }, []);

  const timer = useTimer(600, handleTimerExpire); // 10 minutes

  const startQuiz = async (topic) => {
    setSelectedTopic(topic);
    await fetchQuestions({ category: 'aptitude', subject: topic.subject, limit: 10 });
    setQuizStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
    setReviewMode(false);
    timer.reset(600);
    timer.start();
  };

  const selectAnswer = (answer) => {
    if (showResults) return;
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  const handleSubmit = async () => {
    timer.pause();
    setSubmitting(true);

    let correct = 0;
    let wrong = 0;
    const answerDetails = questions.map((q, i) => {
      const selected = answers[i] || '';
      const isCorrect = selected === q.correctAnswer;
      if (selected) {
        if (isCorrect) correct++;
        else wrong++;
      }
      return { questionId: q._id, selectedAnswer: selected, isCorrect };
    });

    const resultData = {
      category: 'aptitude',
      subject: selectedTopic.subject,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      timeTaken: 600 - timer.timeLeft,
      answers: answerDetails,
    };

    try {
      const res = await resultService.submitResult(resultData);
      setResult(res.data.result);
    } catch (error) {
      console.error('Submit error:', error);
    }

    setShowResults(true);
    setSubmitting(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedTopic(null);
    setShowResults(false);
    setResult(null);
    setReviewMode(false);
  };

  // Topic Selection View
  if (!quizStarted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-title">Aptitude Practice</h1>
          <p className="text-dark-400 mt-2">Choose a topic to start your aptitude quiz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {APTITUDE_TOPICS.map((topic, index) => (
            <button
              key={index}
              onClick={() => startQuiz(topic)}
              className="glass-card p-6 text-left group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {topic.icon}
              </div>
              <h3 className="text-lg font-semibold text-dark-100 group-hover:text-primary-400 transition-colors mb-2">
                {topic.name}
              </h3>
              <p className="text-sm text-dark-400">{topic.description}</p>
              <div className={`mt-4 inline-flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${topic.color} bg-clip-text text-transparent`}>
                Start Quiz <HiOutlineArrowRight className="w-4 h-4 text-primary-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) return <Loader text="Loading questions..." />;

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-dark-400 text-lg mb-4">No questions available for this topic yet.</p>
        <Button onClick={resetQuiz} variant="outline">Go Back</Button>
      </div>
    );
  }

  // Results View
  if (showResults && result) {
    const percentage = result.percentage;
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="glass-card p-8 text-center">
          <div className="text-5xl mb-4">{percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-2xl font-bold text-dark-100 mb-2">Quiz Complete!</h2>
          <p className="text-dark-400 mb-6">{selectedTopic.name}</p>

          <div className={`text-6xl font-bold mb-2 ${getGradeColor(percentage)}`}>
            {percentage}%
          </div>
          <p className={`text-lg font-medium ${getGradeColor(percentage)} mb-6`}>
            {getGradeLabel(percentage)}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-dark-800/40">
              <div className="text-xl font-bold text-emerald-400">{result.correctAnswers}</div>
              <div className="text-xs text-dark-400">Correct</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/40">
              <div className="text-xl font-bold text-red-400">{result.wrongAnswers}</div>
              <div className="text-xs text-dark-400">Wrong</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/40">
              <div className="text-xl font-bold text-amber-400">{result.totalQuestions - result.correctAnswers - result.wrongAnswers}</div>
              <div className="text-xs text-dark-400">Skipped</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setReviewMode(true); setCurrentIndex(0); }} variant="outline">
              Review Answers
            </Button>
            <Button onClick={resetQuiz} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  // Review Mode or Quiz Mode
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={resetQuiz} className="text-sm text-dark-400 hover:text-dark-200 mb-2 flex items-center gap-1">
            <HiOutlineArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-xl font-bold text-dark-100">{selectedTopic.name}</h1>
        </div>
        {!reviewMode && (
          <Timer
            formatted={timer.formatted}
            progress={timer.progress}
            isRunning={timer.isRunning}
            timeLeft={timer.timeLeft}
            size="sm"
          />
        )}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-dark-800/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-dark-400 flex-shrink-0">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        onClick={!reviewMode ? selectAnswer : undefined}
        selectedAnswer={answers[currentIndex]}
        showAnswer={reviewMode}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          variant="secondary"
          icon={HiOutlineArrowLeft}
        >
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          !reviewMode ? (
            <Button
              onClick={handleSubmit}
              loading={submitting}
              variant="primary"
              icon={HiOutlineCheck}
              iconPosition="right"
            >
              Submit Test
            </Button>
          ) : (
            <Button onClick={resetQuiz} variant="primary">
              Back to Topics
            </Button>
          )
        ) : (
          <Button
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            variant="primary"
            icon={HiOutlineArrowRight}
            iconPosition="right"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Aptitude;
