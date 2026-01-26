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

import { omitProps } from '@instructure/ui-react-utils'
import { error } from '@instructure/console'
import {
  contrastWithAlpha,
  validateContrast
} from '@instructure/ui-color-utils'
import { withStyleRework as withStyle } from '@instructure/emotion'

import { Text } from '@instructure/ui-text'
import { Pill } from '@instructure/ui-pill/v11.5'

import ColorIndicator from '../ColorIndicator'

import { allowedProps } from './props'
import type { ColorContrastProps, ColorContrastState } from './props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ColorContrast extends Component<ColorContrastProps, ColorContrastState> {
  static allowedProps = allowedProps
  static readonly componentId = 'ColorContrast'

  static defaultProps = {
    withoutColorPreview: false,
    validationLevel: 'AA'
  }

  constructor(props: ColorContrastProps) {
    super(props)

    this.state = {
      contrast: 1,
      isValidNormalText: false,
      isValidLargeText: false,
      isValidGraphicsText: false
    }
  }

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    this.calcState()
  }

  componentDidUpdate(prevProps: ColorContrastProps) {
    this.props.makeStyles?.()
    if (
      prevProps?.firstColor !== this.props?.firstColor ||
      prevProps?.secondColor !== this.props?.secondColor ||
      prevProps?.validationLevel !== this.props?.validationLevel
    ) {
      const newState = this.calcState()

      this.props?.onContrastChange?.({
        contrast: newState.contrast,
        isValidNormalText: newState.isValidNormalText,
        isValidLargeText: newState.isValidLargeText,
        isValidGraphicsText: newState.isValidGraphicsText,
        firstColor: this.props.firstColor,
        secondColor: this.props.secondColor
      })
    }
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
          <Pill color={pass ? 'success' : 'error'}>
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

  renderPreview() {
    const {
      styles,
      withoutColorPreview,
      firstColor,
      secondColor,
      firstColorLabel,
      secondColorLabel
    } = this.props

    if (withoutColorPreview) {
      return null
    }

    if (!firstColorLabel || !secondColorLabel) {
      error(
        false,
        'When `withoutColorPreview` is not set to true, the properties `firstColorLabel` and `secondColorLabel` are required!'
      )
    }

    return (
      !withoutColorPreview && (
        <div css={styles?.colorPreview}>
          <div css={styles?.firstColorPreview}>
            {this.renderColorIndicator(firstColor, firstColorLabel || '')}
          </div>
          <div css={styles?.secondColorPreview}>
            {this.renderColorIndicator(secondColor, secondColorLabel || '')}
          </div>
        </div>
      )
    )
  }

  calcState() {
    const contrast = contrastWithAlpha(
      this.props.firstColor,
      this.props.secondColor
    )
    const newState = {
      contrast,
      ...validateContrast(contrast, this.props.validationLevel)
    }
    this.setState(newState)
    return newState
  }

  render() {
    const {
      styles,
      label,
      normalTextLabel,
      largeTextLabel,
      graphicsTextLabel
    } = this.props

    const {
      contrast,
      isValidNormalText,
      isValidLargeText,
      isValidGraphicsText
    } = this.state

    return (
      <div
        {...omitProps(this.props, ColorContrast.allowedProps)}
        ref={this.handleRef}
        css={styles?.colorContrast}
        data-cid="ColorContrast"
      >
        <div css={styles?.label}>
          <Text weight="bold" as="div">
            {label}
          </Text>
        </div>
        <Text size="x-large">{contrast}:1</Text>
        {this.renderPreview()}
        {this.renderStatus(isValidNormalText, normalTextLabel)}
        {this.renderStatus(isValidLargeText, largeTextLabel)}
        {this.renderStatus(isValidGraphicsText, graphicsTextLabel)}
      </div>
    )
  }
}

export { ColorContrast }
export default ColorContrast
