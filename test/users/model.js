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
        email: [ 'has already been taken' ],
        name: [ 'must be present' ],
        password: [ 'must be present' ]
      })
    })
  })

  describe('validatePassword', () => {
    it('accepts a password and checks match', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'a-password',
        name: 'me'
      })

      assert.isTrue(await user.validatePassword('a-password'))
      assert.isFalse(await user.validatePassword('not-password'))
    })
  })
})
