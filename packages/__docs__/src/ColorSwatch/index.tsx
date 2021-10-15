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
import PropTypes, { number } from 'prop-types'

import { isValid } from '@instructure/ui-color-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { propTypes, allowedProps } from './props'
import type { ColorSwatchProps } from './props'
import React from 'react'

@withStyle(generateStyle, generateComponentTheme)
class ColorSwatch extends Component<ColorSwatchProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: ColorSwatchProps) {
    this.props.makeStyles?.()
  }

  render() {
    const { color } = this.props
    if (typeof color == 'string')
      return isValid(color) ? (
        <div
          css={this.props.styles?.colorSwatch}
          style={{ background: color }}
        />
      ) : null
    return null
  }
}

export default ColorSwatch
export { ColorSwatch }
