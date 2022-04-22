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
import shallowCompare from '../utils/shallowCompare'
import { ColorPaletteProps, ColorPaletteState } from './props'
import { HSVType } from '../props'
import generateStyle from './styles'

/**
@tsProps
**/
@withStyle(generateStyle)
class ColorPalette extends Component<ColorPaletteProps, ColorPaletteState> {
  constructor(props: ColorPaletteProps) {
    super(props)
    this.state = {
      colorPosition: { x: 0, y: 0 }
    }
  }
  paletteRef: HTMLCanvasElement | null = null

  componentDidMount() {
    this.props.makeStyles?.(this.state)
    this.drawPalette(this.props.hue)
    this.setState({
      colorPosition: this.calcPositionFromColor(this.props.color)
    })
  }

  componentDidUpdate(prevProps: ColorPaletteProps) {
    this.props.makeStyles?.(this.state)
    if (prevProps.hue !== this.props.hue) {
      this.drawPalette(this.props.hue)
      this.props.onChange({
        h: this.props.hue,
        s: this.calcSaturation(this.state.colorPosition.x),
        v: this.calcLuminance(this.state.colorPosition.y)
      })
    }

    if (
      shallowCompare(prevProps.color, this.props.color) &&
      shallowCompare(this.props.internalColor, this.props.color)
    ) {
      this.setState({
        colorPosition: this.calcPositionFromColor(this.props.color)
      })
    }
  }
  componentWillUnmount() {
    this.removeEventListeners()
  }

  drawPalette(hue: number) {
    const canvasContext = this.paletteRef!.getContext('2d')

    const colorGradient = canvasContext!.createLinearGradient(
      0,
      0,
      this.props.width,
      0
    )
    colorGradient.addColorStop(0, 'white')
    colorGradient.addColorStop(1, `hsl(${hue},100%,50%)`)

    canvasContext!.fillStyle = colorGradient
    canvasContext!.fillRect(0, 0, this.props.width, this.props.height)

    const shadeGradient = canvasContext!.createLinearGradient(
      0,
      this.props.height,
      0,
      0
    )
    shadeGradient.addColorStop(0, 'rgba(0,0,0,1)')
    shadeGradient.addColorStop(1, 'rgba(0,0,0,0)')

    canvasContext!.fillStyle = shadeGradient
    canvasContext!.fillRect(0, 0, this.props.width, this.props.height)
  }

  calcSaturation = (position: number) =>
    Math.round((position / this.props.width) * 100) / 100
  calcLuminance = (position: number) =>
    Math.round(((this.props.height - position) / this.props.height) * 100) / 100

  calcPositionFromColor(hsv: HSVType) {
    const { s, v } = hsv
    return {
      x: s * this.props.width,
      y: this.props.height - v * this.props.height
    }
  }

  handlePaletteMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.handleChange(e)
    //TODO
    window.addEventListener('mousemove', this.handleChange as any)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.removeEventListeners()
  }

  removeEventListeners() {
    //TODO
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
    if (x > this.props.width) {
      newXPosition = this.props.width
    }
    if (x < 0) {
      newXPosition = 0
    }
    if (y > this.props.height) {
      newYPosition = this.props.height
    }
    if (y < 0) {
      newYPosition = 0
    }
    return { newXPosition, newYPosition }
  }

  handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
  handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
    e.preventDefault()
    let deltaX = 0
    let deltaY = 0
    if (e.key === 'ArrowLeft') {
      deltaX = -2
    }
    if (e.key === 'ArrowRight') {
      deltaX = 2
    }
    if (e.key === 'ArrowUp') {
      deltaY = -2
    }
    if (e.key === 'ArrowDown') {
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
      <div
        role="button"
        tabIndex={0}
        onMouseDown={(e) => this.handlePaletteMouseDown(e)}
        css={this.props.styles?.ColorPalette}
      >
        <div
          role="button"
          tabIndex={0}
          onMouseDown={(e) => this.handlePaletteMouseDown(e)}
          css={this.props.styles?.indicator}
        ></div>
        <canvas
          css={this.props.styles?.canvas}
          tabIndex={0}
          onKeyDown={(e) => this.handleKeyDown(e)}
          ref={(ref) => {
            this.paletteRef = ref
          }}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

export default ColorPalette
