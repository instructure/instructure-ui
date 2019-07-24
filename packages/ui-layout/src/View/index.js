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

import {
  themeable,
  getShorthandPropValue,
  ThemeablePropTypes,
  mirrorShorthandEdges,
  mirrorShorthandCorners
} from '@instructure/ui-themeable'
import { getComputedStyle } from '@instructure/ui-dom-utils'
import { bidirectional } from '@instructure/ui-i18n'
import { cursor as cursorPropTypes } from '@instructure/ui-prop-types'
import { error } from '@instructure/console/macro'
import {
  getElementType,
  omitProps,
  pickProps
} from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
id: DeprecatedView
---
**/
@bidirectional()
@themeable(theme, styles)
class View extends Component {
  static propTypes = {
    /**
    * The element to render as the component root, `span` by default
    */
    as: PropTypes.elementType,

    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func,

    /**
    * By default the display prop is 'auto', meaning it takes on the
    * display rules of the html element it's rendered as (see `as` prop).
    */
    display: PropTypes.oneOf(['auto', 'block', 'inline-block', 'flex', 'inline-flex']),

    overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
    overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),

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
    * Accepts `small`, `medium`, `large`, `circle`, and `pill`. Border radius can be
    * assigned to individual corners in CSS shorthand style (e.g., `"medium large none pill"`).
    */
    borderRadius: ThemeablePropTypes.borderRadius,

    /**
    * Sets the color of the View border
    */
    borderColor: PropTypes.oneOf([
      'default',
      'inverse',
      'brand',
      'info',
      'success',
      'warning',
      'alert',
      'danger'
    ]),

    /**
    * Designates the background style of the `<View />`
    */
    background: PropTypes.oneOf([
      'default',
      'inverse',
      'light',
      'transparent',
      'brand',
      'alert',
      'info',
      'success',
      'danger',
      'warning'
    ]),

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
    cursor: cursorPropTypes,

    /**
    * Specify a value for the CSS position property. Use `relative` if `focusable` will be true.
    */
    position: PropTypes.oneOf(['static', 'absolute', 'relative', 'sticky', 'fixed']),

    /**
    * The `left` CSS property in left-to-right interfaces. Will not do anything if `position === "static"`.
    */
    insetInlineStart: PropTypes.string,
    /**
    * The `right` CSS property in left-to-right interfaces. Will not do anything if `position === "static"`.
    */
    insetInlineEnd: PropTypes.string,
    /**
    * The `top` CSS property. Will not do anything if `position === "static"`.
    */
    insetBlockStart: PropTypes.string,
    /**
    * The `bottom` CSS property. Will not do anything if `position === "static"`.
    */
    insetBlockEnd: PropTypes.string,

    /**
     * When true and position prop is `relative`, show focus outline.
     */
    focused: PropTypes.bool,

    /**
     * Determines whether the focus outline displays offset or inset from the focused View
     */
    focusPosition: PropTypes.oneOf(['offset', 'inset']),

    /**
    * Determines the color of the focus outline
    */
    focusColor: PropTypes.oneOf(['info', 'inverse', 'success', 'danger']),

    shouldAnimateFocus: PropTypes.bool,

    /**
    * Activate a dotted outline around the component to make building your
    * layout easier
    */
    debug: PropTypes.bool
  }

  static defaultProps = {
    display: 'auto',
    // Note:
    // - `as` will default to type span via getElementType, so for consistency and
    // compatibility with Container we are leaving it undefined here. Otherwise
    // it modifies behavior for consuming components because of the logic around
    // default props in getElementType
    as: undefined,
    // - `textAlign` is undefined by default so that View can inherit text alignment
    // from parents
    textAlign: undefined,
    // - Any props used to set inline styles should be undefined so that they
    // don't break consuming components' CSS
    overflowX: 'visible',
    overflowY: 'visible',
    shadow: undefined,
    stacking: undefined,
    debug: false,
    cursor: undefined,
    borderWidth: undefined,
    borderRadius: undefined,
    borderColor: 'default',
    margin: undefined,
    padding: undefined,
    elementRef: undefined,
    background: undefined,
    children: null,
    width: undefined,
    height: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    minWidth: undefined,
    minHeight: undefined,
    position: 'static',
    focused: false,
    focusPosition: 'offset',
    focusColor: 'info',
    insetInlineStart: undefined,
    insetInlineEnd: undefined,
    insetBlockStart: undefined,
    insetBlockEnd: undefined,
    shouldAnimateFocus: true
  }

  componentDidMount () {
    error(
      !((function verifySpanMargin (element, margin) {
        if (!element) {
          return
        }
        const marginValues = margin ? margin.split(' ') : null
        const display = getComputedStyle(element).display

        let verticalMargin = false

        // either top or bottom margin are set
        if (margin) {
          if (marginValues[0] && (marginValues[0] !== 'none' && marginValues[0] !== '0')) {
            verticalMargin = true
          }
          if (marginValues[2] && (marginValues[2] !== 'none' && marginValues[2] !== '0')) {
            verticalMargin = true
          }
        }

        return verticalMargin && display === 'inline'
      })(this._element, this.props.margin)),
      `[View] display style is set to 'inline' and will allow for horizontal margins only.`
    )
  }

  get isFocused () {
    const {
      focused,
      position
    } = this.props

    if (focused) {
      if (position === 'relative') {
        return true
      } else {
        error(
          position === 'relative',
          '[View] the focus ring will only display if the `position` prop is `relative`.'
        )
        return false
      }
    } else {
      return false
    }
  }

  get focusRingRadius () {
    const { borderRadius } = this.props

    if (this.verifyUniformValues('circle', borderRadius)
      || this.verifyUniformValues('pill', borderRadius)) {
      // if pill or circle, ok for focus ring to inherit parent radius
      return 'focusRing--radiusInherit'
    } else if (this.verifyUniformValues('small', borderRadius)) {
      return 'focusRing--radiusSmall'
    } else if (this.verifyUniformValues('medium', borderRadius)) {
      return 'focusRing--radiusMedium'
    } else if (this.verifyUniformValues('large', borderRadius)) {
      return 'focusRing--radiusLarge'
    } else {
      // for shapes with irregular borders (e.g., `large medium`), leave focus ring square
      return 'focusRing--radiusNone'
    }
  }

  get hasBorder () {
    const { borderWidth } = this.props
    return borderWidth && borderWidth !== '0' && borderWidth !== 'none'
  }

  get borderStyle () {
    let { borderRadius, borderWidth } = this.props

    if (this.dir === bidirectional.DIRECTION.rtl) {
      borderRadius = mirrorShorthandCorners(borderRadius)
      borderWidth = mirrorShorthandEdges(borderWidth)
    }

    return {
      borderRadius: getShorthandPropValue('View', this.theme, borderRadius, 'borderRadius'),
      borderWidth: getShorthandPropValue('View', this.theme, borderWidth, 'borderWidth')
    }
  }

  get spacingStyle () {
    let { margin, padding } = this.props

    if (this.dir === 'rtl') {
      margin = mirrorShorthandEdges(margin)
      padding = mirrorShorthandEdges(padding)
    }

    return {
      margin: getShorthandPropValue('View', this.theme, margin, 'margin'),
      padding: getShorthandPropValue('View', this.theme, padding, 'padding')
    }
  }

  get offsetStyle () {
    const {
      insetBlockStart,
      insetBlockEnd,
      insetInlineStart,
      insetInlineEnd
    } = this.props

    const rtl = this.dir === 'rtl'

    const blockStart = {
      top: insetBlockStart,
      insetBlockStart
    }

    const blockEnd = {
      bottom: insetBlockEnd,
      insetBlockEnd
    }

    const horizontalOffsets = {
      left: rtl ? insetInlineEnd : insetInlineStart,
      right: rtl ? insetInlineStart : insetInlineEnd,
      insetInlineStart,
      insetInlineEnd
    }

    return {
      ...blockStart,
      ...blockEnd,
      ...horizontalOffsets
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
      // Flex.Item:
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

  // verify that each value passed into ThemeablePropType is identical
  verifyUniformValues = (value, input) => {
    if (typeof input !== "string") return false

    return input
      .trim()
      .split(" ")
      .every(inputValue => inputValue === value)
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
      overflowX,
      overflowY,
      stacking,
      shadow,
      position,
      focusPosition,
      focusColor,
      shouldAnimateFocus,
      borderColor,
      size, // eslint-disable-line react/prop-types
      className // eslint-disable-line react/prop-types
    } = this.props

    const ElementType = getElementType(View, this.props)

    const focusOutlineClasses = position === 'relative' ? {
      [styles[this.focusRingRadius]]: true,
      [styles[`focusPosition--${focusPosition}`]]: true,
      [styles[`focusColor--${focusColor}`]]: true,
      [styles[`focusAnimation`]]: shouldAnimateFocus
    } : {}

    const classes = classnames({
      [styles.root]: true,
      [styles.debug]: debug,
      [styles.hasBorder]: this.hasBorder,
      [styles[`borderColor--${borderColor}`]]: this.hasBorder && borderColor !== 'inverse',
      [styles['borderColor--inverse']]: this.hasBorder && background === 'inverse',
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles[`background--${background}`]]: background,
      [styles[`display--${display}`]]: display && display !== 'auto',
      [styles[`overflowX--${overflowX}`]]: overflowX && overflowX !== 'visible',
      [styles[`overflowY--${overflowY}`]]: overflowY && overflowY !== 'visible',
      [styles[`size--${size}`]]: size && size !== 'auto',
      [styles[`stacking--${stacking}`]]: stacking,
      [styles[`shadow--${shadow}`]]: shadow && shadow !== 'none',
      [styles[`position--${position}`]]: position !== 'static',
      // leaving `focused` out of focusOutlineClasses so warning fires if position is not relative
      [styles.focused]: this.isFocused,
      ...focusOutlineClasses,
      [className]: className
    })

    return (
      <ElementType
        {...omitProps(this.props, View.propTypes)}
        className={classes}
        style={{
          ...this.spacingStyle,
          ...this.borderStyle,
          ...this.offsetStyle,
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

// omitViewProps needs to be called on the composed View component so that the
// View.propTypes in the method matches the View.propTypes that will be called in
// the consumers. Otherwise the discrepency could cause unexpected props being
// allowed through.
View.omitViewProps = (props, Component) => {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(pickProps(props, View.propTypes)).forEach((prop) => {
      error(false, `[${Component.displayName}] prop '${prop}' is not allowed.`)
    })
  }

  return omitProps(props, View.propTypes)
}

export default View
export { View }
