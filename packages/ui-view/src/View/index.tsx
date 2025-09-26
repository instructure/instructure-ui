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

import { Component, ComponentType } from 'react'

import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import { logError as error } from '@instructure/console'
import {
  getElementType,
  omitProps,
  pickProps,
  passthroughProps
} from '@instructure/ui-react-utils'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { ViewProps } from './props'

/**
---
category: components
---
@module View
**/
@textDirectionContextConsumer()
@withStyle(generateStyle, generateComponentTheme)
class View extends Component<ViewProps> {
  static componentId = 'View'
  static allowedProps = allowedProps
  static defaultProps = {
    display: 'auto',
    overflowX: 'visible',
    overflowY: 'visible',
    withVisualDebug: false,
    borderColor: 'primary',
    position: 'static',
    focusPosition: 'offset',
    focusColor: 'info',
    shouldAnimateFocus: true,
    overscrollBehavior: 'auto'
  } as const

  // TODO: Remove this code once all components are using passthroughProps in place
  // of omitProps and have removed this function

  // omitViewProps needs to be called on the composed View component so that the
  // View.allowedProps in the method matches the View.allowedProps that will be called in
  // the consumers. Otherwise the discrepancy could cause unexpected props being
  // allowed through.

  // Removes View's own props from the given object. Automatically excludes the
  // following props: 'theme', 'children', 'className', 'style', 'styles',
  // 'makeStyles', 'themeOverride'
  // @param props the object to process
  // @param Component The component whose props are processed.
  // Only needed for debug logging in non-production builds.
  static omitViewProps = (
    props: Record<string, any>,
    Component: ComponentType<any>
  ) => {
    // We don't want the theming and styling props to pass
    // (these are added and handled by the `@withStyle` decorator)
    const propsToOmit = [
      ...View.allowedProps,
      'styles',
      'makeStyles',
      'themeOverride'
    ]

    let shouldLogError = true
    try {
      shouldLogError = process.env.NODE_ENV !== 'production'
    } catch (e) {
      if (e instanceof ReferenceError) {
        // if process is not available a ReferenceError is thrown
        shouldLogError = false
      } else {
        throw e
      }
    }

    if (shouldLogError) {
      Object.keys(pickProps(props, propsToOmit)).forEach((prop) => {
        error(false, `[${Component.name}] prop '${prop}' is not allowed.`)
      })
    }
    return omitProps(props, propsToOmit)
  }

  private spanMarginVerified: boolean
  get _element() {
    console.warn(
      '_element property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  constructor(props: ViewProps) {
    super(props)
    this.spanMarginVerified = false
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()

    // Not calling getCSSStyleDeclaration can save hundreds of ms in tests and production
    if (process.env.NODE_ENV === 'development' && !this.spanMarginVerified) {
      // We have to verify margins in the first 'componentDidUpdate',
      // because that is when all styles are calculated,
      // but we only want to check once, using a flag
      this.spanMarginVerified = true

      error(
        !(function verifySpanMargin(element, margin) {
          if (!element) {
            return
          }

          const display = getCSSStyleDeclaration(element)?.display

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
        })(this.ref, this.props.margin),
        `[View] display style is set to 'inline' and will allow for horizontal margins only.`
      )
    }
  }

  ref: Element | null = null

  handleElementRef = (el: HTMLElement | null) => {
    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(el)
    }
    this.ref = el
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
      overscrollBehavior,
      styles,
      makeStyles,
      ...props
    } = this.props

    const ElementType = getElementType(View, this.props)

    return (
      <ElementType
        {...passthroughProps(props)}
        className={className}
        css={[styles?.view, styles?.inlineStyles]}
        ref={this.handleElementRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default View
export { View }
