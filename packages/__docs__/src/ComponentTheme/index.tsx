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
import { allowedProps } from './props'
import type { ComponentThemeProps } from './props'

type ThemeEntry = { name: string; value: string | number }

@withStyle(generateStyle, null)
class ComponentTheme extends Component<ComponentThemeProps> {
  static allowedProps = allowedProps

  renderValueCell(value: undefined | string | number) {
    if (!value && value !== 0) {
      return <code>ERROR - possible bug</code>
    }
    if (
      value.toString().charAt(0) === '#' ||
      value.toString().substring(0, 3) === 'rgb'
    ) {
      return (
        <span>
          <View margin="0 xx-small 0 0">
            <ColorSwatch color={value} />
          </View>
          <code>{value}</code>
        </span>
      )
    }
    return <code>{value}</code>
  }

  /**
   * Theme objects can be nested, so we need to walk the tree to get all the
   * keys, e.g., box shadow values
   */
  themeToArray(
    componentTheme: typeof this.props.componentTheme,
    arr: ThemeEntry[],
    prefix: string | undefined = undefined
  ) {
    for (const key in componentTheme) {
      if (typeof componentTheme[key] === 'object') {
        this.themeToArray(componentTheme[key], arr, key)
      } else if (componentTheme[key] !== undefined) {
        const name = prefix ? `${prefix}.${key}` : key
        arr.push({ name: name, value: componentTheme[key] })
      } else {
        console.error(
          `ComponentTheme: Key "${key}" is undefined`,
          componentTheme
        )
      }
    }
    return arr
  }

  renderRows() {
    const { componentTheme } = this.props
    const ret = this.themeToArray(componentTheme, [])
    return ret
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        return (
          <Table.Row key={entry.name}>
            <Table.Cell>
              <code>{entry.name}</code>
            </Table.Cell>
            <Table.Cell>{this.renderValueCell(entry.value)}</Table.Cell>
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
