/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
  /**
   * Creates an API error.
   * @param {number} status - HTTP status code of error.
   * @param {string} code - Error code.
   * @param {string} message - Error message.
   * @param {object} data - Error data.
   * @param {boolean} nolog - Log error on server
   */
  constructor(status = 500, code = 'INTERNAL_ERROR', message = 'Internal Server Error', data, nolog = true) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
    this.nolog = nolog;
  }
}

module.exports = APIError;
