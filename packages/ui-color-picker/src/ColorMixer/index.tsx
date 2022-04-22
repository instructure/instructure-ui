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
import { Component } from 'react'
import ColorPalette from './ColorPalette'
import ColorSlider from './ColorSlider'
import OpacitySlider from './OpacitySlider'
import RGBAInput from './RGBAInput'
import { ColorMixerProps, ColorMixerState, HSVType } from './props'
import generateStyle from './styles'
import {
  colorTohex8,
  hexToRgb,
  colorToHsva
} from '@instructure/ui-color-utils/src/conversions'

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
      hue: 0,
      internalColor: ''
    }
  }
  static readonly componentId = 'ColorMixer'

  private width = 272
  private paletteHeight = 160
  private sliderHeight = 8
  private sliderIndicatiorRadius = 6
  private paletteIndicatiorRadius = 8

  componentDidMount() {
    this.props.makeStyles?.()
    this.setState({ hue: colorToHsva(this.props.value).h })
  }

  componentDidUpdate(prevProps: ColorMixerProps) {
    this.props.makeStyles?.()

    if (
      prevProps.value !== this.props.value &&
      this.state.internalColor !== this.props.value
    ) {
      this.setState({
        internalColor: colorTohex8(this.props.value),
        hue: colorToHsva(this.props.value).h
      })
    }
  }

  internalOnChange(color: HSVType) {
    const hexColor = colorTohex8({ ...color, a: hexToRgb(this.props.value).a })
    this.setState({ internalColor: hexColor })
    this.props.onChange(hexColor)
  }
  onOpacityChange = (opacity: number) => {
    this.props.onChange(
      colorTohex8({ ...hexToRgb(this.props.value), a: opacity / 100 })
    )
  }
  render() {
    const { a, ...rgb } = hexToRgb(this.props.value)

    return (
      <div css={this.props.styles?.colorMixer}>
        <ColorPalette
          width={this.width}
          height={this.paletteHeight}
          indicatorRadius={this.paletteIndicatiorRadius}
          hue={this.state.hue}
          color={{
            ...colorToHsva(this.props.value),
            h: this.state.hue
          }}
          internalColor={{
            ...colorToHsva(this.state.internalColor),
            h: this.state.hue
          }}
          onChange={(color: HSVType) => this.internalOnChange(color)}
        />
        <ColorSlider
          width={this.width}
          height={this.sliderHeight}
          indicatorRadius={this.sliderIndicatiorRadius}
          value={this.state.hue}
          onChange={(hue: number) => {
            this.setState({ hue })
          }}
        />
        <OpacitySlider
          width={this.width}
          height={this.sliderHeight}
          indicatorRadius={this.sliderIndicatiorRadius}
          color={rgb}
          value={a}
          onChange={this.onOpacityChange}
        ></OpacitySlider>
        <RGBAInput
          value={hexToRgb(this.props.value)}
          onChange={(color) => this.props.onChange(colorTohex8(color))}
        />
      </div>
    )
  }
}

export { ColorMixer }
export default ColorMixer
