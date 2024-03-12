import Joi from 'joi';

export const MAX_INT4 = 2147483647;

export const url = Joi.string()
  .uri({
    scheme: ['http', 'https'],
    domain: {},
  })
  .max(1024)
  .trim();
