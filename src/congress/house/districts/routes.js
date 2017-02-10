const Router = require('koa-router')

const middleware = require('./middleware')
const controller = require('./controller')
const router = new Router()

router.get('/', controller.index())
router.get('/:district/members', middleware.processParams(), controller.members())

module.exports = router
