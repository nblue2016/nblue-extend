const assert = require('assert')

describe('object', () => {
  it('static method of Object.values', () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }

    assert.deepEqual(
      Object.values(obj1),
      [1, 2, 3, 4],
      "the value of array wasn't expected")
  })

  it('static method of Object.entries', () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }

    assert.deepEqual(
      Object.entries(obj1),
      [['a', 1], ['b', 2], ['c', 3], ['d', 4]],
      "the value of array wasn't expected")
  })

  it('static method of Object.toMap', () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }

    let map = Object.toMap(obj1)

    assert.ok(map.has('a'), 'key a')
    assert.ok(map.has('b'), 'key b')
    assert.ok(map.has('c'), 'key c')
    assert.ok(map.has('d'), 'key d')

    assert.equal(map.get('a'), 1, 'get value by (a)')
    assert.equal(map.get('b'), 2, 'get value by (b)')
    assert.equal(map.get('c'), 3, 'get value by (c)')
    assert.equal(map.get('d'), 4, 'get value by (d)')

    const obj2 = {
      a: 1,
      b: 2,
      c: {
        c1: 31,
        c2: 32
      },
      d: 4
    }

    map = Object.toMap(obj2)
    assert.ok(map.has('a'), 'key a')
    assert.ok(map.has('b'), 'key b')
    assert.ok(map.has('c'), 'key c')
    assert.ok(map.has('d'), 'key d')

    assert.equal(map.get('a'), 1, 'get value by (a)')
    assert.equal(map.get('b'), 2, 'get value by (b)')
    assert.deepEqual(map.get('c'), {
      c1: 31,
      c2: 32
    }, 'get value by (c)')
    assert.equal(map.get('d'), 4, 'get value by (d)')

    map = Object.toMap(obj2, true)
    assert.ok(map.has('a'), 'key a')
    assert.ok(map.has('b'), 'key b')
    assert.ok(map.has('c'), 'key c')
    assert.ok(map.has('d'), 'key d')

    assert.equal(map.get('a'), 1, 'get value by (a)')
    assert.equal(map.get('b'), 2, 'get value by (b)')
    assert.deepEqual(map.get('c'),
      Object.toMap({
        c1: 31,
        c2: 32
      }), 'get value by (c)'
    )

    assert.equal(map.get('c').get('c1'), 31, 'get value by (c1)')
    assert.equal(map.get('c').get('c2'), 32, 'get value by (c2)')
    assert.equal(map.get('d'), 4, 'get value by (d)')
  })

  it('static method of Object.toFormData', () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }

    assert.deepEqual(
      Object.toFormData(obj1), 'a=1&b=2&c=3&d=4', 'form data')
  })

  /* it('method of toMap', () => {
    const obj = {
      key1: 'val1',
      key2: 'val2',
      key3: 'val3'
    }

    const map = obj.toMap()

    assert.ok(map.has('key1'), 'ok')
    assert.ok(map.has('key2'), 'ok')
    assert.ok(map.has('key3'), 'ok')

    assert.equal(map.get('key1'), 'val1', 'ok')
    assert.equal(map.get('key2'), 'val2', 'ok')
    assert.equal(map.get('key3'), 'val3', 'ok')
  }) */
})
