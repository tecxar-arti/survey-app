const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { errorJson } = require('../utils/service.util');
const { authService, userService } = require('../services');

/**
 * @input : Form( Object ) : String :: email and password
 * @return Success : { "result": true }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 * @Validation : Email Should not be null and valid email & should be exist in user table.
 * @Validation : Password should not be null
 */
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    authService
      .loginUser(email, password)
      .then(user => {
        authService
          .generateAuthTokens(user)
          .then(tokens => {
            res
              .cookie('session', tokens.token, {
                expires: new Date(Date.now() + 1800000),
              })
              .status(httpStatus.OK)
              .send({ status: true, user });
          })
          .catch(error => {
            res
              .status(httpStatus.UNAUTHORIZED)
              .send(errorJson(httpStatus.UNAUTHORIZED, error.message));
          });
      })
      .catch(error => {
        res
          .status(httpStatus.UNAUTHORIZED)
          .send(errorJson(httpStatus.UNAUTHORIZED, error.message));
      });
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .send(errorJson(httpStatus.SERVICE_UNAVAILABLE, error.message));
  }
};

/**
 * @return Success : { "result": true }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 * @Rules ::
 * 1. "session" cookie should be exist
 */
const logoutUser = (req, res) => {
  res
    .clearCookie('session')
    .status(httpStatus.OK)
    .send({ status: true });
};

/**
 * @param  {String} req.cookies.session
 * @return Success : { result: true, message: 'Valid Access' }
 * @return Error : { result: false, message: 'Invalid Access' }
 */
const validateFrontEndAccess = (req, res) => {
  try {
    const { session } = req.cookies;
    if (session === undefined) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .send({ result: false, message: 'Invalid Access', toastr: false });
    } else {
      jwt.verify(session, config.jwt.secret, (err, decoded) => {
        if (err) {
          res.send({ result: false, message: 'Invalid Access', toastr: true });
        } else {
          userService
            .getUserByEmail(decoded.user.email)
            .then(userData => {
              authService
                .generateAuthTokens(userData)
                .then(tokens => {
                  const user = {
                    fullName: userData.fullName,
                    email: userData.email,
                  };
                  res
                    .cookie('session', tokens.token, {
                      expires: new Date(Date.now() + 1800000),
                    })
                    .status(httpStatus.OK)
                    .send({ result: true, message: 'Valid Access', user });
                })
                .catch(() => {
                  res.send({
                    result: false,
                    message: 'Invalid Access',
                    toastr: true,
                  });
                });
            })
            .catch(() => {
              res.status(httpStatus.UNAUTHORIZED).send({
                result: false,
                message: 'Invalid Access',
                toastr: true,
              });
            });
        }
      });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ result: false, message: 'Invalid Access', toastr: false });
  }
};

module.exports = {
  login,
  validateFrontEndAccess,
  logoutUser,
};
