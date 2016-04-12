[![Build Status](https://travis-ci.org/kaelzhang/creepy-phantomjs-runner.svg?branch=master)](https://travis-ci.org/kaelzhang/creepy-phantomjs-runner)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/creepy-phantomjs-runner?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/creepy-phantomjs-runner)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/creepy-phantomjs-runner.svg)](http://badge.fury.io/js/creepy-phantomjs-runner)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/creepy-phantomjs-runner.svg)](https://www.npmjs.org/package/creepy-phantomjs-runner)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/creepy-phantomjs-runner.svg)](https://david-dm.org/kaelzhang/creepy-phantomjs-runner)
-->

# creepy-phantomjs-runner

PhantomJS adapter for creepy web downloader.

## Install

```sh
$ npm install creepy-phantomjs-runner --save
```

## Usage

```js
var runner = require('creepy-phantomjs-runner')()
.js('/path/to/jquery.js')
.js('/path/to/analyzer.js')
.on('result', (output, url) => {
  console.log('The result is: ' + output)
  // The result is: Google
  // (and there is a '\n' at the end)
})
.on('error', (err) => {
  console.log(err)
})

runner.open('http://www.google.com')
```

In `'/path/to/analyzer.js'`:

```js
console.log('creepy-phantomjs-runner:' + jQuery('#hplogo').attr('title'))
```

### Notice

Notice that, in order to distinguish with other `console.log()`ed message, only the log message which starts with `'creepy-phantomjs-runner:'` will be output.

## License

MIT
