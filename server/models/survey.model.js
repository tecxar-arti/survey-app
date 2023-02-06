const mongoose = require('mongoose');
const { omit } = require('lodash');

const SurveySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    // questionId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'questions',
    // },
    surveyData: {
      type: Array,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

SurveySchema.methods.toJSON = function() {
  const user = this;
  return omit(user.toObject(), ['createdAt', 'updatedAt', '_id']);
};
const Survey = mongoose.model('surveys', SurveySchema);

module.exports = Survey;
