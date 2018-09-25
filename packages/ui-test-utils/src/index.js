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
import { wait } from 'dom-testing-library/dist/wait'

import Sandbox from './utils/sandbox'
import { bindElementToUtilities as within } from './utils/bindElementToUtilities'

import { expect } from './utils/expect'
import testable from './utils/testable'
import fixture from './utils/fixture'
import { find, findAll, findAllFrames, findFrame } from './utils/queries'
import { debug } from './utils/helpers'
import { firstOrNull } from './utils/firstOrNull'

const mount = (element, context) => Sandbox.mount(element, context)
const stub = (obj, method, fn) => Sandbox.stub(obj, method, fn)
const spy = (obj, method) => Sandbox.spy(obj, method)

export {
  fixture,
  firstOrNull,
  within,
  wait,
  expect,
  testable,
  mount,
  stub,
  spy,
  find,
  findAll,
  findAllFrames,
  findFrame,
  debug
}
