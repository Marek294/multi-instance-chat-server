const debug = require('debug')('app:server:websockets:event');
const WebSocketHandlers = require('../handlers');

const eventHandlers = {
  onSocketConnect: (ws) => {
    debug('Socket connected');
  },
  onSocketMessage: async (ws, message) => {
    try {
      const frame = JSON.parse(message);

      if (!frame.type) throw new Error('Incorrect frame format. No "type" field');
      if (!frame.payload) throw new Error('Incorrect frame format. No "payload" field');

      await WebSocketHandlers.handle({ ...frame, ws });
    } catch (e) {
      console.error('onSocketMessage', e);
    }
  },
  onSocketClose: (ws) => {
    debug('Socket closed');
  },
  onSocketError: (ws, error) => {
    debug('Socket error', error);
  },
};

module.exports = eventHandlers;
