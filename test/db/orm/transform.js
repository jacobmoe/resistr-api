const { describe, it } = require('mocha')
const { assert } = require('chai')
const transform = require('../../../db/orm/transform')

const tableInfo = {
  name: 'stuff',
  columnMap: {
    firstName: 'first_name',
    lastName: 'last_name'
  }
}

const transformStuff = transform(tableInfo)

describe('db/orm/transform', () => {
  describe('forObject', () => {
    it('swaps column names for attribute names', () => {
      const data = {
        first_name: 'jane',
        last_name: 'roe'
      }

      assert.deepEqual(transformStuff.forObject(data), {
        firstName: 'jane',
        lastName: 'roe'
      })
    })
  })

  describe('forRecord', () => {
    it('swaps attribute names column names', () => {
      const data = {
        firstName: 'jane',
        lastName: 'roe'
      }

      assert.deepEqual(transformStuff.forRecord(data), {
        first_name: 'jane',
        last_name: 'roe'
      })
    })
  })
})
