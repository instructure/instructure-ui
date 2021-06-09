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
import React from 'react'

let loggedInitialDeprecationWarning = false

/* eslint-disable no-console */

function getRenderStack() {
  let renderStack = ''
  try {
    // this is so bad to use, that its not even typed :)
    renderStack = (
      React as any
    ).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getStackAddendum()
  } catch (error) {
    // log happened outside a react render or couldn't figure out where in the render stack we are.
  }
  return renderStack
}

/**
 * Logs a message to the console if not in Production and the condition param is false.
 * @param level The message level
 * @param withRenderStack Whether to log the React render stack
 * @param condition if true this method is skipped
 * @param message the message to log
 * @param args any extra arguments to be passed to the console.
 */
function logMessage(
  level: keyof Console,
  withRenderStack: boolean,
  condition: boolean,
  message: string,
  ...args: unknown[]
) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    if (typeof console[level] === 'function') {
      const renderStack = withRenderStack ? getRenderStack() : ''
      console[level](`Warning: ${message}`, ...args, renderStack)
    } else {
      throw new Error(`'${level}' is not a valid console method!`)
    }
  }
}

function logDeprecated(
  condition: boolean,
  message: string,
  ...args: unknown[]
) {
  if (!process.env.OMIT_INSTUI_DEPRECATION_WARNINGS) {
    logMessage('warn', true, condition, message, ...args)
  } else if (!condition && !loggedInitialDeprecationWarning) {
    loggedInitialDeprecationWarning = true
    logMessage(
      'warn',
      false,
      condition,
      [
        'There are Instructure UI deprecation warnings that are being hidden because the `OMIT_INSTUI_DEPRECATION_WARNINGS` environment variable is set. Remove or unset this variable to see the full list of warnings in your console.',
        'These warnings will give you advance notice of breaking changes and upgrade guidance to keep your code up to date with the latest Instructure UI versions.'
      ].join('\n\n')
    )
  }
}

export const error = (
  condition: boolean,
  message: string,
  ...args: unknown[]
) => logMessage('error', true, condition, message, ...args)
export const warn = (condition: boolean, message: string, ...args: unknown[]) =>
  logMessage('warn', true, condition, message, ...args)
export const warnDeprecated = (
  condition: boolean,
  message: string,
  ...args: unknown[]
) => logDeprecated(condition, message, ...args)
export const info = (...args: unknown[]) => console.info(...args)
export const assert = (condition?: boolean | undefined, ...data: any[]) =>
  console.assert(condition, data)
export const debug = (message?: any, ...optionalParams: any[]) =>
  console.debug(message, optionalParams)
export const log = (message?: any, ...optionalParams: any[]) =>
  console.log(message, optionalParams)

/* eslint-enable no-console */
