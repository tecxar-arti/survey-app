const httpStatus = require('http-status');
const path = require('path');
const { errorJson } = require('../utils/service.util');
const { userService, photoService, apiKeyService } = require('../services');

/**
 * @return Success : { result: user }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const userRegistration = (req, res) => {
  const { email, password, fullName } = req.body.data;
  if (email && password) {
    const userData = {
      email: email,
      password: password,
      fullName: fullName,
    };
    userService
      .createUser(userData)
      .then(user => {
        res.status(httpStatus.CREATED).send({ status: true, result: user });
      })
      .catch(error => {
        res
          .status(httpStatus.BAD_REQUEST)
          .send(errorJson(httpStatus.BAD_REQUEST, error.message));
      });
  } else {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorJson(httpStatus.BAD_REQUEST, 'email or password is required'));
  }
};

/**
 * @param  {Object} req.user User Object
 * @param  {String} distributorID
 * @return Success : { result: true, apiKey: apiKey }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getApiKey = (req, res) => {
  const { user, params } = req;
  const { ID } = params;

  apiKeyService
    .getApiKey(user, ID)
    .then(apiKey => {
      res.send({ result: true, apiKey });
    })
    .catch(error => {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(errorJson(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    });
};

module.exports = {
  getApiKey,
  userRegistration,
};
