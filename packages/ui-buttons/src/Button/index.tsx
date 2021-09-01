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

import { testable } from '@instructure/ui-testable'
import { getInteraction, passthroughProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'

import generateComponentTheme from './theme'
import { BaseButton } from '../BaseButton'

import { propTypes, defaultProps, allowedProps } from './props'
import type { ButtonProps } from './props'

/**
---
category: components
---
**/
// needed for listing the available theme variables on docs page
@withStyle(null, generateComponentTheme)
@testable()
class Button extends Component<ButtonProps> {
  static readonly componentId = 'Button'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = defaultProps

  _buttonComponent = null

  get focused() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return this._buttonComponent && this._buttonComponent.focused
  }

  focus() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._buttonComponent && this._buttonComponent.focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    const { elementRef } = this.props

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    elementRef(el)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'component' implicitly has an 'any' type... Remove this comment to see the full error message
  handleButtonRef = (component) => {
    this._buttonComponent = component
  }

  render() {
    const {
      children,
      type,
      size,
      as,
      color,
      focusColor,
      display,
      textAlign,
      withBackground,
      margin,
      cursor,
      href,
      renderIcon,
      ...props
    } = this.props

    const interaction = getInteraction({ props })

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'themeOverride' does not exist on type 'R... Remove this comment to see the full error message
    // eslint-disable-next-line react/prop-types
    const themeOverride = this.props.themeOverride

    const buttonProps = {
      ...passthroughProps(props),
      type,
      size,
      elementRef: this.handleElementRef,
      ref: this.handleButtonRef,
      as,
      color,
      interaction,
      focusColor,
      display,
      textAlign,
      withBackground,
      margin,
      cursor,
      href,
      renderIcon,
      themeOverride
    }

    return <BaseButton {...buttonProps}>{children}</BaseButton>
  }
}

export default Button
export { Button }
