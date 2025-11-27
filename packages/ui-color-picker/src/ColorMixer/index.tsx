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

import { withStyleRework as withStyle } from '@instructure/emotion'
import { omitProps } from '@instructure/ui-react-utils'
import { isValid } from '@instructure/ui-color-utils'
import conversions from '@instructure/ui-color-utils'
import { logWarn as warn } from '@instructure/console'
import type { HSVType } from '@instructure/ui-color-utils'
import ColorPalette from './ColorPalette'
import Slider from './Slider'
import RGBAInput from './RGBAInput'

import type { ColorMixerProps, ColorMixerState } from './props'
import { allowedProps } from './props'
import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
class ColorMixer extends Component<ColorMixerProps, ColorMixerState> {
  static allowedProps = allowedProps
  static readonly componentId = 'ColorMixer'

  static defaultProps = {
    value: '#000',
    withAlpha: false,
    disabled: false
  }

  constructor(props: ColorMixerProps) {
    super(props)
    this.state = {
      h: 0,
      s: 0,
      v: 0,
      a: 1
    }
  }

  ref: HTMLDivElement | null = null

  private _width = 272
  private _paletteHeight = 160
  private _sliderHeight = 8
  private _sliderIndicatorRadius = 6
  private _paletteIndicatorRadius = 6

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    warn(
      isValid(this.props.value!),
      `[ColorMixer] The passed color value is not valid.`
    )
    this.setState({
      ...conversions.colorToHsva(this.props.value!)
    })
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
      this.props.onChange(conversions.colorToHex8({ h, s, v, a }))
    }
    if (
      prevProps.value !== this.props.value &&
      conversions.colorToHex8({ h, s, v, a }) !== this.props.value
    ) {
      this.setState({
        ...conversions.colorToHsva(this.props.value!)
      })
    }
  }

  render() {
    const {
      disabled,
      styles,
      withAlpha,
      rgbRedInputScreenReaderLabel,
      rgbGreenInputScreenReaderLabel,
      rgbBlueInputScreenReaderLabel,
      rgbAlphaInputScreenReaderLabel,
      colorSliderNavigationExplanationScreenReaderLabel,
      alphaSliderNavigationExplanationScreenReaderLabel,
      colorPaletteNavigationExplanationScreenReaderLabel
    } = this.props

    const { h, s, v, a } = this.state

    return (
      <div
        {...omitProps(this.props, ColorMixer.allowedProps)}
        aria-disabled={disabled}
        ref={this.handleRef}
        css={styles?.colorMixer}
        data-cid="ColorMixer"
      >
        <span
          css={styles?.sliderAndPaletteContainer}
          aria-label={`${conversions.colorToHex8({ h, s, v, a })}`}
          aria-live="polite"
        >
          <ColorPalette
            disabled={disabled}
            width={this._width}
            height={this._paletteHeight}
            indicatorRadius={this._paletteIndicatorRadius}
            hue={h}
            color={{
              h,
              s,
              v
            }}
            onChange={(color: HSVType) => {
              this.setState({ s: color.s, v: color.v })
            }}
            navigationExplanationScreenReaderLabel={
              colorPaletteNavigationExplanationScreenReaderLabel
            }
          />
          <Slider
            disabled={disabled}
            isColorSlider
            width={this._width}
            height={this._sliderHeight}
            indicatorRadius={this._sliderIndicatorRadius}
            value={h}
            minValue={0}
            maxValue={359}
            color={conversions.colorToHex8({ h, s, v, a })}
            onChange={(hue: number) => {
              this.setState({ h: hue })
            }}
            navigationExplanationScreenReaderLabel={
              colorSliderNavigationExplanationScreenReaderLabel
            }
          />
          {withAlpha && (
            <Slider
              disabled={disabled}
              width={this._width}
              height={this._sliderHeight}
              indicatorRadius={this._sliderIndicatorRadius}
              color={conversions.colorToHex8({ h, s, v })}
              value={a}
              minValue={0}
              maxValue={1}
              onChange={(opacity) => this.setState({ a: opacity / 100 })}
              navigationExplanationScreenReaderLabel={
                alphaSliderNavigationExplanationScreenReaderLabel
              }
            />
          )}
        </span>
        <RGBAInput
          disabled={disabled}
          label={withAlpha ? 'RGBA' : 'RGB'}
          width={this._width}
          value={conversions.colorToRGB({ h, s, v, a })}
          onChange={(color) =>
            this.setState({ ...conversions.colorToHsva(color) })
          }
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
