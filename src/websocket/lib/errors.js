/* eslint-disable max-len */
const config = require('../../config/vars');

class SocketError extends Error {
  constructor(message = 'Unknown error', { close, nolog = true } = {}) {
    super(message);
    this.message = message;
    this.close = close;
    this.nolog = nolog;
  }
}

const errors = {
  rateLimit: () => new SocketError('Rate limit exceeded', { close: { code: 4001, reason: 'rate_limit_exceeded' } }),
  validationError: (err) => new SocketError(`Validation error ${JSON.stringify(err)}`, { nolog: config.dev }),
};

module.exports = {
  SocketError,
  errors,
};
