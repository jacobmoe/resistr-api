const { dbConnection } = require('config')
const knex = require('knex')({ client: 'pg', connection: dbConnection})

const { describe, it, afterEach, beforeEach } = require('mocha')
const { assert } = require('chai')
const base = require('../../../db/orm/base')
const { truncate } = require('../../helpers')

describe('db/orm/base', () => {
  afterEach(async () => {
    await truncate('users')
  })

  const table = {
    name: 'users',
    columnMap: {
      id: 'id',
      name: 'name',
      email: 'email',
      encryptedPassword: 'encrypted_password',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }

  describe('count', () => {
    it('returns count of records in a table', async () => {
      assert.equal(await base(table).count(), 0)

      await knex('users').insert([
        {
          id: 1,
          name: 'bill',
          email: 'user1@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        },
        {
          id: 2,
          name: 'jill',
          email: 'user2@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        }
      ]);

      assert.equal(await base(table).count(), 2)
    })
  })

  describe('create', () => {
    const params = {
      name: 'joe',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      encryptedPassword: '123'
    }

    it('inserts a record into the table', async () => {
      const baseTable = base(table)
      assert.equal(await baseTable.count(), 0)

      const results = await baseTable.exec(baseTable.create(params))
      assert.equal(await baseTable.count(), 1)
      assert.equal(results[0].name, 'joe')
    })
  })

  describe('update', () => {
    it('updates a record', async () => {
      await knex('users').insert([
        {
          id: 1,
          name: 'bill',
          email: 'user1@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        }
      ]);

      const baseTable = base(table)
      const newParams = {name: 'bill'}

      await baseTable.exec(baseTable.update(1, newParams))
      const results = await baseTable.exec(baseTable.where({id: 1}))
      assert.equal(results[0].name, 'bill')
    })
  })

  describe('del', () => {
    it('deletes a record', async () => {
      const baseTable = base(table)

      await knex('users').insert([
        {
          id: 1,
          name: 'bill',
          email: 'user1@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        },
        {
          id: 2,
          name: 'jill',
          email: 'user2@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        }
      ]);

      assert.equal(await baseTable.count(), 2)
      await baseTable.del(1)
      assert.equal(await baseTable.count(), 1)
    })
  })

  describe('search', () => {
    it('takes a field name and search text', async () => {
      const baseTable = base(table)

      await knex('users').insert([
        {
          id: 1,
          name: 'bill',
          email: 'user1@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        },
        {
          id: 2,
          name: 'jill',
          email: 'user2@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        },
        {
          id: 3,
          name: 'yo la tengo',
          email: 'user3@email.com',
          created_at: new Date(),
          encrypted_password: '123'
        }
      ]);


      let results = await baseTable.exec(baseTable.search('email', 'user'))
      assert.equal(results.length, 3)

      results = await baseTable.exec(baseTable.search('name', 'ill'))
      assert.equal(results.length, 2)

      results = await baseTable.exec(baseTable.search('name', 'yo la tengo'))
      assert.equal(results.length, 1)
      assert.deepEqual(results[0], {
        id: 3,
        name: 'yo la tengo',
        email: 'user3@email.com',
        createdAt: results[0].createdAt,
        updatedAt: null,
        encryptedPassword: '123'
      })
    })
  })
})
