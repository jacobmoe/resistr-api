const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const validationFactory = require('../../src/lib/validations')

describe('lib/validations', () => {
  describe('presence', () => {
    it('validates presence of field', () => {
      const validation = validationFactory.presence('name')
      assert.equal(validation({}), 'must be present')
      assert.isNull(validation({name: 'tony'}))
    })
  })
})
