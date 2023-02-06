const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;
