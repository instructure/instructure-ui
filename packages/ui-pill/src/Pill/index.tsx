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
import { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { Tooltip } from '@instructure/ui-tooltip'
import { TruncateText } from '@instructure/ui-truncate-text'
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  as?: React.ReactElement
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'alert'
  elementRef?: (...args: any[]) => any
  margin?: Spacing
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Pill extends Component<Props> {
  static componentId = 'Pill'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'alert'
    ]),
    elementRef: PropTypes.func,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    children: undefined,
    margin: undefined,
    elementRef: undefined,
    color: 'primary'
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      truncated: false
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'truncated' implicitly has an 'any' type... Remove this comment to see the full error message
  handleTruncation(truncated) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'truncated' does not exist on type 'Reado... Remove this comment to see the full error message
    if (truncated !== this.state.truncated) {
      this.setState({
        truncated: truncated
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'focused' implicitly has an 'any' type.
  renderPill(focused, getTriggerProps) {
    const {
      margin,
      children,
      color,
      as,
      elementRef,
      styles,
      makeStyles,
      ...props
    } = this.props

    const filteredProps = passthroughProps(props)

    const containerProps =
      typeof getTriggerProps === 'function'
        ? getTriggerProps(filteredProps)
        : filteredProps

    return (
      <View
        {...containerProps}
        as={as}
        elementRef={elementRef}
        margin={margin}
        padding="0"
        maxWidth={styles.maxWidth}
        background="transparent"
        borderRadius="pill"
        borderWidth="0"
        display="inline-block"
        position="relative"
        withFocusOutline={focused}
        focusColor="info"
      >
        <span css={styles.pill}>
          <span css={styles.text}>
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

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'truncated' does not exist on type 'Reado... Remove this comment to see the full error message
    if (this.state.truncated) {
      return (
        <Tooltip renderTip={this.props.children}>
          {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'focused' implicitly has an 'any' ... Remove this comment to see the full error message */}
          {({ focused, getTriggerProps }) => {
            return this.renderPill(focused, getTriggerProps)
          }}
        </Tooltip>
      )
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      return this.renderPill()
    }
  }
}

export default Pill
export { Pill }
