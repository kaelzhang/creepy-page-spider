'use strict'

const phantomjs = require('phantomjs-prebuilt').path
const spawn = require('cross-spawn')
const tmp = require('tmp')
const async = require('async')
const node_path = require('path')

const fs = require('fs')

const {
  EventEmitter
} = require('events')


STR_RUNNER_JS = 'runner.js'


function runner (options) {
  return new Runner(options)
}


class Runner extends EventEmitter {
  constructor (options) {
    super()
    this._js = []
  }

  js (filename) {
    this._js.push(filename)
    return this
  }

  include_jquery () {
    return this.include_js()
  }

  open (url) {
    this._create_tmp_js((err) => {
      if (err) {
        return this.emit('error', err)
      }

      this._run_phantomjs(url, (err, output) => {
        if (err) {
          return this.emit('error', err)
        }

        this.emit('result', output, url)
      })
    })
  }

  _run_phantomjs (url, callback) {
    let s = spawn(phantomjs.path, [url, this._runner_filename])

    let output = ''

    s.stdout.on('data', (data) => {
      output += data
    })

    s.on('close', (code) => {
      if (code) {
        return callback(new Error('phantomjs exit with code ' + code))
      }

      callback(null, output)
    })
  }

  _create_tmp_js (callback) {
    if (this._tmp_created) {
      return callback(null)
    }

    let template

    try {
      template = require('./runner')
    } catch (e) {
      return callback(e)
    }

    let dir
    let content

    async.parallel([
      (done) => {
        this._read_template((err, c) => {
          content = c
          done(err)
        })
      },

      (done) => {
        this._create_tmp_dir((err, d) => {
          dir = d
          done(err)
        })
      }

    ], (err) => {
      if (err) {
        return callback(err)
      }

      this._runner_filename = filename = node_path.join(dir, STR_RUNNER_JS)
      fs.writeFile(filename, content, (err) => {
        if (err) {
          return callback(err)
        }

        this._tmp_created = true
        callback(null)
      })
    })
  }

  _read_template (callback) {
    fs.readFile(template, (err, content) => {
      if (err) {
        return callback(err)
      }

      let local_js = JSON.stringify(this._js)
      let file_content = eval('`' + content.toString() + '`')

      callback(null, file_content)
    })
  }

  _create_tmp_dir (callback) {
    tmp.dir(callback)
  }
}
