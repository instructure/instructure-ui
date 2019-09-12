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

import { View } from '@instructure/ui-view'
import { Tooltip } from '@instructure/ui-tooltip'
import { TruncateText } from '@instructure/ui-elements'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps, experimental } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
experimental: true
---
**/
@testable()
@experimental()
@themeable(theme, styles)
class Pill extends Component {
  static propTypes = {
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['primary', 'info', 'success', 'danger', 'warning', 'alert']),
    elementRef: PropTypes.func,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
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
      color,
      as,
      elementRef,
      ...props
    } = this.props

    const filteredProps = passthroughProps(props)

    const containerProps = typeof getTriggerProps === 'function'
      ? getTriggerProps(filteredProps) : filteredProps

    const classes = classnames({
      [styles.root]: true,
      [styles.truncated]: this.state.truncated,
      [styles[color]]: color
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
        isFocused={focused}
        focusColor="info"
        __dangerouslyIgnoreExperimentalWarnings
      >
        <span className={classes}>
          <span className={styles.text}>
            <TruncateText
              onUpdate={(truncated) => {
                this.handleTruncation(truncated)
              }}
            >
              {children}
            </TruncateText>
          </span>
        </span>
      </View>
    )
  }

  render () {
    if (this.state.truncated) {
      return (
        <Tooltip
          renderTip={this.props.children}
          __dangerouslyIgnoreExperimentalWarnings
        >
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
