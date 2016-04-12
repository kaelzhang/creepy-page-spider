'use strict'

// Create phantomjs runner

phantom.onError = function(msg, trace) {
  fail(trace)
  phantom.exit()
}

var system = require('system')
var args = system.args


// phantomjs runner.js {url}
if (!args.length) {
  fail('invalid argument')
}

var url = args[0]

var webpage = require('webpage')

// Tools
function fail (message) {
  console.log(JSON.stringify({
    success: false,
    message: message
  }))

  phantom.exit()
}


function include_js (page, urls) {
  // If no external urls, mark it as ok
  if (!urls.length) {
    return true
  }

  return urls.every(function (url) {
    return page.injectJs(url)
  })
}


// Only allow local_js,
// all remote javascript files will be downloaded and cached into a temp folder
var local_js = ${local_js}

var page = webpage.create()

var CONSOLE_LOG_PREFIX = 'creepy-phantomjs-runner:'
var REGEX_TRAILING_CR = /\n*$/


page.onConsoleMessage = function(msg) {
  if (!msg || !~msg.indexOf(CONSOLE_LOG_PREFIX)) {
    return
  }

  msg = msg
  .substr(CONSOLE_LOG_PREFIX.length)
  // .replace(REGEX_TRAILING_CR, '')

  console.log(msg)
}

page.open(url, function (status) {
  if (status !== 'success') {
    return fail('failes to open')
  }

  if (!include_js(page, local_js)) {
    return fail('failes to open')
  }

  phantom.exit()
})
