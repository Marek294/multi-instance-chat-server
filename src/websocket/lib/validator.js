const set = require('lodash.set');
const { errors } = require('./errors');

module.exports = (schema) => (req) => {
  const { value, error } = schema.validate(req.payload);
  if (!error) {
    req.payload = value;
    return;
  }

  const errorData = {};
  error.details.forEach((detail) => {
    if (!detail.context) return;
    set(errorData, detail.context.label, detail.message.replace(`"${detail.context.label}" `, ''));
  });
  throw errors.validationError(errorData);
};
