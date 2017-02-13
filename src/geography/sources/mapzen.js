const config = require('config')
const { request } = require('../../lib/utils')

const domain = 'https://search.mapzen.com'
const autocompletePath = '/v1/autocomplete'

function search (text, focus) {
  let query = {
    text: text,
    api_key: config.get('mapzenApiKey'),
    'boundary.country': 'US'
  }

  if (focus) {
    query['focus.point.lat'] = focus.lat
    query['focus.point.lon'] = focus.lon
  }

  return request({
    method: "GET",
    url: domain+autocompletePath,
    qs: query
  })
}

module.exports = {
  search
}
