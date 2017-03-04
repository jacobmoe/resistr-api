const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../model')

function generateToken (user) {
  return jwt.sign(user.prepare(), config.get('jwt.secret'))
}

function register () {
  return async (ctx) => {
    try {
      const user = await User.create(ctx.request.body)
      const token = generateToken(user)

      ctx.status = 201
      ctx.body = {
        token,
        user: user.prepare()
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}

function login () {
  return async (ctx) => {
    const email    = ctx.request.body.email || null
    const password = ctx.request.body.password

    try {
      const user = await User.find({email: email})
      if (user && await (user.validatePassword(password))) {
        ctx.status = 200
        ctx.body = {
          token: generateToken(user),
          user: user.prepare()
        }
      } else {
        ctx.status = 401
        ctx.body = { error: 'email or password does not match' }
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}

module.exports = {
  register,
  login
}
