import { Request, Response, NextFunction } from "express";
import rateLimit from '../../../../../utils/rate-limit';
import errors from '../../../../../utils/APIError';
import duration from '../../../../../utils/duration';

export default rateLimit({
  windowMs: duration(1, 'minute'),
  limit: 10,
  handler: (req: Request, res: Response, next: NextFunction) => {
    const err = errors.tooManyRequests(1, 'minute');
    next(err);
  },
});
