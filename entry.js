import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`
    <h1>Hello World!</h1>
    `);
});

server.listen(3000);
