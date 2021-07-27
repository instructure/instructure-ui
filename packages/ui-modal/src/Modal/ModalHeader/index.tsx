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

import {
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  variant?: 'default' | 'inverse'
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
parent: Modal
id: Modal.Header
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ModalHeader extends Component<Props> {
  static readonly componentId = 'Modal.Header'

  static propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'inverse']),

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    children: null,
    variant: 'default'
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStyleProps())
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStyleProps())
  }

  makeStyleProps = () => {
    return {
      withCloseButton: this.usesCloseButton
    }
  }

  get usesCloseButton() {
    // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
    React.Children.forEach(this.props.children, (child) => {
      if (child && matchComponentTypes(child, [CloseButton])) {
        return true
      }
    })
    return false
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <div css={this.props.styles.modalHeader} {...passthroughProps(rest)}>
        {children}
      </div>
    )
  }
}

export default ModalHeader
export { ModalHeader }
