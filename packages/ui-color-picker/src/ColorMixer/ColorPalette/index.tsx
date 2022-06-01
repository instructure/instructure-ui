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
import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'
import shallowCompare from '../utils/shallowCompare'
import { ColorPaletteProps, ColorPaletteState } from './props'
import { HSVType } from '../props'
import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
 * ---
 * private: true
 * ---
 * @tsProps
 **/
@withStyle(generateStyle, generateComponentTheme)
class ColorPalette extends Component<ColorPaletteProps, ColorPaletteState> {
  constructor(props: ColorPaletteProps) {
    super(props)
    this.state = {
      colorPosition: { x: 0, y: 0 }
    }
  }
  paletteRef: HTMLDivElement | null = null

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
    return this.paletteRef!.getBoundingClientRect().width
  }

  get paletteHeight() {
    return this.paletteRef!.getBoundingClientRect().height
  }
  calcSaturation = (position: number) =>
    Math.round((position / this.paletteWidth) * 100) / 100
  calcLuminance = (position: number) =>
    Math.round(((this.paletteHeight - position) / this.paletteHeight) * 100) /
    100

  calcPositionFromColor(hsv: HSVType) {
    const { s, v } = hsv
    return {
      x: s * this.paletteWidth,
      y: this.paletteHeight - v * this.paletteHeight
    }
  }
  //TODO remove any
  handlePaletteMouseDown(e: React.MouseEvent<ViewOwnProps, MouseEvent>) {
    this.handleChange(e)
    //TODO remove any
    window.addEventListener('mousemove', this.handleChange as any)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.removeEventListeners()
  }

  removeEventListeners() {
    //TODO remove any
    window.removeEventListener('mousemove', this.handleChange as any)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  calcColorPosition(clientX: number, clientY: number) {
    const { x, y } = this.paletteRef!.getBoundingClientRect()

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

  handleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
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
        disabled={this.props.disabled}
        position="relative"
        width={`${this.props.width / 16}rem`}
        height={`${this.props.height / 16}rem`}
        background="transparent"
        display="inline-block"
        borderRadius="medium"
        borderWidth="0"
        padding="0"
        as="button"
        onKeyDown={(e) => this.handleKeyDown(e)}
        onMouseDown={(e) => this.handlePaletteMouseDown(e)}
      >
        <div css={this.props.styles?.indicator} />
        <div
          css={this.props.styles?.palette}
          ref={(ref) => {
            this.paletteRef = ref
          }}
        />
      </View>
    )
  }
}

export default ColorPalette
