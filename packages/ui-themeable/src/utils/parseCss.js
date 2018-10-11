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


/**
* ---
* category: utilities/themes
* ---
* Parses a CSS string into an AST object
* @module parseCss
* @param {String} cssText CSS string to parse
* @returns {Object} AST for the CSS string
*/
export default function parse (cssText = '') {
  const cleaned = clean(cssText)
  return parseLexed(lex(cleaned), cleaned)
}

/**
* CSSRule types (https://developer.mozilla.org/en-US/docs/Web/API/CSSRule)
*/
export const ruleTypes = {
  style: 1,
  keyframes: 7,
  media: 4
}

/**
* Removes comments and import statements from a CSS string
* (to prep for parsing and applying transforms)
* @param {String} cssText CSS string to parse
* @returns {String} cleaned CSS string
*/
export function clean (text = '') {
  // remove comments and imports
  return text
    .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, '')
    .replace(/@import[^;]*;/gim, '')
}

function lex (text) {
  const rootNode = {
    start: 0,
    end: text.length
  }
  let node = rootNode
  const chars = text.split('')

  chars.forEach((char, i) => {
    switch (char) {
      case '{': {
        if (!node.rules) {
          node.rules = []
        }
        const parent = node
        const previous = parent.rules[parent.rules.length - 1]
        node = {
          start: i + 1,
          parent,
          previous
        }
        parent.rules.push(node)
        break
      }
      case '}': {
        node.end = i + 1
        node = node.parent || rootNode
        break
      }
      default: {
        break
      }
    }
  })
  return rootNode
}

function parseSelector (node, text) {
  const start = node.previous ? node.previous.end : node.parent.start
  const end = node.start - 1

  let selector = text.substring(start, end)

  selector = selector.replace(/\s+/g, ' ')
  selector = selector.substring(selector.lastIndexOf(';') + 1)

  return selector.trim()
}

function parseRuleType (selector) {
  if (selector.indexOf('@') === 0) {
    if (selector.indexOf('@media') === 0) {
      return ruleTypes.media
    } else if (selector.match(/^@[^\s]*keyframes/)) {
      return ruleTypes.keyframes
    }
  } else {
    return ruleTypes.style
  }
}

function parseLexed (node, text = '') {
  /* eslint-disable no-param-reassign */

  if (node.parent) {
    node.selector = parseSelector(node, text)
    node.type = parseRuleType(node.selector)
  }

  node.cssText = text.substring(node.start, node.end - 1).trim()

  if (node.rules && node.rules.length > 0) {
    node.rules = node.rules.map(rule => parseLexed(rule, text))
  }

  /* eslint-enable no-param-reassign */

  return node
}
