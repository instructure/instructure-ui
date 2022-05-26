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
import Slider from './Slider'
import RGBAInput from './RGBAInput'
import type { ColorMixerProps, ColorMixerState, HSVType } from './props'
import { propTypes, allowedProps } from './props'
import generateStyle from './styles'
import {
  colorTohex8,
  colorToHsva,
  colorToRGB
} from '@instructure/ui-color-utils/src/conversions'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle)
class ColorMixer extends Component<ColorMixerProps, ColorMixerState> {
  static propTypes = propTypes
  static allowedProps = allowedProps

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
    withAlpha: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  private width = 272
  private paletteHeight = 160
  private sliderHeight = 8
  private sliderIndicatiorRadius = 6
  private paletteIndicatiorRadius = 6

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
      this.props.onChange(colorTohex8({ h, s, v, a }))
    }
    if (
      prevProps.value !== this.props.value &&
      colorTohex8({ h, s, v, a }) !== this.props.value
    ) {
      this.setState({
        ...colorToHsva(this.props.value)
      })
    }
  }

  render() {
    const { elementRef, styles, withAlpha } = this.props
    const { h, s, v, a } = this.state
    return (
      <div ref={elementRef} css={styles?.colorMixer}>
        <span aria-label={`${colorTohex8({ h, s, v, a })}`} aria-live="polite">
          <ColorPalette
            width={this.width}
            height={this.paletteHeight}
            indicatorRadius={this.paletteIndicatiorRadius}
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
            isColorSlider
            width={this.width}
            height={this.sliderHeight}
            indicatorRadius={this.sliderIndicatiorRadius}
            value={h}
            color={colorTohex8({ h, s, v, a })}
            onChange={(hue: number) => {
              this.setState({ h: hue })
            }}
          />
          {withAlpha && (
            <Slider
              width={this.width}
              height={this.sliderHeight}
              indicatorRadius={this.sliderIndicatiorRadius}
              color={colorTohex8({ h, s, v })}
              value={a}
              onChange={(opacity) => this.setState({ a: opacity / 100 })}
            ></Slider>
          )}
        </span>
        <RGBAInput
          label="RGBA"
          width={this.width}
          value={colorToRGB({ h, s, v, a })}
          onChange={(color) => this.setState({ ...colorToHsva(color) })}
          withAlpha={withAlpha}
        />
      </div>
    )
  }
}

export { ColorMixer }
export default ColorMixer
