const { dbConnection } = require('config')
const knex = require('knex')({ client: 'pg', connection: dbConnection})

const { describe, it, afterEach, beforeEach } = require('mocha')
const { assert } = require('chai')
const table = require('../../../../db/orm/tables/user_actions')
const { truncate } = require('../../../helpers')

const clearTables = async () => {
  await truncate('users')
  await truncate('actions')
  await truncate('issues')
  await truncate('representatives')
  await truncate('user_actions')
}

describe('db/orm/tables/user_actions', () => {
  beforeEach(async () => {
    await clearTables()
    const d = new Date()

    await knex('users').insert([
      {id: 1, name: 'act-1', email: 'test@test.test', encrypted_password: '123', created_at: d, updated_at: d}
    ]);

    await knex('actions').insert([
      {id: 1, name: 'act-1', created_at: d, updated_at: d},
      {id: 2, name: 'act-2', created_at: d, updated_at: d}
    ]);

    await knex('issues').insert([
      {id: 1, name: 'iss-1', created_at: d, updated_at: d},
      {id: 2, name: 'iss-2', created_at: d, updated_at: d}
    ]);

    await knex('representatives').insert([
      {id: 1, ocd_division_identifier: 'div-1', office_name: 'off-1', name: 'rep-1', created_at: d, updated_at: d},
      {id: 2, ocd_division_identifier: 'div-2', office_name: 'off-2', name: 'rep-2', created_at: d, updated_at: d}
    ]);

    await knex('user_actions').insert([
      {id: 1, user_id: 1, action_id: 1, issue_id: 1, representative_id: 1, created_at: d, updated_at: d},
      {id: 2, user_id: 1, action_id: 2, issue_id: 2, representative_id: 2, created_at: d, updated_at: d}
    ]);
  })

  afterEach(async () => {
    await clearTables()
  })

  describe('whereWithAssociations', () => {
    it('returns hydrated user_actions', async () => {
      let res = await table.whereWithAssociations({})
      assert.equal(res.length, 2)

      res = await table.whereWithAssociations({
        userId: 1,
        representative: {
          ocdDivisionIdentifier: 'div-1',
          officeName: 'off-1'
        }
      })

      assert.equal(res.length, 1)

      assert.deepEqual(res[0].representative, {
        id: 1,
        ocdDivisionIdentifier: 'div-1',
        officeName: 'off-1',
        name: 'rep-1'
      })

      assert.deepEqual(res[0].action, {
        id: 1,
        name: 'act-1',
        iconName: null
      })

      assert.deepEqual(res[0].issue, {
        id: 1,
        name: 'iss-1'
      })


      res = await table.whereWithAssociations({
        userId: 5,
        representative: {
          ocdDivisionIdentifier: 'div-1',
          officeName: 'off-1'
        }
      })

      assert.equal(res.length, 0)


      res = await table.whereWithAssociations({
        representative: {
          ocdDivisionIdentifier: 'div-2'
        }
      })

      assert.equal(res.length, 1)

      assert.deepEqual(res[0].representative, {
        id: 2,
        ocdDivisionIdentifier: 'div-2',
        officeName: 'off-2',
        name: 'rep-2'
      })

      assert.deepEqual(res[0].action, {
        id: 2,
        name: 'act-2',
        iconName: null
      })

      assert.deepEqual(res[0].issue, {
        id: 2,
        name: 'iss-2'
      })
    })
  })
})
