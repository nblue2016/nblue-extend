const stringifyPrimitive = (v) => {
  switch (typeof v) {
  case 'string':
    return v
  case 'number':
    return isFinite(v) ? `${v}` : ''
  case 'boolean':
    return v ? 'true' : 'false'
  default:
    return ''
  }
}

if (!Object.hasOwnProperty('values')) {
  Reflect.defineProperty(
    Object,
    'values',
    {
      value: (obj) => Object.
        keys(obj).
        map((key) => obj[key])
    }
  )
}

if (!Object.hasOwnProperty('entries')) {
  Reflect.defineProperty(
    Object,
    'entries',
    {
      value: (obj) => Object.
        keys(obj).
        map((key) => [key, obj[key]])
    }
  )
}

if (!Object.hasOwnProperty('is')) {
  Reflect.defineProperty(
    Object,
    'is',
    {
      value: (x1, y1) => {
        if (x1 === y1) return x1 !== 0 || 1 / x1 === 1 / y1

        return false
      }
    }
  )
}

if (!Object.hasOwnProperty('toMap')) {
  Reflect.defineProperty(
    Object,
    'toMap',
    {
      value: (obj, deep) => {
        if (!deep) return new Map(Object.entries(obj))

        const map = new Map()

        for (const key of Object.keys(obj)) {
          const val = obj[key]

          map.set(key, typeof val === 'object' ? Object.toMap(val, true) : val)
        }

        return map
      }
    }
  )
}

if (!Object.hasOwnProperty('toFormData')) {
  Reflect.defineProperty(
    Object,
    'toFormData',
    {
      value: (obj, separate, equal, options) => {
        const sep = separate || '&'
        const eq = equal || '='

        let encode = escape

        if (options &&
            typeof options.encodeURIComponent === 'function') {
          encode = options.encodeURIComponent
        }

        if (obj !== null && typeof obj === 'object') {
          const keys = Object.keys(obj)
          const len = keys.length
          const flast = len - 1

          let fields = ''

          for (let i = 0; i < len; i += 1) {
            const k = keys[i]
            const ks = encode(stringifyPrimitive(k)) + eq

            const v = obj[k]

            if (Array.isArray(v)) {
              const vlen = v.length
              const vlast = vlen - 1

              for (let j = 0; j < vlen; j += 1) {
                fields += ks + encode(stringifyPrimitive(v[j]))

                fields += j < vlast ? sep : 0
              }

              if (vlen && i < flast) fields += sep
            } else {
              fields += ks + encode(stringifyPrimitive(v))
              if (i < flast) {
                fields += sep
              }
            }
          }

          return fields
        }

        return ''
      }
    }
  )
}

/*
// remove this method, use Object.toMap to replace
if (!Object.prototype.toMap) {
  Object.prototype.toMap = function () {
    return Object.toMap(this)
  }
} */
