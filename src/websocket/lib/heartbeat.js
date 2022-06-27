const start = (wss) => {
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();

      return true;
    });
  }, 10e3);

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
  });

  wss.on('close', () => {
    clearInterval(interval);
  });
};

const heartbeat = {
  start,
};

module.exports = heartbeat;
