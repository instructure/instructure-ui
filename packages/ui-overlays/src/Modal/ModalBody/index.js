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

import { View } from '@instructure/ui-layout'
import { omitProps } from '@instructure/ui-react-utils'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { error } from '@instructure/console/macro'
import { Browser } from '@instructure/ui-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Modal
id: Modal.Body
---
**/
@testable()
@themeable(theme, styles)
class ModalBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    padding: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func,
    as: PropTypes.elementType,
    variant: PropTypes.oneOf(['default', 'inverse']),
    overflow: PropTypes.oneOf(['scroll', 'fit'])
  }

  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default',
    children: null,
    elementRef: undefined,
    overflow: undefined
  }

  render () {
    const {
      as,
      elementRef,
      overflow,
      variant,
      padding,
      children
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, ModalBody.propTypes),
      ModalBody
    )

    const classes = classnames ({
      [styles.root]: true,
      [styles.inverse]: variant === 'inverse'
    })

    const isFit = overflow === 'fit'

    error(
      !(Browser.msie && Browser.version > 10) || !isFit,
      `[Modal] overflow="fit" is only supported with fullscreen modals in Internet Explorer`
    )

    return (
      <View
        {...passthroughProps}
        display="block"
        width={isFit ? '100%' : null}
        height={isFit ? '100%' : null}
        elementRef={elementRef}
        as={as}
        className={classes}
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
