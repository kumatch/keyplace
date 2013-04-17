Keyplace
===========

replace string by a placeholder style.


Install
-----

    $ npm install keyplace



Usage
-----

```javascript
var keyplace = require('keyplace');

var str = '/path/to/:name/:some_id';
var value = keyplace(str);

// format string with placeholders
var result = value.format({ name: 'foobar', some_id: 12345 });
console.log(result);    // "/path/to/foobar/12345"

// and keyplace instances prototype is a String
console.log(value.substr(5, 10);   // "/to/:name/"
console.log(value.split('/'))      // [ "", "path", "to", ":name", ":some_id" ]
console.log(value.length)          // 23


// use custom format pattern (v 0.2)
var str = '/path/to/#{name}';
var result = keyplace(str, /#\{(\w+)\}/).format({ name: 'ok' });  // "/path/to/ok"
```



License
--------

Licensed under the MIT License.

Copyright (c) 2013 Yosuke Kumakura

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.