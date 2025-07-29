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
import type { ParamsProps } from './props'
import { propTypes } from './props'
import { Heading } from '@instructure/ui-heading'

class Params extends Component<ParamsProps> {
  static propTypes = propTypes

  static defaultProps = {
    layout: 'small'
  }

  renderRows(hasDefault: boolean) {
    return this.props.params?.map((param) => {
      return (
        <Table.Row key={param.name}>
          <Table.Cell>
            <code>{param.name}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{param?.type}</code>
          </Table.Cell>
          {hasDefault && (
            <Table.Cell>
              <code>{param?.defaultValue}</code>
            </Table.Cell>
          )}
          <Table.Cell>{this.renderDescription(param.description)}</Table.Cell>
        </Table.Row>
      )
    })
  }

  renderDescription(description?: string) {
    return <div>{description && compileMarkdown(description)}</div>
  }

  renderGenericRows() {
    return this.props.genericParameters?.map((param) => {
      return (
        <Table.Row key={param.name}>
          <Table.Cell>
            <code>{param.name}</code>
          </Table.Cell>
          <Table.Cell>
            <code>{param?.defaultValue}</code>
          </Table.Cell>
          <Table.Cell>{param?.constraint}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const { layout, genericParameters } = this.props
    let genericParamsTable = <></>
    if (genericParameters) {
      genericParamsTable = (
        <>
          <Heading
            level="h3"
            as="h4"
            id="genericParameters"
            margin="0 0 small 0"
          >
            Generic type Parameters
          </Heading>
          <Table
            caption="Parameters"
            margin="0 0 large"
            layout={layout === 'small' ? 'stacked' : 'auto'}
          >
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="genericParam">Param</Table.ColHeader>
                <Table.ColHeader id="genericDefault">Default</Table.ColHeader>
                <Table.ColHeader id="genericConstraint">
                  Constraint
                </Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>{this.renderGenericRows()}</Table.Body>
          </Table>
        </>
      )
    }
    let hasDefault = false
    if (this.props.params) {
      for (const param of this.props.params) {
        if (param.defaultValue) {
          hasDefault = true
          break
        }
      }
    }
    return (
      <>
        <Table
          caption="Parameters"
          margin="0 0 large"
          layout={layout === 'small' ? 'stacked' : 'auto'}
        >
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Param">Param</Table.ColHeader>
              <Table.ColHeader id="Type">Type</Table.ColHeader>
              {hasDefault && (
                <Table.ColHeader id="Default">Default</Table.ColHeader>
              )}
              <Table.ColHeader id="Description">Description</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>{this.renderRows(hasDefault)}</Table.Body>
        </Table>
        {genericParamsTable}
      </>
    )
  }
}

export default Params
export { Params }
