const debug = require('debug')('server:websocket');
const WebSocketServer = require('ws').Server;
const WebSocketEvents = require('./events');
const WebSocketStore = require('./store');
const heartbeat = require('./lib/heartbeat');

const websocket = {
  createServer: (httpServer) => {
    // maxPayload: 5 MB
    const wss = new WebSocketServer({ server: httpServer, maxPayload: 5242880 });
    debug('Initialized');

    WebSocketStore.registerClients(() => Array.from(wss.clients.values()));
    heartbeat.start(wss);
    // TODO: Rate limit connections (It should be done in ticket based authentication)

    wss.on('connection', (ws) => {
      WebSocketEvents.onSocketConnect(ws);

      ws.on('message', (message) => WebSocketEvents.onSocketMessage(ws, message));
      ws.on('close', (code, reason) => WebSocketEvents.onSocketClose(ws, code, reason));
      ws.on('error', (error) => WebSocketEvents.onSocketError(ws, error));
    });

    return wss;
  },
};

module.exports = websocket;
