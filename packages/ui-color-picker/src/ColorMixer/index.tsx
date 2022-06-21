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
import { withStyle, jsx } from '@instructure/emotion'
import { passthroughProps } from '@instructure/ui-react-utils'
import { Component } from 'react'
import ColorPalette from './ColorPalette'
import Slider from './Slider'
import RGBAInput from './RGBAInput'
import type { ColorMixerProps, ColorMixerState, HSVType } from './props'
import generateStyle from './styles'
import {
  colorToHex8,
  colorToHsva,
  colorToRGB
} from '@instructure/ui-color-utils'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle)
class ColorMixer extends Component<ColorMixerProps, ColorMixerState> {
  constructor(props: ColorMixerProps) {
    super(props)
    this.state = {
      h: 0,
      s: 0,
      v: 0,
      a: 1
    }
  }
  static readonly componentId = 'ColorMixer'

  static defaultProps = {
    withAlpha: false,
    disabled: false
  }

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  private width = 272
  private paletteHeight = 160
  private sliderHeight = 8
  private sliderIndicatorRadius = 6
  private paletteIndicatorRadius = 6

  componentDidMount() {
    this.props.makeStyles?.()
    if (this.props.value) {
      this.setState({
        ...colorToHsva(this.props.value)
      })
    }
  }

  componentDidUpdate(prevProps: ColorMixerProps, prevState: ColorMixerState) {
    this.props.makeStyles?.()
    const { h, s, v, a } = this.state
    if (
      prevState.h !== h ||
      prevState.s !== s ||
      prevState.v !== v ||
      prevState.a !== a
    ) {
      this.props.onChange(colorToHex8({ h, s, v, a }))
    }
    if (
      prevProps.value !== this.props.value &&
      colorToHex8({ h, s, v, a }) !== this.props.value
    ) {
      this.setState({
        ...colorToHsva(this.props.value)
      })
    }
  }

  render() {
    const {
      disabled,
      onChange,
      value,
      elementRef,
      styles,
      withAlpha,
      rgbRedInputScreenReaderLabel,
      rgbGreenInputScreenReaderLabel,
      rgbBlueInputScreenReaderLabel,
      rgbAlphaInputScreenReaderLabel,
      ...props
    } = this.props
    const { h, s, v, a } = this.state
    return (
      <div
        {...passthroughProps(props)}
        aria-disabled={disabled}
        ref={this.handleRef}
        css={styles?.colorMixer}
      >
        <span
          css={styles?.sliderAndPaletteContainer}
          aria-label={`${colorToHex8({ h, s, v, a })}`}
          aria-live="polite"
        >
          <ColorPalette
            disabled={disabled}
            width={this.width}
            height={this.paletteHeight}
            indicatorRadius={this.paletteIndicatorRadius}
            hue={h}
            color={{
              h,
              s,
              v
            }}
            onChange={(color: HSVType) => {
              this.setState({ s: color.s, v: color.v })
            }}
          />
          <Slider
            disabled={disabled}
            isColorSlider
            width={this.width}
            height={this.sliderHeight}
            indicatorRadius={this.sliderIndicatorRadius}
            value={h}
            color={colorToHex8({ h, s, v, a })}
            onChange={(hue: number) => {
              this.setState({ h: hue })
            }}
          />
          {withAlpha && (
            <Slider
              disabled={disabled}
              width={this.width}
              height={this.sliderHeight}
              indicatorRadius={this.sliderIndicatorRadius}
              color={colorToHex8({ h, s, v })}
              value={a}
              onChange={(opacity) => this.setState({ a: opacity / 100 })}
            ></Slider>
          )}
        </span>
        <RGBAInput
          disabled={disabled}
          label={withAlpha ? 'RGBA' : 'RGB'}
          width={this.width}
          value={colorToRGB({ h, s, v, a })}
          onChange={(color) => this.setState({ ...colorToHsva(color) })}
          withAlpha={withAlpha}
          rgbRedInputScreenReaderLabel={rgbRedInputScreenReaderLabel}
          rgbGreenInputScreenReaderLabel={rgbGreenInputScreenReaderLabel}
          rgbBlueInputScreenReaderLabel={rgbBlueInputScreenReaderLabel}
          rgbAlphaInputScreenReaderLabel={rgbAlphaInputScreenReaderLabel}
        />
      </div>
    )
  }
}

export { ColorMixer }
export default ColorMixer
