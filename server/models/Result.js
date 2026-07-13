import mongoose from 'mongoose';

const answerDetailSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    selectedAnswer: {
      type: String,
      default: '',
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['aptitude', 'technical', 'dsa', 'coding', 'hr', 'behavioral', 'mock-interview'],
    },
    subject: {
      type: String,
      default: '',
    },
    topic: {
      type: String,
      default: '',
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    wrongAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    timeTaken: {
      type: Number,
      default: 0,
    },
    answers: [answerDetailSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes
resultSchema.index({ user: 1, createdAt: -1 });
resultSchema.index({ user: 1, category: 1 });
resultSchema.index({ score: -1 });

const Result = mongoose.model('Result', resultSchema);

export default Result;
