import http from "http";
import request from "./request.js";
import response from "./response.js";
import context from "./context.js";

export default class TinyKoa {
  use(cb) {
    this.callback = cb;
  }

  listen(port, cb) {
    const server = http.createServer((req, res) => {
      const ctx = this.createContext(req, res);

      this.callback(ctx);

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
}
