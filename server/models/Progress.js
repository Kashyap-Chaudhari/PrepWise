import mongoose from 'mongoose';

const topicBreakdownSchema = new mongoose.Schema(
  {
    attempted: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    date: {
      type: Date,
      required: true,
    },
    questionsAttempted: {
      type: Number,
      default: 0,
    },
    questionsCorrect: {
      type: Number,
      default: 0,
    },
    topicBreakdown: {
      type: Map,
      of: topicBreakdownSchema,
      default: {},
    },
    streak: {
      type: Number,
      default: 0,
    },
    dailyChallengeCompleted: {
      type: Boolean,
      default: false,
    },
    categories: {
      aptitude: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
      technical: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
      dsa: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
      coding: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index: one progress record per user per day
progressSchema.index({ user: 1, date: 1 }, { unique: true });
progressSchema.index({ user: 1, createdAt: -1 });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
