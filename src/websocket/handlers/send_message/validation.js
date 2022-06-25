const { Joi } = require('../../../utils/validation');

module.exports = Joi.object().keys({
  message: Joi.string().required(),
});
