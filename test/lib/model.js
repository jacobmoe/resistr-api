const { describe, it } = require('mocha')
const { assert } = require('chai')
const Model = require('../../src/lib/model')

describe('lib/Model', () => {
  describe('constructor', () => {
    it('constructs an object from params', () => {
      const obj = new Model({firstName: 'john', lastName: 'doe'})

      assert.equal(obj.firstName, 'john')
      assert.equal(obj.lastName, 'doe')
    })
  })

  describe('validationErrors', () => {
    it('returns errors based on validations', () => {
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
