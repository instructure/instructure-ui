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

import {
  CheckInstUIIcon,
  MinusInstUIIcon,
  renderIconWithProps
} from '@instructure/ui-icons'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { CheckboxFacadeProps } from './props'

/**
---
parent: Checkbox
---
**/
@withStyle(generateStyle, 'Checkbox')
class CheckboxFacade extends Component<CheckboxFacadeProps> {
  static readonly componentId = 'CheckboxFacade'

  static allowedProps = allowedProps
  static defaultProps = {
    checked: false,
    disabled: false,
    readOnly: false,
    focused: false,
    hovered: false,
    size: 'medium',
    indeterminate: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  renderIcon() {
    const { disabled, readOnly, indeterminate, checked } = this.props

    const getIconColor = () => {
      if (disabled) {
        return 'disabledBaseColor'
      }
      if (readOnly) {
        return 'baseColor'
      }
      return 'inverseColor'
    }

    const iconColor = getIconColor()

    if (indeterminate) {
      return renderIconWithProps(MinusInstUIIcon, 'sm', iconColor)
    } else if (checked) {
      return renderIconWithProps(CheckInstUIIcon, 'sm', iconColor)
    } else {
      return null
    }
  }

  render() {
    const { children, styles } = this.props

    return (
      <span css={styles?.checkboxFacade} ref={this.handleRef}>
        <span css={styles?.facade} aria-hidden="true">
          {this.renderIcon()}
        </span>
        <span css={styles?.label}>{children}</span>
      </span>
    )
  }
}

export default CheckboxFacade
export { CheckboxFacade }
