/* eslint no-var: 0 */
'use strict'

var disableCoverage = process.argv.some((arg) => arg === '--disable-coverage')
var noLaunchers = process.argv.some((arg) => arg === '--no-launch')

// set browsers based on command line args
var browsers = []
if (!noLaunchers) { browsers.push('chrome_without_security') }
if (!disableCoverage && !noLaunchers) { browsers.push('Firefox') }

// set coverage reporter based on command line args
var coverageReporter
if (!disableCoverage) { // we don't compute coverage in debug mode
  coverageReporter = {
    reporters: [
      { type: 'text-summary' },
      { type: 'html', dir: 'coverage' }
    ],
    check: {
      global: {
        statements: 91,
        lines: 82,
        functions: 89,
        branches: 73
      }
    }
  }
}

// set reporters based on command line args
var reporters = ['mocha']
if (!disableCoverage) {
  reporters.push('coverage')
}

module.exports = function config (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai-sinon'],

    files: [
      './tests/tests.bundle.js'
    ],

    preprocessors: {
      './tests/tests.bundle.js': ['webpack', 'sourcemap']
    },

    reporters: reporters,

    coverageReporter: coverageReporter,

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: browsers,

    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: [
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate'
        ]
      }
    },

    captureTimeout: 60000,

    singleRun: false,

    webpack: require('./webpack/test.config')(disableCoverage),

    webpackServer: {
      progress: false,
      stats:  {
        hash: false,            // the hash of the compilation
        version: false,         // webpack version info
        timings: true,          // timing info
        assets: true,           // assets info
        chunks: false,          // chunk info
        colors: true,           // with console colors
        chunkModules: false,    // built modules info to chunk info
        modules: false,         // built modules info
        cached: false,          // also info about cached (not built) modules
        reasons: false,         // info about the reasons modules are included
        source: false,          // the source code of modules
        errorDetails: true,     // details to errors (like resolving log)
        chunkOrigins: false,    // the origins of chunks and chunk merging info
        modulesSort: '',        // (string) sort the modules by that field
        chunksSort: '',         // (string) sort the chunks by that field
        assetsSort: ''          // (string) sort the assets by that field
      },
      debug: true,
      noInfo: true,
      quiet: false
    }
  })
}
