const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const userResponse = {
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
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse,
  });
};

export default sendToken;
