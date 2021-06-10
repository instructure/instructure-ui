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

import { IconXSolid } from '@instructure/ui-icons'
import { View } from '@instructure/ui-view'
import { omitProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'
import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  className?: string
  text: string | React.ReactNode
  title?: string
  disabled?: boolean
  readOnly?: boolean
  dismissible?: boolean
  margin?: keyof typeof ThemeablePropValues.SPACING
  onClick?: (...args: any[]) => any
  elementRef?: (...args: any[]) => any
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'inline'
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Tag extends Component<Props> {
  static componentId = 'Tag'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    title: PropTypes.string,
    /**
     * Whether or not to disable the tag
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    dismissible: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * If you add an onClick prop, Tag renders as a clickable button
     */
    onClick: PropTypes.func,
    /**
     * Provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'inline'])
  }

  static defaultProps = {
    size: 'medium',
    dismissible: false,
    variant: 'default',
    elementRef: undefined,
    className: undefined,
    title: undefined,
    disabled: false,
    readOnly: false,
    margin: undefined,
    onClick: undefined
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

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    return isActiveElement(this._container)
  }

  focus = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    this._container && this._container.focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    this._container = node
  }

  render() {
    const {
      className,
      dismissible,
      disabled,
      readOnly,
      text,
      title,
      onClick,
      margin,
      styles
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Tag.propTypes),
      Tag
    )

    return (
      <View
        {...passthroughProps}
        ref={this.handleRef}
        elementRef={this.props.elementRef}
        css={styles.tag}
        className={className}
        as={onClick ? 'button' : 'span'}
        margin={margin}
        type={onClick ? 'button' : null}
        onClick={onClick ? this.handleClick : null}
        disabled={disabled || readOnly}
        display={null}
        title={title || (typeof text === 'string' ? text : null)}
      >
        <span css={styles.text}>{text}</span>
        {onClick && dismissible ? <IconXSolid css={styles.icon} /> : null}
      </View>
    )
  }
}

export default Tag
export { Tag }
