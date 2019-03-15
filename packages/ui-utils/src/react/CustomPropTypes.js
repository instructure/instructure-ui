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

import { elementType } from 'prop-types'

import {
  Children,
  childrenOrValue,
  controllable,
  cursor,
  element,
  xor
} from '@instructure/ui-prop-types'

import { changedPackageWarning, warnDeprecatedComponent } from './deprecated'
/**
 * ---
 * category: utilities/react
 * ---
 * __DEPRECATED 5.45.0__ CustomPropTypes have now been moved to a new package. See
 * the documentation for [ui-prop-types](#ui-prop-types) for more details.
 *
 * Custom prop types for React components.
 * @module CustomPropTypes
 */
 class CustomPropTypes {
   get Children () {
     warnDeprecatedComponent('v5.45.0', 'Children', changedPackageWarning(
       'ui-utils',
       'ui-prop-types'
     ))
     return Children
  }

  childrenOrValue (...args) {
    warnDeprecatedComponent('v5.45.0', 'childrenOrValue', changedPackageWarning(
      'ui-utils',
      'ui-prop-types'
    ))
    return childrenOrValue(...args)
  }

  controllable (...args) {
    warnDeprecatedComponent('v5.45.0', 'controllable', changedPackageWarning(
      'ui-utils',
      'ui-prop-types'
    ))
    return controllable(...args)
  }

  cursor (...args) {
    warnDeprecatedComponent('v5.45.0', 'cursor', changedPackageWarning(
      'ui-utils',
      'ui-prop-types'
    ))
    return cursor(...args)
  }

  element (...args) {
    warnDeprecatedComponent('v5.45.0', 'element', changedPackageWarning(
      'ui-utils',
      'ui-prop-types'
    ))
    return element(...args)
  }

  elementType (...args) {
    warnDeprecatedComponent('v5.45.0', 'elementType', 'Use `PropTypes.elementType` https://github.com/facebook/prop-types')
    return elementType(...args)
  }

  xor (...args) {
    warnDeprecatedComponent('v5.45.0', 'xor', changedPackageWarning(
      'ui-utils',
      'ui-prop-types'
    ))
    return xor(...args)
  }
}

export default new CustomPropTypes()
