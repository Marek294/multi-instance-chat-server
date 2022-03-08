const { Joi } = require('../../../../../utils/validation');

module.exports = Joi.object().keys({
  name: Joi.string().required(),
});
