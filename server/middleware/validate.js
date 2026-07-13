import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      error: messages.join(', '),
    });
  }
  next();
};

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const profileUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('college').optional().trim(),
  body('branch').optional().trim(),
  body('graduationYear')
    .optional()
    .isInt({ min: 2000, max: 2040 })
    .withMessage('Graduation year must be between 2000 and 2040'),
  handleValidationErrors,
];

export const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
  handleValidationErrors,
];

export const questionValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['aptitude', 'technical', 'dsa', 'coding', 'hr', 'behavioral'])
    .withMessage('Invalid category'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('question').notEmpty().withMessage('Question content is required'),
  body('correctAnswer').notEmpty().withMessage('Correct answer is required'),
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Difficulty must be easy, medium, or hard'),
  handleValidationErrors,
];

export const resultValidation = [
  body('category').notEmpty().withMessage('Category is required'),
  body('totalQuestions')
    .notEmpty()
    .withMessage('Total questions is required')
    .isInt({ min: 1 })
    .withMessage('Total questions must be at least 1'),
  body('correctAnswers')
    .notEmpty()
    .withMessage('Correct answers count is required')
    .isInt({ min: 0 })
    .withMessage('Correct answers must be non-negative'),
  body('wrongAnswers')
    .notEmpty()
    .withMessage('Wrong answers count is required')
    .isInt({ min: 0 })
    .withMessage('Wrong answers must be non-negative'),
  handleValidationErrors,
];
