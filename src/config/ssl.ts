import { Request, Response, NextFunction } from "express";

export default ({ sslRequiredMessage = 'Please use HTTPS when submitting data' } = {}) => (req: Request, res: Response, next: NextFunction) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const isHttps = req.secure || protocol === 'https';
  if (isHttps) {
    next();
  } else {
    res.status(403).send(sslRequiredMessage);
  }
};
