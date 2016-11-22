import React, { Component, PropTypes } from 'react'
import { Table, ScreenReaderContent } from 'instructure-ui'
import ColorSwatch from '../ColorSwatch'

import styles from './styles.css'

export default class ComponentTheme extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  renderRows () {
    const rows = []
    const { theme } = this.props

    for (const name in theme) {
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
