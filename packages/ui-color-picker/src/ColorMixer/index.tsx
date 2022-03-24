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
import { ColorMixerProps, ColorMixerState, RGBAType, RGBType } from './props'
import shallowCompare from './utils/shallowCompare'
import generateStyle from './styles'

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
      baseColor: { r: 255, g: 0, b: 0 },
      internalColor: { r: 255, g: 0, b: 0 },
      value: { r: 255, g: 0, b: 0, a: 1 }
    }
  }

  static defaultProps = {
    width: 272,
    paletteHeight: 160,
    sliderHeight: 8,
    sliderIndicatiorRadius: 6,
    paletteIndicatiorRadius: 8
  }
  width = 272
  paletteHeight = 160
  sliderHeight = 8
  sliderIndicatiorRadius = 6
  paletteIndicatiorRadius = 8

  componentDidMount() {
    this.props.makeStyles?.(this.state)
    this.setState({ baseColor: this.calcBaseColor(this.props.value) })
  }

  componentDidUpdate(prevProps: ColorMixerProps) {
    this.props.makeStyles?.(this.state)
    if (
      shallowCompare(prevProps.value, this.props.value) &&
      shallowCompare(this.state.internalColor, this.props.value)
    ) {
      this.setState({
        value: this.props.value,
        internalColor: this.props.value,
        baseColor: this.calcBaseColor(this.props.value)
      })
    }
  }

  calcBaseColor(rgba: RGBAType) {
    const { a, ...rgb } = rgba
    const { r, g, b } = rgb

    if (r === g && g === b) {
      return { r: 255, g: 0, b: 0 }
    }

    const sortedList = Object.values(rgb).sort((a, b) => a - b)
    const calcTranslatedValue = (value: number) =>
      (255 * (value - sortedList[0])) / (sortedList[2] - sortedList[0])

    return {
      r: calcTranslatedValue(r),
      g: calcTranslatedValue(g),
      b: calcTranslatedValue(b)
    }
  }
  internalOnChange(color: RGBType) {
    this.setState({ internalColor: color })
    this.props.onChange({ ...color, a: this.props.value.a })
  }
  onOpacityChange = (opacity: number) => {
    this.props.onChange({ ...this.props.value, a: opacity })
  }
  render() {
    const { a, ...rgb } = this.props.value
    return (
      <div css={this.props.styles?.colorMixer}>
        <ColorPalette
          width={this.props.width!}
          height={this.paletteHeight}
          indicatorRadius={this.paletteIndicatiorRadius}
          baseColor={this.state.baseColor}
          color={rgb}
          internalColor={this.state.internalColor}
          onChange={(color: RGBType) => this.internalOnChange(color)}
        />
        <ColorSlider
          width={this.props.width!}
          height={this.sliderHeight}
          indicatorRadius={this.sliderIndicatiorRadius}
          value={this.state.baseColor}
          onChange={(baseColor: RGBType) => {
            this.setState({ baseColor })
          }}
        />
        <OpacitySlider
          width={this.props.width!}
          height={this.sliderHeight}
          indicatorRadius={this.sliderIndicatiorRadius}
          color={rgb}
          value={this.props.value.a}
          onChange={this.onOpacityChange}
        ></OpacitySlider>
        <RGBAInput value={this.props.value} onChange={this.props.onChange} />
      </div>
    )
  }
}

export { ColorMixer }
export default ColorMixer
