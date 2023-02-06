const { pick } = require('lodash');
const { User, Company } = require('../models');
const { getQueryOptions } = require('../utils/service.util');

/**
 * @param {String} email
 * @param {String} excludeUserId
 * @return Success : true
 * @return Error : DB Error
 */
const checkDuplicateEmail = email =>
  new Promise((resolve, reject) => {
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          reject(new Error('Email already exists with another user'));
        } else {
          resolve(true);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {Object} user
 * @return Success : User object
 * @return Error : DB Error
 */
const createUser = userBody =>
  new Promise((resolve, reject) => {
    checkDuplicateEmail(userBody.email)
      .then(email => {
        if (email) {
          User.create(userBody).then(user => {
            resolve(user);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {Object} query
 * @return Success : User object
 * @return Error : DB error
 */
const getUsers = query =>
  new Promise((resolve, reject) => {
    const filter = pick(query, ['name', 'role']);
    const options = getQueryOptions(query);
    User.find(filter, null, options)
      .then(users => {
        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} userId
 * @return Success : User object
 * @return Error :  DB error or User not found
 */
const getUserById = userId =>
  new Promise((resolve, reject) => {
    User.findById(userId)
      .then(user => {
        Company.findById(user.companyID).then(company => {
          if (!user) {
            reject(new Error('User not Found'));
          }
          resolve({ user, company });
        });
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} email
 * @return Success : User Object
 * @return Error : DB error or No user found with this email
 */
const getUserByEmail = email =>
  new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          reject(Error('No user found with this email'));
        } else {
          resolve(user);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} id
 * @return Success : User Object
 * @return Error : DB error or No user found with this email
 */
const getUserByID = _id =>
  new Promise((resolve, reject) => {
    User.findOne({ _id })
      .then(user => {
        if (!user) {
          reject(new Error('No user found with this email'));
        } else {
          resolve(user);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

/**
 * @param {String} userId
 * @param {Object} updateBody
 * @return Success : User Object
 * @return Error : DB error or You can not change Email Address
 */
const updateUser = (userId, updateBody) =>
  new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: userId }, updateBody, {
      useFindAndModify: false,
    })
      .then(userData => resolve({ user: userData }))
      .catch(error => reject(error));
  });

/**
 * @param {String} email
 * @param {Object} updateBody
 * @return Success : User Object
 * @return Error : DB error
 */
const changePassword = (email, updateBody) =>
  new Promise((resolve, reject) => {
    getUserByEmail(email)
      .then(user => {
        if (updateBody.email) {
          checkDuplicateEmail(updateBody.email, req.user.id).then(data => {
            if (data) {
              Object.assign(user, updateBody);
              user.save();
              resolve(user);
            }
          });
        } else {
          Object.assign(user, updateBody);
          user.save();
          resolve(user);
        }
      })
      .catch(error => reject(error));
  });

/**
 * @param {String} userId
 * @return Success : User Object
 * @return Error : DB error
 */
const deleteUser = userId =>
  new Promise((resolve, reject) => {
    getUserById(userId)
      .then(user => {
        user.remove().then(data => {
          if (data) {
            resolve(user);
          }
          reject(user);
        });
      })
      .catch(error => reject(error));
  });

/**
 * @return Success : User List Object
 * @return Error : DB error
 */
const getUsersList = () =>
  new Promise((resolve, reject) => {
    User.listDistributors()
      .then(userList => {
        resolve(userList);
      })
      .catch(error => reject(error));
  });

/**
 * @return Success : User Object
 * @return Error : DB error or No user found with this email
 */
const getAdminUser = () =>
  new Promise((resolve, reject) => {
    User.findOne({ role: 'admin', isActive: true })
      .then(user => {
        if (!user) {
          reject(Error('No user found with this email'));
        } else {
          resolve(user);
        }
      })
      .catch(error => reject(error));
  });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUsersList,
  getUserByID,
  changePassword,
  getAdminUser,
};
