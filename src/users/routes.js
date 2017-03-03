const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const authRoutes = require('./auth/routes')

require('./middleware')(app)

router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
