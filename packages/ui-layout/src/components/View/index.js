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
import { mirrorShorthandEdges, mirrorShorthandCorners } from '@instructure/ui-themeable/lib/utils/mirrorShorthand'
import bidirectional, { DIRECTION } from '@instructure/ui-i18n/lib/bidirectional'


import warning from '@instructure/ui-utils/lib/warning'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import getDisplayName from '@instructure/ui-utils/lib/react/getDisplayName'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
@module View
**/
class View extends Component {
  static propTypes = {
    /**
    * The element to render as the component root, `span` by default
    */
    as: CustomPropTypes.elementType,

    /**
    * provides a reference to the underlying html element
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
    * Controls the z-index depth for the `<View />`
    */
    stacking: ThemeablePropTypes.stacking,

    /**
     * Specify a mouse cursor to use when hovering over the `<View />`
     */
    cursor: CustomPropTypes.cursor,

    /**
    * Activate a dotted outline around the component to make building your
    * layout easier
    */
    debug: PropTypes.bool
  }

  static defaultProps = {
    display: 'auto'
    // Note:
    // - `as` will default to type span via getElementType, so for consistency and
    // compatibility with Container we are leaving it undefined here. Otherwise
    // it modifies behavior for consuming components because of the logic around
    // default props in getElementType
    // - `textAlign` is undefined by default so that View can inherit text alignment
    // from parents
    // - Any props used to set inline styles should be undefined so that they
    // don't break consuming components' CSS
  }

  get displayName () {
    return getDisplayName(View)
  }

  get hasBorder () {
    const { borderWidth } = this.props
    return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
  }

  get borderStyle () {
    let { borderRadius, borderWidth } = this.props

    if (this.dir === DIRECTION.rtl) {
      borderRadius = mirrorShorthandCorners(borderRadius)
      borderWidth = mirrorShorthandEdges(borderWidth)
    }

    return {
      borderRadius: getShorthandPropValue(this.displayName, this.theme, borderRadius, 'borderRadius'),
      borderWidth: getShorthandPropValue(this.displayName, this.theme, borderWidth, 'borderWidth')
    }
  }

  get spacingStyle () {
    let { margin, padding } = this.props

    if (this.dir === 'rtl') {
      margin = mirrorShorthandEdges(margin)
      padding = mirrorShorthandEdges(padding)
    }

    return {
      margin: getShorthandPropValue(this.displayName, this.theme, margin, 'margin'),
      padding: getShorthandPropValue(this.displayName, this.theme, padding, 'padding')
    }
  }

  get styleProps () {
    const { cursor, style } = this.props // eslint-disable-line react/prop-types
    const whitelisted = pickProps(style || {}, {}, [
      // Position/calculateElementPosition:
      'top',
      'left',
      'position',
      'display',
      'transform',
      'overflow',
      'minWidth',
      'minHeight',
      // Img:
      'filter',
      // FlexItem:
      'flexBasis',
      // Avatar:
      'backgroundImage'
    ])
    if (cursor) {
      whitelisted.cursor = cursor
    }
    return whitelisted
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
      stacking,
      shadow,
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
          [styles[`stacking--${stacking}`]]: stacking,
          [styles[`shadow--${shadow}`]]: shadow,
          [className]: className
        })}
        style={{
          ...this.spacingStyle,
          ...this.borderStyle,
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          ...this.styleProps, // whitelisted style props will override View defaults
        }}
        ref={this.handleElementRef}
      >
        {children}
      </ElementType>
    )
  }
}

if (process.env.NODE_ENV !== 'production') {
  View.prototype.componentWillReceiveProps = View.prototype.verifySpanMargin = function(props) {
    const { as, display, margin } = props
    const marginValues = margin ? margin.split(' ') : null
    // warn if all 3 of the following conditions are true
    let verticalMargin = false
    let displayAuto = false
    let asSpan = false

    // either top or bottom margin are set
    if (margin) {
      if (marginValues[0] && (marginValues[0] !== 'none' && marginValues[0] !== '0')) {
        verticalMargin = true
      }
      if (marginValues[2] && (marginValues[2] !== 'none' && marginValues[2] !== '0')) {
        verticalMargin = true
      }
    }
    // rendered as a span
    if (as === 'span' || typeof as === 'undefined') {
      asSpan = true
    }
    // display is auto
    if (display === 'auto') {
      displayAuto = true
    }

    warning(
      !(verticalMargin && asSpan && displayAuto),
      `[${this.displayName}] element of type 'span' and display 'auto' is inline and will allow for horizontal margins only`
    )
  }

  View.prototype.componentWillMount = function() {
    this.verifySpanMargin(this.props)
  }
}

export default deprecated('5.4.0', {size: 'maxWidth'})(
bidirectional()(
themeable(theme, styles)(
  View
)))
