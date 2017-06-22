import React, { Component } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import Table from 'instructure-ui/lib/components/Table'

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'

import ColorSwatch from '../ColorSwatch'

import styles from './styles.css'

export default class ComponentTheme extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  renderRows () {
    const rows = []
    const { theme } = this.props

    for (const name in theme) { // eslint-disable-line no-restricted-syntax
      const value = theme[name]
      rows.push(
        <tr key={name}>
          <td>
            <code>{name}</code>
          </td>
          <td>
            <ColorSwatch color={value} />
            <code>{value}</code>
          </td>
        </tr>
      )
    }
    return rows
  }

  render () {
    return this.props.theme && Object.keys(this.props.theme).length > 0 ? (
      <div className={styles.root}>
        <Table caption={<ScreenReaderContent>Component theme</ScreenReaderContent>}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </Table>
      </div>
    ) : null
  }
}
