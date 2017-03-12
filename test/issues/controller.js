const { describe, it, beforeEach, afterEach } = require('mocha')
const { assert } = require('chai')
const controller = require('../../src/issues/controller')
const { truncate } = require('../helpers')

const Issue = require('../../src/issues/model')

describe('issues/controller', () => {
  afterEach(async () => {
    await truncate('issues')
  })

  describe('index', () => {
    it('returns a issue list', async () => {
      const issue1 = await Issue.create({
        name: 'first test issue'
      })

      let ctx = {}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 1)

      const issue2 = await Issue.create({
        name: 'second test issue'
      })

      ctx = {}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 2)

      ctx = {query: {name: 'first test issue'}}
      await controller.index()(ctx)
      assert.equal(ctx.body.results.length, 1)
    })
  })
})
