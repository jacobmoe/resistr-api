const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const Model = require('../../src/lib/model')
const { truncate } = require('../helpers')

describe('lib/Model', () => {
  afterEach((done) => {
    truncate('users').then(() => done())
  })

  describe('constructor', () => {
    it('constructs an object from params', () => {
      const obj = new Model({firstName: 'john', lastName: 'doe'})

      assert.equal(obj.firstName, 'john')
      assert.equal(obj.lastName, 'doe')
    })
  })

  describe('count', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(() => {
      Model.tableName = 'users'
      Model.validations = {}
    })

    beforeEach((done) => {
      Model.count()
        .then((res) => { assert.equal(res, 0) })
        .then(done)
    })

    beforeEach((done) => {
      Model.create(params)
        .then((res) => { id = res.id })
        .then(done)
    })

    it('returns the count', (done) => {
      Model.count()
        .then(res => {assert.equal(res, 1)})
        .then(done)
    })
  })

  describe('find', () => {
    let id

    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach((done) => {
      Model.tableName = 'users'
      Model.validations = {}

      Model.create(params)
        .then((res) => { id = res.id })
        .then(done)
    })

    it('fetches a record and inits an instance', (done) => {
      Model.find(id)
        .then((res) => {
          assert(res instanceof Model)
          assert.equal(res.id, id)
        })
        .then(done)
    })
  })

  describe('create', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    it('creates a new record and returns an instance', (done) => {
      Model.tableName = 'users'
      Model.validations = {}

      Model.create(params)
        .then((res) => {
          assert(res instanceof Model)
          assert.equal(typeof res.id, 'number')
          assert.equal(res.name, params.name)
          assert(res.updatedAt instanceof Date)
          assert(res.createdAt instanceof Date)
        })
        .then(done)
    })

    it('rejects on validation error', (done) => {
      Model.tableName = 'users'

      Model.validations = {
        notPresent: [
          (obj) => {
            if (obj.notPresent) return null
            return 'must be present'
          }
        ]
      }

      Model.create(params)
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

    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(() => {
      Model.tableName = 'users'
      Model.validations = {}
    })

    beforeEach((done) => {
      Model.create(params)
        .then((res) => {obj = res})
        .then(done)
    })

    it('updates an existing record', (done) => {
      obj.update({name: 'upton'})
        .then((res) => {
          assert.equal(res.name, 'upton')
        })
        .then(() => {return Model.find(obj.id)})
        .then((res) => {
          assert.equal(res.name, 'upton')
        })
        .then(done)
    })
  })

  describe('save', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(() => {
      Model.tableName = 'users'
      Model.validations = {}
    })

    it('creates if not already persisted', (done) => {
      const obj = new Model(params)

      obj.save()
        .then((res) => {
          assert.equal(typeof res.id, 'number')
          assert.equal(res.name, 'joe')
          return res
        })
        .then((res) => {return Model.find(res.id)})
        .then((res) => {
          assert.equal(res.name, 'joe')
        })
        .then(done)
    })

    it('updates if already persisted', (done) => {
      const obj = new Model(params)
      let id

      Model.create(params)
        .then((res) => {
          id = res.id
          res.name = 'batman'

          return res.save()
        })
        .then(res => {
          assert.equal(res.id, id)
          assert.equal(res.name, 'batman')
        })
        .then(done)
    })
  })

  describe('del', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      encryptedPassword: '123'
    }

    beforeEach(() => {
      Model.tableName = 'users'
      Model.validations = {}
    })

    it('deletes recored', (done) => {
      let obj

      Model.create(params)
        .then(res => {
          obj = res

          return Model.count()
        })
        .then(count => {
          assert.equal(count, 1)
        })
        .then(() => {
          return obj.del()
        })
        .then(() => {
          return Model.count()
        })
        .then(count => {
          assert.equal(count, 0)
        })
        .then(done)
    })
  })

  describe('validationErrors', () => {
    it('returns errors based on validations', () => {
      Model.validations = {}

      const obj = new Model({lastName: 'doe'})
      let errors = obj.validationErrors()

      assert.deepEqual(errors, {})

      Model.validations = {
        firstName: [
          (obj) => {
            if (obj.firstName) return null
            return 'must be present'
          }
        ]
      }

      errors = obj.validationErrors()

      assert.deepEqual(errors, {
        firstName: [ 'must be present' ]
      })
    })
  })
})
