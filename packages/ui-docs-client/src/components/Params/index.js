import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import compileMarkdown from '../../utils/compileMarkdown'

export default class Params extends Component {
  static propTypes = {
    params: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
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
