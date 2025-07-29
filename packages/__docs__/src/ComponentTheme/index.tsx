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

import { withStyle } from '@instructure/emotion'
import { Table } from '@instructure/ui-table'
import { View } from '@instructure/ui-view'

import { ColorSwatch } from '../ColorSwatch'

import generateStyle from './styles'
import { propTypes, allowedProps } from './props'
import type { ComponentThemeProps } from './props'

@withStyle(generateStyle, null)
class ComponentTheme extends Component<ComponentThemeProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps

  renderValueCell(
    value: undefined | string | object | number,
    colorPrimitives: object
  ) {
    if (!value) {
      return <code>ERROR - possible bug</code>
    }
    if (typeof value === 'object') {
      return <code>{JSON.stringify(value)}</code>
    }
    if (
      value.toString().charAt(0) === '#' ||
      value.toString().substring(0, 3) === 'rgb'
    ) {
      // find color primitive name from hex value
      const color = Object.entries(colorPrimitives).find(([, v]) => v === value)
      return (
        <span>
          <View margin="0 xx-small 0 0">
            <ColorSwatch color={value} />
          </View>
          <code>{color?.[0] ?? value}</code>
        </span>
      )
    }
    return <code>{value}</code>
  }

  renderRows() {
    const { componentTheme, themeVariables } = this.props
    const colorPrimitives = themeVariables.colors.primitives

    return Object.keys(componentTheme)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => {
        return (
          <Table.Row key={name}>
            <Table.Cell>
              <code>{name}</code>
            </Table.Cell>
            <Table.Cell>
              {this.renderValueCell(componentTheme[name], colorPrimitives)}
            </Table.Cell>
          </Table.Row>
        )
      })
  }

  render() {
    const { componentTheme, styles } = this.props

    return componentTheme && Object.keys(componentTheme).length > 0 ? (
      <div css={styles?.componentTheme}>
        <Table caption="Component theme">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="name">Name</Table.ColHeader>
              <Table.ColHeader id="value">Value</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </div>
    ) : null
  }
}

export default ComponentTheme
export { ComponentTheme }
