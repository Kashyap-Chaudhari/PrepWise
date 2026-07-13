import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['aptitude', 'technical', 'dsa', 'coding', 'hr', 'behavioral'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    type: {
      type: String,
      enum: ['mcq', 'coding', 'subjective'],
      default: 'mcq',
    },
    question: {
      type: String,
      required: [true, 'Question content is required'],
    },
    options: {
      type: [String],
      default: [],
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required'],
    },
    explanation: {
      type: String,
      default: '',
    },
    constraints: {
      type: String,
      default: '',
    },
    sampleInput: {
      type: String,
      default: '',
    },
    sampleOutput: {
      type: String,
      default: '',
    },
    hints: {
      type: [String],
      default: [],
    },
    solution: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
questionSchema.index({ category: 1, subject: 1 });
questionSchema.index({ category: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ title: 'text', question: 'text' });

const Question = mongoose.model('Question', questionSchema);

export default Question;
