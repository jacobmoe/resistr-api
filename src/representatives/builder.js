function build (data) {
  return {
    address: data.normalizedInput,
    divisions: hydrateDivisions(data.divisions, data)
  }
}

function hydrateDivisions(divisions, data) {
  return Object.keys(divisions).reduce((acc, ocdDivision) => {
    acc[ocdDivision] = {}

    let division = divisions[ocdDivision]
    let offices = hydrateDivision(division, data)

    acc[ocdDivision].name = division.name
    acc[ocdDivision].offices = hydrateOffices(offices, data)

    return acc
  }, {})
}

function hydrateDivision(division, data) {
  return (division.officeIndices || []).map((index) => {
    return data.offices[index]
  })
}

function hydrateOffices(offices, data) {
  return offices.map((office) => {
    office.officials = office.officialIndices.map((index) => {
      return data.officials[index]
    })

    return office
  })
}

module.exports = {
  build
}
