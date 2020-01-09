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

import { firstOrNull } from './firstOrNull'
import { getQueryResult } from './queryResult'
import { parseQueryArguments } from './parseQueryArguments'
import {
  querySelectorAll,
  querySelectorFrames,
  querySelectorParents
} from './selectors'

async function findWithLabel(...args) {
  const { element, selector, options } = parseQueryArguments(...args)
  return find(element, `:withLabel("${selector}")`, options)
}

async function findWithText(...args) {
  const { element, selector, options } = parseQueryArguments(...args)
  return find(element, `:withText("${selector}")`, options)
}

async function findWithTitle(...args) {
  const { element, selector, options } = parseQueryArguments(...args)
  return find(element, `:withTitle("${selector}")`, options)
}

async function find(...args) {
  return firstOrNull(await findAll(...args))
}

function findAll(...args) {
  return findAllByQuery(querySelectorAll, ...args)
}

async function findParent(...args) {
  return firstOrNull(await findParents(...args))
}

function findParents(...args) {
  return findAllByQuery(querySelectorParents, ...args)
}

async function findFrame(...args) {
  return firstOrNull(await findAllFrames(...args))
}

function findAllFrames(...args) {
  return findAllByQuery(querySelectorFrames, ...args)
}

function findAllByQuery(queryFn, ...args) {
  return getQueryResult(queryFn, ...args)
}

async function findByQuery(...args) {
  return firstOrNull(await findAllByQuery(...args))
}

export {
  findWithLabel,
  findWithText,
  findWithTitle,
  findAllByQuery,
  findByQuery,
  findAll,
  find,
  findAllFrames,
  findFrame,
  findParent,
  findParents
}
