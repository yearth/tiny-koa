import TinyKoa from "./tiny-koa.js";

const app = new TinyKoa();

app.use(async (ctx, next) => {
  ctx.body = "<h1>Hello Koa 1!</h1><br/>";
  await next();
  ctx.body += "<h1>Hello Koa 5!</h1><br/>";
});

app.use(async (ctx, next) => {
  ctx.body += "<h1>Hello Koa 2!</h1><br/>";
  await next();
  ctx.body += "<h1>Hello Koa 4!</h1><br/>";
});

app.use(async ctx => {
  ctx.body += "<h1>Hello Koa 3!</h1><br/>";
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
