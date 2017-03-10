const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const validationFactory = require('../../src/lib/validations')

describe('lib/validations', () => {
  describe('presence', () => {
    it('validates presence of field', async () => {
      const validation = validationFactory.presence('name')
      assert.equal(await validation({}), 'must be present')
      assert.isNull(await validation({name: 'tony'}))
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
              return params
            }
          }
        }
      }

      assert.equal(await validation(mockObj), 'already taken')

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
