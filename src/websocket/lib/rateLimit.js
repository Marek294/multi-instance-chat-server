const { errors } = require('./errors');

module.exports = ({ interval, limit }) => {
  if (!interval) throw new Error('interval not specified!');
  if (!limit) throw new Error('limit not specified!');

  return (ws) => {
    const now = new Date().getTime();

    if (!ws.LastMessageTimestamp || now - ws.LastMessageTimestamp > interval) {
      ws.LastMessageTimestamp = now;
      ws.NumReceivedMessages = 1;
      return;
    }

    if (ws.NumReceivedMessages < limit) {
      ws.NumReceivedMessages++;
      return;
    }

    throw errors.rateLimit();
  };
};
