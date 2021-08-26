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
import { passthroughProps } from '@instructure/ui-react-utils'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyle } from '@instructure/emotion'

import generateComponentTheme from './theme'
import { BaseButton } from '../BaseButton'

import { propTypes, allowedProps } from './props'
import type { IconButtonProps } from './props'

/**
---
category: components
---
**/

// needed for listing the available theme variables on docs page
@withStyle(null, generateComponentTheme)
@testable()
class IconButton extends Component<IconButtonProps> {
  static readonly componentId = 'IconButton'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    type: 'button',
    size: 'medium',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    color: 'secondary',
    shape: 'rectangle',
    withBackground: true,
    withBorder: true,
    margin: '0',
    cursor: 'pointer'
  }

  _baseButton = null

  get focused() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return this._baseButton && this._baseButton.focused
  }

  focus() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._baseButton && this._baseButton.focus()
  }

  render() {
    const {
      children,
      renderIcon,
      screenReaderLabel,
      type,
      size,
      elementRef,
      as,
      interaction,
      color,
      focusColor,
      shape,
      withBackground,
      withBorder,
      margin,
      cursor,
      href,
      ...props
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'themeOverride' does not exist on type 'R... Remove this comment to see the full error message
    // eslint-disable-next-line react/prop-types
    const themeOverride = this.props.themeOverride

    return (
      <BaseButton
        {...passthroughProps(props)}
        type={type}
        size={size}
        elementRef={elementRef}
        as={as}
        interaction={interaction}
        color={color}
        focusColor={focusColor}
        shape={shape}
        withBackground={withBackground}
        withBorder={withBorder}
        margin={margin}
        cursor={cursor}
        href={href}
        renderIcon={children || renderIcon}
        themeOverride={themeOverride}
        ref={(component) => {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'BaseButton | null' is not assignable to type... Remove this comment to see the full error message
          this._baseButton = component
        }}
      >
        <ScreenReaderContent>{screenReaderLabel}</ScreenReaderContent>
      </BaseButton>
    )
  }
}

export default IconButton
export { IconButton }
