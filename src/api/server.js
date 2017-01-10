const Koa = require('koa')
const router = new require('koa-router')()

const app = new Koa();

router.get('/', function (ctx, next) {
  ctx.body = 'root :(';
})

router.get('/test', function (ctx, next) {
  ctx.body = 'test :D';
})

app.use(router.routes()).use(router.allowedMethods())

require('./routes')(app)


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

app.use(requestLogger());

app.listen(3000, () => console.log('server started 3000'));
