const { request } = require('../../lib/utils')

const domain = 'https://theunitedstates.io'
const size = '225x275'

function memberImageUrl (uid) {
  return domain + '/images/congress/' + size + '/' + uid + '.jpg'
}

function memberImageAvailable (uid) {
  const url = memberImageUrl(uid)

  return request({method: "HEAD", url: url})
    .then((res) => {return res.statusCode === 200})
}

module.exports = {
  memberImageAvailable,
  memberImageUrl
}
