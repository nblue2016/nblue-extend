### Description

Extend javascript native object

### Install:
``` shell
npm install nblue-extend
```

### Testing:
``` shell
npm install mocha --save-dev

npm test
```

### Usage:
``` javascript
// StringBuilder example
const lib = require('nblue-extend')
const StringBuilder = lib.StringBuilder

const sb = new StringBuilder()

sb.append('abc')
sb.append('def')
sb.remove(2, 2)

//output abef
console.log(sb.toString())

// promise example
// it will throw uncaught erorr
Promise.
  resolve(0).
  then(() => Promise.reject(-1)).
  done()

// date example
const dt1 = new Date(2016, 1, 5, 9, 3, 1)
const s1 = dt1.format('MM/dd/yyyy')

// output 01/05/2016
console.log(s1)
```
