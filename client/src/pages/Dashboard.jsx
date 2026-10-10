import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineLightningBolt,
  HiOutlineFire, HiOutlineTrendingUp, HiOutlineStar,
} from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import ProgressChart from '../components/ProgressChart';
import { SkeletonCard } from '../components/Loader';
import { calculateAccuracy, getStreakEmoji, formatDate } from '../utils/helpers';
import progressService from '../services/progressService';
import resultService from '../services/resultService';
import questionService from '../services/questionService';

const DEFAULT_WEEKLY_PROGRESS = [
  { date: new Date(Date.now() - 6 * 86400000).toISOString(), questionsAttempted: 12, questionsCorrect: 10 },
  { date: new Date(Date.now() - 5 * 86400000).toISOString(), questionsAttempted: 18, questionsCorrect: 15 },
  { date: new Date(Date.now() - 4 * 86400000).toISOString(), questionsAttempted: 15, questionsCorrect: 14 },
  { date: new Date(Date.now() - 3 * 86400000).toISOString(), questionsAttempted: 22, questionsCorrect: 19 },
  { date: new Date(Date.now() - 2 * 86400000).toISOString(), questionsAttempted: 16, questionsCorrect: 14 },
  { date: new Date(Date.now() - 1 * 86400000).toISOString(), questionsAttempted: 25, questionsCorrect: 22 },
  { date: new Date().toISOString(), questionsAttempted: 10, questionsCorrect: 9 },
];

const DEFAULT_DAILY_CHALLENGE = {
  title: 'Two Sum Problem (Optimal Hash Map)',
  difficulty: 'easy',
  category: 'dsa',
  question: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(N) time.',
};

const DEFAULT_RECENT_RESULTS = [
  { category: 'DSA Arrays & Strings', createdAt: new Date(Date.now() - 3600000).toISOString(), percentage: 90, correctAnswers: 9, totalQuestions: 10 },
  { category: 'Aptitude & Logic', createdAt: new Date(Date.now() - 86400000).toISOString(), percentage: 85, correctAnswers: 17, totalQuestions: 20 },
  { category: 'Technical (OS & DBMS)', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), percentage: 80, correctAnswers: 12, totalQuestions: 15 },
  { category: 'Mock Interview (Round 1)', createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), percentage: 88, correctAnswers: 22, totalQuestions: 25 },
];

const DEFAULT_LEADERBOARD = [
  { user: { name: 'Aarav Sharma' }, testsCompleted: 45, totalScore: 1820 },
  { user: { name: 'Priya Patel' }, testsCompleted: 41, totalScore: 1740 },
  { user: { name: 'Rohan Gupta' }, testsCompleted: 38, totalScore: 1610 },
  { user: { name: 'Ananya Verma' }, testsCompleted: 32, totalScore: 1480 },
  { user: { name: 'Demo Student' }, testsCompleted: 28, totalScore: 1390 },
];

// Generate 119 days of mock activity data (17 weeks * 7 days)
const MOCK_ACTIVITY_DATA = Array.from({ length: 119 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (118 - i));
  const rand = Math.random();
  let level = 0;
  if (rand > 0.6) level = 1;
  if (rand > 0.8) level = 2;
  if (rand > 0.9) level = 3;
  if (rand > 0.95) level = 4;
  return { date, level };
});

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(DEFAULT_WEEKLY_PROGRESS);
  const [recentResults, setRecentResults] = useState(DEFAULT_RECENT_RESULTS);
  const [dailyChallenge, setDailyChallenge] = useState(DEFAULT_DAILY_CHALLENGE);
  const [leaderboard, setLeaderboard] = useState(DEFAULT_LEADERBOARD);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, resultsRes, challengeRes, leaderboardRes] = await Promise.allSettled([
          progressService.getProgress('week'),
          resultService.getResults({ limit: 5 }),
          questionService.getDailyChallenge(),
          resultService.getLeaderboard(),
        ]);

        if (progressRes.status === 'fulfilled' && progressRes.value?.data?.progress?.length > 0) {
          setWeeklyProgress(progressRes.value.data.progress);
        }
        if (resultsRes.status === 'fulfilled' && resultsRes.value?.data?.results?.length > 0) {
          setRecentResults(resultsRes.value.data.results);
        }
        if (challengeRes.status === 'fulfilled' && challengeRes.value?.data?.question) {
          setDailyChallenge(challengeRes.value.data.question);
        }
        if (leaderboardRes.status === 'fulfilled' && leaderboardRes.value?.data?.leaderboard?.length > 0) {
          setLeaderboard(leaderboardRes.value.data.leaderboard.slice(0, 5));
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const totalSolved = user?.totalSolved || 0;
  const totalCorrect = user?.totalCorrect || 0;
  const totalWrong = totalSolved - totalCorrect;
  const accuracy = calculateAccuracy(totalCorrect, totalSolved);

  // Prepare weekly chart data
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartData = {
    labels: weeklyProgress.length > 0
      ? weeklyProgress.map((p) => new Date(p.date).toLocaleDateString('en-US', { weekday: 'short' }))
      : weekDays,
    datasets: [
      {
        label: 'Questions Attempted',
        data: weeklyProgress.length > 0 ? weeklyProgress.map((p) => p.questionsAttempted) : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: '#6366f1',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Correct',
        data: weeklyProgress.length > 0 ? weeklyProgress.map((p) => p.questionsCorrect) : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: '#22c55e',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const stats = [
    { label: 'Total Solved', value: totalSolved, icon: HiOutlineLightningBolt, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { label: 'Correct', value: totalCorrect, icon: HiOutlineCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Wrong', value: totalWrong, icon: HiOutlineXCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: HiOutlineTrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Streak', value: `${user?.streak || 0} days`, icon: HiOutlineFire, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Badges', value: user?.badges?.length || 0, icon: HiOutlineStar, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="skeleton h-10 w-64 rounded-xl mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-primary-500/10 via-dark-800/40 to-accent-500/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-100">
              Welcome back, <span className="gradient-text">{user?.name?.split(' ')?.[0] || 'Guest'}</span>! {getStreakEmoji(user?.streak)}
            </h1>
            <p className="text-dark-400 mt-1">Ready to level up your preparation today?</p>
          </div>
          <Link to="/aptitude" className="btn-gradient text-sm !px-5 !py-2.5 flex-shrink-0">
            Start Practice
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-4 text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-dark-400 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Weekly Progress</h2>
          <ProgressChart type="bar" data={chartData} height={280} />
        </div>

        {/* Daily Challenge */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">🎯 Daily Challenge</h2>
          {dailyChallenge ? (
            <div>
              <span className={`badge ${dailyChallenge.difficulty === 'easy' ? 'badge-easy' : dailyChallenge.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'} mb-3`}>
                {dailyChallenge.difficulty}
              </span>
              <h3 className="text-sm font-semibold text-dark-200 mb-2">{dailyChallenge.title}</h3>
              <p className="text-xs text-dark-400 mb-4 line-clamp-3">{dailyChallenge.question}</p>
              <Link
                to={`/${dailyChallenge.category}`}
                className="text-sm text-primary-400 hover:text-primary-300 font-medium"
              >
                Attempt Now →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-dark-400">No challenge available today.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Heatmap */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-dark-100">Activity Heatmap</h2>
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-dark-800/50 text-dark-300 border border-dark-700/50">Last 119 Days</span>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-max">
              <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                {MOCK_ACTIVITY_DATA.map((day, i) => {
                  let bgColor = 'bg-dark-800/40 border border-dark-700/30'; 
                  let shadow = '';
                  
                  if (day.level === 1) { bgColor = 'bg-emerald-500/20 border border-emerald-500/10'; }
                  else if (day.level === 2) { bgColor = 'bg-emerald-500/40 border border-emerald-500/20'; }
                  else if (day.level === 3) { bgColor = 'bg-emerald-500/60 border border-emerald-500/40'; shadow = 'shadow-[0_0_8px_rgba(16,185,129,0.3)]'; }
                  else if (day.level === 4) { bgColor = 'bg-emerald-400 border border-emerald-300'; shadow = 'shadow-[0_0_12px_rgba(52,211,153,0.5)]'; }

                  return (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-[4px] ${bgColor} ${shadow} transition-all duration-300 hover:scale-125 cursor-pointer`}
                      title={`${day.date.toDateString()}: ${day.level * 2} contributions`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-auto pt-4 border-t border-dark-700/30 text-xs text-dark-400">
            <span>Less</span>
            <div className="w-3.5 h-3.5 rounded-[4px] bg-dark-800/40 border border-dark-700/30" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500/20 border border-emerald-500/10" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500/40 border border-emerald-500/20" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500/60 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-400 border border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
            <span>More</span>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">🏆 Leaderboard</h2>
          {leaderboard.length > 0 ? (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/30 border border-dark-700/20">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-gray-400/20 text-gray-300' :
                    index === 2 ? 'bg-amber-600/20 text-amber-500' :
                    'bg-dark-700/50 text-dark-400'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-200 truncate">{entry.user?.name}</p>
                    <p className="text-xs text-dark-400">{entry.testsCompleted} tests</p>
                  </div>
                  <span className="text-sm font-bold text-primary-400">{entry.totalScore}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-dark-400 text-center py-4">No leaderboard data yet.</p>
          )}
        </div>
      </div>

      {/* Badges */}
      {user?.badges?.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">🏅 Your Badges</h2>
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge, index) => (
              <div key={index} className="px-4 py-2 rounded-xl bg-primary-500/10 border border-primary-500/20 text-sm font-medium text-primary-400 capitalize">
                {badge.replace(/-/g, ' ')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
