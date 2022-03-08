const debug = require('debug')('server:loader');
const config = require('../config/vars');
const expressLoader = require('./express');
const jobsLoader = require('./jobs');
const websocketLoader = require('./websocket');

// We have to import at least all the events once so they can be triggered
require('./events');

module.exports = async ({ app, server }) => {
  debug('Events loaded');

  if (config.includeJobs) {
    jobsLoader();
    debug('Jobs loaded');
  }

  websocketLoader(server);
  debug('Websocket server loaded');

  expressLoader({ app });
  debug('Express loaded');
};
