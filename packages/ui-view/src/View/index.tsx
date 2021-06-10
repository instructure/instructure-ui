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

import { getComputedStyle } from '@instructure/ui-dom-utils'
import { bidirectional } from '@instructure/ui-i18n'
import { cursor as cursorPropTypes } from '@instructure/ui-prop-types'
import { logError as error } from '@instructure/console'
import {
  getElementType,
  omitProps,
  pickProps,
  passthroughProps
} from '@instructure/ui-react-utils'

import {
  jsx,
  withStyle,
  ThemeablePropTypes,
  ThemeablePropValues
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  as?: React.ReactElement | string
  elementRef?: (...args: any[]) => any
  display?:
    | 'auto'
    | 'inline'
    | 'block'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
  overflowX?: 'auto' | 'hidden' | 'visible'
  overflowY?: 'auto' | 'hidden' | 'visible'
  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  textAlign?: 'start' | 'center' | 'end'
  borderColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'brand'
    | 'info'
    | 'success'
    | 'warning'
    | 'alert'
    | 'danger'
  background?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'brand'
    | 'info'
    | 'alert'
    | 'success'
    | 'danger'
    | 'warning'
  position?: 'static' | 'absolute' | 'relative' | 'sticky' | 'fixed'
  insetInlineStart?: string
  insetInlineEnd?: string
  insetBlockStart?: string
  insetBlockEnd?: string
  withFocusOutline?: boolean
  focusPosition?: 'offset' | 'inset'
  focusColor?: 'info' | 'inverse' | 'success' | 'danger'
  shouldAnimateFocus?: boolean
  withVisualDebug?: boolean
  makeStyles?: (...args: any[]) => any
  styles?: any
  dir?: any // TODO: PropTypes.oneOf(Object.values(bidirectional.DIRECTION)),
  margin: keyof typeof ThemeablePropValues.SPACING
  padding: keyof typeof ThemeablePropValues.SPACING
  borderWidth: keyof typeof ThemeablePropValues.BORDER_WIDTHS
  borderRadius: keyof typeof ThemeablePropValues.BORDER_RADII
  shadow: keyof typeof ThemeablePropValues.SHADOW_TYPES
  stacking: keyof typeof ThemeablePropValues.STACKING_TYPES
}

/**
---
category: components
---
@module View
**/
@bidirectional()
@withStyle(generateStyle, generateComponentTheme)
class View extends Component<Props> {
  static componentId = 'View'

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
    display: PropTypes.oneOf([
      'auto',
      'inline',
      'block',
      'inline-block',
      'flex',
      'inline-flex'
    ]),

    overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
    overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),

    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
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
      'transparent',
      'primary',
      'secondary',
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
      'transparent',
      'primary',
      'secondary',
      'primary-inverse',
      'brand',
      'info',
      'alert',
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
    position: PropTypes.oneOf([
      'static',
      'absolute',
      'relative',
      'sticky',
      'fixed'
    ]),

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
     * Manually control if the `View` should display a focus outline. When left undefined (which is the default)
     * the focus outline will display automatically if the `View` is focusable and receives focus. Note: the focus
     * outline only will display when the `position` prop is set to `relative`.
     */
    withFocusOutline: PropTypes.bool,

    /**
     * Determines whether the focus outline displays offset or inset from the focused View
     */
    focusPosition: PropTypes.oneOf(['offset', 'inset']),

    /**
     * Determines the color of the focus outline
     */
    focusColor: PropTypes.oneOf(['info', 'inverse', 'success', 'danger']),

    /**
     * Determines if the focus ring should animate when it appears
     */
    shouldAnimateFocus: PropTypes.bool,

    /**
     * Activate a dotted outline around the component to make building your
     * layout easier
     */
    withVisualDebug: PropTypes.bool,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    //@ts-expect-error FIXME:
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
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
    withVisualDebug: false,
    cursor: undefined,
    borderWidth: undefined,
    borderRadius: undefined,
    borderColor: 'primary',
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
    withFocusOutline: undefined,
    focusPosition: 'offset',
    focusColor: 'info',
    insetInlineStart: undefined,
    insetInlineEnd: undefined,
    insetBlockStart: undefined,
    insetBlockEnd: undefined,
    shouldAnimateFocus: true
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spanMarginVerified' does not exist on ty... Remove this comment to see the full error message
    this.spanMarginVerified = false
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()

    // Not calling getComputedStyle can save hundreds of ms in tests and production
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spanMarginVerified' does not exist on ty... Remove this comment to see the full error message
    if (process.env.NODE_ENV === 'development' && !this.spanMarginVerified) {
      // We have to verify margins in the first 'componentDidUpdate',
      // because that is when all styles are calculated,
      // but we only want to check once, using a flag
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'spanMarginVerified' does not exist on ty... Remove this comment to see the full error message
      this.spanMarginVerified = true

      error(
        !(function verifySpanMargin(element, margin) {
          if (!element) {
            return
          }

          const display = getComputedStyle(element).display

          if (display !== 'inline') {
            return
          }

          const marginValues = margin ? margin.split(' ') : null
          let verticalMargin = false

          // either top or bottom margin are set
          if (margin) {
            if (
              marginValues &&
              marginValues[0] &&
              marginValues[0] !== 'none' &&
              marginValues[0] !== '0'
            ) {
              verticalMargin = true
            }
            if (
              marginValues &&
              marginValues[2] &&
              marginValues[2] !== 'none' &&
              marginValues[2] !== '0'
            ) {
              verticalMargin = true
            }
          }

          return verticalMargin
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_element' does not exist on type 'View'.
        })(this._element, this.props.margin),
        `[View] display style is set to 'inline' and will allow for horizontal margins only.`
      )
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(el)
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_element' does not exist on type 'View'.
    this._element = el
  }
  render() {
    const {
      children,
      textAlign,
      background,
      display,
      withVisualDebug,
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className, // eslint-disable-line react/prop-types
      styles,
      makeStyles,
      ...props
    } = this.props

    const ElementType = getElementType(View, this.props)

    return (
      <ElementType
        {...passthroughProps(props)}
        className={className}
        css={styles.view}
        style={styles.inlineStyles}
        ref={this.handleElementRef}
      >
        {children}
      </ElementType>
    )
  }
}

// TODO: Remove this code once all components are using passthroughProps in place
// of omitProps and have removed this function

// omitViewProps needs to be called on the composed View component so that the
// View.propTypes in the method matches the View.propTypes that will be called in
// the consumers. Otherwise the discrepency could cause unexpected props being
// allowed through.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
View.omitViewProps = (props, Component) => {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(pickProps(props, View.propTypes)).forEach((prop) => {
      error(false, `[${Component.name}] prop '${prop}' is not allowed.`)
    })
  }

  return omitProps(props, View.propTypes)
}

export default View
export { View }
