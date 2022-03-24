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
import { withStyle, jsx } from '@instructure/emotion'
import shallowCompare from '../utils/shallowCompare'
import { ColorPaletteProps, ColorPaletteState } from './props'
import { RGBType } from '../props'
import generateStyle from './styles'

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
    this.props.makeStyles?.()
    this.drawPalette(this.props.baseColor)
    this.setState({
      colorPosition: this.calcPositionFromColor(this.props.color)
    })
  }

  componentDidUpdate(prevProps: ColorPaletteProps) {
    this.props.makeStyles?.()
    if (shallowCompare(prevProps.baseColor, this.props.baseColor)) {
      this.drawPalette(this.props.baseColor)
      this.props.onChange(
        this.calcPickedColor(this.state.colorPosition, this.props.baseColor)
      )
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

  drawPalette(baseColor: RGBType) {
    const canvasContext = this.paletteRef!.getContext('2d')

    const colorGradient = canvasContext!.createLinearGradient(
      0,
      0,
      this.props.width,
      0
    )
    colorGradient.addColorStop(0, 'white')
    colorGradient.addColorStop(
      1,
      `rgb(${baseColor.r},${baseColor.g},${baseColor.b})`
    )

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

  calcPickedColor(colorPosition: { x: number; y: number }, baseColor: RGBType) {
    const { x, y } = colorPosition
    const { r, g, b } = baseColor
    const transformedR = Math.round(
      (r + (255 - r) * ((this.props.width - x) / this.props.width)) *
        ((this.props.height - y) / this.props.height)
    )
    const transformedG = Math.round(
      (g + (255 - g) * ((this.props.width - x) / this.props.width)) *
        ((this.props.height - y) / this.props.height)
    )
    const transformedB = Math.round(
      (b + (255 - b) * ((this.props.width - x) / this.props.width)) *
        ((this.props.height - y) / this.props.height)
    )
    return { r: transformedR, g: transformedG, b: transformedB }
  }
  pickedColorRGBString() {
    const { r, g, b } = this.calcPickedColor(
      this.state.colorPosition,
      this.props.baseColor
    )
    return `rgb(${r},${g},${b})`
  }
  calcPositionFromColor(rgb: RGBType) {
    const sortedList = Object.values(rgb).sort((a, b) => a - b)
    const max = sortedList[2]
    const min = sortedList[0]
    const y = Math.round(((255 - max) / 255) * this.props.height)
    const x = Math.round(((max - min) / max) * this.props.width)
    return { x, y }
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
    this.props.onChange(
      this.calcPickedColor(
        { x: newXPosition, y: newYPosition },
        this.props.baseColor
      )
    )
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
    this.props.onChange(
      this.calcPickedColor(
        { x: newXPosition, y: newYPosition },
        this.props.baseColor
      )
    )
  }

  handleColorChange(color: RGBType) {
    this.drawPalette(color)
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
