module.exports = (table, validations = {}, instanceMethods = (inst => inst)) => {

  const methods = {
    count: () => (table.count()),
    find: async (params) => {
      if (typeof params === 'number') {
        params = {id: params}
      }

      const res = await table.find(params)
      return res && methods.build(res)
    },
    where: async (params) => {
      const res = await table.where(params)
      return res && res.map((item) => (methods.build(item)))
    },
    build: (params) => {
      return instanceBuilder(
        Object.assign({}, params, { params: params })
      )
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
    },
    findOrCreate: async (params) => {
      let res = await methods.find(params)

      if (!res) {
        res = await methods.create(params)
      }

      return res
    },
    classDef: (name, method) => {
      methods[name] = method
    }
  }

  function instanceBuilder (instance) {
    instance.class = () => {
      return methods
    }

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

      await Promise.all(Object.keys(validations).map(field => {
        return Promise.all(validations[field].map(async (validation) => {
          const errMessage = await validation(instance)

          if (errMessage) {
            errors[field] = errors[field] || []
            errors[field].push(errMessage)
          }
        }))
      }))

      return errors
    }

    instance.prepare = () => {
      return instance.params
    }

    return instanceMethods(instance)
  }

  return methods
}
