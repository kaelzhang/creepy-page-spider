'use strict'

// Create phantomjs runner

var webpage = require('webpage')
var system = require('system')
var args = system.args


// Tools
function fail (message) {
  console.log(JSON.stringify({
    success: false,
    message: message
  }))
}


function log (message) {
  if (Object(log) !== log) {
    return
  }

  console.log(JSON.stringify({
    success: true,
    message: message
  }))
}


function include_js (page, urls) {
  return urls.every(function (url) {
    return page.injectJs(url)
  })
}


// runner.js {url}

if (!args.length) {
  return fail('invalid argument')
}


var url = args[0]

// Only allow local_js,
// all remote javascript files will be downloaded and cached into a temp folder
var local_js = ${local_js}

var page = webpage.create()

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open(url, function (status) {
  if (status !== 'success') {
    return fail('failes to open')
  }


})
