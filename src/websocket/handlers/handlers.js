class WebSocketHandlers {
  constructor(handlers) {
    this.handlers = handlers;
  }

  handle(message) {
    if (!this.handlers[message.type]) {
      throw new Error(`No handler for ${message.type} message`);
    }

    this.handlers[message.type].handle(message);
  }
}

module.exports = WebSocketHandlers;
