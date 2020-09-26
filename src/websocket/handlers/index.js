const WebSocketHandlers = require('./handlers');
const SendMessageHandler = require('./send_message');

const handlers = new WebSocketHandlers({
  SEND_MESSAGE: SendMessageHandler,
});

module.exports = handlers;
