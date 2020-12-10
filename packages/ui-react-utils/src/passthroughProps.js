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
import isPropValid from '@emotion/is-prop-valid'
// list of "valid" props https://github.com/emotion-js/emotion/blob/master/packages/is-prop-valid/src/props.js

const hasOwnProperty = Object.prototype.hasOwnProperty
const omit = (originalObject, keys) => {
  // code based on babel's _objectWithoutProperties
  const newObject = {}
  for (const key in originalObject) {
    // special case because we always want to omit these and === is faster than concat'ing them in
    if (
      key === 'theme' ||
      key === 'children' ||
      key === 'className' ||
      key === 'style'
    )
      continue

    if (keys.includes(key) || !hasOwnProperty.call(originalObject, key))
      continue
    newObject[key] = originalObject[key]
  }
  return newObject
}

function omitProps(props, propTypes, exclude) {
  const keys = Object.keys(propTypes || {})
  const combined = exclude ? keys.concat(exclude) : keys
  return omit(props, combined)
}

// this was the fastest implementation from testing: https://jsperf.com/pick-props
function pick(obj, keys) {
  const res = {}
  const len = keys.length
  let idx = -1
  let key

  while (++idx < len) {
    key = keys[idx]
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}

function pickProps(props, propTypes, include) {
  const keys = Object.keys(propTypes || {})
  const combined = include ? keys.concat(include) : keys
  return pick(props, combined)
}

function passthroughProps(props) {
  const validProps = {}

  Object.keys(props)
    // style and className need to be explicitly passed through
    .filter(
      (propName) =>
        isPropValid(propName) &&
        propName !== 'style' &&
        propName !== 'className' &&
        propName !== 'children'
    )
    .forEach((propName) => {
      validProps[propName] = props[propName]
    })

  return validProps
}

export { pickProps, omitProps, passthroughProps }
