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

import { getComputedStyle } from '@instructure/ui-dom-utils'
import { bidirectional } from '@instructure/ui-i18n'
import { logError as error } from '@instructure/console'

import {
  getElementType,
  omitProps,
  pickProps,
  passthroughProps
} from '@instructure/ui-react-utils'

import { jsx, withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { allowedProps, ViewProps, propTypes } from './types'

/**
---
category: components

---
API:
  - [View](https://instructure.design/#View)
@module View

**/
@bidirectional()
@withStyle(generateStyle, generateComponentTheme)
class View extends Component<ViewProps> {
  static componentId = 'View'
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    display: 'auto',
    overflowX: 'visible',
    overflowY: 'visible',
    withVisualDebug: false,
    borderColor: 'primary',
    position: 'static',
    focusPosition: 'offset',
    focusColor: 'info',
    shouldAnimateFocus: true
  }

  constructor(props: ViewProps) {
    super(props)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spanMarginVerified' does not exist on ty... Remove this comment to see the full error message
    this.spanMarginVerified = false
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()

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
      className,
      styles,
      makeStyles,
      ...props
    } = this.props

    const ElementType = getElementType(View, this.props)

    return (
      <ElementType
        {...passthroughProps(props)}
        className={className}
        css={styles?.view}
        style={styles?.inlineStyles}
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
// View.allowedProps in the method matches the View.allowedProps that will be called in
// the consumers. Otherwise the discrepency could cause unexpected props being
// allowed through.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
View.omitViewProps = (props, Component) => {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(pickProps(props, View.allowedProps)).forEach((prop) => {
      error(false, `[${Component.name}] prop '${prop}' is not allowed.`)
    })
  }

  return omitProps(props, View.allowedProps)
}

export default View
export { View }
