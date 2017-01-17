const StringBuilder = require('./stringbuilder')

const lengthOfByte = 256
const countOfHex = 16
const movementOfHex = 0x100

let
  _byteToHex = null,
  _seedBytes = null

class UUID
{

  constructor () {
    this._clockSeq = null
    this._lastMSecs = 0
    this._lastNSecs = 0
  }

  get SeedBytes () {
    const that = this

    if (!_seedBytes) {
      _seedBytes = Array.range(1, countOfHex).
                        map(() => that.rnd())
    }

    return _seedBytes
  }

  get HexTable () {
    if (_byteToHex === null) {
      _byteToHex = []
      for (let index = 0; index < lengthOfByte; index += 1) {
        _byteToHex[index] =
         (index + movementOfHex).toString(countOfHex).substr(1)
      }
    }

    return _byteToHex
  }

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  get NodeId () {
    const that = this

    return [
      that.rnd() | 0x01,
      that.rnd(),
      that.rnd(),
      that.rnd(),
      that.rnd(),
      that.rnd()
    ]

    /* remove old code, use random function every time
    const seedBytes = this.SeedBytes

    return [
      seedBytes[0] | 0x01, seedBytes[1], seedBytes[2],
      seedBytes[3], seedBytes[4], seedBytes[5]
    ] */
  }

  // Per 4.2.2, randomize (14 bit) clockseq
  get ClockSeq () {
    if (!this._clockSeq) {
      const seedBytes = this.SeedBytes

      this._clockSeq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff
    }

    return this._clockSeq
  }
  set ClockSeq (val) {
    this._clockSeq = val
  }

  get LastMSecs () {
    return this._lastMSecs
  }
  set LastMSecs (val) {
    this._lastMSecs = val
  }

  get LastNSecs () {
    return this._lastNSecs
  }
  set LastNSecs (val) {
    this._lastNSecs = val
  }

  rnd () {
    return Math.random() * countOfHex | 0
  }

  /*
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  bytesToUuid (buffer, offset) {
    const start = offset || 0
    const hexTable = this.HexTable
    const dashIndexs = [3, 5, 7, 9]
    const sb = new StringBuilder()

    for (let index = start; index < countOfHex; index += 1) {
      sb.append(hexTable[buffer[index]])

      if (dashIndexs.indexOf(index) >= 0) {
        sb.append('-')
      }
    }

    return sb.toString()
  }

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // See https://github.com/broofa/node-uuid for API details
  v1 (options) {
    const that = this
    const opts = options || {}

    const buffer = opts.buffer || null
    const start = opts.offset || 0

    let
      clockseq = opts.clockseq ? opts.clockseq : that.ClockSeq,
      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as msecs (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      msecs = opts.msecs ? opts.msecs : new Date().getTime(),
      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      nsecs = opts.nsecs ? opts.nsecs : that.LastNSecs + 1

    // Time since last uuid creation (in msecs)
    const dt = msecs - that.LastMSecs + (nsecs - that.LastNSecs) / 10000

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && !opts.clockseq) {
      clockseq = clockseq + 1 & 0x3fff
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > that.LastMSecs) && !opts.nsecs) nsecs = 0

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('v1(): Can\'t create more than 10M uuids/sec')
    }

    that.LastMSecs = msecs
    that.LastNSecs = nsecs
    this.Clockseq = clockseq

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000

    // `time_low`
    const low = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000
    const high = msecs / 0x100000000 * 10000 & 0xfffffff

    // let index = start
    const bytes = buffer || []

    bytes[start + 0] = low >>> 24 & 0xff
    bytes[start + 1] = low >>> 16 & 0xff
    bytes[start + 2] = low >>> 8 & 0xff
    bytes[start + 3] = low & 0xff

    bytes[start + 4] = high >>> 8 & 0xff
    bytes[start + 5] = high & 0xff
    // `time_high_and_version` // include version
    bytes[start + 6] = high >>> 24 & 0xf | 0x10
    bytes[start + 7] = high >>> 16 & 0xff

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    bytes[start + 8] = clockseq >>> 8 | 0x80
    // `clock_seq_low`
    bytes[start + 9] = clockseq & 0xff

    // `node`
    const node = opts.node || that.NodeId

    for (let step = 0; step < 6; step += 1) {
      bytes[start + step + 10] = node[step]
    }

    if (buffer) {
      for (let step = 0; step < countOfHex; step += 1) {
        buffer[start + step] = bytes[step]
      }
    }

    return buffer || that.bytesToUuid(bytes)
  }

  v4 (options) {
    const that = this
    const opts = options || {}

    const buffer = opts.buffer || null
    const start = opts.offset || 0

    const rndFunc = opts.random || (opts.rnd || that.rnd)
    const rnds = Array.range(1, countOfHex).map(() => rndFunc())

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40
    rnds[8] = rnds[8] & 0x3f | 0x80

    // Copy bytes to buffer, if provided
    if (buffer) {
      for (let step = 0; step < countOfHex; step += 1) {
        buffer[start + step] = rnds[step]
      }
    }

    return buffer || that.bytesToUuid(rnds)
  }

  static generate (version) {
    const uuid = new UUID()

    if (version === 'v1') return uuid.v1()
    else if (version === 'v4') return uuid.v4()
    else if (version === 'guid') return `{${uuid.v4()}}`

    return uuid.rnd() % 4 === 0 ? uuid.v4() : uuid.v1()
  }

}

module.exports = UUID
