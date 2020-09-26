const debug = require('debug')('app:server:websockets');
const WebSocketServer = require('ws').Server;
const WebSocketEvents = require('./events');
const WebSocketStore = require('./store');

const websocket = {
  createServer: (httpServer) => {
    const wss = new WebSocketServer({ server: httpServer });
    debug('Initialized');

    WebSocketStore.registerClients(() => Array.from(wss.clients.values()));
    // TODO: Pinger

    wss.on('connection', (ws) => {
      WebSocketEvents.onSocketConnect(ws);

      ws.on('message', (message) => WebSocketEvents.onSocketMessage(ws, message));
      ws.on('close', () => WebSocketEvents.onSocketClose(ws));
      ws.on('error', (error) => WebSocketEvents.onSocketError(ws, error));
    });

    return wss;
  },
};

module.exports = websocket;
