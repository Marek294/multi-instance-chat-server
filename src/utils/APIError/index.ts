class APIError extends Error {
  status: number
  code: string
  message: string
  data?: object
  nolog: boolean

  constructor(status = 500, code = 'INTERNAL_ERROR', message = 'Internal Server Error', data?: object, nolog = true) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
    this.nolog = nolog;
  }
}

export { APIError };

export default {
  custom: (status: number, code: string, message: string, data?: object, nolog = false) => new APIError(status, code, message, data, nolog),
  internalError: () => new APIError(500, 'INTERNAL_ERROR', 'Something went wrong'),
  validationError: (data: object) => new APIError(400, 'VALIDATION_ERROR', 'Data validation failed', data),
  routeNotFound: (method: string, path: string) => new APIError(404, 'ROUTE_NOT_FOUND', `Route not found  [${method}]:${path}`),
  domainNotWhitelisted: () => new APIError(403, 'DOMAIN_NOT_WHITELISTED', 'This domain is not whitelisted'),
  tooManyRequests: (value: number, type: string) => new APIError(429, 'TOO_MANY_REQUESTS', `Try again after ${value} ${type}`),
};
