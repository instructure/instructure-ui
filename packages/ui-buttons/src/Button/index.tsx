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

import { Component } from 'react'

import { getInteraction, passthroughProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'
import { BaseButton } from '../BaseButton'

import { allowedProps } from './props'
import type { ButtonProps } from './props'

/**
---
category: components
---
**/
// needed for listing the available theme variables on docs page
@withStyle(null, 'BaseButton')
class Button extends Component<ButtonProps> {
  static readonly componentId = 'Button'

  static allowedProps = allowedProps
  static defaultProps = {
    type: 'button',
    size: 'medium',
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    display: 'inline-block',
    textAlign: 'center',
    withBackground: true,
    margin: '0',
    cursor: 'pointer'
  }

  _buttonComponent: BaseButton | null = null

  ref: Element | null = null

  get focused() {
    return this._buttonComponent && this._buttonComponent.focused
  }

  focus() {
    this._buttonComponent && this._buttonComponent.focus()
  }

  handleElementRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleButtonRef = (component: BaseButton | null) => {
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

    return (
      <BaseButton {...buttonProps} data-cid="Button">
        {children}
      </BaseButton>
    )
  }
}

export default Button
export { Button }
