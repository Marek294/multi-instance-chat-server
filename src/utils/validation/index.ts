import expressJoiValidation from 'express-joi-validation';
import * as c from './constraints';

export const validator = expressJoiValidation.createValidator({
  passError: true,
});

export const constraints = c;
