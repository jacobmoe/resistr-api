const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const controller = require('../../src/actions/controller')
const { truncate } = require('../helpers')

const Action = require('../../src/actions/model')

describe('actions/controller', () => {
  afterEach(async () => {
    await truncate('actions')
  })

  describe('index', () => {
    it('returns a action list', async () => {
      const action1 = await Action.create({
        name: 'first test action'
      })

      let ctx = {}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 1)

      const action2 = await Action.create({
        name: 'second test action'
      })

      ctx = {}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 2)

      ctx = {query: {name: 'first test action'}}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 1)
    })
  })
})
