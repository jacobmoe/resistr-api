const Koa = require('koa');

const app = new Koa();

function requestLogger(format) {
  format = format || ':method ":url"';

  return async function (ctx, next) {
    const str = format
      .replace(':method', ctx.method)
      .replace(':url', ctx.url);

    console.log(str);

    await next();
  };
}

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async (ctx, next) => {
  await next();
  ctx.body = 'Hello World'
})

app.use(requestLogger());

app.listen(3000, () => console.log('server started 3000'));
