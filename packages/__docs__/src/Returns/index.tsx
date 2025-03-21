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

import { Table } from '@instructure/ui-table'

import { compileMarkdown } from '../compileMarkdown'

import type { ReturnsProps } from './props'

import type { JSDocFunctionReturns } from '../../buildScripts/DataTypes.mts'

class Returns extends Component<ReturnsProps> {
  renderRows() {
    return this.props.types.map((type, index) => {
      const key = `${type.type}-${index}`
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <code>{this.renderType(type.type)}</code>
          </Table.Cell>
          <Table.Cell>{this.renderDescription(type.description)}</Table.Cell>
        </Table.Row>
      )
    })
  }

  renderType(type: JSDocFunctionReturns['type']) {
    return type ? type.names.join(', ') : null
  }

  renderDescription(description: string) {
    return <div>{description && compileMarkdown(description)}</div>
  }

  render() {
    return (
      <Table caption="Returns" margin="0 0 large">
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="Type">Type</Table.ColHeader>
            <Table.ColHeader id="Description">Description</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    )
  }
}

export default Returns
export { Returns }
