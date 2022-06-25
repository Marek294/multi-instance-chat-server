class WebSocketHandlers {
  constructor() {
    this.handlers = {};
  }

  add(type, ...methods) {
    this.handlers[type] = methods;
  }

  async handle(type, { ws, payload }) {
    if (!this.handlers[type]) {
      ws.send('Handler not found');
      return;
    }

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

    for (let i = 0; i < methods.length; i++) {
      await methods[i](req);
    }
  }
}

module.exports = WebSocketHandlers;
