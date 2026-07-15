import Question from '../models/Question.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

const escapeRegex = (string) => (string ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '');

// @desc    Get all questions with filtering, search, pagination
// @route   GET /api/questions
// @access  Public
export const getQuestions = async (req, res, next) => {
  try {
    const { category, subject, topic, difficulty, type, search, page = 1, limit = 100 } = req.query;

    const query = {};

    if (category) query.category = category;
    if (subject) query.subject = { $regex: escapeRegex(subject), $options: 'i' };
    if (topic) query.topic = { $regex: escapeRegex(topic), $options: 'i' };
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;
    if (search) {
      const cleanSearch = escapeRegex(search);
      query.$or = [
        { title: { $regex: cleanSearch, $options: 'i' } },
        { question: { $regex: cleanSearch, $options: 'i' } },
        { tags: { $in: [new RegExp(cleanSearch, 'i')] } },
      ];
    }

    const total = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get questions by subject
// @route   GET /api/questions/subject/:subject
// @access  Public
export const getQuestionsBySubject = async (req, res, next) => {
  try {
    const { subject } = req.params;
    const { difficulty, page = 1, limit = 100 } = req.query;

    const query = { subject: { $regex: escapeRegex(subject), $options: 'i' } };
    if (difficulty) query.difficulty = difficulty;

    const total = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .sort({ difficulty: 1, createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new ErrorResponse('Question not found', 404));
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create question
// @route   POST /api/questions
// @access  Private/Admin
export const createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Admin
export const updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return next(new ErrorResponse('Question not found', 404));
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return next(new ErrorResponse('Question not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get daily challenge (random question)
// @route   GET /api/questions/daily-challenge
// @access  Private
export const getDailyChallenge = async (req, res, next) => {
  try {
    // Use today's date as a seed for consistent daily question
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    const count = await Question.countDocuments();
    if (count === 0) {
      return next(new ErrorResponse('No questions available', 404));
    }

    const index = dayOfYear % count;
    const question = await Question.findOne().skip(index);

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bookmark/unbookmark a question
// @route   POST /api/questions/:id/bookmark
// @access  Private
export const bookmarkQuestion = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    if (!question) {
      return next(new ErrorResponse('Question not found', 404));
    }

    const bookmarkIndex = user.bookmarks.indexOf(questionId);
    const favoriteIndex = user.favorites.indexOf(questionId);

    if (bookmarkIndex > -1) {
      user.bookmarks.splice(bookmarkIndex, 1);
      if (favoriteIndex > -1) user.favorites.splice(favoriteIndex, 1);
    } else {
      user.bookmarks.push(questionId);
      user.favorites.push(questionId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      bookmarks: user.bookmarks,
      favorites: user.favorites,
      isBookmarked: bookmarkIndex === -1,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's favorite/bookmarked questions
// @route   GET /api/questions/user/favorites
// @access  Private
export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');

    res.status(200).json({
      success: true,
      count: user.bookmarks.length,
      questions: user.bookmarks,
    });
  } catch (error) {
    next(error);
  }
};
