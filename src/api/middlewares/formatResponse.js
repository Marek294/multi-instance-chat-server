const serverResp = (resp) => ({
  error: (message = null, status = 500, code, data) => resp.status(status).json({
    status: 'error', message, code, data,
  }),
  success: (data = null) => resp.json({ status: 'success', data }),
});

const expressResp = () => (req, res, next) => {
  const formatResponses = serverResp(res);
  res.sendFormatSuccess = formatResponses.success;
  res.sendFormatError = formatResponses.error;
  next();
};

module.exports = { expressResp, serverResp };
