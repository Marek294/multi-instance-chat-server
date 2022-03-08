const rateLimit = require('../../../../../utils/rateLimit');
const { errors } = require('../../../../../utils/APIErrors');
const duration = require('../../../../../utils/duration');

module.exports = rateLimit({
  windowMs: duration(1, 'minute'),
  max: 10,
  handler: (req, res, next) => {
    const err = errors.tooManyRequests(1, 'minute');
    next(err);
  },
});
