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
import './utils/shims'

import { mount, stub, spy, viewport } from './utils/sandbox'
import { waitForExpect } from './utils/waitForExpect'
import { wrapQueryResult } from './utils/queryResult'
import { expect } from './utils/expect'
import { locator } from './utils/locator'
import { debug, accessible } from './utils/helpers'
import { firstOrNull } from './utils/firstOrNull'
import { querySelectorAll, querySelector, matchesSelector } from './utils/selectors'
import { parseQueryArguments } from './utils/parseQueryArguments'
import { generateA11yTests } from './utils/generateA11yTests'
import {
  findWithText,
  findWithLabel,
  findAllByQuery,
  findByQuery,
  find,
  findAll,
  findAllFrames,
  findFrame
} from './utils/queries'

// aliases for backwards compat:
const within = wrapQueryResult
const wrap = wrapQueryResult
const wait = waitForExpect

export {
  generateA11yTests,
  viewport,
  accessible,
  parseQueryArguments,
  findWithLabel,
  findWithText,
  findByQuery,
  findAllByQuery,
  matchesSelector,
  querySelectorAll,
  querySelector,
  locator,
  firstOrNull,
  within,
  wrapQueryResult,
  wrap,
  waitForExpect,
  wait,
  expect,
  mount,
  stub,
  spy,
  find,
  findAll,
  findAllFrames,
  findFrame,
  debug
}
