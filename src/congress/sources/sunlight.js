const { request } = require('../../lib/utils')

const domain = 'https://congress.api.sunlightfoundation.com'

function legislators (zip) {
  return request({
    method: "GET",
    url: domain+"/legislators/locate",
    qs: {
      zip: zip
    }
  })
}

module.exports = {
  legislators
}
