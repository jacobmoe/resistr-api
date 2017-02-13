const { request } = require('../../lib/utils')

const domain = 'https://congress.api.sunlightfoundation.com'

function districts (filter) {
  const params = {}

  if (typeof filter === 'object') {
    params.latitude = filter.lat
    params.longitude = filter.lon
  } else {
    params.zip = filter
  }

  return request({
    method: "GET",
    url: domain+"/districts/locate",
    qs: params
  })
}

function members (params) {
  return request({
    method: "GET",
    url: domain+"/legislators",
    qs: params
  })
}

module.exports = {
  districts,
  members
}
