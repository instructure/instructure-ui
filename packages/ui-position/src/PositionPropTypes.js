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

const PositionPropTypes = {
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

export default PositionPropTypes
export {
  /**
 * ---
 * category: utilities/position
 * ---
 * Custom prop types for `ui-position` components.
 * @module PositionPropTypes
 */
  PositionPropTypes
}
