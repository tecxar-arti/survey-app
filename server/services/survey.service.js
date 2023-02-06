const {  Question, Survey } = require('../models');

const getAllQuestions = () =>
  new Promise((resolve, reject) => {
    Question.find()
      .then(questionData => {
        resolve(questionData);
      })
      .catch(error => {
        reject(error);
      });
  });

const createSurvey = survey => {
  new Promise((resolve, reject) => {
    Survey.create(survey)
      .then(data => {
        console.log('SSSSs', data);
        resolve(data);
      })
      .catch(error => {
        console.log('SSerrorSSs', error);
        reject(error);
      });
  });
};

const getAllSurveys = () =>
  new Promise((resolve, reject) => {
    Survey.find()
      .then(surveyData => {
        resolve(surveyData);
      })
      .catch(error => {
        reject(error);
      });
  });

const updateSurvey = (filter, update) =>
  new Promise((resolve, reject) => {
    Survey.findOneAndUpdate(filter, update, { useFindAndModify: false })
      .then(customersData => {
        resolve(customersData);
      })
      .catch(error => {
        reject(error);
      });
  });

module.exports = {
  updateSurvey,
  getAllQuestions,
  createSurvey,
  getAllSurveys,
};
