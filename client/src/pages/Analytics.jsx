import { useState, useEffect } from 'react';
import { HiOutlineLightBulb, HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';
import progressService from '../services/progressService';
import ProgressChart from '../components/ProgressChart';
import Loader from '../components/Loader';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await progressService.getAnalytics();
        setAnalytics(res.data.analytics);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader text="Loading your progress metrics..." />;

  if (!analytics || !analytics.overall) {
    return (
      <div className="text-center py-20 glass-card">
        <p className="text-dark-400">Not enough data to calculate progress. Practice more quizzes first!</p>
      </div>
    );
  }

  const { overall, categoryAnalysis, topicAnalysis, weakTopics, strongTopics, dailyProgress } = analytics;

  // 1. Accuracy Pie Chart Data
  const accuracyPieData = {
    labels: ['Correct', 'Wrong'],
    datasets: [
      {
        data: [overall.totalCorrect, overall.totalWrong],
        backgroundColor: ['rgba(34, 197, 94, 0.7)', 'rgba(239, 68, 68, 0.7)'],
        borderColor: ['#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  // 2. Daily progress Line Chart Data
  const dailyLabels = dailyProgress.map((p) => new Date(p.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));
  const dailyLineData = {
    labels: dailyLabels.length > 0 ? dailyLabels : ['No Data'],
    datasets: [
      {
        label: 'Questions Attempted',
        data: dailyProgress.map((p) => p.questionsAttempted),
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: '#6366f1',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Correct',
        data: dailyProgress.map((p) => p.questionsCorrect),
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: '#22c55e',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  // 3. Topic wise Performance Bar Chart Data
  const topicLabels = topicAnalysis.slice(0, 10).map((t) => t.topic);
  const topicBarData = {
    labels: topicLabels.length > 0 ? topicLabels : ['No Data'],
    datasets: [
      {
        label: 'Accuracy %',
        data: topicAnalysis.slice(0, 10).map((t) => t.accuracy),
        backgroundColor: 'rgba(217, 70, 239, 0.5)',
        borderColor: '#d946ef',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Progress Analytics</h1>
        <p className="text-dark-400 mt-2">
          Deep-dive insights into your accuracy, daily efforts, strong modules, and weak areas.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-primary-400">{overall.totalTests}</p>
          <p className="text-xs text-dark-400 mt-1">Tests Attempted</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-indigo-400">{overall.totalAttempted}</p>
          <p className="text-xs text-dark-400 mt-1">Questions Solved</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-emerald-400">{overall.totalCorrect}</p>
          <p className="text-xs text-dark-400 mt-1">Correct Answers</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-amber-400">{overall.overallAccuracy}%</p>
          <p className="text-xs text-dark-400 mt-1">Overall Accuracy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Effort Tracker */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Daily Activity Log (Last 30 Days)</h2>
          <ProgressChart type="line" data={dailyLineData} height={280} />
        </div>

        {/* Overall Accuracy Breakdown */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Accuracy Breakdown</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-48 h-48">
              <ProgressChart type="doughnut" data={accuracyPieData} height={180} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic-Wise Performance */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Topic Performance Chart</h2>
          <ProgressChart type="bar" data={topicBarData} height={280} />
        </div>

        {/* Action Insights (Strong & Weak Topics) */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-dark-100">Performance Index</h2>

          {/* Strong Topics */}
          <div>
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <HiOutlineArrowUp className="w-4 h-4" /> Strong Areas (&gt;= 70%)
            </h3>
            {strongTopics.length > 0 ? (
              <ul className="space-y-2">
                {strongTopics.map((t, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm text-dark-200">
                    <span>{t.topic}</span>
                    <span className="font-semibold text-emerald-400">{t.accuracy}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-dark-400">Keep solving to identify strong topics.</p>
            )}
          </div>

          {/* Weak Topics */}
          <div>
            <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <HiOutlineArrowDown className="w-4 h-4" /> Areas for Growth (&lt; 60%)
            </h3>
            {weakTopics.length > 0 ? (
              <ul className="space-y-2">
                {weakTopics.map((t, idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm text-dark-200">
                    <span>{t.topic}</span>
                    <span className="font-semibold text-red-400">{t.accuracy}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-dark-400">No major weak topics identified. Good job!</p>
            )}
          </div>

          {/* Suggestions */}
          <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/10 flex gap-3">
            <HiOutlineLightBulb className="w-5 h-5 text-primary-400 flex-shrink-0" />
            <div className="text-xs text-dark-350 leading-relaxed">
              <p className="font-semibold text-primary-400">Preparation Tip</p>
              Focus on answering questions in your growth areas. Try spending 15 minutes each day practicing
              easy/medium questions under those subjects.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
