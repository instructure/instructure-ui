import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import compileMarkdown from '../../utils/compileMarkdown'

export default class Methods extends Component {
  static propTypes = {
    methods: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  }

  renderRows () {
    const methods = this.props.methods || []

    return methods.map((method) => {
      return (
        <tr key={method.name}>
          <td><code>{method.name}</code></td>
          <td><code>{this.renderParams(method.params)}</code></td>
          <td><code>{this.renderReturns(method.returns)}</code></td>
          <td>{this.renderDescription(method.docblock)}</td>
        </tr>
      )
    })
  }

  renderType (type) {
    return type ? type.names.join(', ') : null
  }

  renderParams (params) {
    return params && params.map(param => param.name).join(', ')
  }

  renderReturns (returns) {
    return returns && returns.map(ret => this.renderType(ret.type)).join(', ')
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
            <th scope="col">Name</th>
            <th scope="col">Params</th>
            <th scope="col">Returns</th>
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
