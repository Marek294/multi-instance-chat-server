module.exports = async ({ ws, payload }) => {
  console.log('Hello:', payload);
  ws.send('I got your message mate!');
};
