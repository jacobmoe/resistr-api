const config = require('config')
const utils = require('../../lib/utils')

const domain = 'https://api.propublica.org'
const currentSession = '114'

function congressHouseMembers () {
  return utils.request({
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
