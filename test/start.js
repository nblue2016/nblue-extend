require('../index.js')

const files = [
  './array',
  './date',
  './map',
  './object',
  './promise',
  './string',
  './stringbuilder'
]


files.
  filter((file) => !file.startsWith('#')).
  forEach((file) => require(file))
