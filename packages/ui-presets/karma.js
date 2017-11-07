const webpack = require('webpack')
const constants = require('karma').constants

const noLaunchers = process.argv.some((arg) => arg === '--no-launch')

const debug = Boolean(process.env.DEBUG)
const withCoverage = Boolean(process.env.COVERAGE)

module.exports = function makeConfig ({ bundle, coverageDirectory, coverageThreshold }) {
  const browsers = []
  if (!noLaunchers) { browsers.push('chrome_without_security') }
  if (!debug) { browsers.push('Firefox') }

  const reporters = ['mocha']

  if (withCoverage) {
    reporters.push('coverage')
  }

  const coverageReporter = withCoverage ? {
    reporters: [
      { type: 'text-summary' },
      {
        type: 'lcov',
        dir: coverageDirectory,
        subdir: function (browser) {
          // normalization process to keep a consistent browser name
          return browser.toLowerCase().split(/[ /-]/)[0]
        }
      }
    ],
    check: coverageThreshold
  } : undefined

  return function config (config) {
    config.set({
      basePath: '',

      frameworks: ['mocha', 'chai-sinon'],

      files: [ bundle ],

      preprocessors: {
        [bundle]: ['webpack', 'sourcemap']
      },

      reporters: reporters,

      coverageReporter,

      client: {
        mocha: {
          reporter: 'html',
          ui: 'bdd'
        },
        chai: {
          includeStack: true
        }
      },

      port: 9876,

      colors: true,

      logLevel: constants.LOG_ERROR,

      autoWatch: true,

      browsers: browsers,

      reportSlowerThan: 500,

      concurrency: 2,

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

      singleRun: !debug,

      webpack: {
        cache: debug,
        bail: !debug,
        externals: {
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
          'react/addons': true
        },
        plugins: require('./webpack/plugins').concat([
          new webpack.ProvidePlugin({
            Testbed: require.resolve('@instructure/ui-testbed')
          })
        ]),
        resolveLoader: require('./webpack/resolveLoader'),
        module: {
          rules: require('./webpack/module/rules')
        },
        devtool: 'cheap-module-eval-source-map',
        performance: {
          hints: false
        }
      },

      webpackMiddleware: { stats: 'errors-only' },

      mochaReporter: {
        showDiff: true
      }
    })
  }
}
