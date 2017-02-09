module.exports = function requestLogger(format) {
  format = format || ':method ":url"';

  return async function (ctx, next) {
    const str = format
          .replace(':method', ctx.method)
          .replace(':url', ctx.url)

    await next();
  }
}
