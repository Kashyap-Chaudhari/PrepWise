import { useState, useCallback } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi';
import { TECHNICAL_SUBJECTS } from '../constants';
import useQuestions from '../hooks/useQuestions';
import useTimer from '../hooks/useTimer';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import resultService from '../services/resultService';
import { getGradeColor, getGradeLabel } from '../utils/helpers';
import toast from 'react-hot-toast';

const Technical = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
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

  const timer = useTimer(900, handleTimerExpire); // 15 minutes

  const startQuiz = async (subject) => {
    setSelectedSubject(subject);
    await fetchQuestions({ category: 'technical', subject: subject.subject, limit: 10 });
    setQuizStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
    setReviewMode(false);
    timer.reset(900);
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
      if (selected) { if (isCorrect) correct++; else wrong++; }
      return { questionId: q._id, selectedAnswer: selected, isCorrect };
    });

    try {
      const res = await resultService.submitResult({
        category: 'technical', subject: selectedSubject.subject,
        totalQuestions: questions.length, correctAnswers: correct,
        wrongAnswers: wrong, timeTaken: 900 - timer.timeLeft, answers: answerDetails,
      });
      setResult(res.data.result);
    } catch (error) {
      console.error('Submit error:', error);
    }

    setShowResults(true);
    setSubmitting(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedSubject(null);
    setShowResults(false);
    setResult(null);
    setReviewMode(false);
  };

  if (!quizStarted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-title">Technical Practice</h1>
          <p className="text-dark-400 mt-2">Choose a subject to start your technical quiz.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TECHNICAL_SUBJECTS.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <button
                key={index}
                onClick={() => startQuiz(subject)}
                className="glass-card p-5 text-center group"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">
                  {subject.name}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (loading) return <Loader text="Loading questions..." />;

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-dark-400 text-lg mb-4">No questions available for {selectedSubject.name} yet.</p>
        <Button onClick={resetQuiz} variant="outline">Go Back</Button>
      </div>
    );
  }

  if (showResults && result) {
    const percentage = result.percentage;
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="glass-card p-8 text-center">
          <div className="text-5xl mb-4">{percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-2xl font-bold text-dark-100 mb-2">Quiz Complete!</h2>
          <p className="text-dark-400 mb-6">{selectedSubject.name}</p>
          <div className={`text-6xl font-bold mb-2 ${getGradeColor(percentage)}`}>{percentage}%</div>
          <p className={`text-lg font-medium ${getGradeColor(percentage)} mb-6`}>{getGradeLabel(percentage)}</p>
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
            <Button onClick={() => { setReviewMode(true); setCurrentIndex(0); }} variant="outline">Review Answers</Button>
            <Button onClick={resetQuiz} variant="primary">Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={resetQuiz} className="text-sm text-dark-400 hover:text-dark-200 mb-2 flex items-center gap-1">
            <HiOutlineArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-xl font-bold text-dark-100">{selectedSubject.name}</h1>
        </div>
        {!reviewMode && <Timer formatted={timer.formatted} progress={timer.progress} isRunning={timer.isRunning} timeLeft={timer.timeLeft} size="sm" />}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 bg-dark-800/50 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm text-dark-400 flex-shrink-0">{currentIndex + 1} / {questions.length}</span>
      </div>

      <QuestionCard question={currentQuestion} index={currentIndex} onClick={!reviewMode ? selectAnswer : undefined} selectedAnswer={answers[currentIndex]} showAnswer={reviewMode} />

      <div className="flex items-center justify-between">
        <Button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} variant="secondary" icon={HiOutlineArrowLeft}>Previous</Button>
        {currentIndex === questions.length - 1 ? (
          !reviewMode ? (
            <Button onClick={handleSubmit} loading={submitting} variant="primary" icon={HiOutlineCheck} iconPosition="right">Submit Test</Button>
          ) : (
            <Button onClick={resetQuiz} variant="primary">Back to Subjects</Button>
          )
        ) : (
          <Button onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))} variant="primary" icon={HiOutlineArrowRight} iconPosition="right">Next</Button>
        )}
      </div>
    </div>
  );
};

export default Technical;
