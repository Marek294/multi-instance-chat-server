const debug = require('debug')('server:websocket:event');
const WebSocketHandlers = require('../handlers');
const WebSocketRateLimit = require('../lib/rateLimit');
// const WebSocketPayloadSize = require('../lib/payloadSize');
const { SocketError, errors } = require('../lib/errors');

// Max 20 frames/sec per websocket
const rateLimit = WebSocketRateLimit({ interval: 1e3, limit: 20 });

// Max 1 MB of payload
// const payloadSize = WebSocketPayloadSize({ maxPayload: })

const onSocketConnect = (ws) => {
  // Attach send frame
  ws.sendFrame = (type, payload, requestId) => {
    const frame = { type, payload };
    if (requestId) frame.requestId = requestId;

    // TODO: dont send message if socket is closed
    // if (client.readyState === WebSocket.OPEN)
    ws.send(JSON.stringify(frame));
  };

  debug('Socket connected');
};

const onSocketClose = (ws, code, reason) => {
  debug('Socket closed', code, reason);
};

const onSocketError = (ws, error, sendError) => {
  if (!error.nolog) console.error(error);
  if (sendError) {
    if (error instanceof SocketError) sendError({ code: error.code, message: error.message });
    else {
      const internalError = errors.internalError();
      sendError({ code: internalError.code, message: internalError.message });
    }
  }

  if (error instanceof SocketError && error.close) ws.close(error.code, error.reason);
};

const onSocketMessage = async (ws, message) => {
  let sendSuccess = () => {};
  let sendError = () => {};
  let sendProgress = () => {};

  try {
    console.log('message');
    rateLimit(ws);
    // payloadSize(message);
    // TODO: payload size validator

    const frame = JSON.parse(message);

    if (!frame.type) throw new Error('Incorrect frame format. No "type" field');
    if (!frame.payload) throw new Error('Incorrect frame format. No "payload" field');
    if (frame.requestId) {
      sendSuccess = (payload) => ws.sendFrame('request-success', payload, frame.requestId);
      sendError = (payload) => ws.sendFrame('request-error', payload, frame.requestId);
      sendProgress = (payload) => ws.sendFrame('request-progress', payload, frame.requestId);
    }

    // Validate payload here ???

    const response = await WebSocketHandlers.handle(
      frame.type,
      { ws, payload: frame.payload },
      { sendProgress },
    );

    if (response) sendSuccess(response);
  } catch (e) {
    onSocketError(ws, e, sendError);
  }
};

module.exports = {
  onSocketConnect,
  onSocketClose,
  onSocketError,
  onSocketMessage,
};
