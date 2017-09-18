// define done method, it can throw error in promise
if (!Promise.prototype.done) {
  Promise.prototype.done =
    function (onFulfilled, onRejected) {
      this.
        then(onFulfilled, onRejected).
        catch(
          (err) => {
            // throw new Error to outside
            setTimeout(() => {
              throw err
            }, 0)
          }
        )
    }
}

// define finally method, it will be executed after then and catch methods
if (!Promise.prototype.finally) {
  Promise.prototype.finally =
    function (promise) {
      return this.
        then(
          (data) =>
            Promise.resolve(promise()).
              then(() => data)
          ,
          (err) =>
            Promise.resolve(promise()).
              then(() => {
                throw err
              })
        )
    }
}

// define spread method, flattened to the formal parameters of
// the fulfillment handler.
if (!Promise.prototype.spread) {
  Promise.prototype.spread =
    function (func) {
      return this.
        then(
          (data) => {
            if (!data) return Promise.resolve(null)

            return Promise.resolve(
              Array.isArray(data) ? func(...data) : func(data)
            )
          },
          (err) => Promise.reject(err)
        )
    }
}

// define tap method, pass the result to next promise function
if (!Promise.prototype.tap) {
  Promise.prototype.tap =
    function (func) {
      return this.
        then(
          (data) => Promise.resolve(func(data)).then(() => data),
          (err) => Promise.reject(err)
        )
    }
}

// define nodeify method, Call nodeify directly passing the promise and
// an optional callback as arguments. If a callback is provided it will be
// called as callback(error, result). If callback is not a function,
// promise is returned.
if (!Promise.prototype.nodeify) {
  Promise.prototype.nodeify =
    function (callback) {
      if (callback) {
        return this.
          then(
            (data) => callback(null, data),
            (err) => callback(err)
          )
      }

      return this.then((data) => data, (err) => Promise.reject(err))
    }
}

// define map method, map array result of promise .then
if (!Promise.prototype.map) {
  Promise.prototype.map =
    function (func) {
      return this.
        then(
          (data) => {
            if (data) {
              return Promise.resolve(
                Array.isArray(data) ? data.map(func) : [data].map(func)[0]
              )
            }

            return []
          },
          (err) => Promise.reject(err)
        )
    }
}

// define each method, fetch every item in result of promise .then
if (!Promise.prototype.each) {
  Promise.prototype.each =
    function (func) {
      return this.
        then(
          (data) => {
            if (data) {
              // resolve result
              const rt = Promise.resolve(Array.isArray(data)) ? data : [data]

              // call forEach function for array
              if (rt) rt.forEach(func)
            }
          },
          (err) => Promise.reject(err)
        )
    }
}

// define filter method, filter array result of promise .then
if (!Promise.prototype.filter) {
  Promise.prototype.filter =
    function (func) {
      return this.
        then(
          (data) => {
            // return empty array if there is no data
            if (!data) return []

            // call filter function for array
            const rt = (Array.isArray(data) ? data : [data]).filter(func)

            // resolve result
            return Promise.resolve(!Array.isArray(data) && rt ? rt[0] : rt)
          },
          (err) => Promise.reject(err)
        )
    }
}
