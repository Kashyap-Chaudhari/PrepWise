import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  changePasswordValidation,
} from '../middleware/validate.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileUpdateValidation, updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);

export default router;
