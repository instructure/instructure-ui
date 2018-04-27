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

import themeable from '@instructure/ui-themeable'
import getShorthandPropValue from '@instructure/ui-themeable/lib/utils/getShorthandPropValue'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'

import warning from '@instructure/ui-utils/lib/warning'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import getDisplayName from '@instructure/ui-utils/lib/react/getDisplayName'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
**/
@deprecated('5.4.0', {
  size: 'maxWidth'
})
@themeable(theme, styles)
class View extends Component {
  static propTypes = {
    /**
    * The element to render as the component root, `span` by default
    */
    as: CustomPropTypes.elementType,

    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,

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
    * Set the padding using familiar CSS shorthand
    */
    padding: ThemeablePropTypes.spacing,

    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
    * The children to render inside the `<View />`
    */
    children: PropTypes.node,

    /**
    * Designates the text alignment within the `<View />`
    */
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),

    /**
    * Accepts the familiar CSS shorthand to designate border widths corresponding
    * to edges
    */
    borderWidth: ThemeablePropTypes.borderWidth,

    /**
    * Accepts the familiar CSS shorthand to designate border radii corresponding
    * to corners
    */
    borderRadius: ThemeablePropTypes.borderWidth,

    /**
    * Designates the background style of the `<View />`
    */
    background: PropTypes.oneOf(['default', 'inverse', 'transparent']),

    /**
    * Controls the shadow depth for the `<View />`
    */
    shadow: ThemeablePropTypes.shadow,

    /**
    * Activate a dotted outline around the component to make building your
    * layout easier
    */
    debug: PropTypes.bool
  }

  static defaultProps = {
    elementRef: el => {},
    display: 'auto',
    children: null,
    background: 'transparent',
    debug: false,
    // `as` will default to type span via getElementType, so for consistency and
    // compatibility with Container we are leaving it undefined here. Otherwise
    // it modifies behavior for consuming components because of the logic around
    // default props in getElementType
    as: undefined,
    // textAlign is undefined by default so that View can inherit text alignment
    // from parents
    textAlign: undefined,
    // The following props should be undefined because default values are passed in
    // as inline styles which break the styling of the consuming components
    margin: undefined,
    padding: undefined,
    height: undefined,
    width: undefined,
    maxHeight: undefined,
    maxWidth: undefined,
    minHeight: undefined,
    minWidth: undefined,
    borderWidth: undefined,
    borderRadius: undefined,
    shadow: undefined
  }

  constructor (props) {
    super(props)
    this.verifySpanMargin(props)
    this._element = null
  }

  componentWillReceiveProps (nextProps) {
    this.verifySpanMargin(nextProps)
  }

  verifySpanMargin (props) {
    const { as, display, margin } = props

    warning(
      !(as === 'span' && display === 'auto' && margin && margin !== 'none' && margin !== '0'),
      `[${this.displayName}] element of type 'span' and display 'auto' is inline ` +
      `and will allow for horizontal margins only`
    )
  }

  get displayName () {
    return getDisplayName(View)
  }

  get hasBorder () {
    const { borderWidth } = this.props
    return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
  }

  get borderStyle () {
    const { borderRadius, borderWidth } = this.props

    // TODO: Restore once we get a fixed direction for RTL support
    // if (dir === 'rtl') {
    //   borderRadius = convertRtlShorthandCorners(borderRadius)
    //   borderWidth = convertRtlShorthandEdges(borderWidth)
    // }

    return {
      borderRadius: getShorthandPropValue(this.displayName, this.theme, borderRadius, 'borderRadius'),
      borderWidth: getShorthandPropValue(this.displayName, this.theme, borderWidth, 'borderWidth')
    }
  }

  get spacingStyle () {
    const { margin, padding } = this.props

    // TODO: Restore once we get a fixed direction for RTL support
    // if (dir === 'rtl') {
    //   margin = convertRtlShorthandEdges(margin)
    //   padding = convertRtlShorthandEdges(padding)
    // }

    return {
      margin: getShorthandPropValue(this.displayName, this.theme, margin, 'margin'),
      padding: getShorthandPropValue(this.displayName, this.theme, padding, 'padding')
    }
  }

  get shadowStyle () {
    return {
      boxShadow: getShorthandPropValue(this.displayName, this.theme, this.props.shadow, 'shadow')
    }
  }

  get positionStyle () {
    // For Position
    const { style } = this.props // eslint-disable-line react/prop-types

    return {
      position: style && style.position,
      left: style && style.left,
      top: style && style.top,
      transform: style && style.transform
    }
  }

  get flexStyle () {
    // For FlexItem
    const { style } = this.props // eslint-disable-line react/prop-types

    return {
      flexBasis: style && style.flexBasis
    }
  }

  handleElementRef = (el) => {
    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(el)
    }
    this._element = el
  }

  render () {
    const {
      children,
      textAlign,
      background,
      display,
      debug,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      size, // eslint-disable-line react/prop-types
      className // eslint-disable-line react/prop-types
    } = this.props

    const ElementType = getElementType(View, this.props)

    return (
      <ElementType
        {...omitProps(this.props, View.propTypes)}
        className={classnames({
          [styles.root]: true,
          [styles.border]: this.hasBorder,
          [styles.debug]: debug,
          [styles[`textAlign--${textAlign}`]]: textAlign,
          [styles[`background--${background}`]]: background,
          [styles[`display--${display}`]]: display && display !== 'auto',
          [styles[`size--${size}`]]: size && size !== 'auto',
          [className]: className
        })}
        style={{
          ...this.flexStyle,
          ...this.positionStyle,
          ...this.spacingStyle,
          ...this.borderStyle,
          ...this.shadowStyle,
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight
        }}
        ref={this.handleElementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default View
