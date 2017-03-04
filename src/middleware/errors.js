module.exports = function() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      switch (err.status) {
      case 401:
        ctx.status = 401
        ctx.body = 'Protected resource'
      default:
        ctx.status = err.status || 500
        ctx.body = { message: err.message }
      }
    }
  }
}
