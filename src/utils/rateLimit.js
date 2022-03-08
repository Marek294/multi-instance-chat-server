const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip');

// INFO:  We are using this module because the default method "keyGenerator" does not work properly.
//        It takes req.ip as key which is invalid if we hide server behind Cloudflare and Heroku proxy.

const defaultKeyGenerator = (req) => {
  let clientIp;

  try {
    clientIp = requestIp.getClientIp(req);
  } catch (e) {
    console.error(e);
  }

  return clientIp || req.ip;
};

module.exports = ({
  max,
  windowMs,
  message,
  statusCode,
  headers,
  keyGenerator = defaultKeyGenerator,
  handler,
  onLimitReached,
  requestWasSuccessful,
  skipFailedRequests,
  skipSuccessfulRequests,
  skip,
  store,
} = {}) => {
  const options = {
    max,
    windowMs,
    message,
    statusCode,
    headers,
    keyGenerator,
    handler,
    onLimitReached,
    requestWasSuccessful,
    skipFailedRequests,
    skipSuccessfulRequests,
    skip,
    store,
  };

  // Clean up options by deleting undefined fields
  Object.keys(options).forEach((key) => options[key] === undefined && delete options[key]);

  return rateLimit(options);
};
