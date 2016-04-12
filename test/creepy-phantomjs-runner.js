'use strict';

// var expect = require('chai').expect;
var runner = require('../');
var jquery = require.resolve('jquery')

const node_path = require('path')
const filename = node_path.join(__dirname, 'fixtures/runner.js')

var r = runner()
.js(jquery)
.js(filename)
.on('result', (data, url) => {
  console.log('result', data)
})
.on('error', (err) => {
  console.log('error', err.stack)
})

r.open('http://www.baidu.com')

