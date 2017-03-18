const qs = require('qs')

module.exports = function querystringparser() {
  return async function (ctx, next) {
    ctx.state.query = qs.parse(ctx.querystring)

    await next()
  }
}
