const WebSocket = require('ws');

class WebSocketServer {
  constructor(httpServer) {
    this.wss = new WebSocket.Server({ server: httpServer });
  }
}

module.exports = WebSocketServer;
