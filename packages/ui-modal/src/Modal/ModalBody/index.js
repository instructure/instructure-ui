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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import { omitProps } from '@instructure/ui-react-utils'

/**
---
parent: Modal
id: Modal.Body
---
**/
@withStyle(generateStyle)
@testable()
class ModalBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    padding: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func,
    as: PropTypes.elementType,
    variant: PropTypes.oneOf(['default', 'inverse']),
    overflow: PropTypes.oneOf(['scroll', 'fit']),

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default',
    children: null,
    elementRef: undefined,
    overflow: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const {
      as,
      elementRef,
      overflow,
      variant,
      padding,
      children,
      ...rest
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(rest, ModalBody.propTypes),
      ModalBody
    )
    const isFit = overflow === 'fit'

    return (
      <View
        {...passthroughProps}
        display="block"
        width={isFit ? '100%' : null}
        height={isFit ? '100%' : null}
        elementRef={elementRef}
        as={as}
        css={this.props.styles.modalBody}
        padding={padding}
        tabIndex="-1" // prevent FF from focusing view when scrollable
      >
        {children}
      </View>
    )
  }
}

export default ModalBody
export { ModalBody }
