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

const constants = require('karma').constants

const noLaunchers = process.argv.some((arg) => arg === '--no-launch')
const noHeadless = process.argv.some((arg) => arg === '--no-headless')

const debug = Boolean(process.env.DEBUG)
const withCoverage = Boolean(process.env.COVERAGE)

const CHROME_FLAGS = [
  '--test-type',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--use-mock-keychain',
  '--no-default-browser-check',
  '--no-first-run',
  '--disable-default-apps',
  '--disable-popup-blocking',
  '--disable-translate',
  '--disable-extensions',
  '--disable-web-security',
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
          subdir: 'chrome'
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

      files: [bundle],

      preprocessors: {
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

      singleRun: !debug,

      webpack: {
        cache: debug,
        bail: !debug,
        externals: {
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
          'react/addons': true
        },
        resolveLoader: require('./webpack/resolveLoader'),
        module: {
          rules: require('./webpack/module/rules')
        },
        plugins: require('./webpack/plugins')(),
        devtool: 'cheap-module-eval-source-map',
        performance: {
          hints: false
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
