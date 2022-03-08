const APIError = require('./APIError');

module.exports = {
  /**
   * Creates Custom API Error
   * @param {number} status - HTTP status code of error
   * @param {string} code - Error code
   * @param {string} message - Error message
   * @param {object} data - Error data
   * @param {boolean} nolog - Log error on server
   */
  custom: (status, code, message, data, nolog = false) => new APIError(status, code, message, data, nolog),
  internalError: () => new APIError(500, 'INTERNAL_ERROR', 'Something went wrong'),
  validationError: (data) => new APIError(400, 'VALIDATION_ERROR', 'Data validation failed', data),
  routeNotFound: (method, path) => new APIError(404, 'ROUTE_NOT_FOUND', `Route not found  [${method}]:${path}`),
  domainNotWhitelisted: () => new APIError(403, 'DOMAIN_NOT_WHITELISTED', 'This domain is not whitelisted'),
  tooManyRequests: (value, type) => new APIError(429, 'TOO_MANY_REQUESTS', `Try again after ${value} ${type}`),
};
