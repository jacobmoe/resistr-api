const Issue = require('./model')

function index () {
  return async function (ctx) {
    const query = ctx.query || {}

    try {
      const results = await Issue.where(ctx.query || {})

      ctx.status = 200
      ctx.body = {
        page: 0,
        results
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = err
    }
  }
}

module.exports = {
  index
}
