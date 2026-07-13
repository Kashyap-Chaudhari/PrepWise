import express from 'express';
import { getProgress, getAnalytics } from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getProgress);
router.get('/analytics', protect, getAnalytics);

export default router;
