import express from 'express';
import {
  getQuestions,
  getQuestionsBySubject,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDailyChallenge,
  bookmarkQuestion,
  getFavorites,
} from '../controllers/questionController.js';
import { protect, authorize } from '../middleware/auth.js';
import { questionValidation } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/', getQuestions);
router.get('/subject/:subject', getQuestionsBySubject);

// Protected routes
router.get('/daily-challenge', protect, getDailyChallenge);
router.get('/user/favorites', protect, getFavorites);
router.get('/:id', getQuestion);
router.post('/:id/bookmark', protect, bookmarkQuestion);

// Admin routes
router.post('/', protect, authorize('admin'), questionValidation, createQuestion);
router.put('/:id', protect, authorize('admin'), updateQuestion);
router.delete('/:id', protect, authorize('admin'), deleteQuestion);

export default router;
