import { Request, Response, NextFunction } from "express";
import _set from 'lodash/set'
import errors, { APIError } from '../../utils/APIError'
import Joi, { ValidationError } from 'joi'

/**
 * Check if provided error is validation error
 */
const isValidationError = (err: any) => {
  const error = err.error ? err.error : err;
  if (error instanceof Joi.ValidationError) return true;
  return false;
};

/**
 * Get validation error data from provided error
 */
const getValidationErrorData = (err: ValidationError) => {
  // const error = err.error ? err.error : err;
  const errorData = {};

  if (!err.details || !err.details.length) return errorData;

  err.details.forEach((detail) => {
    if (!detail.context) return;
    if (!detail.context.label) return;
    _set(errorData, detail.context.label, detail.message.replace(`"${detail.context.label}" `, ''));
  });

  return errorData;
};

export default {
  /**
   * Log error if necessary
   * @public
   */
  log: (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!isValidationError(err) && !err.nolog) console.error(err);
    next(err);
  },
  /**
   * If error is not an instanceOf APIError, convert it.
   * @public
   */
  converter: (err: any, req: Request, res: Response, next: NextFunction) => {
    // let responseError = err;
    let responseError = err.error ? err.error : err;
  
    if (isValidationError(responseError)) {
      const data = getValidationErrorData(responseError);
      responseError = errors.validationError(data);
    }
  
    if (!(responseError instanceof APIError) && !responseError.expose) responseError = errors.internalError();
  
    next(responseError);
  },
  /**
   * Catch 404 and forward to error handler
   * @public
   */
  notFound: (req: Request, res: Response, next: NextFunction) => {
    const err = errors.routeNotFound(req.method, req.path);
    next(err);
  },
  /**
   * Error handler
   * @public
   */
  handler: (err: APIError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      status: 'error', message: err.message || null, code: err.code, data: err.data,
    });
  }
}
