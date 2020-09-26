class SendMessageHandler {
  static get TYPE() {
    return 'SEND_MESSAGE';
  }

  static handle(message) {
    console.log('Hello:', message);
  }
}

module.exports = SendMessageHandler;
