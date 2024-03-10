#!/usr/bin/env node
import 'dotenv/config'
import express, { Express } from "express";
import http, { Server } from "http";
import Debug from "debug";
import { SystemError } from "@/types";
// const loadApp = require('../loaders');

const debug = Debug('server:server')

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): string | number | false {
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

function onError(error: SystemError, port: string | number | false) {
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
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server: Server) {
  const addr = server.address();
  if (addr === null) {
    debug('Listening');
  } else {
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
}

/**
 * Start server.
 */
const startServer = async () => {
  const app: Express = express();
  // const port = normalizePort(config.port || '3000');
  const port = normalizePort('3000');
  app.set('port', port);

  /**
  * Create HTTP server.
  */
  const server: Server = http.createServer(app);

  /**
  * Load application.
  */
  // await loadApp({ app, server });

  /**
  * Listen on provided port, on all network interfaces.
  */
  server.listen(port);
  server.on('error', (error: SystemError) => onError(error, port));
  server.on('listening', () => onListening(server));
};

startServer();
