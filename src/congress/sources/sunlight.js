const { request } = require('../../lib/utils')

const domain = 'https://congress.api.sunlightfoundation.com'

function legislators (opts) {
  if (typeof opts !== 'object') {
    opts = { zip: opts }
  }

  return request({
    method: "GET",
    url: domain+"/legislators/locate",
    qs: opts
  })
}

function districts (zip) {
  const params = zip ? {zip: zip} : {}

  return request({
    method: "GET",
    url: domain+"/districts/locate",
    qs: params
  })
}

function districtMembers (params) {
  return request({
    method: "GET",
    url: domain+"/legislators",
    qs: params
  })
}

module.exports = {
  legislators,
  districts,
  districtMembers
}
