const { describe, it, afterEach, beforeEach } = require('mocha')
const { assert } = require('chai')
const crud = require('../../../db/orm/crud')
const { truncate } = require('../../helpers')

describe('db/orm/crud', () => {
  const table = {
    name: 'users',
    columns: {
      id: 'id',
      name: 'name',
      email: 'email',
      encryptedPassword: 'encrypted_password',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }

  const params = {
    name: 'joe',
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    encryptedPassword: '123'
  }

  describe('count', () => {
    beforeEach((done) => {
      truncate('users').then(() => done())
    })

    afterEach((done) => {
      truncate('users').then(() => done())
    })

    it('returns count of records in a table', (done) => {
      crud(table).count()
        .then((res) => {
          assert.equal(res, 0)
        })
        .then(() => {
          return crud(table).create(params)
        })
        .then(() => {
          return crud(table).count()
        })
        .then((res) => {
          assert.equal(res, 1)
        })
        .then(() => {
          done()
        })
    })
  })

  describe('create', () => {
    beforeEach((done) => {
      truncate('users').then(() => done())
    })

    afterEach((done) => {
      truncate('users').then(() => done())
    })

    it('inserts a record into a given table', (done) => {
      crud(table).create(params)
        .then((res) => {
          assert.equal(typeof res.id, 'number')
          assert.equal(typeof res.name, 'string')
          assert.equal(typeof res.email, 'string')
          assert.equal(typeof res.createdAt, 'object')
          assert.equal(typeof res.updatedAt, 'object')

          done()
        })
    })
  })

  describe('find', () => {
    beforeEach((done) => {
      truncate('users').then(() => done())
    })

    afterEach((done) => {
      truncate('users').then(() => done())
    })

    it('returns fetches a record by id', (done) => {
      const crudTable = crud(table)

      crudTable.create(params)
        .then((res) => { return crudTable.find({id: res.id}) })
        .then(res => {
          assert.equal(res.email, params.email)
          assert.equal(res.name, params.name)
        })
        .then(() => done())
    })
  })

  describe('update', () => {
    beforeEach((done) => {
      truncate('users').then(() => done())
    })

    afterEach((done) => {
      truncate('users').then(() => done())
    })

    it('updates a record', (done) => {
      const crudTable = crud(table)
      const newParams = {name: 'bill'}
      let id

      crudTable.create(params)
        .then((res) => { return id = res.id })
        .then(id => {return crudTable.update(id, newParams)})
        .then(res => { assert.equal(res.name, 'bill') })
        .then(() => done())
    })

    describe('del', () => {
      beforeEach((done) => {
        truncate('users').then(() => done())
      })

      afterEach((done) => {
        truncate('users').then(() => done())
      })

      it('deletes a record', (done) => {
        const crudTable = crud(table)
        let id

        crudTable.create(params)
          .then((res) => { id = res.id })
          .then(() => { return crudTable.count() })
          .then((count) => {assert.equal(count, 1)})
          .then(() => {return crudTable.del(id)})
          .then(() => { return crudTable.count() })
          .then((count) => {assert.equal(count, 0)})
          .then(() => done())
      })
    })
  })
})
