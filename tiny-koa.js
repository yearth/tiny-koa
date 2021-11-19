import http from "http";

export default class TinyKoa {
  use(cb) {
    this.callback = cb;
  }
  listen(port, cb) {
    const server = http.createServer(this.callback);
    server.listen(port);
    cb();
  }
}
