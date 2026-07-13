import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendToken from '../utils/sendToken.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, college, branch, graduationYear } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('A user with this email already exists', 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      college: college || '',
      branch: branch || '',
      graduationYear: graduationYear || null,
    });

    // Assign first badge
    user.badges.push('newcomer');
    user.achievements.push('Registered on PlacementPro');
    await user.save();

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    // Update last active and streak
    const now = new Date();
    const lastActive = new Date(user.lastActive);
    const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays > 1) {
      user.streak = 1;
    }

    user.lastActive = now;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.getAvatar(),
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        role: user.role,
        streak: user.streak,
        badges: user.badges,
        achievements: user.achievements,
        totalSolved: user.totalSolved,
        totalCorrect: user.totalCorrect,
        bookmarks: user.bookmarks,
        favorites: user.favorites,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, college, branch, graduationYear, avatar } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (college !== undefined) updateFields.college = college;
    if (branch !== undefined) updateFields.branch = branch;
    if (graduationYear !== undefined) updateFields.graduationYear = graduationYear;
    if (avatar !== undefined) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.getAvatar(),
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        role: user.role,
        streak: user.streak,
        badges: user.badges,
        achievements: user.achievements,
        totalSolved: user.totalSolved,
        totalCorrect: user.totalCorrect,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return next(new ErrorResponse('Current password is incorrect', 401));
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('No user found with that email', 404));
    }

    // In production, generate reset token and send email
    // For now, return success message
    res.status(200).json({
      success: true,
      message: 'Password reset instructions have been sent to your email',
    });
  } catch (error) {
    next(error);
  }
};
