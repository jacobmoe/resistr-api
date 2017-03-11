module.exports = {
  presence: (field) => {
    return async (obj) => {
      if (obj[field]) return null
      return 'must be present'
    }
  },
  unique: (field, scope = []) => {
    return async (obj) => {
      const value = obj[field] || null
      const search = {[field]: value}

      scope.forEach((scopeField) => {
        search[scopeField] = obj[scopeField] || null
      })

      const result = await obj.class().find(search)

      if (result) {
        return 'already taken'
      } else {
        return null
      }
    }
  }
}
