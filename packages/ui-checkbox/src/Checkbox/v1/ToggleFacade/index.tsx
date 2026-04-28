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

import { IconCheckSolid, IconXSolid } from '@instructure/ui-icons'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { ToggleFacadeProps } from './props'

/**
---
parent: Checkbox
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ToggleFacade extends Component<ToggleFacadeProps> {
  static readonly componentId = 'ToggleFacade'

  static allowedProps = allowedProps
  static defaultProps = {
    checked: false,
    focused: false,
    size: 'medium',
    disabled: false,
    readOnly: false,
    labelPlacement: 'end'
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
    const { styles, checked } = this.props

    if (checked) {
      return <IconCheckSolid css={styles?.iconSVG} />
    } else {
      return <IconXSolid css={styles?.iconSVG} />
    }
  }

  renderLabel() {
    const { children, styles } = this.props

    return <span css={styles?.label}>{children}</span>
  }

  render() {
    const { labelPlacement, styles } = this.props

    return (
      <span css={styles?.toggleFacade} ref={this.handleRef}>
        {(labelPlacement === 'top' || labelPlacement === 'start') &&
          this.renderLabel()}
        <span css={styles?.facade} aria-hidden="true">
          <span css={styles?.icon}>
            <span css={styles?.iconToggle}>{this.renderIcon()}</span>
          </span>
        </span>
        {labelPlacement === 'end' && this.renderLabel()}
      </span>
    )
  }
}

export default ToggleFacade
export { ToggleFacade }
