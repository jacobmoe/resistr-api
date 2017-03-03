const Router = require('koa-router')
const User = require('../model')

const router = new Router()

function register () {
  return async (ctx) => {
    try {
      const res = await User.create(ctx.request.body)
      ctx.body = res
    } catch (err) {
      console.log(err)
      ctx.status = 400
      ctx.body = err
    }
  }
}

function login () {
  return async (ctx) => {

  }
}

function logout () {
  return async (ctx) => {
  }
}

router.post('/register', register())
router.get('/login', login())
router.get('/logout', logout())

module.exports = router
