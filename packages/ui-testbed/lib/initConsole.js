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

module.exports = function () {
  // clear the console before rebundling.
  /* eslint-disable no-console */
  if (typeof console.clear === 'function') {
    console.clear()
  }
  /* eslint-enable no-console */

  // this is a hack so that we can test for prop type validation errors in our tests
  const consoleError = console.error

  console.error = function (firstMessage, ...rest) {
    if (typeof firstMessage === 'string' && firstMessage.startsWith('Warning:')) {
      throw new Error(`Unexpected React Warning: ${firstMessage}`)
    }

    return consoleError(firstMessage, ...rest)
  }

  process.once('unhandledRejection', (error) => {
    console.error(`Unhandled rejection: ${error.stack}`)
    process.exit(1)
  })
}
