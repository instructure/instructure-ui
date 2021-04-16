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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { ColorName } from '../ColorName'

class ColorCard extends Component {
  static propTypes = {
    hex: PropTypes.string.isRequired,
    name: PropTypes.string,
    minimal: PropTypes.bool
  }

  static defaultProps = {
    minimal: false,
    name: undefined
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) {
      return
    }
    const rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    return `${rgb.r},${rgb.g},${rgb.b}`
  }

  render() {
    const { name, hex, minimal } = this.props
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
            <Text as="div" size="x-small">
              <strong>HEX:</strong> {hex}
            </Text>
            <Text as="div" size="x-small">
              <strong>RGB:</strong> {this.hexToRgb(hex)}
            </Text>
          </div>
        </div>
      </View>
    )
  }
}

export default ColorCard
export { ColorCard }
