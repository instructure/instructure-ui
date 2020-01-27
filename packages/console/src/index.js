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
const React = require('react')

let loggedInitialDeprecationWarning = false

/* eslint-disable no-console */

function getRenderStack () {
  let renderStack = ''
  try {
    renderStack = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame
      .getStackAddendum()
  } catch (error) {
    // log happened outside a react render or couldn't figure out where in the render stack we are.
  }
  return renderStack
}

function logMessage (level, withRenderStack, condition, message, ...args) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    if (typeof console[level] === 'function') {
      const renderStack = withRenderStack ? getRenderStack() : ''
      console[level](`Warning: ${message}`, ...args, renderStack)
    } else {
      throw new Error(`'${level}' is not a valid console method!`)
    }
  }
}

function logDeprecated (condition, message, ...args) {
  if (!process.env.OMIT_INSTUI_DEPRECATION_WARNINGS) {
    logMessage('warn', true, condition, message, ...args)
  } else if (!condition && !loggedInitialDeprecationWarning) {
    loggedInitialDeprecationWarning = true
    logMessage('warn', false, condition, [
      'There are Instructure UI deprecation warnings that are being hidden because the `OMIT_INSTUI_DEPRECATION_WARNINGS` environment variable is set. Remove or unset this variable to see the full list of warnings in your console.',
      'These warnings will give you advance notice of breaking changes and upgrade guidance to keep your code up to date with the latest Instructure UI versions.'
    ].join('\n\n'))
  }
}

exports.error = (...args) => logMessage('error', true, ...args)
exports.warn = (...args) => logMessage('warn', true, ...args)
exports.warnDeprecated = (...args) => logDeprecated(...args)
exports.info = (...args) => console.info(...args)
exports.assert = (...args) => console.assert(...args)
exports.debug = (...args) => console.debug(...args)
exports.log = (...args) => console.log(...args)


/* eslint-enable no-console */
