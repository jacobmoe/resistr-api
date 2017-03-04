const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const config = require('config')
const controller = require('../../../src/users/auth/controller')
const User = require('../../../src/users/model')
const { truncate } = require('../../helpers')
const table = require('../../../db/orm/tables/users')
const jwt = require('jsonwebtoken')

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

      const user = ctx.body.user

      assert.isString(ctx.body.token)
      assert.equal(user.id, 1)
      assert.equal(user.email, 'test@example.com')
      assert.equal(user.name, 'boop')
      assert.equal(ctx.status, 201)
    })
  })

  describe('login', () => {
    it('checks email/password and returns a token', async () => {
      const email = 'test@example.com'
      const password = 'passpass'
      const name = 'biff'

      const user = await User.create({
        password: password,
        email: email,
        name: name
      })

      let ctx = {
        body: null,
        status: null,
        request: {
          body: {
            password: password,
            email: email
          }
        }
      }

      const loginAction = controller.login()
      await loginAction(ctx)

      assert.deepEqual(ctx.body.user, user.prepare())
      assert.isString(ctx.body.token)
      assert.equal(ctx.status, 200)

      ctx = {
        body: null,
        status: null,
        request: {
          body: {
            password: 'wrong password',
            email: email
          }
        }
      }

      await loginAction(ctx)

      assert.isUndefined(ctx.body.user)
      assert.isUndefined(ctx.body.token)
      assert.isString(ctx.body.error)
      assert.equal(ctx.status, 401)

      ctx = {
        body: null,
        status: null,
        request: {
          body: {
            password: 'wrong password',
            email: 'not an email'
          }
        }
      }

      await loginAction(ctx)

      assert.isUndefined(ctx.body.user)
      assert.isUndefined(ctx.body.token)
      assert.isString(ctx.body.error)
      assert.equal(ctx.status, 401)
    })
  })
})
