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

import { passthroughProps, getElementType } from '@instructure/ui-react-utils'

/**
---
category: components/utilities
---
@module PresentationContent
**/

type Props = {
  as?: React.ReactElement
}

class PresentationContent extends Component<Props> {
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

  render() {
    const { children, ...props } = this.props
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: ReactNode; "aria-hidden": string... Remove this comment to see the full error message
    const ElementType = getElementType(PresentationContent, this.props)

    return (
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: ReactNode; "aria-hidden": string... Remove this comment to see the full error message
      <ElementType {...passthroughProps(props)} aria-hidden="true">
        {children}
      </ElementType>
    )
  }
}

export default PresentationContent
export { PresentationContent }
