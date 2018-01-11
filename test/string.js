const assert = require('assert')

describe('string', () => {
  it('method of startsWith', () => {
    const s1 = 'abcdefg'

    assert.equal(s1.startsWith('abc'), true, "s1 starts with 'abc'")
    assert.equal(s1.startsWith('bcd'), false, "s1 doesn't start with 'bcd'")
  })

  it('method of endsWith', () => {
    const s1 = 'abcdefg'

    assert.equal(s1.endsWith('efg'), true, "s1 ends with 'efg'")
    assert.equal(s1.endsWith('bcd'), false, "s1 doesn't ends with 'bcd'")
  })

  it('method of includes', () => {
    const s1 = 'abcdefg'

    assert.equal(s1.includes('abc'), true, "s1 includes 'abc'")
    assert.equal(s1.includes('cde'), true, "s1 includes 'cde'")
    assert.equal(s1.includes('efg'), true, "s1 includes 'efg'")
    assert.equal(s1.includes('af'), false, "s1 doesn't includes 'af'")
  })

  it('method of eval', () => {
    const s1 = '1+1'
    const s2 = 'Number.parseInt((5+4)/3)'

    assert.equal(s1.eval(), 2, `eval s1: ${s1}`)
    assert.equal(s2.eval(), 3, `eval s1: ${s2}`)
  })

  it('method of padStart', () => {
    const s1 = 'abcdefghij'

    assert.equal(s1.padStart(10, '0'), 'abcdefghij',
      "'abcdefghij'.padStart(10, '0') should equal 'abcdefghij'")

    /* assert.equal(s1.padStart(7, '0'), 'abcdefg',
        "'abcdefghij'.padStart(7, '0') should equal 'abcdefg'") */

    assert.equal(s1.padStart(15, '0'), '00000abcdefghij',
      "'abcdefghij'.padStart(15, '0') should equal '00000abcdefghij'")
    assert.equal(s1.padStart(15, 'abc'), 'abcababcdefghij',
      "'abcdefghij'.padStart(15, 'abc') should equal 'abcababcdefghij'")
    assert.equal(''.padStart(15, 'abc'), 'abcabcabcabcabc',
      "''.padStart(15, 'abc') should equal 'abcabcabcabcabc'")

    assert.equal(s1.padStart(15), '     abcdefghij',
      "''.padStart(15) should equal '     abcdefghij'")
  })

  it('method of padEnd', () => {
    const s1 = 'abcdefghij'

    assert.equal(s1.padEnd(10, '0'), 'abcdefghij',
      "'abcdefghij'.padEnd(10, '0') should equal 'abcdefghij'")

    /* assert.equal(s1.padEnd(7, '0'), 'abcdefg',
        "'abcdefghij'.padEnd(7, '0') should equal 'abcdefg'") */

    assert.equal(s1.padEnd(15, '0'), 'abcdefghij00000',
      "'abcdefghij'.padEnd(15, '0') should equal 'abcdefghij00000'")
    assert.equal(s1.padEnd(15, 'abc'), 'abcdefghijabcab',
      "'abcdefghij'.padEnd(15, 'abc') should equal 'abcdefghijabcab'")
    assert.equal(''.padEnd(15, 'abc'), 'abcabcabcabcabc',
      "''.padEnd(15, 'abc') should equal 'abcabcabcabcabc'")
    assert.equal(s1.padEnd(15), 'abcdefghij     ',
      "''.padEnd(15) should equal 'abcdefghij     '")
  })

  it('static method of String.format', () => {
    assert.equal(
      String.format('%s:%s', 'a1', 'a2'), 'a1:a2', 'ok')
    assert.equal(
      String.format('abc%sgh%', 'def', 'ij'), 'abcdefgh%', 'ok')
    assert.equal(
      String.format('abc%sgh%s', 'def', 'ij'), 'abcdefghij', 'ok')
    assert.equal(
      String.format('%sabcgh%s', 'def', 'ij'), 'defabcghij', 'ok')

    assert.equal(
      String.format('abc%dgh%s', 123, 567), 'abc123gh567', 'ok')
    assert.equal(
      String.format('abc%dgh%d', 123), 'abc123gh123', 'ok')

    assert.equal(
      String.format(
        '${word1} ${word2}!', {
          word1: 'hello',
          word2: 'world'
        }),
      'hello world!',
      'test string format2'
    )
    assert.equal(
      String.format('%d:%s-%s', 3, 's1', 's2'), '3:s1-s2', 'test string format')
  })
})
