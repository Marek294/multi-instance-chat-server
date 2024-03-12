import { Request } from "express";
import rateLimit, { ValueDeterminingMiddleware, RateLimitExceededEventHandler } from "express-rate-limit";
import requestIp from "request-ip";

// INFO:  We are using this module because the default method "keyGenerator" does not work properly.
//        It takes req.ip as key which is invalid if we hide server behind Cloudflare and Heroku proxy.

interface LimitFunction {
  (a: number, b: number): number;
}

const defaultKeyGenerator = (req: Request) => {
  let clientIp;

  try {
    clientIp = requestIp.getClientIp(req);
  } catch (e) {
    console.error(e);
  }

  return clientIp || req.ip!;
};

export default ({
  windowMs,
  limit,
  message,
  keyGenerator = defaultKeyGenerator,
  handler,
  skipFailedRequests,
  skipSuccessfulRequests
}: {
  windowMs: number,
  limit?: number | ValueDeterminingMiddleware<number>,
  message?: string | JSON | Function,
  keyGenerator?: ValueDeterminingMiddleware<string>,
  handler: RateLimitExceededEventHandler,
  skipFailedRequests?: boolean,
  skipSuccessfulRequests?: boolean,
}) => {
  const options = {
    limit,
    message,
    windowMs,
    keyGenerator,
    handler,
    skipFailedRequests,
    skipSuccessfulRequests
  };

  // Clean up options by deleting undefined fields
  Object.keys(options).forEach((key) => options[key as keyof typeof options] === undefined && delete options[key as keyof typeof options]);

  return rateLimit(options);
};
