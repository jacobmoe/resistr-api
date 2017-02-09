module.exports = function() {
  return async (ctx, next) => {
    if (process.env.NODE_ENV === 'development') {
      await next()
    } else {
      try {
        await next();
      } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
      }
    }
  }
}
