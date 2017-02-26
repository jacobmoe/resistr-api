const { describe, it } = require('mocha')
const { assert } = require('chai')
const memberBuilder = require('../../src/congress/memberBuilder')

describe('memberBuilder', () => {
  it('builds a member from a raw response', () => {
    const raw = {
      bioguide_id: "S000148",
      birthday: "1950-11-23",
      chamber: "senate",
      contact_form: "https://www.schumer.senate.gov/contact/email-chuck",
      crp_id: "N00001093",
      district: null,
      facebook_id: "15771239406",
      fax: "202-228-3027",
      fec_ids: ["S8NY00082", "H0NY16010"],
      first_name: "Charles",
      gender: "M",
      govtrack_id: "300087",
      icpsr_id: 14858,
      in_office: true,
      last_name: "Schumer",
      leadership_role: "Minority Leader",
      lis_id: "S270",
      middle_name: "E.", name_suffix: null,
      nickname: "Chuck",
      oc_email: "Sen.Schumer@opencongress.org",
      ocd_id: "ocd-division/country:us/state:ny",
      office: "322 Hart Senate Office Building",
      party: "D",
      phone: "202-224-6542",
      senate_class: 3,
      state: "NY",
      state_name: "New York",
      state_rank: "senior",
      term_end: "2023-01-03",
      term_start: "2017-01-03",
      thomas_id: "01036",
      title: "Sen",
      twitter_id: "SenSchumer",
      votesmart_id: 26976,
      website: "https://www.schumer.senate.gov",
      youtube_id: "SenatorSchumer"
    }

    const expected = {
      bioguideId: "S000148",
      birthday: "1950-11-23",
      chamber: "senate",
      contact: "https://www.schumer.senate.gov/contact/email-chuck",
      district: null,
      facebookId: "15771239406",
      fax: "202-228-3027",
      firstName: "Charles",
      gender: "M",
      govtrackId: "300087",
      inOffice: true,
      lastName: "Schumer",
      leadershipRole: "Minority Leader",
      lisId: "S270",
      middleName: "E.",
      nameSuffix: null,
      nickname: "Chuck",
      ocEmail: "Sen.Schumer@opencongress.org",
      ocdId: "ocd-division/country:us/state:ny",
      officeAddress: "322 Hart Senate Office Building",
      party: "D",
      phone: "202-224-6542",
      senateClass: 3,
      state: "NY",
      stateName: "New York",
      stateRank: "senior",
      termEnd: "2023-01-03",
      termStart: "2017-01-03",
      thomasId: "01036",
      title: "Sen",
      twitterId: "SenSchumer",
      votesmartId: 26976,
      website: "https://www.schumer.senate.gov",
      youtubeId: "SenatorSchumer"
    }

    assert.deepEqual(memberBuilder.build(raw), expected)
  })
})
