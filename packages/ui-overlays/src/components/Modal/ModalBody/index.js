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

import View from '@instructure/ui-layout/lib/components/View'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Modal
---
**/
@testable()
@themeable(theme, styles)
export default class ModalBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    padding: ThemeablePropTypes.spacing,
    elementRef: PropTypes.func,
    as: CustomPropTypes.elementType,
    variant: PropTypes.oneOf(['default', 'inverse'])
  }

  static defaultProps = {
    padding: 'medium',
    as: 'div',
    variant: 'default'
  }

  render () {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, ModalBody.propTypes),
      ModalBody
    )
    const classes = classnames ({
      [styles.root]: true,
      [styles[this.props.variant]]: this.props.variant,
    })
    return (
      <View
        {...passthroughProps}
        display="block"
        elementRef={this.props.elementRef}
        as={this.props.as}
        className={classes}
        padding={this.props.padding}
        tabIndex="-1" // prevent FF from focusing view when scrollable
      >
        <div className={styles.content}>
          {this.props.children}
        </div>
      </View>
    )
  }
}
