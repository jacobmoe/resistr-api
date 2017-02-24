const structure = {
  "full_name": "name",
  "first_name":"firstName",
  "last_name": "lastName",
  "middle_name": "middleName",
  "id": "id",
  "district": "11",
  "state": "state",
  "boundary_id": "boundaryId",
  "email": "email",
  "all_ids": "allIds",
  "leg_id": "legId",
  "party": "party",
  "active": "active",
  "transparencydata_id": "transparencydataId",
  "photo_url": "imageUrl",
  "roles": "roles",
  "url": "website",
  "chamber": "chamber",
  "offices": "officeAddresses",
  "suffixes": "suffix"
}

function build (data) {
  return Object.keys(data).reduce((acc, key) => {
    if (structure[key]) acc[structure[key]] = data[key]
    return acc
  }, {})
}

function all (results) {
  return results.map((item) => {
    const member = build(item)

    if (member.party == 'Democratic') {
      member.party = 'D'
    } else if (member.party == 'Republican') {
      member.party = 'R'
    }

    return member
  })
}

module.exports = {
  build,
  all
}
