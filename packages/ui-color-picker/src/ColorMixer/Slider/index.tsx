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
import { View } from '@instructure/ui-view'
import { addEventListener } from '@instructure/ui-dom-utils'
import type { ViewOwnProps } from '@instructure/ui-view'
import type { SliderProps } from './props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
 * ---
 * private: true
 * ---
 * @tsProps
 **/
@withStyle(generateStyle, generateComponentTheme)
class Slider extends Component<SliderProps> {
  sliderRef: HTMLDivElement | null = null

  static defaultProps = {
    isColorSlider: false
  }

  ref: Element | null = null
  mouseMoveListener?: { remove(): void }
  mouseUpListener?: { remove(): void }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }
  componentDidMount() {
    this.props.makeStyles?.({
      calcSliderPositionFromValue: this.calcSliderPositionFromValue
    })
  }

  componentDidUpdate() {
    this.props.makeStyles?.({
      calcSliderPositionFromValue: this.calcSliderPositionFromValue
    })
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  removeEventListeners() {
    this.mouseMoveListener?.remove()
    this.mouseUpListener?.remove()
  }

  handleMouseDown(e: React.MouseEvent<ViewOwnProps, MouseEvent>) {
    this.handleChange(e)

    this.mouseMoveListener = addEventListener(
      window,
      'mousemove',
      this.handleChange
    )
    this.mouseUpListener = addEventListener(
      window,
      'mouseup',
      this.handleMouseUp
    )
  }

  handleChange = (e: React.MouseEvent<ViewOwnProps, MouseEvent>) => {
    if (this.props.disabled) return
    const { clientX } = e
    const newPosition = this.calcSliderPositionFromCursorPosition(
      clientX,
      this.sliderRef!
    )

    this.props.onChange(this.calcValueFromSliderPosition(newPosition))
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
  calcSliderPositionFromCursorPosition = (
    clientX: number,
    sliderRef: HTMLDivElement
  ) => {
    if (this.props.isColorSlider) {
      const { x } = sliderRef.getBoundingClientRect()
      const newPosition = clientX - x
      return newPosition < 0
        ? 0
        : newPosition > this.props.width
        ? this.props.width - 1
        : newPosition
    } else {
      const { x } = sliderRef.getBoundingClientRect()
      return clientX - x
    }
  }
  calcSliderPositionFromValue = (value: number) => {
    if (this.props.isColorSlider) {
      return (value / 360) * this.props.width
    } else {
      return this.props.width - (1 - value) * this.props.width
    }
  }

  calcValueFromSliderPosition = (position: number) => {
    if (this.props.isColorSlider) {
      return (position / this.props.width) * 360
    } else {
      const positionWithBoundaries =
        position < 0
          ? 0
          : position > this.props.width
          ? this.props.width
          : position
      return Math.round((positionWithBoundaries * 100) / this.props.width)
    }
  }

  handleKeyDown(e: React.KeyboardEvent<ViewOwnProps>) {
    const { key } = e
    if (key === 'Tab') return
    e.preventDefault()
    let deltaX = 0
    if (key === 'ArrowLeft' || key === 'a') {
      deltaX = -2
    }
    if (key === 'ArrowRight' || key === 'd') {
      deltaX = 2
    }

    const newPosition = this.applyBoundaries(
      this.calcSliderPositionFromValue(this.props.value) + deltaX
    )
    this.props.onChange(this.calcValueFromSliderPosition(newPosition))
  }

  render() {
    return (
      <View
        elementRef={this.handleRef}
        disabled={this.props.disabled}
        position="relative"
        background="transparent"
        margin="small 0 0 0"
        display="inline-block"
        borderRadius="medium"
        borderWidth="0"
        padding="0"
        as="div"
        onKeyDown={(e) => this.handleKeyDown(e)}
        onMouseDown={(e) => this.handleMouseDown(e)}
        tabIndex={this.props.disabled ? undefined : 0}
      >
        <div css={this.props.styles?.indicator} />
        {this.props.disabled && (
          <div css={this.props.styles?.disabledOverlay} />
        )}
        <div
          ref={(ref) => {
            this.sliderRef = ref
          }}
          css={this.props.styles?.sliderBackground}
        >
          <div css={this.props.styles?.slider} />
        </div>
      </View>
    )
  }
}

export default Slider
