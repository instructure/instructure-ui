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
 * The above copyrigfht notice and this permission notice shall be included in all
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

import { withStyle, jsx } from '@instructure/emotion'
import { addEventListener, getFontSize } from '@instructure/ui-dom-utils'
import type { HSVType } from '@instructure/ui-color-utils'

import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'

import shallowCompare from '../utils/shallowCompare'

import { propTypes, allowedProps } from './props'
import type { ColorPaletteProps, ColorPaletteState } from './props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
private: true
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
class ColorPalette extends Component<ColorPaletteProps, ColorPaletteState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static readonly componentId = 'ColorMixer.Palette'

  constructor(props: ColorPaletteProps) {
    super(props)
    this.state = {
      colorPosition: { x: 0, y: 0 }
    }
  }

  ref: Element | null = null
  private _paletteRef: HTMLDivElement | null = null
  private _mouseMoveListener?: { remove(): void }
  private _mouseUpListener?: { remove(): void }
  //@ts-expect-error Property 'window' does not exist on type 'ColorPalette'
  private _paletteOffset = (getFontSize(this.window) / 16) * 2

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.state)
    this.setState({
      colorPosition: this.calcPositionFromColor(this.props.color)
    })
  }

  componentDidUpdate(prevProps: ColorPaletteProps) {
    this.props.makeStyles?.(this.state)

    if (shallowCompare(prevProps.color, this.props.color)) {
      this.setState({
        colorPosition: this.calcPositionFromColor(this.props.color)
      })
    }
  }
  componentWillUnmount() {
    this.removeEventListeners()
  }

  get paletteWidth() {
    return this._paletteRef!.getBoundingClientRect().width - this._paletteOffset
  }

  get paletteHeight() {
    return (
      this._paletteRef!.getBoundingClientRect().height - this._paletteOffset
    )
  }
  calcSaturation = (position: number) =>
    Math.round((position / this.paletteWidth) * 100) / 100
  calcLuminance = (position: number) =>
    Math.round(((this.paletteHeight - position) / this.paletteHeight) * 100) /
    100

  calcPositionFromColor(hsv: HSVType) {
    const { s, v } = hsv
    const x = s * this.paletteWidth
    const y = (1 - v) * this.paletteHeight
    return { x, y }
  }

  handlePaletteMouseDown(e: React.MouseEvent<ViewOwnProps, MouseEvent>) {
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

  handleMouseUp = () => {
    this.removeEventListeners()
  }

  removeEventListeners() {
    this._mouseMoveListener?.remove()
    this._mouseUpListener?.remove()
  }

  calcColorPosition(clientX: number, clientY: number) {
    const { x, y } = this._paletteRef!.getBoundingClientRect()

    return this.applyBoundaries(clientX - x, clientY - y)
  }

  applyBoundaries(x: number, y: number) {
    let newXPosition = x
    let newYPosition = y
    if (x > this.paletteWidth) {
      newXPosition = this.paletteWidth
    }
    if (x < 0) {
      newXPosition = 0
    }
    if (y > this.paletteHeight) {
      newYPosition = this.paletteHeight
    }
    if (y < 0) {
      newYPosition = 0
    }
    return { newXPosition, newYPosition }
  }

  handleChange = (e: React.MouseEvent<ViewOwnProps, MouseEvent>) => {
    if (this.props.disabled) return
    const { clientX, clientY } = e
    const { newXPosition, newYPosition } = this.calcColorPosition(
      clientX,
      clientY
    )
    this.setState({
      colorPosition: { x: newXPosition, y: newYPosition }
    })

    this.props.onChange({
      h: this.props.hue,
      s: this.calcSaturation(newXPosition),
      v: this.calcLuminance(newYPosition)
    })
  }

  handleKeyDown(e: React.KeyboardEvent<ViewOwnProps>) {
    if (this.props.disabled) return
    const { key } = e
    if (key === 'Tab') return
    e.preventDefault()
    let deltaX = 0
    let deltaY = 0
    if (key === 'ArrowLeft' || key === 'a') {
      deltaX = -2
    }
    if (key === 'ArrowRight' || key === 'd') {
      deltaX = 2
    }
    if (key === 'ArrowUp' || key === 'w') {
      deltaY = -2
    }
    if (key === 'ArrowDown' || key === 's') {
      deltaY = 2
    }

    const { newXPosition, newYPosition } = this.applyBoundaries(
      this.state.colorPosition.x + deltaX,
      this.state.colorPosition.y + deltaY
    )

    this.setState({
      colorPosition: { x: newXPosition, y: newYPosition }
    })
    this.props.onChange({
      h: this.props.hue,
      s: this.calcSaturation(newXPosition),
      v: this.calcLuminance(newYPosition)
    })
  }

  render() {
    return (
      <View
        elementRef={this.handleRef}
        disabled={this.props.disabled}
        position="relative"
        background="transparent"
        display="inline-block"
        borderRadius="medium"
        borderWidth="0"
        padding="0"
        as="div"
        tabIndex={this.props.disabled ? undefined : 0}
        onKeyDown={(e) => this.handleKeyDown(e)}
        onMouseDown={(e) => this.handlePaletteMouseDown(e)}
        aria-label={this.props.navigationExplanationScreenReaderLabel}
      >
        <div css={this.props.styles?.indicator} />
        {this.props.disabled && (
          <div css={this.props.styles?.disabledOverlay} />
        )}
        <div
          css={this.props.styles?.palette}
          ref={(ref) => {
            this._paletteRef = ref
          }}
        />
      </View>
    )
  }
}

export default ColorPalette
