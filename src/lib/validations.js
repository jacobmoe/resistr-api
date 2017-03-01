module.exports = {
  presence: (field) => {
    return (obj) => {
      if (obj[field]) return null
      return 'must be present'
    }
  }
}
