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

const webpack = require('webpack')
const constants = require('karma').constants

const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision
const Downloader = require('puppeteer/utils/ChromiumDownloader')

const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision)

const noLaunchers = process.argv.some((arg) => arg === '--no-launch')

const debug = Boolean(process.env.DEBUG)
const withCoverage = Boolean(process.env.COVERAGE)

if (!debug) {
  process.env.CHROME_BIN = revisionInfo.executablePath
}

module.exports = function makeConfig ({ bundle, coverageDirectory, coverageThreshold }) {
  const browsers = []

  if (!noLaunchers) {
    if (debug) {
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
        CustomChrome: {
          base: 'Chrome',
          flags: [
            '--no-default-browser-check',
            '--no-first-run',
            '--disable-default-apps',
            '--disable-popup-blocking',
            '--disable-translate',
            '--no-sandbox'
          ]
        },
        CustomChromeHeadless: {
          base: 'ChromeHeadless',
          flags: [
            '--disable-gpu',
            '--hide-scrollbar',
            '--remote-debugging-port=9222',
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
        resolveLoader: require('./webpack/resolveLoader'),
        module: {
          rules: require('./webpack/module/rules')
        },
        plugins: require('./webpack/plugins')().concat([
          new webpack.ProvidePlugin({
            Testbed: require.resolve('@instructure/ui-testbed')
          })
        ]),
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
