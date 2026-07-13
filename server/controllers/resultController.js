import Result from '../models/Result.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Submit test result
// @route   POST /api/results
// @access  Private
export const submitResult = async (req, res, next) => {
  try {
    const { category, subject, topic, totalQuestions, correctAnswers, wrongAnswers, timeTaken, answers } = req.body;

    const score = correctAnswers * 10;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    const result = await Result.create({
      user: req.user._id,
      category,
      subject: subject || '',
      topic: topic || '',
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score,
      percentage,
      timeTaken: timeTaken || 0,
      answers: answers || [],
    });

    // Update user stats
    const user = await User.findById(req.user._id);
    user.totalSolved += totalQuestions;
    user.totalCorrect += correctAnswers;

    // Check for achievements
    if (user.totalSolved >= 10 && !user.badges.includes('solver-10')) {
      user.badges.push('solver-10');
      user.achievements.push('Solved 10 questions!');
    }
    if (user.totalSolved >= 50 && !user.badges.includes('solver-50')) {
      user.badges.push('solver-50');
      user.achievements.push('Solved 50 questions!');
    }
    if (user.totalSolved >= 100 && !user.badges.includes('solver-100')) {
      user.badges.push('solver-100');
      user.achievements.push('Solved 100 questions!');
    }
    if (percentage === 100 && !user.badges.includes('perfect-score')) {
      user.badges.push('perfect-score');
      user.achievements.push('Perfect score in a test!');
    }
    if (user.streak >= 7 && !user.badges.includes('streak-7')) {
      user.badges.push('streak-7');
      user.achievements.push('7-day streak!');
    }

    await user.save();

    // Update daily progress
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await Progress.findOne({ user: req.user._id, date: today });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        date: today,
        questionsAttempted: totalQuestions,
        questionsCorrect: correctAnswers,
        streak: user.streak,
      });
    } else {
      progress.questionsAttempted += totalQuestions;
      progress.questionsCorrect += correctAnswers;
      progress.streak = user.streak;
    }

    // Update category breakdown
    if (category && progress.categories[category]) {
      progress.categories[category].attempted += totalQuestions;
      progress.categories[category].correct += correctAnswers;
    }

    // Update topic breakdown
    const topicKey = topic || subject || category;
    if (topicKey) {
      const existing = progress.topicBreakdown.get(topicKey) || { attempted: 0, correct: 0 };
      progress.topicBreakdown.set(topicKey, {
        attempted: existing.attempted + totalQuestions,
        correct: existing.correct + correctAnswers,
      });
    }

    await progress.save();

    res.status(201).json({
      success: true,
      result: {
        ...result.toObject(),
        percentage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user results
// @route   GET /api/results
// @access  Private
export const getResults = async (req, res, next) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;

    const query = { user: req.user._id };
    if (category) query.category = category;

    const total = await Result.countDocuments(query);
    const results = await Result.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: results.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get leaderboard
// @route   GET /api/results/leaderboard
// @access  Public
export const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: '$user',
          totalScore: { $sum: '$score' },
          totalQuestions: { $sum: '$totalQuestions' },
          totalCorrect: { $sum: '$correctAnswers' },
          testsCompleted: { $sum: 1 },
          avgPercentage: { $avg: '$percentage' },
        },
      },
      {
        $sort: { totalScore: -1 },
      },
      {
        $limit: 50,
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          totalScore: 1,
          totalQuestions: 1,
          totalCorrect: 1,
          testsCompleted: 1,
          avgPercentage: { $round: ['$avgPercentage', 1] },
          'user.name': 1,
          'user.avatar': 1,
          'user.college': 1,
          'user.badges': 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    next(error);
  }
};
