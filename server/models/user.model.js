/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    fullName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

userSchema.methods.toJSON = function() {
  const user = this;
  return omit(user.toObject(), ['password', 'createdAt', 'updatedAt']);
};


userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


const User = mongoose.model('users', userSchema);

module.exports = User;
