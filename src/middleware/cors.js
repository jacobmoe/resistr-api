const cors = require('kcors');
const { corsWhitelist } = require('config')

var options = {
	origin: (ctx) => {
    if (typeof corsWhitelist === 'string') return corsWhitelist

    if (corsWhitelist.includes(ctx.header.origin)) {
      return ctx.header.origin
    } else {
      return null
    }
  }
}

module.exports = cors(options)
