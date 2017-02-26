class Model {
  constructor(params) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }

  static find (id) {
  }

  static create (id) {
  }

  save () {
  }

  update (params) {
  }

  delete () {
  }

  validationErrors () {
    const errors = {}
    const validations = this.constructor.validations

    Object.keys(validations).forEach(field => {
      validations[field].forEach(validation => {
        const errorMessage = validation(this)

        if (errorMessage) {
          errors[field] = errors[field] || []
          errors[field].push(errorMessage)
        }
      })
    })

    return errors
  }
}

Model.tableName = null
Model.fields = []
Model.validations = {}

module.exports = Model
