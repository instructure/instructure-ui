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

import { locator } from '@instructure/ui-test-locator'

import {
  accessible,
  parseQueryArguments,
  findWithLabel,
  findWithText,
  findWithTitle,
  findByQuery,
  findAllByQuery,
  matchesSelector,
  querySelectorAll,
  querySelector,
  firstOrNull,
  wrapQueryResult,
  find,
  findAll,
  findAllFrames,
  findFrame,
  debug
} from '@instructure/ui-test-queries'

import {
  mount,
  unmount,
  stub,
  spy,
  viewport
} from '@instructure/ui-test-sandbox'

import './utils/shims'

import { waitForExpect } from './utils/waitForExpect'
import { expect } from './utils/expect'

import { generateA11yTests } from './utils/generateA11yTests'

// these are defined in assertions.ts
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Chai {
    interface Assertion {
      // @ts-expect-error This is intentionally overridden in Assertions.ts
      readonly contain: Assertion
      exactly(expected: number): Assertion
      text(expected: string): void
      className(expected: string): void
      descendants(expected: string): void
      children(expected: string): void
      ancestors(expected: string): void
      parents(expected: string): void
      attribute(
        expectedAttribute: string,
        expectedAttributeValue?: string
      ): void
      style(expected: string, expectedAttributeValue?: string | number): void
      bounds(expected: string, expectedAttributeValue?: string | number): void
      tagName(expected: string): void
      id(expected: string): void
      visible(): void
      clickable(): void
      focus(): void
      focused(): void
      focusable(): void
      tabbable(): void
      checked(): void
      selected(): void
      disabled(): void
      enabled(): void
      readonly(): void
      accessible(): void
      role(expected: string): void
      title(expected: string): void
      value(expected: string): void
      label(expected: string): void
      children(expected: string): void
      children(expected: string): void
    }
  }
}

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
  findWithTitle,
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
  unmount,
  stub,
  spy,
  find,
  findAll,
  findAllFrames,
  findFrame,
  debug
}
