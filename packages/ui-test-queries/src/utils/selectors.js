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

import { tabbable, focusable, clickable, visible, exists } from './helpers'

import {
  matchElementByTitle,
  matchElementByLabel,
  matchElementByText
} from './matchers'

Sizzle.selectors.cacheLength = 1

function querySelectorAll(...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  let results = []

  if (selector) {
    results = findAllMatches(element, selector, options)
  } else {
    throwQueryError(element, selector)
  }

  return results
}

function querySelector(...args) {
  return firstOrNull(querySelectorAll(...args))
}

function querySelectorParents(element, selector, options) {
  let results = []
  if (matchesSelector(element, selector)) {
    results.push(element)
  }
  let parentNode = element.parentNode

  while (parentNode && parentNode !== document) {
    if (matchesSelector(parentNode, selector, options)) {
      results.push(parentNode)
    }
    parentNode = parentNode.parentNode
  }

  return results
}

function querySelectorFrames(element, selector, options) {
  return querySelectorAll(element, 'iframe')
    .filter((frame) => matchesSelector(frame, selector, options))
    .map((frame) => {
      let doc = null
      try {
        doc = frame.contentDocument.documentElement
      } catch (e) {
        console.warn(
          `[ui-test-queries] could not find document element for iframe: ${e}`
        )
      }
      return doc
    })
    .filter((doc) => doc !== null)
}

function querySelectorAllWithin(containerSelector, element, selector, options) {
  // find all of the container root nodes...
  let containers = querySelectorAll(element, containerSelector, options)

  if (selector) {
    // if there is a selector, filter out containers that don't have a match inside...
    containers = containers.filter((container) => {
      const results = querySelectorAll(container, selector).filter(
        (result) =>
          firstOrNull(
            querySelectorParents(result, containerSelector, options)
          ) === container
      )
      return results.length > 0
    })
  }

  return containers
}

function matchesSelector(...args) {
  const { element, selector, options } = parseQueryArguments(...args)

  if (element && selector) {
    return matches(element, selector, options)
  } else {
    throwQueryError(element, selector)
  }
}

function throwQueryError(element, selector) {
  throw new Error(
    [
      `[ui-test-queries] Invalid query arguments:`,
      `element: ${elementToString(element, 7000, { highlight: false })}`,
      `selector: ${JSON.stringify(selector)}`
    ]
      .filter(Boolean)
      .join('\n')
  )
}

function findAllMatches(element, selector, options) {
  let results = []

  if (matchesSelector(element, selector, options)) {
    results.push(element)
  }

  addPseudos(options)
  Sizzle(selector, element, results)

  if (options.ignore) {
    results = results.filter(
      (result) => !matchesSelector(result, options.ignore)
    )
  }

  results = results.filter((result) => matchesSelector(result, ':exists'))

  return results
}

function matches(element, selector, options) {
  addPseudos(options)
  return element && Sizzle.matchesSelector(element, selector)
}

function addPseudos(
  options = {
    exact: true,
    trim: true,
    collapseWhitespace: true
  }
) {
  const { createPseudo } = Sizzle.selectors

  // :withLabel(text)
  Sizzle.selectors.pseudos.withLabel = createPseudo((text) => {
    return (element) => {
      return matchElementByLabel(element, text, options)
    }
  })
  Sizzle.selectors.pseudos.label = Sizzle.selectors.pseudos.withLabel

  // :withText(text)
  Sizzle.selectors.pseudos.withText = createPseudo((text) => {
    return (element) => {
      return matchElementByText(element, text, options)
    }
  })
  Sizzle.selectors.pseudos.textContent = Sizzle.selectors.pseudos.withText

  // :withTitle(text)
  Sizzle.selectors.pseudos.withTitle = createPseudo((text) => {
    return (element) => {
      return matchElementByTitle(element, text, options)
    }
  })
  Sizzle.selectors.pseudos.title = Sizzle.selectors.pseudos.withTitle

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
    return exists(element)
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
  querySelectorParents,
  querySelectorAllWithin,
  querySelectorFrames
}
