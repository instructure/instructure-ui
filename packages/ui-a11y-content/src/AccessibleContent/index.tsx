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

import { PresentationContent } from '../PresentationContent'
import { ScreenReaderContent } from '../ScreenReaderContent'
/**
 ---
 category: components/utilities
 ---
 @module AccessibleContent
 */
type Props = {
  alt?: string
  as?: React.ReactElement
}
class AccessibleContent extends Component<Props> {
  static propTypes = {
    alt: PropTypes.string,
    /**
     * the element type to render the screen reader content as
     */
    as: PropTypes.elementType,
    children: PropTypes.node
  }

  static defaultProps = {
    alt: undefined,
    as: 'span',
    children: null
  }

  render() {
    const { alt, children, ...props } = this.props
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const ElementType = getElementType(AccessibleContent, this.props)

    return (
      // @ts-expect-error ts-migrate(2559) FIXME: Type '{ children: Element[]; }' has no properties ... Remove this comment to see the full error message
      <ElementType {...passthroughProps(props)}>
        <ScreenReaderContent>{alt}</ScreenReaderContent>
        <PresentationContent>{children}</PresentationContent>
      </ElementType>
    )
  }
}

export default AccessibleContent
export { AccessibleContent }
