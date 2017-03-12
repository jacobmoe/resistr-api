const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const modelFactory = require('../../../src/lib/factories/model')
const { truncate } = require('../../helpers')
const table = require('../../../db/orm/tables/users')

describe('lib/factories/model', () => {
  afterEach((done) => {
    truncate(table.name).then(() => done())
  })

  describe('build', () => {
    it('constructs an object from params', () => {
      const user = modelFactory(table).build({
        name: 'tester',
        email: 'email@example.com'
      })

      assert.equal(user.name, 'tester')
      assert.equal(user.email, 'email@example.com')
    })
  })

  describe('count', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    const Model = modelFactory(table)
    let id

    beforeEach(async () => {
      const count = await Model.count()
      assert.equal(count, 0)
    })

    beforeEach(async () => {
      const res = await Model.create(params)
      id = res.id
    })

    it('returns the count', async () => {
      const res = await Model.count()
      assert.equal(res, 1)
    })
  })

  describe('find', () => {
    let id
    const Model = modelFactory(table)

    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(async () => {
      const res = await Model.create(params)
      id = res.id
    })

    it('fetches a record and inits an instance', async () => {
      const inst = await Model.find(id)
      assert.equal(inst.id, id)
    })
  })

  describe('where', () => {
    const Model = modelFactory(table)

    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(async () => {
      await Model.create(params)
    })

    it('fetches a list of items', async () => {
      let result = await Model.where({name: 'joe'})
      assert.equal(result.length, 1)

      result = await Model.where({name: 'tony'})
      assert.equal(result.length, 0)
    })
  })

  describe('create', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    it('creates a new record and returns an instance', async () => {
      const User = modelFactory(table)

      const res = await User.create(params)
      assert.equal(typeof res.id, 'number')
      assert.equal(res.name, params.name)
      assert(res.updatedAt instanceof Date)
      assert(res.createdAt instanceof Date)
    })

    it('rejects on validation error', (done) => {
      const validations = {
        notPresent: [
          (obj) => {
            if (obj.notPresent) return null
            return 'must be present'
          }
        ]
      }

      const User = modelFactory(table, validations)

      User.create(params)
        .catch((errors) => {
          assert.deepEqual(errors, {
            notPresent: [ 'must be present' ]
          })

          done()
        })
    })
  })

  describe('findOrCreate', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    it('creates a new record and returns an instance', async () => {
      const User = modelFactory(table)

      let res = await User.findOrCreate(params)
      assert.equal(res.name, 'joe')

      assert.equal(await User.count(), 1)

      res = await User.findOrCreate(params)
      assert.equal(res.name, 'joe')

      assert.equal(await User.count(), 1)
    })
  })

  describe('update', () => {
    let obj
    const Model = modelFactory(table)

    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    it('updates an existing record', async () => {
      const obj = await Model.create(params)
      const updated = await obj.update({name: 'upton'})

      assert.equal(updated.name, 'upton')

      const freshObj = await Model.find(obj.id)
      assert.equal(freshObj.name, 'upton')
    })
  })

  describe('save', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    const Model = modelFactory(table)

    it('creates if not already persisted', async () => {
      const obj = Model.build(params)

      const res = await obj.save()
      assert.equal(typeof res.id, 'number')
      assert.equal(res.name, 'joe')

      const fetchedObj = await Model.find(res.id)
      assert.equal(fetchedObj.name, 'joe')
    })

    it('updates if already persisted', async () => {
      const obj = Model.build(params)
      let id

      const res = await Model.create(params)
      res.name = 'batman'

      const saved = await res.save()
      assert.equal(res.id, id)
      assert.equal(res.name, 'batman')
    })
  })

  describe('del', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    const Model = modelFactory(table)

    it('deletes recored', async () => {
      const obj = await Model.create(params)
      let count = await Model.count()
      assert.equal(count, 1)

      await obj.del()
      count = await Model.count()
      assert.equal(count, 0)
    })
  })

  describe('validationErrors', () => {
    it('returns errors based on validations', async () => {
      let Model = modelFactory(table)
      let obj = Model.build({lastName: 'doe'})
      let errors = await obj.validationErrors()

      assert.deepEqual(errors, {})

      const validations = {
        notAThing: [
          async (obj) => {
            if (obj.notAThing) return null
            return 'must be present'
          }
        ]
      }

      Model = modelFactory(table, validations)
      obj = Model.build({name: 'doe'})
      errors = await obj.validationErrors()

      assert.deepEqual(errors, {
        notAThing: [ 'must be present' ]
      })
    })
  })
})
