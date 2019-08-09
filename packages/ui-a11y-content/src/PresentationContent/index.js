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

import { passthroughProps, getElementType, experimental } from '@instructure/ui-react-utils'

/**
---
category: components/utilities
experimental: true
---
@module PresentationContent
**/
@experimental()
class PresentationContent extends Component {
  static propTypes = {
    /**
    * the element type to render as
    */
    as: PropTypes.elementType,
    children: PropTypes.node
  }

  static defaultProps = {
    as: 'span',
    children: null
  }

  render () {
    const { children, ...props } = this.props
    const ElementType = getElementType(PresentationContent, this.props)

    return (
      <ElementType {...passthroughProps(props)} aria-hidden='true'>
        {children}
      </ElementType>
    )
  }
}

export default PresentationContent
export { PresentationContent }
