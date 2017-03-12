require('../index.js')

const files = [
  './array',
  './date',
  './iif',
  './map',
  './object',
  './promise',
  './string',
  './stringbuilder',
  './uuid'
]


files.
  filter((file) => !file.startsWith('#')).
  forEach((file) => require(file))
