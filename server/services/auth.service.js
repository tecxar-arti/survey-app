const moment = require('moment');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const ERROR_MESSAGE = require('../config/errorMessages');
const userService = require('./user.service');
const tokenService = require('./token.service');

/**
 * @param {Object} user
 * @return Success : {token: x, expires: x, accessToken: x}
 * @return Error : iot error
 */
const generateAuthTokens = user =>
  new Promise((resolve, reject) => {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      'minutes',
    );
    const resUser = { email: user.email, fullName: user.fullName };
    const accessToken = tokenService.generateAccessToken(
      resUser,
      accessTokenExpires,
    );
    if (accessToken) {
      resolve({
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      });
    } else {
      reject(error);
    }
  });

/**
 * @param {String} password
 * @param {String} correctPassword
 * @return Success : true
 * @return Error : Passwords do not match error
 */
const checkPassword = (password, correctPassword) =>
  new Promise((resolve, reject) => {
    bcrypt
      .compare(password, correctPassword)
      .then(isPasswordMatch => {
        if (isPasswordMatch) {
          resolve(isPasswordMatch);
        } else if (!isPasswordMatch) {
          reject(new Error(ERROR_MESSAGE.PASSWORDS_NOT_MATCH));
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} email
 * @param {String} password
 * @return Success : user Object
 * @return Error : DB error/Incorrect email or password/User Not Found
 */
const loginUser = (email, password) =>
  new Promise((resolve, reject) => {
    userService
      .getUserByEmail(email)
      .then(user => {
        if (user !== undefined) {
          checkPassword(password, user.password)
            .then(isPasswordMatch => {
              if (isPasswordMatch) {
                resolve(user);
              } else {
                resolve(ERROR_MESSAGE.INCORRECT_EMAIL_PASSWORD);
              }
            })
            .catch(() => {
              reject(new Error(ERROR_MESSAGE.INCORRECT_EMAIL_PASSWORD));
            });
        } else {
          reject(new Error(ERROR_MESSAGE.USER_NOTFOUND));
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} authToken
 * @return Success : user
 * @return Error : DB error
 */
const validateAccess = authToken =>
  new Promise((resolve, reject) => {
    tokenService
      .verifyAccessToken(authToken)
      .then(user => {
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

module.exports = {
  generateAuthTokens,
  loginUser,
  validateAccess,
};
