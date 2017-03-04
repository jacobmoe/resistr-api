const jwt = require('koa-jwt')
const config = require('config')

const auth = jwt({ secret: config.get('jwt.secret') })

const excluded = [
  /^\/api\/users\/auth\/register/,
  /^\/api\/users\/auth\/login/,
  /^\/api\/representatives.*/,
  /^\/api\/geography.*/
]

module.exports = auth.unless({ path: excluded })
