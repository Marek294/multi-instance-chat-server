const { sleep } = require('../../../utils/helpers');

module.exports = async ({ ws, payload }, { sendProgress }) => {
  sendProgress('Handling...');
  console.log('Hello:', payload);
  // ws.sendFrame('NEW_MESSAGE', { message: "I've got your message mate!" });
  await sleep(4e3);
  sendProgress('Creating...');

  await sleep(2e3);
  return {
    message: "I've got your message mate!",
  };
};
