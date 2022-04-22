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
import shallowCompare from '../utils/shallowCompare'
import { SliderProps } from './props'

import generateStyle from './styles'

@withStyle(generateStyle)
class Slider extends Component<SliderProps> {
  sliderRef: HTMLCanvasElement | null = null

  componentDidMount() {
    this.props.makeStyles?.()
    this.props.drawSlider(this.sliderRef!, this.props.width, this.props.height)
  }

  componentDidUpdate(prevProps: SliderProps) {
    this.props.makeStyles?.()
    if (prevProps.color && this.props.color) {
      this.props.drawSlider(
        this.sliderRef!,
        this.props.width,
        this.props.height
      )
    }
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  removeEventListeners() {
    //@ts-expect-error TODO
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.handleChange(e)
    //@ts-expect-error TODO
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX } = e
    const newPosition = this.props.calcSliderPositionFromCursorPosition(
      clientX,
      this.sliderRef!
    )

    this.props.onChange(newPosition)
    this.setState({
      position: newPosition
    })
  }

  handleMouseUp = () => {
    this.removeEventListeners()
  }
  applyBoundaries(x: number) {
    if (x > this.props.width) return this.props.width
    if (x < 0) return 0
    return x
  }
  handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
    const { key } = e
    e.preventDefault()
    let deltaX = 0
    if (key === 'ArrowLeft') {
      deltaX = -2
    }
    if (key === 'ArrowRight') {
      deltaX = 2
    }

    const newPosition = this.applyBoundaries(
      this.props.calcSliderPositionFromValue(this.props.value) + deltaX
    )
    this.props.onChange(newPosition)
  }

  render() {
    return (
      <div
        css={this.props.styles?.colorSlider}
        role="button"
        tabIndex={0}
        onMouseDown={(e) => this.handleMouseDown(e)}
      >
        <div
          role="button"
          tabIndex={0}
          onMouseDown={(e) => this.handleMouseDown(e)}
          css={this.props.styles?.indicator}
        ></div>
        <canvas
          tabIndex={0}
          onKeyDown={(e) => this.handleKeyDown(e)}
          ref={(ref) => {
            this.sliderRef = ref
          }}
          width={this.props.width}
          css={this.props.styles?.canvas}
          height={this.props.height}
        />
      </div>
    )
  }
}

export default Slider
