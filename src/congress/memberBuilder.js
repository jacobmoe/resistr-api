const usImages = require('./sources/unitedstatesImages')

const structure = {
  bioguide_id: 'bioguideId',
  birthday: 'birthday',
  chamber: 'chamber',
  contact_form: 'contact',
  district: 'district',
  facebook_id: 'facebookId',
  fax: 'fax',
  first_name: 'firstName',
  middle_name: 'middleName',
  last_name: 'lastName',
  nickname: 'nickname',
  gender: 'gender',
  govtrack_id: 'govtrackId',
  in_office: 'inOffice',
  leadership_role: 'leadershipRole',
  lis_id: 'lisId',
  name_suffix: 'nameSuffix',
  oc_email: 'ocEmail',
  ocd_id: 'ocdId',
  office: 'officeAddress',
  party: 'party',
  phone: 'phone',
  senate_class: 'senateClass',
  state: 'state',
  state_name: 'stateName',
  state_rank: 'stateRank',
  term_end: 'termEnd',
  term_start: 'termStart',
  thomas_id: 'thomasId',
  title: 'title',
  twitter_id: 'twitterId',
  votesmart_id: 'votesmartId',
  website: 'website',
  youtube_id: 'youtubeId'
}

function build (data) {
  return Object.keys(data).reduce((acc, key) => {
    if (structure[key]) acc[structure[key]] = data[key]
    return acc
  }, {})
}

function all (results) {
  return Promise.all((results).map((result) => {
    const member = build(result)
    member.name = member.firstName + ' ' + member.lastName
    const uid = member.bioguideId
    member.imageUrl = null

    return usImages.memberImageAvailable(uid)
      .then((imageIsAvailable) => {
        if (imageIsAvailable) {
          member.imageUrl = usImages.memberImageUrl(uid)
        }

        return member
      })
  }))
}

module.exports = {
  build,
  all
}
