const set = require('lodash.set');
const { Joi } = require('../../utils/validation');
const { errors, APIError } = require('../../utils/APIErrors');

/**
 * Check if provided error is validation error
 */
const isValidationError = (err) => {
  const error = err.error ? err.error : err;
  if (error instanceof Joi.ValidationError) return true;
  return false;
};

/**
 * Get validation error data from provided error
 */
const getValidationErrorData = (err) => {
  const error = err.error ? err.error : err;
  const errorData = {};

  if (!error.details || !error.details.length) return errorData;

  error.details.forEach((detail) => {
    if (!detail.context) return;
    set(errorData, detail.context.label, detail.message.replace(`"${detail.context.label}" `, ''));
  });

  return errorData;
};

/**
 * Log error if necessary
 * @public
 */
exports.log = (err, req, res, next) => {
  if (!isValidationError(err) && !err.nolog) console.error(err);
  next(err);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let responseError = err;

  if (isValidationError(responseError)) {
    const data = getValidationErrorData(responseError);
    responseError = errors.validationError(data);
  }

  if (!(responseError instanceof APIError) && !responseError.expose) responseError = errors.internalError();

  next(responseError);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = errors.routeNotFound(req.method, req.path);
  next(err);
};

/**
 * Error handler
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.handler = (err, req, res, next) => {
  res.sendFormatError(err.message, err.status, err.code, err.data);
};
