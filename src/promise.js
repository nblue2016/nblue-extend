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
    function (callback) {
      return this.
        then(
          (data) =>
            Promise.resolve(callback()).
              then(() => data)
          ,
          (err) =>
            Promise.resolve(callback()).
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
    function (callback) {
      return this.
        then(
          (data) => {
            if (!data) return Promise.resolve(null)

            return Promise.resolve(
              Array.isArray(data) ? callback(...data) : callback(data)
            )
          },
          (err) => Promise.reject(err)
        )
    }
}

// define map method, map array result of promise .then
if (!Promise.prototype.map) {
  Promise.prototype.map =
    function (callback) {
      return this.
        then(
          (data) => {
            if (data) {
              return Promise.resolve(
                Array.isArray(data)
                  ? data.map(callback)
                  : [data].map(callback)[0]
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
    function (callback) {
      return this.
        then(
          (data) => {
            if (data) {
              const rt = Promise.resolve(Array.isArray(data)) ? data : [data]

              rt.forEach(callback)
            }
          },
          (err) => Promise.reject(err)
        )
    }
}

// define filter method, filter array result of promise .then
if (!Promise.prototype.filter) {
  Promise.prototype.filter =
    function (callback) {
      return this.
        then(
          (data) => {
            if (data) {
              let rt = Array.isArray(data)
                ? data.filter(callback)
                : [data].filter(callback)

              if (!Array.isArray(data) && rt) {
                rt = rt[0]
              }

              return Promise.resolve(rt)
            }

            return []
          },
          (err) => Promise.reject(err)
        )
    }
}
