const Koa = require('koa')
const router = new require('koa-router')()

const app = new Koa();

app.use(require('./middleware/errors')())
app.use(require('./middleware/logger')())
app.use(require('./middleware/cors'))

router.get('/', function (ctx, next) {
  ctx.body = 'root :(';
})

app.use(router.routes()).use(router.allowedMethods())

require('./routes')(app)

app.listen(3000, () => console.log('server started 3000'))
