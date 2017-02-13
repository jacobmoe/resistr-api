const config = require('config')
const { request } = require('../../lib/utils')

const domain = 'https://api.propublica.org'
const currentSession = '115'

function congressHouseMembers () {
  return request({
    method: "GET",
    url: domain+"/congress/v1/"+currentSession+"/house/members.json",
    headers: {
      'X-API-Key': config.get('propublicaApiKey')
    }
  })
}

module.exports = {
  congress: {
    house: {
      members: congressHouseMembers
    }
  }
}
