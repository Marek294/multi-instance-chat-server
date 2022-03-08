module.exports = async (req) => {
  const { name } = req.query;
  return `Hello ${name}`;
};
