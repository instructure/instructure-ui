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
import { withStyle, jsx } from '@instructure/emotion'
import Slider from '../Slider'
import { OpacitySliderProps } from './props'

class OpacitySlider extends Component<OpacitySliderProps> {
  drawSlider = (ref: HTMLCanvasElement, width: number, height: number) => {
    const ctx = ref.getContext('2d')

    const blockWidth = 4 // width of a block

    const nRow = height / blockWidth // default number of rows
    const nCol = width / blockWidth // default number of columns

    for (let i = 0; i < nRow; ++i) {
      for (let j = 0, col = nCol / 2; j < col; ++j) {
        ctx!.rect(
          2 * j * blockWidth + (i % 2 ? 0 : blockWidth),
          i * blockWidth,
          blockWidth,
          blockWidth
        )
      }
    }

    ctx!.fillStyle = 'lightGrey'
    ctx!.fill()

    const shadeGradient = ctx!.createLinearGradient(this.props.width, 0, 0, 0)
    shadeGradient.addColorStop(
      0,
      `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},1)`
    )
    shadeGradient.addColorStop(
      1,
      `rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},0)`
    )
    ctx!.fillStyle = shadeGradient
    ctx!.fillRect(0, 0, this.props.width, this.props.height)
  }

  calcSliderPositionFromCursorPosition(
    clientX: number,
    sliderRef: HTMLCanvasElement
  ) {
    const { x } = sliderRef.getBoundingClientRect()
    return clientX - x
  }

  calcSliderPositionFromValue = (opacity: number) => {
    return this.props.width - (1 - opacity / 100) * this.props.width
  }

  calcValueFromSliderPosition(position: number) {
    const positionWithBoundaries =
      position < 0
        ? 0
        : position > this.props.width
        ? this.props.width
        : position
    return Math.round((positionWithBoundaries * 100) / this.props.width)
  }

  onChange = (position: number) => {
    this.props.onChange(this.calcValueFromSliderPosition(position))
  }
  render() {
    return (
      <Slider
        width={this.props.width}
        height={this.props.height}
        indicatorRadius={this.props.indicatorRadius}
        color={this.props.color}
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

export default OpacitySlider
