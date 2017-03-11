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
      let params

      const validation = validationFactory.unique('name')
      let mockObj = {
        name: 'tim',
        class: () => {
          return {
            find: (p) => {
              params = p
              return params
            }
          }
        }
      }

      assert.equal(await validation(mockObj), 'already taken')
      assert.deepEqual(params, {name: 'tim'})

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

    it('accepts an optional scope', async () => {
      let params

      const validation = validationFactory.unique('name', ['beep', 'donkey'])
      let mockObj = {
        name: 'tim',
        beep: 'boop',
        donkey: 'kong',
        class: () => {
          return {
            find: (p) => {
              params = p

              return params
            }
          }
        }
      }

      await validation(mockObj)
      assert.deepEqual({name: 'tim', beep: 'boop', donkey: 'kong'}, params)
    })
  })
})
