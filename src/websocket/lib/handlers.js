const { errors } = require('./errors');

class WebSocketHandlers {
  constructor() {
    this.handlers = {};
  }

  add(type, ...methods) {
    this.handlers[type] = methods;
  }

  async handle(type, { ws, payload }, { sendProgress } = {}) {
    if (!this.handlers[type]) throw errors.handlerNotFound();

    const methods = this.handlers[type];
    const req = { ws, payload };

    // const run = () => {
    //   let i = 0;
    //   const next = () => {
    //     methods[i++](req, next);
    //   };
    //   return next();
    // };

    // await run();

    let res;
    for (let i = 0; i < methods.length; i++) {
      res = await methods[i](req, { sendProgress });
    }

    return res;
  }
}

module.exports = WebSocketHandlers;
