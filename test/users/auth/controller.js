const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const controller = require('../../../src/users/auth/controller')
const { truncate } = require('../../helpers')
const table = require('../../../db/orm/tables/users')

describe('users/auth/controller', () => {
  afterEach((done) => {
    truncate(table.name).then(() => done())
  })

  describe('register', () => {
    it('creates a user, responds with user object', async () => {
      const ctx = {
        body: null,
        status: null,
        request: {
          body: {
            name: 'boop',
            password: 'passpass',
            email: 'test@example.com'
          }
        }
      }

      const registerAction = controller.register()
      await registerAction(ctx)

      assert.equal(ctx.body.id, 1)
      assert.equal(ctx.body.email, 'test@example.com')
      assert.equal(ctx.body.name, 'boop')
      assert.equal(ctx.status, 201)
    })
  })
})
