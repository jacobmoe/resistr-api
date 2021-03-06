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
  describe('paramsForObject', () => {
    it('swaps column names for attribute names', () => {
      const data = {
        first_name: 'jane',
        last_name: 'roe'
      }

      assert.deepEqual(transformStuff.paramsForObject(data), {
        firstName: 'jane',
        lastName: 'roe'
      })
    })
  })

  describe('paramsForRecord', () => {
    it('swaps attribute names column names', () => {
      const data = {
        firstName: 'jane',
        lastName: 'roe'
      }

      assert.deepEqual(transformStuff.paramsForRecord(data), {
        first_name: 'jane',
        last_name: 'roe'
      })
    })
  })

  describe('buildSearchParams', () => {
    it('transforms params for query', () => {
      const userActionTransform = transform(
        require('../../../db/orm/tables').user_actions
      )

      const params = {
        userId: '1',
        representative: {
          ocdDivisionIdentifier: 'ocd-division/country:us',
          officeName: 'President of the United States',
          name: 'He Who Must Not Be Named'
        }
      }

      assert.deepEqual(userActionTransform.buildSearchParams(params), {
        "representatives.name": "He Who Must Not Be Named",
        "representatives.ocd_division_identifier": "ocd-division/country:us",
        "representatives.office_name": "President of the United States",
        "user_actions.user_id": "1"
      })
    })

    it('skips undefined tables', () => {
      const userActionTransform = transform(
        require('../../../db/orm/tables').user_actions
      )

      const params = {
        userId: '1',
        notAThing: {
          notAColumn: ''
        },
        representative: {
          ocdDivisionIdentifier: 'ocd-division/country:us',
          officeName: 'President of the United States',
          name: 'He Who Must Not Be Named'
        }
      }

      assert.deepEqual(userActionTransform.buildSearchParams(params), {
        "representatives.name": "He Who Must Not Be Named",
        "representatives.ocd_division_identifier": "ocd-division/country:us",
        "representatives.office_name": "President of the United States",
        "user_actions.user_id": "1"
      })
    })
  })

  describe('colNameToAttrName', () => {
    it('swaps column name for attribute name', () => {
      const data = {
        first_name: 'jane',
        last_name: 'roe'
      }

      assert.equal(
        transformStuff.colNameToAttrName('first_name'),
        'firstName'
      )

      assert.equal(
        transformStuff.colNameToAttrName('last_name'),
        'lastName'
      )
    })
  })

  describe('attrNameToColName', () => {
    it('swaps column name for attribute name', () => {
      const data = {
        first_name: 'jane',
        last_name: 'roe'
      }

      assert.equal(
        transformStuff.attrNameToColName('firstName'),
        'first_name'
      )

      assert.equal(
        transformStuff.attrNameToColName('lastName'),
        'last_name'
      )
    })
  })
})
