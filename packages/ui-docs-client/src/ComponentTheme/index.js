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

import { themeable } from '@instructure/ui-themeable'
import { Table } from '@instructure/ui-table'
import { View } from '@instructure/ui-view'

import { ColorSwatch } from '../ColorSwatch'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class ComponentTheme extends Component {
  static propTypes = {
    theme: PropTypes.array.isRequired
  }

  static contextTypes = {
    themeKey: PropTypes.string,
    themes: PropTypes.object
  }

  mapColors (colorKey) {
    const map = {}
    Object.keys(colorKey).forEach((color) => {
      const hex = colorKey[color]
      if (typeof map[hex] === 'undefined') {
        map[hex] = color
      }
    })
    return map
  }

  renderRows () {
    const { theme } = this.props
    const { themes, themeKey } = this.context
    const variables = themes[themeKey].resource.variables
    const colorKey = variables.colors.values ? variables.colors.values : variables.colors
    const map = this.mapColors(colorKey)

    return Object.keys(theme).map((name) => {
      const value = theme[name]
      const color = value.toString().charAt(0) === '#' ? map[value] : null

      return (
        <Table.Row key={name}>
          <Table.Cell>
            <code>{name}</code>
          </Table.Cell>
          <Table.Cell>
            {(value.toString().charAt(0) === '#') ? (
              <span>
                <View margin="0 xx-small 0 0">
                  <ColorSwatch color={value} />
                </View>
                <code>{color}</code>
              </span>
            ) : (value.toString().substring(0, 3) === 'rgb') ? (
              <span>
                <View margin="0 xx-small 0 0">
                  <ColorSwatch color={value} />
                  </View>
                <code>{value}</code>
              </span>
            ) : (
              <code>{value}</code>
            )}
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render () {
    return this.props.theme && Object.keys(this.props.theme).length > 0 ? (
      <div className={styles.root}>
        <Table caption="Component theme">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="name">Name</Table.ColHeader>
              <Table.ColHeader id="value">Value</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {this.renderRows()}
          </Table.Body>
        </Table>
      </div>
    ) : null
  }
}

export default ComponentTheme
export { ComponentTheme }
