const assert = require('assert')
const lib = require('../')

const UUID = lib.UUID

describe('uuid', () => {
  it('v1', () => {
    const uuid = UUID.generate('v1')

    assert.ok(uuid, 'ok')
  })

  it('v4', () => {
    const uuid = UUID.generate('v4')

    assert.ok(uuid, 'ok')
  })

  it('guid', () => {
    const uuid = UUID.generate('guid')

    assert.ok(uuid, 'ok')
    assert.equal(uuid[0], '{', 'ok')
    assert.equal(uuid[uuid.length - 1], '}', 'ok')
  })

  it('random', () => {
    const uuid = UUID.generate()

    assert.ok(uuid, 'ok')
  })
})
