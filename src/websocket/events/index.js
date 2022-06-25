const debug = require('debug')('server:websocket:event');
const WebSocketHandlers = require('../handlers');
const WebSocketRateLimit = require('../lib/rateLimit');
// const WebSocketPayloadSize = require('../lib/payloadSize');
const { SocketError } = require('../lib/errors');

// Max 20 frames/sec per websocket
const rateLimit = WebSocketRateLimit({ interval: 1e3, limit: 20 });

// Max 1 MB of payload
// const payloadSize = WebSocketPayloadSize({ maxPayload: })

const onSocketConnect = (ws) => {
  // Attach send frame
  ws.sendFrame = (type, payload) => {
    const frame = { type, payload };
    ws.send(JSON.stringify(frame));
  };

  debug('Socket connected');
};

const onSocketClose = (ws, code, reason) => {
  debug('Socket closed', code, reason);
};

const onSocketError = (ws, error) => {
  if (!error.nolog) console.error(error);
  if (error instanceof SocketError && error.close) ws.close(error.code, error.reason);
};

const onSocketMessage = async (ws, message) => {
  try {
    rateLimit(ws);
    // payloadSize(message);
    // TODO: payload size validator

    const frame = JSON.parse(message);

    if (!frame.type) throw new Error('Incorrect frame format. No "type" field');
    if (!frame.payload) throw new Error('Incorrect frame format. No "payload" field');

    // Validate payload here ???

    await WebSocketHandlers.handle(frame.type, { ws, payload: frame.payload });
  } catch (e) {
    onSocketError(ws, e);
  }
};

module.exports = {
  onSocketConnect,
  onSocketClose,
  onSocketError,
  onSocketMessage,
};
