import TinyKoa from "./tiny-koa.js";

const app = new TinyKoa();

app.use((req, res) => {
  if (req.url === "/") {
    res.end("<h1>Hello Koa!</h1>");
  }
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
