const httpStatus = require('http-status');
const { surveyService } = require('../services');
const { errorJson } = require('../utils/service.util');

//Get all Questions
const getQuestions = (req, res) => {
  surveyService
    .getAllQuestions()
    .then(questionData => res.send(questionData))
    .catch(error => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(errorJson(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    });
};

//Create survey by users
const createSurvey = async (req, res) => {
  const { question, email, fullName } = req.body;
  const resultArr = Object.entries(req.body);
  const dataArray = [];
  const questionData =
    resultArr &&
    resultArr.length > 0 &&
    resultArr.map(data => {
      const answerFilter = question.length > 0 && question.includes(data[0]);
      if (answerFilter) {
        const surveyData = {
          questionId: data[0],
          answer: data[1],
        };
        dataArray.push(surveyData);
      }
    });
  if (questionData) {
    const surveyData = {
      email: email,
      fullName: fullName,
      surveyData: dataArray,
    };

    await surveyService.createSurvey(surveyData);

    res.status(httpStatus.CREATED).send('Survey added successfully');
  }
};

//Get all Surveys
const getAllSurvey = (req, res) => {
  surveyService
    .getAllSurveys()
    .then(async surveyData => {
      const allQuestion = await surveyService.getAllQuestions();
      const array = [];
      const filteredSurvey =
        surveyData &&
        surveyData.length > 0 &&
        surveyData.map(ques => {
          return (
            ques.surveyData &&
            ques.surveyData.length > 0 &&
            ques.surveyData.map(data => {
              return (
                allQuestion &&
                allQuestion.length > 0 &&
                allQuestion.map(filter => {
                  if (filter.id == data.questionId) {
                    const dataVal = {
                      question: filter.question,
                      answer: data.answer,
                    };
                    array.push(dataVal);
                    ques.surveyData = array;
                    return ques.surveyData;
                  }
                })
              );
            })
          );
        });
      res.send(surveyData);
    })
    .catch(error => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(errorJson(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    });
};

const updateStatus = (req, res) => {
  const { id, status } = req.body;
  surveyService
    .updateSurvey({ _id: id }, { isApproved: status })
    .then(cust => {
      res.send({ result: true });
    })
    .catch(error => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(errorJson(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    });
};

module.exports = {
  getQuestions,
  createSurvey,
  getAllSurvey,
  updateStatus,
};
