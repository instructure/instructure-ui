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
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import TruncateText from '../TruncateText'

import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/ThemeablePropTypes'
import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import testable from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class Pill extends Component {
  static propTypes = {
    text: PropTypes.node.isRequired,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    variant: PropTypes.oneOf(['default', 'success', 'danger', 'primary', 'warning', 'message']),
    elementRef: PropTypes.func,
    as: PropTypes.elementType // eslint-disable-line react/require-default-props
  }

  static defaultProps = {
    margin: undefined,
    elementRef: undefined,
    variant: 'default'
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
      text,
      variant,
      as,
      elementRef
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Pill.propTypes),
      Pill
    )
    const props = typeof getTriggerProps === 'function'
      ? getTriggerProps(passthroughProps) : passthroughProps

    const classes = classnames({
      [styles.root]: true,
      [styles.truncated]: this.state.truncated,
      [styles.focused]: focused,
      [styles[variant]]: variant
    })

    return (
      <View
        {...props}
        className={classes}
        as={as}
        elementRef={elementRef}
        margin={margin}
        display="inline-flex"
      >
        <span className={styles.text}>
          <TruncateText
            onUpdate={(truncated) => {
              this.handleTruncation(truncated)
            }}
          >
            {text}
          </TruncateText>
        </span>
      </View>
    )
  }

  render () {
    if (this.state.truncated) {
      return (
        <Tooltip tip={this.props.text}>
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
