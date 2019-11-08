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

// TODO: once the text prop is removed in v8.0.0 update children prop to isRequired
// NOTE: when the variant prop is removed in v8.0.0 change 'default' color to 'primary'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { View } from '@instructure/ui-view'
import { Tooltip } from '@instructure/ui-tooltip'
import { TruncateText } from '@instructure/ui-elements'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps, deprecated } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@deprecated('8.0.0', {
  text: 'children',
  variant: 'color'
})
@themeable(theme, styles)
class Pill extends Component {
  static propTypes = {
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'success', 'danger', 'info', 'warning', 'alert']),
    elementRef: PropTypes.func,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /* eslint-disable react/require-default-props */
    /**
    * __Deprecated - use 'children'__
    */
    text: PropTypes.node,
    /**
    * __Deprecated - use 'color'__
    */
    variant: PropTypes.oneOf(['default', 'success', 'danger', 'primary', 'warning', 'message']),
    /* eslint-enable react/require-default-props */
  }

  static defaultProps = {
    children: undefined,
    margin: undefined,
    elementRef: undefined,
    color: 'primary'
  }

  constructor (props) {
    super(props)

    this.state = {
      truncated: false
    }
  }

  handleTruncation (truncated) {
    this.setState({
      truncated: truncated
    })
  }

  renderPill (focused, getTriggerProps) {
    const {
      margin,
      children,
      variant,
      color,
      as,
      elementRef,
      text,
      ...props
    } = this.props

    const filteredProps = passthroughProps(props)

    const containerProps = typeof getTriggerProps === 'function'
      ? getTriggerProps(filteredProps) : filteredProps

    let actualColor = variant
    if (!actualColor) {
      // usng new color props
      actualColor = color
    } else {
      // using old variant
      if (variant === 'primary') {
        actualColor = 'oldPrimary'
      }
    }

    const classes = classnames({
      [styles.root]: true,
      [styles.truncated]: this.state.truncated,
      [styles[actualColor]]: true
    })

    return (
      <View
        {...containerProps}
        as={as}
        elementRef={elementRef}
        margin={margin}
        padding="0"
        maxWidth={this.theme.maxWidth}
        background="transparent"
        borderRadius="pill"
        borderWidth="0"
        display="inline-block"
        position="relative"
        withFocusOutline={focused}
        focusColor="info"
      >
        <span className={classes}>
          <span className={styles.text}>
            <TruncateText
              onUpdate={(truncated) => {
                this.handleTruncation(truncated)
              }}
            >
              {children || text}
            </TruncateText>
          </span>
        </span>
      </View>
    )
  }

  render () {
    if (this.state.truncated) {
      return (
        <Tooltip renderTip={this.props.children || this.props.text}>
          {({ focused, getTriggerProps }) => {
            return (
              this.renderPill(focused, getTriggerProps)
            )
          }}
        </Tooltip>
      )
    } else {
      return this.renderPill()
    }
  }
}

export default Pill
export { Pill }
