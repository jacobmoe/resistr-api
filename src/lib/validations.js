module.exports = {
  presence: (field) => {
    return async (obj) => {
      if (obj[field]) return null
      return 'must be present'
    }
  },
  unique: (field) => {
    return async (obj) => {
      const value = obj[field] || null
      const result = await obj.class().find({[field]: value})

      if (result) {
        return 'already taken'
      } else {
        return null
      }
    }
  }
}
