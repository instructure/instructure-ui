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

import isEmpty from '@instructure/ui-utils/lib/isEmpty'

import scopeStylesToNode from './scopeStylesToNode'
import formatVariableNames from './formatVariableNames'
import pickOverrides from './pickOverrides'
import customPropertiesSupported from './customPropertiesSupported'
import { getCssTextWithPolyfill } from './getCssText'

/**
 * ---
 * category: utilities/themes
 * ---
 * Apply theme variables to a DOM node (as CSS variables, with polyfill)
 * @module applyVariablesToNode
 * @param {Element} domNode HTML element to apply variables to using the style attribute
 * @param {Object} variables JS variables
 * @param {Object} defaults Default JS variables
 * @param {String} prefix A variable prefix/namespace
 * @param {Function} template (for IE) A template function that returns the CSS as a string with variables injected
 * @param {String} scope (for IE) A scope to apply to the styles applied to domNode
 */
export default function applyVariablesToNode () {
  if (customPropertiesSupported()) {
    applyVariablesToNodeStyle.apply(this, arguments)
  } else {
    applyVariablesPolyfillToNode.apply(this, arguments)
  }
}

export function applyVariablesPolyfillToNode (domNode, variables, defaults, prefix, template, scope) {
  if (!domNode || isEmpty(variables)) {
    return
  }

  const overrides = pickOverrides(defaults, variables)
  let cssText = ''

  if (overrides && Object.keys(overrides).length > 0) {
    cssText = getCssTextWithPolyfill(template, {...defaults, ...variables})
  }

  scopeStylesToNode(domNode, cssText, scope)
}

export function applyVariablesToNodeStyle (domNode, variables, defaults, prefix) {
  if (!domNode || isEmpty(variables)) {
    return
  }

  clearCustomProperties(domNode, prefix)

  const overrides = pickOverrides(defaults, variables)

  if (overrides && !isEmpty(overrides)) {
    setCustomProperties(domNode, formatVariableNames(overrides, prefix))
  }
}

function clearCustomProperties (domNode, prefix) {
  const styles = domNode.style
  for (let i = styles.length - 1; i >= 0; i--) {
    const prop = styles[i]
    if (prop.indexOf(`--${prefix}-`) >= 0) {
      domNode.style.removeProperty(prop)
    }
  }
}

function setCustomProperties (domNode, properties) {
  Object.keys(properties).forEach((propertyName) => {
    const value = properties[propertyName]

    if (value) {
      domNode.style.setProperty(propertyName, value)
    }
  })
}
