module.exports = {
  presence: (field) => {
    return (obj) => {
      if (obj[field]) return null
      return 'must be present'
    }
  },
  unique: (field) => {
    return async (obj) => {
      const value = obj[field] || null
      const result = await obj.class().find({[field]: value})

      if (result) {
        return 'already exists'
      } else {
        return null
      }
    }
  }
}
