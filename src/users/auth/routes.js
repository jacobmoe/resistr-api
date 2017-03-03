const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()

router.post('/register', controller.register())
router.get('/login', controller.login())
router.get('/logout', controller.logout())

module.exports = router
