const express = require('express');
const { userController } = require('../../controllers/index');

const router = express.Router();

router.get('/apikey/:ID', userController.getApiKey);
router.post('/registration', userController.userRegistration);

module.exports = router;
