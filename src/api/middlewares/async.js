module.exports = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    res.sendFormatSuccess(result);
  } catch (e) {
    next(e);
  }
};
