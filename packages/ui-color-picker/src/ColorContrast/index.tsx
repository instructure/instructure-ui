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
/** @jsxFrag React.Fragment */
import React, { Component } from 'react'

import { passthroughProps } from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'
import { Text } from '@instructure/ui-text'
import ColorIndicator from '../ColorIndicator'

import type { ColorContrastProps } from './props'
import { propTypes, allowedProps } from './props'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import {
  contrast as getContrast,
  colorToRGB,
  colorTohex8
} from '@instructure/ui-color-utils'
import { Pill } from '@instructure/ui-pill'

import type { RGBAType } from '../ColorMixer/props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class ColorContrast extends Component<ColorContrastProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps

  constructor(props: ColorContrastProps) {
    super(props)
  }
  ref: HTMLDivElement | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  static readonly componentId = 'ColorContrast'
  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  renderStatus = (pass: boolean, description: string) => {
    const { successLabel, failureLabel, styles } = this.props
    return (
      <div css={styles?.statusWrapper}>
        <div
          css={pass ? styles?.successDescription : styles?.failureDescription}
        >
          {description}
        </div>
        <div css={styles?.statusIndicatorWrapper}>
          <Pill color={pass ? 'success' : 'danger'}>
            {pass ? successLabel : failureLabel}
          </Pill>
        </div>
      </div>
    )
  }

  renderColorIndicator = (color: string, label: string) => (
    <>
      <div>
        <div css={this.props.styles?.colorIndicator}>
          <ColorIndicator color={color} />
        </div>
      </div>

      <div>
        <div css={this.props.styles?.colorIndicatorLabel}>{label}</div>
        <div css={this.props.styles?.pickedColorHex}>{color}</div>
      </div>
    </>
  )
  calcBlendedColor = (c1: RGBAType, c2: RGBAType) => {
    // as decided by design
    const alpha = 1 - (1 - c1.a) * (1 - c2.a)
    return {
      r: (c2.r * c2.a) / alpha + (c1.r * c1.a * (1 - c2.a)) / alpha,
      g: (c2.g * c2.a) / alpha + (c1.g * c1.a * (1 - c2.a)) / alpha,
      b: (c2.b * c2.a) / alpha + (c1.b * c1.a * (1 - c2.a)) / alpha,
      a: 1
    }
  }

  //We project the firstColor onto an opaque white background, then we project the secondColor onto
  //the projected first color. We calculate the contrast of these two, projected colors.
  get calcContrast() {
    const c1RGBA = colorToRGB(this.props.firstColor)
    const c2RGBA = colorToRGB(this.props.secondColor)
    const c1OnWhite = this.calcBlendedColor(
      { r: 255, g: 255, b: 255, a: 1 },
      c1RGBA
    )
    const c2OnC1OnWhite = this.calcBlendedColor(c1OnWhite, c2RGBA)

    return getContrast(colorTohex8(c1OnWhite), colorTohex8(c2OnC1OnWhite), 2)
  }
  render() {
    const {
      styles,
      elementRef,
      failureLabel,
      successLabel,
      withoutColorPreview,
      firstColor,
      secondColor,
      label,
      firstColorLabel,
      secondColorLabel,
      normalTextLabel,
      largeTextLabel,
      graphicsTextLabel,
      ...props
    } = this.props
    const contrast = this.calcContrast
    return (
      <div
        {...passthroughProps(props)}
        ref={this.handleRef}
        css={styles?.colorContrast}
      >
        <Text weight="bold" as="div">
          {label}
        </Text>
        <Text weight="bold" size="x-large">
          {contrast}:1
        </Text>
        {!withoutColorPreview && (
          <div css={this.props.styles?.colorPreview}>
            <div css={this.props.styles?.firstColorPreview}>
              {this.renderColorIndicator(firstColor, firstColorLabel || '')}
            </div>
            <div css={this.props.styles?.secondColorPreview}>
              {this.renderColorIndicator(secondColor, secondColorLabel || '')}
            </div>
          </div>
        )}
        {this.renderStatus(contrast >= 4.5, normalTextLabel)}
        {this.renderStatus(contrast >= 3.5, largeTextLabel)}
        {this.renderStatus(contrast >= 3.5, graphicsTextLabel)}
      </div>
    )
  }
}

export { ColorContrast }
export default ColorContrast
