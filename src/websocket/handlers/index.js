const WebSocketHandlers = require('../lib/handlers');
const validator = require('../lib/validator');
const sendMessage = require('./send_message');

// const handlers = {
//   SEND_MESSAGE: SendMessageHandler,
// };

const handlers = new WebSocketHandlers();

handlers.add('SEND_MESSAGE', validator(sendMessage.validation), sendMessage.handler);

module.exports = handlers;
