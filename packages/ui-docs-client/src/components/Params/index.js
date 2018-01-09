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

import Table from '@instructure/ui-elements/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import compileMarkdown from '../../utils/compileMarkdown'

export default class Params extends Component {
  static propTypes = {
    params: PropTypes.array.isRequired
  }

  renderRows () {
    return this.props.params.map((param) => {
      return (
        <tr key={param.name}>
          <td><code>{param.name}</code></td>
          <td><code>{this.renderType(param.type)}</code></td>
          <td><code>{param.defaultvalue}</code></td>
          <td>{this.renderDescription(param.description)}</td>
        </tr>
      )
    })
  }

  renderType (type) {
    return type ? type.names.join(', ') : null
  }

  renderDescription (description) {
    return (
      <div>
        {description && compileMarkdown(description) }
      </div>
    )
  }

  render () {
    return (
      <Table caption={<ScreenReaderContent>Parameters</ScreenReaderContent>}>
        <thead>
          <tr>
            <th scope="col">Param</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </Table>
    )
  }
}
