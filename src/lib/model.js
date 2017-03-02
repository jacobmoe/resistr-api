module.exports = (table, validations = {}, instanceBuilder = (inst => inst)) => {
  let instanceMethods = instance => instance

  const methods = {
    count: () => (table.count()),
    find: async (id) => {
      const res = await table.find(id)
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
      const errors = await obj.validationErrors()

      if (Object.keys(errors).length === 0) {
        params.createdAt = new Date()
        params.updatedAt = new Date()

        const res = await table.create(params)
        return methods.build(res)
      } else {
        return Promise.reject(errors)
      }
    }
  }

  instanceMethods = (instance) => {
    instance.update = async (params) => {
      params.updatedAt = new Date()

      const res = await table.update(instance.id, params)
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
      const res = await table.del(instance.id)
      return methods.build(res)
    }

    instance.update = async (params) => {
      params.updatedAt = new Date()

      const res = await table.update(instance.id, params)
      return methods.build(res)
    }

    instance.validationErrors = async () => {
      const errors = {}

      Object.keys(validations).forEach(field => {
        validations[field].forEach(async (validation) => {
          const errorMessage = await validation(instance)

          if (errorMessage) {
            errors[field] = errors[field] || []
            errors[field].push(errorMessage)
          }
        })
      })

      return errors
    }

    return instanceBuilder(instance)
  }

  return methods
}
