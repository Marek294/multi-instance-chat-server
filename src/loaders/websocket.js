const websocket = require('../websocket');

module.exports = (server) => {
  websocket.createServer(server);
};
