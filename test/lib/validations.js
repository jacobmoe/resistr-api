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

  describe('unique', () => {
    it('validates uniqueness of field', async () => {
      const validation = validationFactory.unique('name')
      let mockObj = {
        name: 'tim',
        class: () => {
          return {
            find: (params) => {
              if (params.name === mockObj.name) {
                return params
              } else {
                return null
              }
            }
          }
        }
      }

      assert.equal(await validation(mockObj), 'already exists')

      mockObj = {
        name: 'tom',
        class: () => {
          return {
            find: (params) => {
              return null
            }
          }
        }
      }
      assert.isNull(await validation(mockObj))
    })
  })
})