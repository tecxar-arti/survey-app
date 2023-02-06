/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable func-names */
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');
const User = require('../models/user.model');

/**
 * @param {Object} user
 * @param {Date Time Object} expires
 * @param {string} accessToken
 * @return Success : Token
 */
const generateAccessToken = (
  user,
  expires,
  accessToken,
  secret = config.jwt.secret,
) => {
  const payload = {
    user,
    iat: moment().unix(),
    exp: expires.unix(),
    accessToken,
  };
  return jwt.sign(payload, secret);
};

/**
 * @param {String} userId
 * @param {Date Time Object} expires
 * @return Success : Token
 */
const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

/**
 * @param {String} token
 * @param {String} userId
 * @param {Date Time Object} expires
 * @param {String} type
 * @param {Boolean} blacklisted
 * @return Success : Tocken Object
 */
const saveToken = (token, userId, expires, type, blacklisted = false) => {
  Token.create(
    {
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
    function(err, results) {
      return results;
    },
  );
};

/**
 * @param {String} token
 * @param {String} type
 * @return Success : Tocken Object
 * @return Error : DB error
 */
const verifyToken = (token, type) =>
  new Promise(function(resolve, reject) {
    const payload = jwt.verify(token, config.jwt.secret);
    Token.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    })
      .then(tokenDoc => {
        if (!tokenDoc) {
          reject(new Error('Token not found'));
        }
        resolve(tokenDoc);
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} token
 * @return Success : { user: x, bearerToken: x }
 * @return Error : DB error or User not Found
 */
const verifyAccessToken = token =>
  new Promise(function(resolve, reject) {
    jwt.verify(token, config.jwt.secret, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        User.findOne({
          email: decoded.user.email,
        })
          .then(user => {
            if (!user) {
              reject(new Error('User not Found'));
            }
            resolve({ user, bearerToken: decoded.accessToken });
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  });

module.exports = {
  generateToken,
  generateAccessToken,
  saveToken,
  verifyToken,
  verifyAccessToken,
};
