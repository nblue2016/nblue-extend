if (!Array.hasOwnProperty('range')) {
  Reflect.defineProperty(
    Array,
    'range',
    {
      value: (start, end, step) => {
        if (!start && start !== 0) throw new Error('invaild argument of start')
        if (!end && end !== 0) throw new Error('invaild argument of end')
        if (end < start) throw new Error('end must greater than start')

        const ary = []
        const sp = step ? step : 1

        for (let i = start; i <= end; i += sp) {
          ary.push(i)
        }

        return ary
      }
    }
  )
}

if (!Array.prototype.toObject) {
  Array.prototype.toObject = function (keys) {
    if (keys === null) throw new Error('invaild keys')
    if (!Array.isArray(keys)) throw new Error('the keys is not an array')

    // const length = this.length > keys.length ? keys.length : this.length
    return keys.reduce((obj, key, index) => {
      if (index < this.length) {
        obj[key] = this[index]
      }

      return obj
    }, {})
  }
}
