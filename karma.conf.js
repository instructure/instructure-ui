/* eslint no-var: 0 */

var fs = require('fs')
var path = require('path')
var REGEX_TEST = /\-test\.js$/

function findTests (dir) {
  var tests = []
  fs.readdirSync(dir).forEach(function (file) {
    var resolvedFile = path.resolve(dir, file)
    var stat = fs.statSync(resolvedFile)
    if (stat && stat.isDirectory()) {
      tests = tests.concat(findTests(resolvedFile))
    } else if (REGEX_TEST.test(resolvedFile)) {
      tests.push(resolvedFile)
    }
  })
  return tests
}

module.exports = function (config) {
  var tests = findTests(path.resolve(process.cwd(), 'lib'))
  var conf = {
    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: tests,

    preprocessors: {},

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['chrome_without_security', 'Firefox'],

    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: [
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',

          // This is necessary in order to get useful error messages that
          // happen outside of the test suites (e.g, script load errors).
          //
          // Without this flag, we get the dreaded "Script Error." message with
          // no explanation, and that is due to the cross-origin policies (since
          // karma loads our tests files using socket.io from another "origin").
          //
          // Additional reading:
          //
          //   - https://github.com/karma-runner/karma/issues/543
          //   - http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox
          //   - https://bugs.webkit.org/show_bug.cgi?id=70574
          //   - https://groups.google.com/forum/#!topic/angular/VeqlVgUa6Wo
          //
          '--disable-web-security',
          '--no-sandbox'
        ]
      }
    },

    captureTimeout: 60000,

    singleRun: true,

    webpack: require('./webpack.config.js/test'),

    webpackServer: {
      stats: {
        colors: true
      }
    }
  }

  tests.forEach(function (test) {
    conf.preprocessors[test] = ['webpack', 'sourcemap']
  })

  config.set(conf)
}
