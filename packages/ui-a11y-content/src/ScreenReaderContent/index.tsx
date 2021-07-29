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

/** @jsx jsx */
import { Component, ReactNode } from 'react'
import PropTypes from 'prop-types'

import {
  passthroughProps,
  getElementType,
  AsElementType
} from '@instructure/ui-react-utils'
import { OtherHTMLAttributes } from '@instructure/ui-prop-types'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

type OwnProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  /**
   * the element type to render as
   */
  as: AsElementType
  /**
   * content meant for screen readers only
   */
  children: ReactNode
}

type Props = OwnProps & OtherHTMLAttributes<OwnProps>

/**
---
category: components/utilities
---
@module ScreenReaderContent
@tsProps
**/
@withStyle(generateStyle, null)
class ScreenReaderContent extends Component<Props> {
  static readonly componentId = 'ScreenReaderContent'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    as: PropTypes.elementType,
    children: PropTypes.node
  }

  static defaultProps = {
    as: 'span',
    children: null
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const { children, styles, ...props } = this.props
    const ElementType = getElementType(ScreenReaderContent, props)

    return (
      <ElementType
        {...passthroughProps(props)}
        css={styles.screenReaderContent}
      >
        {children}
      </ElementType>
    )
  }
}

export default ScreenReaderContent
export { ScreenReaderContent }
