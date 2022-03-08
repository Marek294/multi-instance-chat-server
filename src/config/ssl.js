module.exports = ({ sslRequiredMessage = 'Please use HTTPS when submitting data' } = {}) => (req, res, next) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const isHttps = req.secure || protocol === 'https';
  if (isHttps) {
    next();
  } else {
    res.status(403).send(sslRequiredMessage);
  }
};
