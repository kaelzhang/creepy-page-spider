'use strict';

var expect = require('chai').expect;
var runner = require('../');
var jquery = require.resolve('jquery')

const node_path = require('path')
const filename = node_path.join(__dirname, 'fixtures/runner.js')

describe('runner', function () {
  it('should inject specified scripts', function (done) {
    this.timeout(0);

    var url = 'http://www.bing.com'

    var r = runner()
    .js(jquery)
    .js(filename)
    .on('result', (data, url) => {
      expect(data).to.equal(require('jquery/package.json').version + '\n')
      expect(url).to.equal(url)
      done()
    })
    .on('error', (err) => {
      expect('open failed').to.equal('true')
    })

    r.open(url)
  })
})
