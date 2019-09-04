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

import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { deprecated, omitProps } from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Focusable
---
**/
@deprecated('7.0.0', null, 'Use @instructure/ui-layout/View instead')
@themeable(theme, styles)
class FocusableView extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
    * boolean value indicating focus. When true, the focus ring is visible
    */
    focused: PropTypes.bool,
    /**
    * Shape of the focus ring
    */
    shape: PropTypes.oneOf(["circular", "rectangular"]),
    /**
    * Color of the focus ring
    */
    color: PropTypes.oneOf(['primary', 'error', 'inverse']),
    /**
    * provides a reference to the underlying element
    */
    elementRef: PropTypes.func,
    /**
    * the element type to render as (will be `<a>` if href is provided)
    */
    as: PropTypes.elementType,
    /**
    * If `href` is provided, the `<FocusableView />` will render as a link
    */
    href: PropTypes.string,
    /**
    * By default the display prop is 'auto', meaning it takes on the
    * display rules of the html element it's rendered as (see `as` prop).
    */
    display: PropTypes.oneOf(['auto', 'block', 'inline-block', 'flex', 'inline-flex']),
    /**
    * Set the margin using familiar CSS shorthand
    */
    margin: ThemeablePropTypes.spacing,
    /**
     * Specify a mouse cursor to use when hovering over the `<View />`
     */
    cursor: PropTypes.string,
    /**
     * Optionally set a width for the FocusableView (either a string or number)
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    onClick: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    children: null,
    href: undefined,
    width: undefined,
    margin: undefined,
    onClick: undefined,
    focused: false,
    shape: 'rectangular',
    color: 'primary',
    display: 'inline-block',
    as: 'button',
    elementRef: function (element) {},
    cursor: 'auto',
    role: null,
    tabIndex: null
  }

  get focusColor () {
    const color = this.props.color

    if (color === 'error') {
      return 'danger'
    } else if (color === 'inverse') {
      return 'inverse'
    } else {
      return 'info'
    }
  }

  render () {
    const {
      as,
      children,
      cursor,
      display,
      elementRef,
      focused,
      href,
      margin,
      onClick,
      role,
      shape,
      className, // eslint-disable-line react/prop-types
      to,  // eslint-disable-line react/prop-types
      width,
      tabIndex,
      ...props
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(props, FocusableView.propTypes),
      FocusableView
    )

    return (
      <View
        {...passthroughProps}
        display={display}
        as={as}
        cursor={cursor}
        isFocused={focused}
        position="relative"
        focusColor={this.focusColor}
        href={href}
        to={to}
        margin={margin}
        width={width}
        elementRef={elementRef}
        className={classnames({
          [styles.root]: true,
          [className]: className
        })}
        role={role || onClick ? role : null}
        tabIndex={onClick && !role ? (tabIndex || '0') : tabIndex}
        onClick={onClick}
        borderRadius={shape === 'circular' ? 'circle' : 'medium'}
        __dangerouslyIgnoreExperimentalWarnings
      >
        {children}
      </View>
    )
  }
}

export default FocusableView
export { FocusableView }
