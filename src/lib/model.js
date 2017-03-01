const ormPath = '../../db/orm'

module.exports = (tableName, validations = {}) => {
  const orm = require(`${ormPath}/${tableName}`)
  let instanceMethods = instance => instance

  const methods = {
    count: () => (orm.count()),
    find: async (id) => {
      const res = await orm.find(id)
      return methods.build(res)
    },
    build: (params) => {
      const instance = instanceMethods({})

      instance.attributes = params

      Object.keys(params).forEach((key) => {
        instance[key] = params[key]
      })

      return instance
    },
    create: async (params) => {
      const obj = methods.build(params)
      const errors = obj.validationErrors()

      if (Object.keys(errors).length === 0) {
        params.createdAt = new Date()
        params.updatedAt = new Date()

        const res = await orm.create(params)
        return methods.build(res)
      } else {
        return Promise.reject(errors)
      }
    }
  }

  instanceMethods = (instance) => {
    instance.update = async (params) => {
      params.updatedAt = new Date()

      const res = await orm.update(instance.id, params)
      return methods.build(res)
    }

    instance.save = async () => {
      if (instance.id) {
        return await instance.update(instance)
      } else {
        return await methods.create(instance)
      }
    }

    instance.del = async () => {
      const res = await orm.del(instance.id)
      return methods.build(res)
    }

    instance.update = async (params) => {
      params.updatedAt = new Date()

      const res = await orm.update(instance.id, params)
      return methods.build(res)
    }

    instance.validationErrors = () => {
      const errors = {}

      Object.keys(validations).forEach(field => {
        validations[field].forEach(validation => {
          const errorMessage = validation(instance)

          if (errorMessage) {
            errors[field] = errors[field] || []
            errors[field].push(errorMessage)
          }
        })
      })

      return errors
    }

    return instance
  }

  return methods
}
