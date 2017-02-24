const { request } = require('../../lib/utils')

const domain = 'https://openstates.org'

function geoSearch(coords) {
  const url = domain + '/api/v1/legislators/geo'
  return request({
    method: "GET",
    url: domain+'/api/v1/legislators/geo',
    qs: {
      lat: coords.lat,
      long: coords.lon
    }
  })
}

module.exports = {
  geoSearch
}
