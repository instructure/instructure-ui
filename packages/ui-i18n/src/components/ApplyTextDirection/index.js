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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import getTextDirection from '../../utils/getTextDirection'

import {
  TextDirectionContextTypes,
  makeTextDirectionContext,
  getTextDirectionContext,
  DIRECTION
} from '../../TextDirectionContextTypes'

/**
---
category: components/utilities
---
**/
export default class ApplyTextDirection extends Component {
  static propTypes = {
    /**
    * string 'ltr' or 'rtl' representing the document direction
    */
    dir: PropTypes.oneOf(Object.values(DIRECTION)),
    /**
    * a single child (children must be wrapped in a single component/element) or function
    * returning a child called with the following arguments:
    * @param {string} dir - the string value 'rtl' or 'ltr'
    * @param {Boolean} rtl - boolean value true if the direction is 'rtl'
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    as: PropTypes.elementType
  }

  static defaultProps = {
    as: 'span'
  }

  static childContextTypes = TextDirectionContextTypes

  static contextTypes = TextDirectionContextTypes

  _defaultDirection = getTextDirection()

  getChildContext () {
    return makeTextDirectionContext(this.dir)
  }

  get dir () {
    const context = getTextDirectionContext(this.context) || {}

    return this.props.dir ||
      context.dir ||
      this._defaultDirection
  }

  render () {
    const ElementType = getElementType(ApplyTextDirection, this.props)
    const { children } = this.props

    return (
      <ElementType dir={this.dir}>
        { typeof children === 'function'
          ? children(this.dir, this.dir === DIRECTION.rtl)
          : children
        }
      </ElementType>
    )
  }
}

export { DIRECTION } from '../../TextDirectionContextTypes'
