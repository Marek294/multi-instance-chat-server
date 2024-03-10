import express, { Express } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compress from 'compression';
import Debug from 'debug'
import config from '../config/vars'
import ssl from '../config/ssl'
import cors from '../config/cors'
import error from '../api/middlewares/error'


const debug = Debug('server:loader:express')

// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const helmet = require('helmet');
// const compress = require('compression');
// const debug = require('debug')('server:loader:express');

// const { logs, dev } = require('../config/vars');
// const ssl = require('../config/ssl');
// const cors = require('../config/cors');
// const error = require('../api/middlewares/error');
// const apiRoutes = require('../api/routes');

export default ({ app }: { app: Express }) => {
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html

  // if your website is running behind a proxy, you can enable it. If your website is running
  // direct on port 80, you don't want to trust it. As the sender could pretend to be coming
  // from localhost etc.
  app.set('trust proxy', 1);

  app.use(logger(config.logs, {
    skip: (req, res) => res.statusCode < 400,
  }));

  if (!config.dev) {
    debug('enforcing SSL');
    app.use(ssl());

    debug('use gzip compression');
    app.use(compress());
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));

  // mount api routes
  // app.use('/api', apiRoutes);

  // log error if necessary
  app.use(error.log);

  // if error is not an instanceOf APIError, convert it.
  app.use(error.converter);

  // catch 404 and forward to error handler
  app.use(error.notFound);

  // error handler
  app.use(error.handler);
};
