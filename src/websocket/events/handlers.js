const debug = require('debug')('app:server:websockets:event');

const eventHandlers = {
  onSocketConnect: (ws) => {
    debug('Socket connected');
  },
  onSocketMessage: (ws, message) => {
    debug('Socket message', message);
  },
  onSocketClose: (ws) => {
    debug('Socket closed');
  },
  onSocketError: (ws, error) => {
    debug('Socket error', error);
  },
};

module.exports = eventHandlers;
