const config = require('config')
const { request } = require('../../lib/utils')

const domain = 'https://www.googleapis.com'
const repsPath = '/civicinfo/v2/representatives'

function search (address) {
  let query = {
    key: config.get('googleApiKey'),
    address: address
  }

  return request({
    method: "GET",
    url: domain+repsPath,
    qs: query
  })
}

module.exports = {
  search
}
