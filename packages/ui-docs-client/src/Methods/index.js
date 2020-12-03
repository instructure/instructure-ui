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

class Methods extends Component {
  static propTypes = {
    methods: PropTypes.array.isRequired
  }

  renderRows() {
    const methods = this.props.methods || []

    return methods.map((method) => {
      return (
        <Table.Row key={method.name}>
          <Table.Cell>
            <code>{method.name}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{this.renderParams(method.params)}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{this.renderReturns(method.returns)}</code>
          </Table.Cell>
          <Table.Cell>{this.renderDescription(method.docblock)}</Table.Cell>
        </Table.Row>
      )
    })
  }

  renderType(type) {
    return type ? type.names.join(', ') : null
  }

  renderParams(params) {
    return params && params.map((param) => param.name).join(', ')
  }

  renderReturns(returns) {
    return returns && returns.map((ret) => this.renderType(ret.type)).join(', ')
  }

  renderDescription(description) {
    return <div>{description && compileMarkdown(description)}</div>
  }

  render() {
    return (
      <Table caption="Parameters">
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="Name">Name</Table.ColHeader>
            <Table.ColHeader id="Params">Params</Table.ColHeader>
            <Table.ColHeader id="Returns">Returns</Table.ColHeader>
            <Table.ColHeader id="Description">Description</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    )
  }
}

export default Methods
export { Methods }
