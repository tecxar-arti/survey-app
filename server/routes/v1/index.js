const express = require('express');
const httpStatus = require('http-status');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const questionRoute = require('./question.route');
const authService = require('../../services/auth.service');
const router = express.Router();
const { errorJson } = require('../../utils/service.util');
const { ApiLog } = require('../../models');

router.use((req, res, next) => {
  try {
    if (
      (req.path.match(/auth/gi) && !req.path.match(/changePassword/)) ||
      req.path.match(/registration/gi) ||
      req.path.match(/question/gi) ||
      req.path.match(/answer/gi) ||
      req.path.match(/survey/gi)
    ) {
      next();
    } else {
      authService
        .validateAccess(req.cookies.session) // Authentication Using Cookie
        .then(response => {
          authService.generateAuthTokens(response.user).then(tokens => {
            req.user = response.user;
            req.bearerToken = tokens.bearerToken;
            res.cookie('session', tokens.token, {
              expires: new Date(Date.now() + 1800000),
            });
            next();
          });
        })
        .catch(error => {
          res
            .status(httpStatus.UNAUTHORIZED)
            .send(
              errorJson(
                httpStatus.UNAUTHORIZED,
                `Not Authorized - ${error.message}`,
              ),
            );
        });
    }
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .send(
        errorJson(httpStatus.UNAUTHORIZED, `Not Authorized - ${error.message}`),
      );
  }
});

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/data', questionRoute);

module.exports = router;
