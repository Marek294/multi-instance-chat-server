const Joi = require('./joi');

exports.MAX_INT4 = 2147483647;

exports.url = Joi.string()
  .uri({
    scheme: ['http', 'https'],
    domain: {},
  })
  .max(1024)
  .trim();
