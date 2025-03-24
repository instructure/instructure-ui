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

import { Heading } from '../Heading'
import { Table } from '@instructure/ui-table'
import { View } from '@instructure/ui-view'
import { ColorSwatch } from '../ColorSwatch'
import { ColorTableProps } from './props'

class ColorTable extends Component<ColorTableProps> {
  renderRows() {
    const colorMap: Record<string, string> = Object.keys(
      this.props.colorNames
    ).reduce((acc, color) => {
      const hex = this.props.colorNames[color]
      return { ...acc, [hex]: color }
    }, {})

    return Object.keys(this.props.colors).map((key) => (
      <Table.Row key={key}>
        <Table.Cell>
          <code>{key}</code>
        </Table.Cell>
        <Table.Cell>
          <View margin="0 xx-small 0 0">
            <ColorSwatch color={this.props.colors[key]} />
          </View>
          <code>
            {colorMap[this.props.colors[key]]}{' '}
            <span css={{ font: '#334451', fontSize: '0.875rem' }}>
              ({this.props.colors[key]})
            </span>
          </code>
        </Table.Cell>
      </Table.Row>
    ))
  }

  render() {
    const headingElement = 'h3'
    const headingLevel = 'h2'
    const margin = 'small none large'
    const padding = 'small'
    const label = 'name' + 'variables'
    return (
      <View key={label} as="div" padding={'none'}>
        <Heading as={headingElement} level={headingLevel}></Heading>
        <View
          as="div"
          background="secondary"
          padding={padding}
          margin={margin}
          borderRadius="medium"
        >
          <Table caption={label} layout="fixed">
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="Name" key="Name">
                  Name
                </Table.ColHeader>
                <Table.ColHeader id="Value" key="value">
                  Value
                </Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>{this.renderRows()}</Table.Body>
          </Table>
        </View>
      </View>
    )
  }
}

export default ColorTable
export { ColorTable }
