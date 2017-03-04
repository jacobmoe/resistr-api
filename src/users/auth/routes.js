const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()

router.post('/register', controller.register())
router.post('/login', controller.login())

module.exports = router
