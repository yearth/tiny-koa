import http from "http";
import request from "./request.js";
import response from "./response.js";
import context from "./context.js";

export default class TinyKoa {
  constructor() {
    this.middlewares = [];
  }

  use(cb) {
    this.middlewares.push(cb);
  }

  listen(port, cb) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);

      const finalFn = this.compose(this.middlewares);
      await finalFn(ctx);

      res.end(res.body);
    });
    server.listen(port);
    cb();
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.response = ctx.response.res = res;

    return ctx;
  }

  compose = middlewares => ctx => {
    const dispatch = i => {
      const fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
    };
    return dispatch(0);
  };
}
