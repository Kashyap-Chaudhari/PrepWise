import Progress from '../models/Progress.js';
import Result from '../models/Result.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get user progress (daily, weekly, monthly)
// @route   GET /api/progress
// @access  Private
export const getProgress = async (req, res, next) => {
  try {
    const { period = 'week' } = req.query;

    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    switch (period) {
      case 'day':
        // Today only
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const progress = await Progress.find({
      user: req.user._id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Calculate totals
    const totals = progress.reduce(
      (acc, p) => {
        acc.totalAttempted += p.questionsAttempted;
        acc.totalCorrect += p.questionsCorrect;
        return acc;
      },
      { totalAttempted: 0, totalCorrect: 0 }
    );

    totals.accuracy = totals.totalAttempted > 0
      ? Math.round((totals.totalCorrect / totals.totalAttempted) * 100)
      : 0;

    res.status(200).json({
      success: true,
      period,
      totals,
      progress,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get detailed analytics
// @route   GET /api/progress/analytics
// @access  Private
export const getAnalytics = async (req, res, next) => {
  try {
    // Get all results for topic-wise performance
    const results = await Result.find({ user: req.user._id });

    // Topic-wise aggregation
    const topicPerformance = {};
    const categoryPerformance = {};

    results.forEach((result) => {
      // Category-wise
      if (!categoryPerformance[result.category]) {
        categoryPerformance[result.category] = {
          attempted: 0,
          correct: 0,
          tests: 0,
          totalScore: 0,
        };
      }
      categoryPerformance[result.category].attempted += result.totalQuestions;
      categoryPerformance[result.category].correct += result.correctAnswers;
      categoryPerformance[result.category].tests += 1;
      categoryPerformance[result.category].totalScore += result.score;

      // Topic-wise
      const topicKey = result.topic || result.subject || result.category;
      if (!topicPerformance[topicKey]) {
        topicPerformance[topicKey] = { attempted: 0, correct: 0 };
      }
      topicPerformance[topicKey].attempted += result.totalQuestions;
      topicPerformance[topicKey].correct += result.correctAnswers;
    });

    // Calculate accuracy for each topic
    const topicAnalysis = Object.entries(topicPerformance).map(([topic, data]) => ({
      topic,
      attempted: data.attempted,
      correct: data.correct,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
    }));

    // Sort to find weak and strong topics
    const sortedTopics = [...topicAnalysis].sort((a, b) => a.accuracy - b.accuracy);
    const weakTopics = sortedTopics.filter((t) => t.accuracy < 60 && t.attempted >= 3).slice(0, 5);
    const strongTopics = sortedTopics.filter((t) => t.accuracy >= 70 && t.attempted >= 3).reverse().slice(0, 5);

    // Category accuracy
    const categoryAnalysis = Object.entries(categoryPerformance).map(([category, data]) => ({
      category,
      attempted: data.attempted,
      correct: data.correct,
      tests: data.tests,
      totalScore: data.totalScore,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
    }));

    // Daily progress for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const dailyProgress = await Progress.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: 1 });

    // Overall stats
    const totalAttempted = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    res.status(200).json({
      success: true,
      analytics: {
        overall: {
          totalTests: results.length,
          totalAttempted,
          totalCorrect,
          totalWrong: totalAttempted - totalCorrect,
          overallAccuracy,
        },
        categoryAnalysis,
        topicAnalysis,
        weakTopics,
        strongTopics,
        dailyProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};
