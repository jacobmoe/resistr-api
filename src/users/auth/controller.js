const User = require('../model')

function register () {
  return async (ctx) => {
    try {
      const user = await User.create(ctx.request.body)
      ctx.status = 201
      ctx.body = user.prepare()
    } catch (err) {
      ctx.status = 400
      ctx.body = JSON.stringify(err)
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
