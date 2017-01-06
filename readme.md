# nblue-extend

nblue module to extend javascript native objects

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/nblue2016/Lobby)

[![NPM](https://nodei.co/npm/nblue-extend.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nblue-extend/)


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

#### Class ___**StringBuilder**___


an StringBuilder for javascript

``` javascript
// StringBuilder example
const lib = require('nblue-extend')
const StringBuilder = lib.StringBuilder

const sb = new StringBuilder()

// append string or remove chars
sb.append('abc')
sb.append('def')
sb.remove(2, 2)

// output 'abef'
console.log(sb.toString())

// output 4
console.log(sb.length)

/* other methods */
// append string with new line ("abc\r\n")
sb.appendLine('abc')  //

// append formatted string ("abcaaadef")
sb.appendFormat('abc%sdef', 'aaa')

// it likes use template as below
const str = 'aaa'

sb.append(`abc${str}def`)

// insert string
sb.insert(2, 'fff')

// insert formatted string
sb.insertFormat(0, 'abc%sdef', 'aaa')

// clear all buffer
sb.clear()
```

#### extends ___**Date**___, support format data to special string value


Parse String value to Date

``` javascript
// parse a string value to Date type
// use static method of parseDate
const dt1 = Date.parseDate('2016/02/05 14:33:12')
// or call toDate() method for string value
const dt2 = '2016/02/05 14:33:12'.toDate()

// it equal to
new Date(Date.parse('2016/02/05 14:33:12'))
```

Output formatted date value

``` javascript
// output "2016"
console.log(dt1.format('yyyy'))

// output "02/05/2016"
console.log(dt1.format('MM/dd/yyyy'))

// output "14:33:12"
console.log(dt1.format('HH:mm:ss'))
```

## Date and time patterns

* yy = short year
* yyyy = long year
* M = month (1-12)
* MM = month (01-12)
* MMM = month abbreviation (Jan, Feb ... Dec)
* MMMM = long month (January, February ... December)
* d = day (1 - 31)
* dd = day (01 - 31)
* ddd = day of the week in words (Monday, Tuesday ... Sunday)
* dddd = short day of the week in words (Mon, Tue ... Sun)
* h = hour in am/pm (0-12)
* hh = hour in am/pm (00-12)
* H = hour in day (0-23)
* HH = hour in day (00-23)
* mm = minute (00-59)
* m = minute (0-59)
* ss = second (00-59)
* s = second (0-59)
* S = milliseconds
* TT = AM/PM marker
* tt = a.m./p.m. marker


#### extends ___**Promise**___


Extends methods of Promise (`finally(), done(), filter() and map()`)

``` javascript
// method of finally
Promise.
  resolve(0).
  then(() => Promise.reject(-1)).
  catch((err) => {
    console.log('#err')
  }).
  finally(() => {
    console.log('#finally')
  })

// method of done
// it will throw uncaught error
Promise.
  resolve(0).
  then(() => Promise.reject(-1)).
  done()

// filter and map value for resolve result by Promise
// like array.prototype.filter and array.prototype.map
// method of filter
Promise.
  resolve([1, 2, 3, 4]).
  filter((val) => val > 2).
  then((data) => {
    // output [3, 4]
    console.log(data)
  })

// method of map
Promise.
  resolve([1, 2, 3, 4]).
  map((val) => val * 2).
  then((data) => {
    // output [1, 4, 6, 8]
    console.log(data)
  })
```

#### support ___**Map**___ and ___**Object**___ convert each other.


For example, Map to Object

```javascript
const map = new Map()

map.
  set('key1', 'val1').
  set('key2', 'val2').
  set('key3', 'val3')

const obj = map.toObject()

// output converted object
console.log(obj)
```

For example, Object to Map

```javascript
const obj = {
  key1: 'val1',
  key2: 'val2',
  key3: 'val3'
}

const map = obj.toMap()

// output converted map
console.log(map)
```

## License
The MIT License (MIT)

Copyright © 2017 Bruce Jiang
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
