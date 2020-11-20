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
import classnames from 'classnames'

import {
  matchComponentTypes,
  passthroughProps
} from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Modal
id: Modal.Header
---
**/
@testable()
@themeable(theme, styles)
class ModalHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'inverse'])
  }

  static defaultProps = {
    children: null,
    variant: 'default'
  }

  render() {
    const { children, variant, ...rest } = this.props
    let usesCloseButton = false

    React.Children.forEach(children, (child) => {
      if (child && matchComponentTypes(child, [CloseButton])) {
        usesCloseButton = true
      }
    })

    const classes = {
      [styles.root]: true,
      [styles.inverse]: variant === 'inverse',
      [styles.withCloseButton]: usesCloseButton === true
    }

    return (
      <div className={classnames(classes)} {...passthroughProps(rest)}>
        {children}
      </div>
    )
  }
}

export default ModalHeader
export { ModalHeader }
