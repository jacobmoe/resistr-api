const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()

router.get('/', controller.index())
router.get('/states/:state/members', controller.members())

module.exports = router
