const { request } = require('../../lib/utils')

const domain = 'https://theunitedstates.io'
const size = '225x275'

function memberImage (uid) {
  return request({
    method: "GET",
    url: domain + '/images/congress/' + size + '/' + uid + '.jpg'
  })
}

module.exports = {
  memberImage
}
