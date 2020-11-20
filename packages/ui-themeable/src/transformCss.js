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

import { parseCss, ruleTypes } from './parseCss'

function transformCss(cssText, transform) {
  let node = parseCss(cssText)

  if (typeof transform === 'function') {
    node = transformNode(node, transform)
  }

  return toCssText(node)
}

function isKeyframesSelector(rule) {
  return rule.parent && rule.parent.type === ruleTypes.keyframes
}

function toRules(cssText) {
  const node = parseCss(cssText)
  let rules = []

  if (node.rules && node.rules.length > 0) {
    rules = node.rules.map((rule) => toCssText(rule))
  } else {
    const cssText = toCssText(node)
    if (cssText) {
      rules = [cssText]
    }
  }

  return rules
}

function transformNode(node, transform) {
  if (!node) {
    return
  }

  if (node.type === ruleTypes.style) {
    return transform(node)
  }

  const rules = node.rules || []
  const transformed = { ...node }

  transformed.rules = rules.map((rule) => transformNode(rule, transform))

  return transformed
}

function toCssText(node, text) {
  let cssText = ''
  let result = text || ''

  if (node.rules && node.rules.length > 0) {
    cssText = node.rules.map((rule) => toCssText(rule, cssText)).join('\n')
  } else {
    cssText = node.cssText.trim()

    if (cssText) {
      cssText = `  ${cssText}\n`
    }
  }

  if (cssText) {
    const prefix = node.selector ? `${node.selector} {\n` : ''
    const suffix = node.selector ? '}\n' : ''
    result += `${prefix}${cssText}${suffix}`
  }

  return result
}

export default transformCss
export { transformCss, toRules, isKeyframesSelector }
