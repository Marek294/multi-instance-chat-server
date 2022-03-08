const cors = require('cors');
const config = require('./vars');
const { errors } = require('../utils/APIErrors');

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (config.corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(errors.domainNotWhitelisted());
    }
  },
};

module.exports = () => cors(corsOptions);
