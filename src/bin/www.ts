#!/usr/bin/env node
require('dotenv').config();

const express = require('express');
const http = require('http');
const debug = require('debug')('server:server');
const config = require('../config/vars');
const loadApp = require('../loaders');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Start server.
 */
const startServer = async () => {
  const app = express();
  const port = normalizePort(config.port || '3000');
  app.set('port', port);

  /**
  * Create HTTP server.
  */
  const server = http.createServer(app);

  /**
  * Load application.
  */
  await loadApp({ app, server });

  /**
  * Listen on provided port, on all network interfaces.
  */
  server.listen(port);
  server.on('error', (error) => onError(error, port));
  server.on('listening', () => onListening(server));
};

startServer();
