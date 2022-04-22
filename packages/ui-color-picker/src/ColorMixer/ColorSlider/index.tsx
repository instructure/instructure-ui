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
import { Component } from 'react'
import { jsx } from '@instructure/emotion'
import Slider from '../Slider'
import { ColorSliderProps } from './props'
import { RGBType } from '../props'

class ColorSlider extends Component<ColorSliderProps> {
  drawSlider(ref: HTMLCanvasElement, width: number, height: number) {
    const ctx = ref.getContext('2d')
    const colorGradient = ctx!.createLinearGradient(0, 0, width, 0)
    colorGradient.addColorStop(0, 'rgb(255,0,0)')
    colorGradient.addColorStop(0.1666666, 'rgb(255,255,0)')
    colorGradient.addColorStop(0.3333333, 'rgb(0,255,0)')
    colorGradient.addColorStop(0.5, 'rgb(0,255,255)')
    colorGradient.addColorStop(0.6666666, 'rgb(0,0,255')
    colorGradient.addColorStop(0.8333333, 'rgb(255,0,255)')
    colorGradient.addColorStop(1, 'rgb(255,0,0)')
    ctx!.fillStyle = colorGradient
    ctx!.fillRect(0, 0, width, height)
  }

  calcSliderPositionFromCursorPosition = (
    clientX: number,
    sliderRef: HTMLCanvasElement
  ) => {
    const { x } = sliderRef.getBoundingClientRect()
    const newPosition = clientX - x
    return newPosition < 0
      ? 0
      : newPosition > this.props.width
      ? this.props.width - 1
      : newPosition
  }

  // calcSliderPositionFromValue = (color: RGBType) => {
  //   const { r, g, b } = color
  //   const segmentWidth = this.props.width / 6
  //   if (r === 255 && b === 0) {
  //     return (segmentWidth * g) / 255
  //   }
  //   if (g === 255 && b === 0) {
  //     return segmentWidth + (segmentWidth * (255 - r)) / 255
  //   }
  //   if (g === 255 && r === 0) {
  //     return 2 * segmentWidth + (segmentWidth * b) / 255
  //   }
  //   if (b === 255 && r === 0) {
  //     return 3 * segmentWidth + (segmentWidth * (255 - g)) / 255
  //   }
  //   if (b === 255 && g === 0) {
  //     return 4 * segmentWidth + (segmentWidth * r) / 255
  //   }
  //   if (r === 255 && g === 0) {
  //     return 5 * segmentWidth + (segmentWidth * (255 - b)) / 255
  //   }
  //   return
  // }
  // calcValueFromSliderPosition = (position: number) => {
  //   const ratio = position / this.props.width
  //   const relativeRatio = ratio * 6 - Math.floor(ratio * 6)
  //   if (ratio < 1 / 6) {
  //     return {
  //       r: 255,
  //       g: Math.round(relativeRatio * 255),
  //       b: 0
  //     }
  //   } else if (ratio < 2 / 6) {
  //     return {
  //       r: Math.round((1 - relativeRatio) * 255),
  //       g: 255,
  //       b: 0
  //     }
  //   } else if (ratio < 0.5) {
  //     return {
  //       r: 0,
  //       g: 255,
  //       b: Math.round(relativeRatio * 255)
  //     }
  //   } else if (ratio < 4 / 6) {
  //     return {
  //       r: 0,
  //       g: Math.round((1 - relativeRatio) * 255),
  //       b: 255
  //     }
  //   } else if (ratio < 5 / 6) {
  //     return {
  //       r: Math.round(relativeRatio * 255),
  //       g: 0,
  //       b: 255
  //     }
  //   } else if (ratio === 1) {
  //     return {
  //       r: 255,
  //       g: 0,
  //       b: 1
  //     }
  //   } else {
  //     return {
  //       r: 255,
  //       g: 0,
  //       b: Math.round((1 - relativeRatio) * 255)
  //     }
  //   }
  // }
  calcSliderPositionFromValue = (hue: number) => (hue / 360) * this.props.width
  calcValueFromSliderPosition = (position: number) =>
    (position / this.props.width) * 360

  onChange = (position: number) => {
    this.props.onChange(this.calcValueFromSliderPosition(position))
  }

  render() {
    return (
      <Slider
        width={this.props.width}
        height={this.props.height}
        indicatorRadius={this.props.indicatorRadius}
        //@ts-expect-error TODO
        calcSliderPositionFromValue={this.calcSliderPositionFromValue}
        calcSliderPositionFromCursorPosition={
          this.calcSliderPositionFromCursorPosition
        }
        drawSlider={this.drawSlider}
        value={this.props.value}
        onChange={this.onChange}
      />
    )
  }
}
export { ColorSlider }
export default ColorSlider
