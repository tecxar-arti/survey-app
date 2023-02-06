const express = require('express');
const surveyController = require('../../controllers/questions.controller');

const router = express.Router();

router.route('/question').get(surveyController.getQuestions);
router.route('/survey').get(surveyController.getAllSurvey);
router.route('/create').post(surveyController.createSurvey);
router.route('/update').put(surveyController.updateStatus);

module.exports = router;
