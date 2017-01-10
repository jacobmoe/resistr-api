function request (opts) {
  opts.method = opts.methods || 'GET'

  return new Promise((resolve, reject) => {
    require('request')(opts, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  request: request
}
