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

function districts (zip) {
  const params = zip ? {zip: zip} : {}

  return request({
    method: "GET",
    url: domain+"/districts/locate",
    qs: params
  })
}

function districtLegislators (params) {
  if (params.district) {
    params.chamber = 'house'
  } else {
    params.chamber = 'senate'
  }

  return request({
    method: "GET",
    url: domain+"/legislators",
    qs: params
  })
}

module.exports = {
  legislators,
  districts,
  districtLegislators
}
