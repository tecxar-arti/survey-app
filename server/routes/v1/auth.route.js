const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations/');
const { authController } = require('../../controllers/');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/validateAccess', authController.validateFrontEndAccess);
router.post('/logout', authController.logoutUser);

module.exports = router;
