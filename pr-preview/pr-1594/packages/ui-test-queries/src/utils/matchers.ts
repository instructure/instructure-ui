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
import { label, title } from './helpers'
import { normalizeText } from './normalizeText'
import { getNodeText } from './getNodeText'

interface MatchOptions {
  exact?: boolean
  trim?: boolean
  collapseWhitespace?: boolean
}

function matches(
  textToMatch: string | unknown,
  matcherString: string | RegExp,
  options: MatchOptions = {
    exact: true,
    trim: true,
    collapseWhitespace: true
  }
) {
  const { exact, collapseWhitespace, trim } = options
  const matcher = exact ? exactMatches : fuzzyMatches
  return matcher(textToMatch, matcherString, { collapseWhitespace, trim })
}

function fuzzyMatches(
  textToMatch: string | unknown,
  matcher: string | RegExp,
  { collapseWhitespace = true, trim = true } = {}
) {
  if (typeof textToMatch !== 'string') {
    return false
  }

  const normalizedText = normalizeText(textToMatch, {
    trim,
    collapseWhitespace
  })

  if (typeof matcher === 'string') {
    return normalizedText.toLowerCase().includes(matcher.toLowerCase())
  } else {
    return matcher.test(normalizedText)
  }
}

function exactMatches(
  textToMatch: string | unknown,
  matcher: string | RegExp,
  { collapseWhitespace = true, trim = true } = {}
) {
  if (typeof textToMatch !== 'string') {
    return false
  }
  const normalizedText = normalizeText(textToMatch, {
    trim,
    collapseWhitespace
  })
  if (typeof matcher === 'string') {
    return normalizedText === matcher
  } else {
    return matcher.test(normalizedText)
  }
}

function matchElementByTitle(
  element: Element,
  titleText: string | RegExp,
  options: MatchOptions
) {
  return matches(title(element), titleText, options)
}

function matchElementByLabel(
  element: Element,
  labelText: string | RegExp,
  options: MatchOptions
) {
  return matches(label(element), labelText, options)
}

function matchElementByText(
  element: Element,
  text: string | RegExp,
  options: MatchOptions
) {
  return matches(getNodeText(element), text, options)
}

function matchElementByAttributeValue(
  element: Element,
  name: string,
  value: string | RegExp,
  options: MatchOptions
) {
  return matches(element.getAttribute(name), value, options)
}

export {
  matches,
  matchElementByTitle,
  matchElementByLabel,
  matchElementByAttributeValue,
  matchElementByText
}
