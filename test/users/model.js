const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const User = require('../../src/users/model')
const { truncate } = require('../helpers')

describe('users/model', () => {
  describe('validations', () => {
    it('validate', async () => {
      const user = User.build({})
      let errors = await user.validationErrors()

      assert.deepEqual(errors, {
        name: [ 'must be present' ],
        password: [ 'must be present' ]
      })
    })
  })
})
