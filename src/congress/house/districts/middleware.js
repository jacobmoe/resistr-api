function processParams() {
  return async function (ctx, next) {
    const districtInfo = ctx.params.district.split("-")

    if (districtInfo.length < 2) {
      ctx.status = 422
      ctx.body = {
        error: 'Invalid district'
      }
    } else {
      ctx.params.state = districtInfo[0]
      ctx.params.district = districtInfo[1]
      await next()
    }
  }
}

module.exports = {
  processParams
}
