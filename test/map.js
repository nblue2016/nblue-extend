const assert = require('assert')

describe('map', () => {
  const map = new Map()
  const map2 = new Map()
  const mapArray = new Map()

  map.
    set('key1', 'val1').
    set('key2', 'val2').
    set('key3', 'val3')

  map2.
    set('k1', 'v1').
    set('k2', 'v2').
    set('k3', 'v3').
    set('k4', map)

  mapArray.set('ary1', null).
    set('ary2', 's1').
    set('ary3', ['s1', 's2', 's3'])

  it('method of getWithDefault', () => {
    assert.equal(map.get('key1'), 'val1', 'ok')
    assert.equal(map.get('key2'), 'val2', 'ok')
    assert.equal(map.get('key3'), 'val3', 'ok')
    assert.equal(map.get('key4'), null, 'ok')
    assert.equal(map.getWithDefault('key4', 'val4'), 'val4', 'ok')
  })

  it('method of toObject', () => {
    const target = {
      key1: 'val1',
      key2: 'val2',
      key3: 'val3'
    }

    const target2 = {
      k1: 'v1',
      k2: 'v2',
      k3: 'v3',
      k4: {
        key1: 'val1',
        key2: 'val2',
        key3: 'val3'
      }
    }

    assert.deepEqual(map.toObject(), target, 'ok')
    assert.deepEqual(map2.toObject(), target2, 'ok')
  })

  it('method of select', () => {
    const v1 = map2.select('k1')
    const v2 = map2.select('k4/key2')
    const v3 = map2.select('k4/key33')
    const v4 = map2.select('k5/key2')

    assert.equal(v1, 'v1', 'ok')
    assert.equal(v2, 'val2', 'ok')
    assert.ok(!v3, 'ok')
    assert.ok(!v4, 'ok')
  })

  it('method of toJSON', () => {
    const target = {
      key1: 'val1',
      key2: 'val2',
      key3: 'val3'
    }

    assert.deepEqual(map.toJSON(), JSON.stringify(target), 'ok')
  })

  it('method of getArray', () => {
    assert.deepEqual(mapArray.getArray('ary1'), [], 'ok')
    assert.deepEqual(mapArray.getArray('ary2'), ['s1'], 'ok')
    assert.deepEqual(mapArray.getArray('ary3'), ['s1', 's2', 's3'], 'ok')
    assert.deepEqual(mapArray.getArray('ary4'), [], 'ok')
  })
})
