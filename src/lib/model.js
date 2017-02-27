const ormPath = '../../db/orm'

class Model {
  constructor(params) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }

  static count () {
    return this.getOrm().count()
  }

  static find (id) {
    return this.getOrm().find(id)
      .then((res) => (new this(res)))
  }

  static create (params) {
    const obj = new this(params)
    const errors = obj.validationErrors()

    if (Object.keys(errors).length === 0) {
      params.createdAt = new Date()
      params.updatedAt = new Date()

      return this.getOrm().create(params)
        .then((res) => { return new this(res) })
    } else {
      return Promise.reject(errors)
    }
  }

  static getOrm () {
    if (this.constructor._orm) {
      return this.constructor._orm
    } else {
      const table = this.tableName
      if (!table) return null

      return this.constructor._orm = require(`${ormPath}/${table}`)
    }
  }

  update (params) {
    params.updatedAt = new Date()

    return this.constructor.getOrm().update(this.id, params)
      .then((res) => (new this.constructor(res)))
  }

  save () {
    if (this.id) {
      return this.update(this)
    } else {
      return this.constructor.create(this)
    }
  }

  del () {
    return this.constructor.getOrm().del(this.id)
      .then((res) => (new this.constructor(res)))
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
Model.validations = {}

module.exports = Model
