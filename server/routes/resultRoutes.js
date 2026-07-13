import express from 'express';
import { submitResult, getResults, getLeaderboard } from '../controllers/resultController.js';
import { protect } from '../middleware/auth.js';
import { resultValidation } from '../middleware/validate.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);

// Protected routes
router.post('/', protect, resultValidation, submitResult);
router.get('/', protect, getResults);

export default router;
