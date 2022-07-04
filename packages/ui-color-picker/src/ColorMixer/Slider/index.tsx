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
import React, { Component } from 'react'

import { addEventListener } from '@instructure/ui-dom-utils'
import { withStyle, jsx } from '@instructure/emotion'

import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'

import { propTypes, allowedProps } from './props'
import type { SliderProps, SliderStyleProps } from './props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
private: true
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class Slider extends Component<SliderProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static readonly componentId = 'ColorMixer.Slider'

  static defaultProps = {
    isColorSlider: false
  }

  ref: Element | null = null
  private _sliderRef: HTMLDivElement | null = null
  private _mouseMoveListener?: { remove(): void }
  private _mouseUpListener?: { remove(): void }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesProps)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesProps)
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  removeEventListeners() {
    this._mouseMoveListener?.remove()
    this._mouseUpListener?.remove()
  }

  get sliderPositionFromValue() {
    return this.calcSliderPositionFromValue(this.props.value)
  }

  get roundedValue() {
    const { value, maxValue } = this.props

    if (maxValue <= 1) {
      return Math.round(value * 100)
    } else {
      return Math.round(value)
    }
  }

  get makeStylesProps(): SliderStyleProps {
    return {
      sliderPositionFromValue: this.sliderPositionFromValue
    }
  }

  handleMouseDown(e: React.MouseEvent<ViewOwnProps, MouseEvent>) {
    this.handleChange(e)

    this._mouseMoveListener = addEventListener(
      window,
      'mousemove',
      this.handleChange
    )
    this._mouseUpListener = addEventListener(
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
      this._sliderRef!
    )

    this.props.onChange(this.calcValueFromSliderPosition(newPosition))
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
    _sliderRef: HTMLDivElement
  ) => {
    if (this.props.isColorSlider) {
      const { x } = _sliderRef.getBoundingClientRect()
      const newPosition = clientX - x
      return newPosition < 0
        ? 0
        : newPosition > this.props.width
        ? this.props.width - 1
        : newPosition
    } else {
      const { x } = _sliderRef.getBoundingClientRect()
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
      this.sliderPositionFromValue + deltaX
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
        aria-label={this.props.navigationExplanationScreenReaderLabel}
        // TODO: check RangeInput and ProgressBar to see how the slider role can be handled well
        // role="slider"
        // aria-valuemin={this.props.minValue}
        // aria-valuemax={this.props.maxValue}
        // aria-valuenow={this.roundedValue}
      >
        <div css={this.props.styles?.indicator} />
        {this.props.disabled && (
          <div css={this.props.styles?.disabledOverlay} />
        )}
        <div
          ref={(ref) => {
            this._sliderRef = ref
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
