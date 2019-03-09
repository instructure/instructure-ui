/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const path = require('path')
const constants = require('karma').constants
const choma = require.resolve('choma')

const noLaunchers = process.argv.some((arg) => arg === '--no-launch')
const noHeadless = process.argv.some((arg) => arg === '--no-headless')
const randomizeTestOrder = process.argv.some((arg) => arg === '--randomize')

const baseWebpackConfig = require('@instructure/ui-webpack-config')

const DEBUG = Boolean(process.env.DEBUG)
const withCoverage = Boolean(process.env.COVERAGE)

const CHROME_FLAGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--use-mock-keychain',
  '--no-default-browser-check',
  '--no-first-run',
  '--disable-default-apps',
  '--disable-popup-blocking',
  '--disable-translate',
  '--disable-extensions',
  '--use-fake-ui-for-media-stream',
  '--use-fake-device-for-media-stream',
  '--allow-file-access-from-files'
]

module.exports = function makeConfig ({
  bundle,
  coverageDirectory,
  coverageThreshold
}) {
  const browsers = []

  if (!noLaunchers) {
    if (noHeadless) {
      browsers.push('CustomChrome')
    } else {
      browsers.push('CustomChromeHeadless')
    }
  }

  const reporters = ['mocha']

  if (withCoverage) {
    reporters.push('coverage')
  }

  let coverageReporter

  if (withCoverage) {
    coverageReporter = {
        reporters: [
        { type: 'text-summary' },
        {
          type: 'lcov',
          dir: coverageDirectory,
          subdir: '.'
        }
      ],
      check: coverageThreshold
    }
  }

  return function config (config) {
    config.set({
      basePath: '',

      // The default has some problems inside a monorepo, but specifying this manually
      // seems to pull in all karma plugins across disparate node_modules/ dirs
      plugins: ['karma-*'],

      frameworks: ['mocha', 'viewport'],

      files: randomizeTestOrder ? [choma, bundle] : [bundle],

      preprocessors: {
        [choma]: ['webpack'],
        [bundle]: ['webpack', 'sourcemap']
      },

      reporters,

      coverageReporter,

      client: {
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
        CustomChrome: {
          base: 'Chrome',
          flags: CHROME_FLAGS
        },
        CustomChromeHeadless: {
          base: 'Chrome',
          flags: CHROME_FLAGS.concat([
            '-incognito',
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222'
          ])
        }
      },

      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 30000,

      // to avoid DISCONNECTED messages:
      browserDisconnectTimeout: 10000, // default 2000
      browserDisconnectTolerance: 2, // default 0
      browserNoActivityTimeout: 30000, // default 10000

      singleRun: !DEBUG,

      webpack: {
        ...baseWebpackConfig,
        mode: DEBUG ? 'development' : 'production',
        externals: {
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
          'react/addons': true,
          // The karma webpack plugin exposes a mocha instance as
          // `window.mocha`, but the mocha npm package exports the mocha
          // contructor function. The choma script needs access to the mocha
          // constructor so it can monkey-patch it for random test ordering.
          'mocha': 'mocha.constructor'
        },
        resolveLoader: {
          alias: {
            ...baseWebpackConfig.resolveLoader.alias,
            'ui-tests-loader': path.join(__dirname, './loaders/ui-tests-loader')
          }
        }
      },

      webpackMiddleware: { stats: 'errors-only' },

      // TODO: pull breakpoints from theme
      viewport: {
        breakpoints: [
          {
            name: 'small',
            size: {
              width: 320,
              height: 480
            }
          },
          {
            name: 'medium',
            size: {
              width: 768,
              height: 1024
            }
          },
          {
            name: 'large',
            size: {
              width: 1440,
              height: 900
            }
          }
        ]
      },

      mochaReporter: {
        showDiff: true
      }
    })
  }
}
