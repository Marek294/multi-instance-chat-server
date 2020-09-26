const EventHandlers = require('./handlers');

const events = {
  onSocketConnect: (ws) => EventHandlers.onSocketConnect(ws),
  onSocketMessage: (ws, message) => EventHandlers.onSocketMessage(ws, message),
  onSocketClose: (ws) => EventHandlers.onSocketClose(ws),
  onSocketError: (ws, error) => EventHandlers.onSocketError(ws, error),
};

module.exports = events;
