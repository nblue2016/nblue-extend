if (!Map.prototype.toObject) {
  Map.prototype.toObject = function () {
    const obj = {}
    const ctx = this

    for (const key of ctx.keys()) {
      const val = ctx.get(key)

      obj[key] = val instanceof Map ? val.toObject() : val
    }

    return obj
  }
}

if (!Map.prototype.select) {
  Map.prototype.select = function (path) {
    const items = path.split('/')
    const that = this

    let
      parent = that,
      result = null

    for (const key of items) {
      result = parent.has(key) ? parent.get(key) : null
      if (result === null) break

      parent = result
    }

    return result
  }
}

if (!Map.prototype.toJSON) {
  Map.prototype.toJSON =
    function () {
      return JSON.stringify(this.toObject())
    }
}

if (!Map.prototype.get2) {
  Map.prototype.get2 =
    function (key, defVal) {
      return this.has(key) ? this.get(key) : defVal
    }
}

if (!Map.prototype.getArray) {
  Map.prototype.getArray =
    function (key) {
      if (!this.has(key)) return []

      const items = this.get(key)

      if (!items) return []

      return Array.isArray(items) ? items : [items]
    }
}
