const assert = require('assert')

describe('promise', () => {
  it('raise error', (done) => {
    Promise.
      reject('error#0').
      catch(() => done())
  })

  it('method of done (not use)', (done) => {
    process.once('unhandledRejection', () => done())

    Promise.reject('error#3')
  })

  const arys = [
    'method of done (Promise.reject)',
    'method of done (throw error)'
  ]

  arys.
    forEach((des, index) => {
      it(des, (done) => {
        // const listeners = process.listeners('uncaughtException')
        const oriListeners = process.listeners('uncaughtException')
        const newListener = () => {
          oriListeners.forEach(
            (item) => process.listeners('uncaughtException').push(item)
          )

          done()
        }

        // remove original listeners
        oriListeners.forEach(
          (item) => process.removeListener('uncaughtException', item)
        )

        process.once('uncaughtException', newListener)

        Promise.
          resolve(0).
          then(() => {
            if (index === 0) return Promise.reject('error')

            throw new Error('error')
          }).
          done()
      })
    })

  it('method of finally', (done) => {
    let
      a = 1,
      b = 2

    const fna = (val) => {
      a = val
    }
    const fnb = (val) => {
      b = val
    }

    Promise.
      resolve(0).
      then(() => fna(0)).
      then(() => Promise.reject(new Error('error#5'))).
      catch(() => fnb(5)).
      finally(() => {
        assert.equal(a, 0, 'a should be 0')
        assert.equal(b, 5, 'b should be 5')
      }).
      then(() => done())
  })

  it('method of spread', (done) => {
    Promise.all([1, 2, 3]).
      spread((a, b, c) => a + b + c).
      then((data) => assert.equal(data, 6, 'ok')).
      then(() => Promise.resolve(1)).
      spread((data) => assert.equal(data, 1, 'ok')).
      then(() => done()).
      catch((err) => done(err))
  })

  it('method of tap', (done) => {
    Promise.resolve(2).
      tap((data) => assert.equal(data, 2, 'ok')).
      tap(() => null).
      then((data) => assert.equal(data, 2, 'ok')).
      then(() => done()).
      catch((err) => done(err))
  })

  it('method of nodeify', (done) => {
    Promise.resolve(2).
      nodeify((err, data) => {
        assert.equal(data, 2, 'ok')
        done(err)
      })
  })

  it('method of nodeify with error', (done) => {
    Promise.reject(new Error('test')).
      nodeify((err) => {
        done(err ? null : new Error('unknown'))
      })
  })

  it('method of map', (done) => {
    Promise.
      resolve([1, 2, 3]).
      map((a) => a * 2).
      then((data) => assert.deepEqual(data, [2, 4, 6], 'mapped array')).
      then(() => Promise.resolve(4)).
      map((a) => a * 2).
      then((data) => assert.deepEqual(data, 8, 'mapped value')).
      then(() => done()).
      catch((err) => done(err))
  })

  it('method of filter', (done) => {
    Promise.
      resolve([1, 2, 3, 4, 5]).
      filter((a) => a > 2).
      then((data) => assert.deepEqual(data, [3, 4, 5], 'filtered array')).
      then(() => Promise.resolve(4)).
      filter((a) => a > 2).
      then((data) => assert.deepEqual(data, 4, 'ok')).
      then(() => done()).
      catch((err) => done(err))
  })

  it('method of each', (done) => {
    let rt = 0

    Promise.
      resolve([1, 2, 3, 4, 5]).
      each((val) => {
        rt += val
      }).
      then(() => assert.ok(rt, 15, 'ok')).
      then(() => done()).
      catch((err) => done(err))
  })
})
