const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const controller = require('../../src/userActions/controller')
const { truncate } = require('../helpers')
const modelFactory = require('../../src/lib/factories/model')
const userTable = require('../../db/orm/tables/users')

const UserAction = require('../../src/userActions/userAction')
const Issue = require('../../src/userActions/issue')
const Action = require('../../src/userActions/action')
const Representative = require('../../src/userActions/representative')
const User = modelFactory(userTable)

describe('userActions/controller', () => {
  afterEach(async () => {
    await truncate('users')
    await truncate('user_actions')
    await truncate('issues')
    await truncate('actions')
    await truncate('representatives')
  })

  describe('create', () => {
    it('creates a userAction and representative', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      const issue = await Issue.create({name: 'test issue'})
      const action = await Action.create({name: 'test action'})

      const ctx = {
        request: {
          body: {
            representative: {
              ocdDivisionIdentifier: 'division-id',
              officeName: 'office-name',
              name: 'rep-name'
            },
            issueId: issue.id,
            actionId: action.id
          }
        },
        state: {
          user: user
        }
      }

      assert.equal(await UserAction.count(), 0)
      assert.equal(await Representative.count(), 0)

      await controller.create()(ctx)

      assert.equal(ctx.status, 201)

      assert.equal(await UserAction.count(), 1)
      assert.equal(await Representative.count(), 1)
    })

    it('sets an error if issue or action are missing', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      const ctx = {
        request: {
          body: {
            representative: {
              ocdDivisionIdentifier: 'division-id',
              officeName: 'office-name',
              name: 'rep-name'
            },
            issueId: 1,
            actionId: 1
          }
        },
        state: {
          user: user
        }
      }

      assert.equal(await UserAction.count(), 0)

      await controller.create()(ctx)

      assert.equal(ctx.status, 400)
      assert.deepEqual(ctx.body, {issueId: ['invalid issue or action']})
      assert.equal(await UserAction.count(), 0)
    })

    it('sets an error if rep params are invalid', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      const ctx = {
        request: {
          body: {representative: {}}
        },
        state: {
          user: user
        }
      }

      assert.equal(await UserAction.count(), 0)

      await controller.create()(ctx)

      assert.equal(ctx.status, 400)
      assert.deepEqual(ctx.body, {
        "name": [
          "must be present"
        ],
        ocdDivisionIdentifier: [
          "must be present"
        ],
        officeName: [
          "must be present"
        ]
      })

      assert.equal(await UserAction.count(), 0)
    })
  })

  describe('index', () => {
    it('returns a user action list', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      await UserAction.create({
        userId: user.id,
        issueId: 1,
        actionId: 1,
        representativeId: 1
      })

      let ctx = {
        state: {
          user: user
        }
      }

      await controller.index()(ctx)

      assert.equal(ctx.body.results.length, 1)

      await UserAction.create({
        userId: user.id,
        issueId: 2,
        actionId: 2,
        representativeId: 2
      })

      ctx = {
        state: {
          user: user
        }
      }

      await controller.index()(ctx)

      assert.equal(ctx.body.results.length, 2)
    })
  })
})
