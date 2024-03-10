import { Request, Response, NextFunction } from "express";

export default (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fn(req, res);
    res.json({ status: 'success', data: result || null })
  } catch (e) {
    next(e);
  }
};
