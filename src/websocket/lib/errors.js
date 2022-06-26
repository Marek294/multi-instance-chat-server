/* eslint-disable max-len */
const config = require('../../config/vars');

class SocketError extends Error {
  constructor(code = 'UNKNOWN_ERROR', message = 'Unknown error', { close, nolog = true } = {}) {
    super(message);
    this.code = code;
    this.message = message;
    this.close = close;
    this.nolog = nolog;
  }
}

const errors = {
  internalError: () => new SocketError('INTERNAL_ERROR', 'Internal error'),
  rateLimit: () => new SocketError('RATE_LIMIT_EXCEEDED', 'Rate limit exceeded', { close: { code: 4001, reason: 'rate_limit_exceeded' } }),
  validationError: (err) => new SocketError('VALIDATION_ERROR', err, { nolog: config.dev }),
  handlerNotFound: () => new SocketError('HANDLER_NOT_FOUND', 'Handler not found'),
};

module.exports = {
  SocketError,
  errors,
};
