import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'

import compileMarkdown from '../../utils/compileMarkdown'

export default class Returns extends Component {
  static propTypes = {
    types: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  }

  renderRows () {
    return this.props.types.map((type, index) => {
      const key = `${type.type}-${index}`
      return (
        <tr key={key}>
          <td><code>{this.renderType(type.type)}</code></td>
          <td>{this.renderDescription(type.description)}</td>
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
      <Table caption={<ScreenReaderContent>Returns</ScreenReaderContent>}>
        <thead>
          <tr>
            <th scope="col">Type</th>
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
