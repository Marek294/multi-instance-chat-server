const WebSocketServer = require('ws').Server;

class WebSocket {
  constructor() {
    this.wss = null;
  }

  createServer(httpServer) {
    this.wss = new WebSocketServer({ server: httpServer });
    this.wss.on('connection', WebSocket.onConnection);
  }

  static onConnection(ws) {
    ws.on('message', (message) => WebSocket.onMessage(ws, message));
    ws.send('New connection was established!');
  }

  static onMessage(ws, message) {
    console.log(`Received: ${message}`);
    ws.send('Got it!');
  }
}

const websocket = new WebSocket();

module.exports = websocket;
