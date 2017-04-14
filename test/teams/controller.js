const { dbConnection } = require('config')
const knex = require('knex')({ client: 'pg', connection: dbConnection})

const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const controller = require('../../src/teams/controller')
const { truncate } = require('../helpers')
const modelFactory = require('../../src/lib/factories/model')
const userTable = require('../../db/orm').users

const User = modelFactory(userTable)
const Team = require('../../src/teams/team')
const TeamUser = require('../../src/teams/teamUser')

describe('teams/controller', () => {
  afterEach(async () => {
    await truncate('users')
    await truncate('teams')
    await truncate('team_users')
  })

  describe('create', () => {
    it('creates a team and leader teamUser', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      const ctx = {
        request: {
          body: {
            name: 'new team'
          }
        },
        state: {
          user: user
        }
      }

      assert.equal(await Team.count(), 0)
      assert.equal(await TeamUser.count(), 0)

      await controller.create()(ctx)

      assert.equal(await Team.count(), 1)
      assert.equal(await TeamUser.count(), 1)

      const team = await Team.find({ name: 'new team' })
      const teamUser = await TeamUser.find({ teamId: team.id })

      assert.isTrue(teamUser.isLeader)

      assert.deepEqual(ctx.body, team.prepare())
      assert.equal(ctx.status, 201)
    })

    it('sets an error if team name is missing', async () => {
      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })

      const ctx = {
        request: {
          body: {}
        },
        state: {
          user: user
        }
      }

      assert.equal(await Team.count(), 0)
      assert.equal(await TeamUser.count(), 0)

      await controller.create()(ctx)

      assert.equal(ctx.status, 400)

      assert.equal(await Team.count(), 0)
      assert.equal(await TeamUser.count(), 0)
    })

    it('sets an error if team name is taken', async () => {
      await knex('teams').insert([{
        id: 1,
        name: 'the team',
        created_at: new Date()
      }])

      const user = await User.findOrCreate({
        name: 'tony',
        email: 'tony@example.com',
        encryptedPassword: '123'
      })


      const ctx = {
        request: {
          body: {
            name: 'the team'
          }
        },
        state: {
          user: user
        }
      }

      assert.equal(await Team.count(), 1)
      assert.equal(await TeamUser.count(), 0)

      await controller.create()(ctx)

      assert.equal(ctx.status, 400)

      assert.equal(await Team.count(), 1)
      assert.equal(await TeamUser.count(), 0)
    })
  })
})
