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

import Sizzle from 'sizzle'

import { parseQueryArguments } from './parseQueryArguments'
import { firstOrNull } from './firstOrNull'

import { elementToString } from './elementToString'

import {
  tabbable,
  focusable,
  clickable,
  visible,
  getOwnerDocument
} from './helpers'

import {
  matchElementByTitle,
  matchElementByLabel,
  matchElementByText
} from './matchers'

Sizzle.selectors.cacheLength = 1

function querySelectorAll (...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  let results = []

  if (selector) {
    results = findAll(selector, element, options)
  } else {
    throwQueryError(element, selector)
  }

  return results
}

function querySelector (...args) {
  return firstOrNull(querySelectorAll(...args))
}

function querySelectorParents (element, selector, options) {
  let results = []
  if (matchesSelector(element, selector)) {
    results.push(element)
  }
  let parentNode = element.parentNode

  while (
    parentNode &&
    parentNode !== document
  ) {
    if (matchesSelector(parentNode, selector, options)) {
      results.push(parentNode)
    }
    parentNode = parentNode.parentNode
  }

  return results
}

function querySelectorParent (element, selector, options) {
  if (matchesSelector(element, selector)) {
    return element
  } else {
    let parentNode = element.parentNode

    while (
      parentNode &&
      parentNode !== document &&
      !matchesSelector(parentNode, selector, options)
    ) {
      parentNode = parentNode.parentNode
    }

    return matchesSelector(parentNode, selector, options) ? parentNode : null
  }
}

function querySelectorAllWithin (containerSelector, element, selector, options) {
  // find all of the container root nodes that match the selector...
  const containers = querySelectorAll(element, containerSelector)

  if (selector) {
    // if there is a selector, query within each container for matches inside...
    return containers.reduce((previouResults, element) => {
      let results = querySelectorAll(element, selector, options)
      results = results
        .map((result) => {
          const root = querySelectorParent(result, containerSelector)
          // ignore matches that are in a nested container...
          // we always return the root so that customMethods work...
          return (root !== element) ? null : root
        })
        .filter(result => result !== null)
      return [ ...previouResults, ...results]
    }, [])
  } else {
    // otherwise just return the container root nodes
    return containers
  }
}

function matchesSelector (...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  if (element && selector) {
    return matches(element, selector, options)
  } else {
    throwQueryError(element, selector)
  }
}

function throwQueryError (element, selector) {
  throw new Error(
    [
      `[ui-test-utils] Invalid query arguments:`,
      `element: ${elementToString(element, 7000, { highlight: false })}`,
      `selector: ${JSON.stringify(selector)}`
    ]
    .filter(Boolean).join('\n')
  )
}

function findAll (selector, element, options) {
  addPseudos(options)

  let results = []

  if (element && matches(element, selector, options)) {
    results.push(element)
  }

  Sizzle(selector, element, results)

  if (options.ignore) {
    results = results.filter(result => !matchesSelector(result, options.ignore))
  }

  if (options.visible) {
    results = results.filter(result => matchesSelector(result, ':visible'))
  }

  results = results.filter(result => matchesSelector(result, ':exists'))

  return results
}

function matches (element, selector, options) {
  addPseudos(options)

  return Sizzle.matchesSelector(element, selector)
}

function addPseudos (
  options = {
    exact: true,
    trim: true,
    collapseWhitespace: true
  }
) {
  const { createPseudo } = Sizzle.selectors

  // :label(text)
  Sizzle.selectors.pseudos.label = createPseudo((text) => {
    return (element) => {
      return matchElementByLabel(element, text, options)
    }
  })

  // :textContent(text)
  Sizzle.selectors.pseudos.textContent = createPseudo((text) => {
    return (element) => {
      return matchElementByText(element, text, options)
    }
  })

  // :title(text)
  Sizzle.selectors.pseudos.title = createPseudo((text) => {
    return (element) => {
      return matchElementByTitle(element, text, options)
    }
  })

  // :clickable
  Sizzle.selectors.pseudos.clickable = (element) => {
    return clickable(element)
  }

  // :focusable
  Sizzle.selectors.pseudos.focusable = (element) => {
    return focusable(element)
  }

  // :tabbable
  Sizzle.selectors.pseudos.tabbable = (element) => {
    return tabbable(element)
  }

  // :exists
  Sizzle.selectors.pseudos.exists = (element) => {
    const doc = getOwnerDocument(element)
    return (doc && doc.body.contains(element))
  }

  // :visible
  Sizzle.selectors.pseudos.visible = (element) => {
    return visible(element)
  }
}

export {
  matchesSelector,
  querySelector,
  querySelectorAll,
  querySelectorParent,
  querySelectorParents,
  querySelectorAllWithin
}
