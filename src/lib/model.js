module.exports = (table, validations = {}, instanceBuilder = (inst => inst)) => {
  let instanceMethods = instance => instance

  const methods = {
    count: () => (table.count()),
    find: async (params) => {
      if (typeof params === 'number') {
        params = {id: params}
      }

      const res = await table.find(params)
      return res && methods.build(res)
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
    },
    def: (name, method) => {
      methods[name] = method
    }
  }

  instanceMethods = (instance) => {
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

      // do it in parallel
      // await Promise.all(files.map(async (file) => {
      //   const contents = await fs.readFile(file, 'utf8')
      //   console.log(contents)
      // }));

      for (let field in validations) {
        for (let validation of validations[field]) {
          const errorMessage = await validation(instance)

          if (errorMessage) {
            errors[field] = errors[field] || []
            errors[field].push(errorMessage)
          }
        }
      }

      return errors
    }

    return instanceBuilder(instance)
  }

  return methods
}
