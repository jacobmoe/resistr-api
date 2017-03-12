const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const controller = require('./controller')

router.get('/', controller.index())
router.post('/', controller.create())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
