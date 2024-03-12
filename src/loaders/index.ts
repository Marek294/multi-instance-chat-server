import Debug from "debug";
import { Express } from "express";
import { Server } from "http";
import expressLoader from "./express";
import config from '../config/vars'
import jobsLoader from './jobs'
import './events'

const debug = Debug('server:loader')

// const debug = require('debug')('server:loader');
// const config = require('../config/vars');
// const expressLoader = require('./express');
// const jobsLoader = require('./jobs');
// const websocketLoader = require('./websocket');

// We have to import at least all the events once so they can be triggered
// require('./events');

export default async ({ app, server }: { app: Express, server: Server }) => {
  debug('Events loaded');

  if (config.includeJobs) {
    jobsLoader();
    debug('Jobs loaded');
  }

  // websocketLoader(server);
  // debug('Websocket server loaded');

  expressLoader({ app });
  debug('Express loaded');
};
