const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const modelFactory = require('../../src/lib/model')
const { truncate } = require('../helpers')

describe('lib/model', () => {
  afterEach((done) => {
    truncate('users').then(() => done())
  })

  describe('build', () => {
    it('constructs an object from params', () => {
      const user = modelFactory('users').build({
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

    const Model = modelFactory('users')
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
    const Model = modelFactory('users')

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

  describe('create', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    it('creates a new record and returns an instance', async () => {
      const User = modelFactory('users')

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

      const User = modelFactory('users', validations)

      User.create(params)
        .catch((errors) => {
          assert.deepEqual(errors, {
            notPresent: [ 'must be present' ]
          })

          done()
        })
    })
  })

  describe('update', () => {
    let obj
    const Model = modelFactory('users')

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

    const Model = modelFactory('users')

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

    const Model = modelFactory('users')

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
    it('returns errors based on validations', () => {
      let Model = modelFactory('users')
      let obj = Model.build({lastName: 'doe'})
      let errors = obj.validationErrors()

      assert.deepEqual(errors, {})

      const validations = {
        notAThing: [
          (obj) => {
            if (obj.notAThing) return null
            return 'must be present'
          }
        ]
      }

      Model = modelFactory('users', validations)
      obj = Model.build({name: 'doe'})
      errors = obj.validationErrors()

      assert.deepEqual(errors, {
        notAThing: [ 'must be present' ]
      })
    })
  })
})
