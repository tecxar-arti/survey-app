const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const { pick } = require('lodash');
const { errorJson } = require('../utils/service.util');
const { photoService } = require('../services');

const validate = schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map(details => details.message)
      .join(', ');

    if (req.file && req.file.id) {
      photoService
        .removePhotoById(req.file.id)
        .then(photo =>
          res
            .status(httpStatus.BAD_REQUEST)
            .send(errorJson(httpStatus.BAD_REQUEST, errorMessage)),
        );
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(errorJson(httpStatus.BAD_REQUEST, errorMessage));
    }
  } else {
    Object.assign(req, value);
    return next();
  }
};

module.exports = validate;
