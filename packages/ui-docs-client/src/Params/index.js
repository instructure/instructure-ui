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

import { Table } from '@instructure/ui-table'

import { compileMarkdown } from '../compileMarkdown'

class Params extends Component {
  static propTypes = {
    params: PropTypes.array.isRequired,
    layout: PropTypes.string
  }

  static defaultProps = {
    layout: 'small'
  }

  renderRows() {
    return this.props.params.map((param) => {
      return (
        <Table.Row key={param.name}>
          <Table.Cell>
            <code>{param.name}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{this.renderType(param.type)}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{param.defaultvalue}</code>
          </Table.Cell>
          <Table.Cell>{this.renderDescription(param.description)}</Table.Cell>
        </Table.Row>
      )
    })
  }

  renderType(type) {
    return type ? type.names.join(', ') : null
  }

  renderDescription(description) {
    return <div>{description && compileMarkdown(description)}</div>
  }

  render() {
    const { layout } = this.props

    return (
      <Table
        caption="Parameters"
        margin="0 0 large"
        layout={layout === 'small' ? 'stacked' : 'auto'}
      >
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="Param">Param</Table.ColHeader>
            <Table.ColHeader id="Type">Type</Table.ColHeader>
            <Table.ColHeader id="Default">Default</Table.ColHeader>
            <Table.ColHeader id="Description">Description</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    )
  }
}

export default Params
export { Params }
