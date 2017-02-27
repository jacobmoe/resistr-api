class Model {
  constructor(params) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }

  static find (id) {
    return this.constructor._orm.find(id)
      .then((res) => (new this.constructor(res)))
  }

  static create (params) {
    const obj = new this.constructor(params)
    const errors = obj.validationErrors()

    if (errors.length === 0) {
      return this.constructor._orm.create(params)
        .then((res) => { return new this.constructor(res) })
    } else {
      return Promise.reject(errors)
    }
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
Model._orm = null

module.exports = Model
