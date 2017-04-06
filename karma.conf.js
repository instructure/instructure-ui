const withCoverage = process.argv.some((arg) => arg === '--coverage')
const noLaunchers = process.argv.some((arg) => arg === '--no-launch')
const debug = process.env.DEBUG

// set browsers based on command line args
const browsers = []
if (!noLaunchers) { browsers.push('chrome_without_security') }
if (!debug) { browsers.push('Firefox') }

// set coverage reporter based on command line args
let coverageReporter
if (withCoverage) {
  coverageReporter = {
    reporters: [
      { type: 'text-summary' },
      {
        type: 'html',
        dir: 'coverage',
        subdir: function (browser) {
          // normalization process to keep a consistent browser name
          return browser.toLowerCase().split(/[ /-]/)[0]
        }
      }
    ],
    check: {
      global: {
        lines: 92
      },
      each: {
        lines: 50
      }
    }
  }
}

// set reporters based on command line args
const reporters = ['mocha']
if (withCoverage) {
  reporters.push('coverage')
}

module.exports = function config (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai-sinon'],

    files: [ './tests/tests.bundle.js' ],

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
          '--disable-translate',
          '--no-sandbox'
        ]
      }
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // to avoid DISCONNECTED messages:
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 60000, // default 10000

    singleRun: false,

    webpack: require('./webpack/test.config')(debug),

    webpackMiddleware: { stats: 'errors-only' },

    mochaReporter: {
      showDiff: true
    }
  })
}
