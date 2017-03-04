const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../model')

function register () {
  return async (ctx) => {
    try {
      const user = await User.create(ctx.request.body)
      const payload = user.prepare()
      const token = jwt.sign(payload, config.get('jwt.secret'))

      ctx.status = 201
      ctx.body = {
        token
      }
    } catch (err) {
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

module.exports = {
  register,
  login,
  logout
}
