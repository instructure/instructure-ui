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

import PropTypes from 'prop-types'

import { element } from '@instructure/ui-prop-types'

import jsonToMediaQuery from './jsonToMediaQuery'

/**
 * ---
 * category: utilities/layout
 * ---
 * Custom prop types for `ui-layout` components.
 * @module LayoutPropTypes
 */
export default {
  /**
   * Verify that the given prop is a properly formatted query object
   * with exactly one key and one corresponding valid value of type
   * string or number. The object key should be one of `minWidth`,
   * `maxWidth`, `minHeight`, or `maxHeight`. Note that key values
   * should be camel cased.
   *
   *
   * The following are examples of valid query objects:
   *
   * ```js
   * { minWidth: 350 }
   * { maxHeight: '400px' }
   * { maxWidth: '20rem' }
   * ```
   *
   * The following are examples of invalid query objects:
   *
   * ```js
   * { minwidth: 300 } // should be minWidth (case sensitive)
   * { minHeight: 200, maxHeight: 300 } // should consist of exactly one key
   * ```
   * @param {Object} props - object containing the component props
   * @param {string} propName - name of the given prop
   * @param {string} componentName - name of the component
   * @returns {Error} if prop is an invalid query
   */
  validQuery (props, propName, componentName) {
    try {
      jsonToMediaQuery(props[propName])
    } catch (e) {
      return new Error(
        `Invalid query prop supplied to \`${componentName}\`. ${e.message}`
      )
    }
  },
  /**
   * The placement of the content in relation to the trigger
   */
  placement: PropTypes.oneOf([
    'top',
    'end',
    'bottom',
    'start',
    'top start',
    'start top',
    'start center',
    'start bottom',
    'bottom start',
    'bottom center',
    'bottom end',
    'end bottom',
    'end center',
    'end top',
    'top end',
    'top center',
    'center end',
    'center start',
    'top stretch',
    'bottom stretch',
    'end stretch',
    'start stretch',
    'offscreen'
  ]),
  /**
   * An element or a function returning an element to use as the mount node
   */
  mountNode: PropTypes.oneOfType([
    element,
    PropTypes.func
  ]),
  /**
   * The parent in which to constrain a placement
   */
  constrain: PropTypes.oneOfType([
    element,
    PropTypes.func,
    PropTypes.oneOf(['window', 'scroll-parent', 'parent', 'none'])
  ])
}
