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
import { defineConfig } from 'cypress'

// TODO figure out why this isn't working:
// import webpackConfig from '@instructure/ui-webpack-config'
// eslint-disable-next-line @instructure/no-relative-imports
import webpackConfig from './packages/ui-karma-config/lib/legacyBaseWebpackConfig'

export default defineConfig({
  numTestsKeptInMemory: 1,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  responseTimeout: 60000,
  requestTimeout: 60000,
  execTimeout: 120000,
  taskTimeout: 60000,
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 10,
      passesRequired: 1
    },
    openMode: true,
    runMode: true
  },
  screenshotOnRunFailure: false,
  component: {
    excludeSpecPattern: 'regression-test/**',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    }
  }
})
