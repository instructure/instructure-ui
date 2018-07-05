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

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

const SHAPE = {
  RECTANGULAR: 'rectangular',
  CIRCULAR: 'circular'
}

/**
---
parent: Focusable
---
**/
@themeable(theme, styles)
export default class FocusableView extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
    * boolean value indicating focus. When true, the focus ring is visible
    */
    focused: PropTypes.bool,
    /**
    * Shape of the focus ring
    */
    shape: PropTypes.oneOf(Object.values(SHAPE)),
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
    as: CustomPropTypes.elementType,
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
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    focused: false,
    shape: SHAPE.RECTANGULAR,
    color: 'primary',
    display: 'auto',
    as: 'button',
    elementRef: function (element) {},
  }

  static SHAPE = SHAPE

  render () {
    const {
      as,
      children,
      color,
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
      ...props
    } = this.props

    return (
      <View
        {...omitProps(props, { ...FocusableView.propTypes, ...View.propTypes })}
        display={display}
        as={as}
        href={href}
        to={to}
        margin={margin}
        elementRef={elementRef}
        className={classnames({
          [className]: className,
          [styles.root]: true,
          [styles[color]]: true,
          [styles[shape]]: true,
          [styles.focused]: focused
        })}
        role={role || onClick ? 'button' : null}
        tabIndex={onClick && !role ? '0' : null}
      >
        {children}
      </View>
    )
  }
}
