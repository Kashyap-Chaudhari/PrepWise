export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getGradeColor = (percentage) => {
  if (percentage >= 90) return 'text-emerald-400';
  if (percentage >= 70) return 'text-green-400';
  if (percentage >= 50) return 'text-amber-400';
  if (percentage >= 30) return 'text-orange-400';
  return 'text-red-400';
};

export const getGradeBg = (percentage) => {
  if (percentage >= 90) return 'bg-emerald-500/15 border-emerald-500/25';
  if (percentage >= 70) return 'bg-green-500/15 border-green-500/25';
  if (percentage >= 50) return 'bg-amber-500/15 border-amber-500/25';
  if (percentage >= 30) return 'bg-orange-500/15 border-orange-500/25';
  return 'bg-red-500/15 border-red-500/25';
};

export const getGradeLabel = (percentage) => {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 70) return 'Good';
  if (percentage >= 50) return 'Average';
  if (percentage >= 30) return 'Below Average';
  return 'Needs Improvement';
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const generateAvatar = (name) => {
  const encoded = encodeURIComponent(name || 'User');
  return `https://ui-avatars.com/api/?name=${encoded}&background=6366f1&color=fff&size=200&bold=true`;
};

export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'badge-easy';
    case 'medium':
      return 'badge-medium';
    case 'hard':
      return 'badge-hard';
    default:
      return 'badge-medium';
  }
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
};

export const getStreakEmoji = (streak) => {
  if (streak >= 30) return '🔥🔥🔥';
  if (streak >= 14) return '🔥🔥';
  if (streak >= 7) return '🔥';
  if (streak >= 3) return '⚡';
  if (streak >= 1) return '✨';
  return '💤';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
