const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const User = require('../../src/users/model')
const { truncate } = require('../helpers')
const table = require('../../db/orm/tables/users')

describe('users/model', () => {
  afterEach((done) => {
    truncate(table.name).then(() => done())
  })

  describe('validations', () => {
    it('validates presence', async () => {
      const user = User.build({})
      let errors = await user.validationErrors()

      assert.deepEqual(errors, {
        email: [ 'must be present' ],
        name: [ 'must be present' ],
        password: [ 'must be present' ]
      })
    })

    it('validates uniqueness', async () => {
      await User.create({
        email: 'test@example.com',
        password: 'test',
        name: 'me'
      })

      const user = User.build({
        email: 'test@example.com'
      })

      let errors = await user.validationErrors()

      assert.deepEqual(errors, {
        email: [ 'already exists' ],
        name: [ 'must be present' ],
        password: [ 'must be present' ]
      })
    })
  })
})
