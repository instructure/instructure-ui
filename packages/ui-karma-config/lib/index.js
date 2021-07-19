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
const choma = require.resolve('choma')
const filePathCalculator = require('./FilePathCalculator')

const noLaunchers = process.argv.some((arg) => arg === '--no-launch')
const noHeadless = process.argv.some((arg) => arg === '--no-headless')
const randomizeTestOrder = process.argv.some((arg) => arg === '--randomize')

const baseWebpackConfig = require('@instructure/ui-webpack-config')

const NO_DEBUG = !!process.env.NO_DEBUG
const withCoverage = process.env.COVERAGE
const testPaths = process.env.UI_TEST_SCOPE_PATHS
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

module.exports = function makeConfig({ coverageDirectory, coverageThreshold }) {
  const browsers = []

  const filesToTest = filePathCalculator(testPaths)
  if (testPaths) {
    // eslint-disable-next-line no-console
    console.log('Testing files:', filesToTest)
  } else {
    // eslint-disable-next-line no-console
    console.log('Running every Karma test')
  }
  const preprocessors = {}
  for (const filePaths of filesToTest) {
    preprocessors[filePaths] = ['webpack', 'sourcemap']
  }

  // Use watched: false as we use webpack's watch, see
  // https://github.com/ryanclark/karma-webpack#usage
  const karmaFiles = filesToTest.map((filePath) => {
    return { pattern: filePath, watched: false }
  })
  if (!noLaunchers) {
    if (noHeadless) {
      browsers.push('CustomChrome')
    } else {
      browsers.push('CustomChromeHeadless')
    }
  }

  const reporters = ['mocha']

  if (withCoverage) {
    reporters.push('coverage-istanbul')
  }
  let coverageIstanbulReporter
  if (withCoverage) {
    coverageIstanbulReporter = {
      dir: coverageDirectory,
      reports: ['text-summary', 'lcov'],
      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: testPaths ? undefined : coverageThreshold
    }
  }
  return function config(config) {
    config.set({
      basePath: '',

      // The default has some problems inside a monorepo, but specifying this manually
      // seems to pull in all karma plugins across disparate node_modules/ dirs
      plugins: ['karma-*'],

      frameworks: ['mocha', 'viewport', 'webpack'],

      files: randomizeTestOrder ? [choma, ...karmaFiles] : karmaFiles,

      preprocessors: {
        [choma]: ['webpack'],
        ...preprocessors
      },

      reporters,
      coverageIstanbulReporter,
      browsers,

      client: {
        chai: {
          includeStack: true
        }
      },

      port: 9876,

      colors: true,

      logLevel: constants.LOG_ERROR,

      autoWatch: true,
      // when set to true, quit after running the tests
      singleRun: NO_DEBUG,

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

      webpack: {
        watch: !NO_DEBUG,
        module: {
          ...baseWebpackConfig.module,
          rules: [
            // This is only needed for TypeScript files, see
            // https://github.com/mattlewis92/karma-coverage-istanbul-reporter
            {
              test: /.*.tsx?$/,
              exclude: [/node_modules/, /\/lib\//, /\/es\//, /\/__tests__\//],
              loader: '@jsdevtools/coverage-istanbul-loader',
              enforce: 'post',
              options: {
                esModules: true,
                compact: false
              }
            },
            ...baseWebpackConfig.module.rules
          ]
        },
        mode: 'development',
        devtool: NO_DEBUG ? 'none' : 'inline-source-map',

        //TODO: this is probably a hack and webpack 5 will remove these features
        //investigate how to do this properly
        node: { fs: 'empty', module: 'empty' },
        resolve: {
          extensions: baseWebpackConfig.resolve.extensions
        },
        externals: {
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
          'react/addons': true,
          // The karma mocha plugin exposes a mocha instance as `window.mocha`,
          // but the mocha npm package exports the mocha constructor function.
          // The choma script needs access to the mocha constructor so it can
          // monkey-patch it for random test ordering.
          mocha: 'mocha.constructor'
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
