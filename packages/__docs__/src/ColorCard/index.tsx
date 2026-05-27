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

import { Component } from 'react'

import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { ColorName } from '../ColorName'
import type { ColorCardProps } from './props'
import { allowedProps } from './props'
class ColorCard extends Component<ColorCardProps> {
  static displayName = 'ColorCard'
  static allowedProps = allowedProps
  static defaultProps = {
    minimal: false
  }

  parseColor(value: string) {
    // 6-digit hex: #RRGGBB
    const hex6 = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)
    if (hex6) {
      return {
        hex: value.toUpperCase(),
        rgb: `${parseInt(hex6[1], 16)},${parseInt(hex6[2], 16)},${parseInt(
          hex6[3],
          16
        )}`
      }
    }
    // 8-digit hex with alpha: #RRGGBBAA
    const hex8 = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      value
    )
    if (hex8) {
      const alpha = Math.round((parseInt(hex8[4], 16) / 255) * 100)
      return {
        hex: value.toUpperCase(),
        rgb: `${parseInt(hex8[1], 16)},${parseInt(hex8[2], 16)},${parseInt(
          hex8[3],
          16
        )}`,
        alpha: `${alpha}%`
      }
    }
    // rgba(r,g,b,a)
    const rgba =
      /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i.exec(
        value
      )
    if (rgba) {
      const alpha =
        rgba[4] !== undefined
          ? `${Math.round(parseFloat(rgba[4]) * 100)}%`
          : undefined
      return { rgb: `${rgba[1]},${rgba[2]},${rgba[3]}`, alpha }
    }
    return null
  }

  render() {
    const { name, hex, minimal } = this.props
    const parsed = this.parseColor(hex)
    return (
      <View
        as="figure"
        key={name}
        background="primary"
        shadow="above"
        display="block"
        margin="0"
        padding="small"
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              background: hex,
              width: minimal ? '1rem' : '100%',
              height: minimal ? '100%' : '6rem',
              position: minimal ? 'absolute' : 'static',
              margin: '0 0 2px'
            }}
          />
          <div style={minimal ? { paddingLeft: '1.5rem' } : {}}>
            <ColorName
              as="figcaption"
              lineHeight="double"
              name={name.charAt(0).toUpperCase() + name.slice(1)}
            />
            {parsed?.hex && (
              <Text as="div" size="x-small">
                <strong>HEX:</strong> {parsed.hex}
              </Text>
            )}
            {parsed?.rgb && (
              <Text as="div" size="x-small">
                <strong>RGB:</strong> {parsed.rgb}
              </Text>
            )}
            {parsed?.alpha && (
              <Text as="div" size="x-small">
                <strong>Alpha:</strong> {parsed.alpha}
              </Text>
            )}
          </div>
        </div>
      </View>
    )
  }
}

export default ColorCard
export { ColorCard }
