import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from 'instructure-ui/lib/components/Table'
import ColorSwatch from '../ColorSwatch'
import CodeEditor from '../CodeEditor'

import styles from './styles.css'

export default class ThemeDoc extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  renderVariable (name, value) {
    return (
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

  renderRows (section) {
    const rows = []

    for (const name in section) {
      const value = section[name]
      rows.push(this.renderVariable(name, value))
    }

    return rows
  }

  renderSection (name, content) {
    return (
      <div className={styles.section} key={name}>
        <Table caption={<h3>{name}</h3>}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </div>
    )
  }

  render () {
    const sections = []
    const vars = []

    const { theme } = this.props
    const { key, variables } = theme

    for (const name in variables) {
      const value = variables[name]
      if (typeof value === 'object') {
        sections.push(this.renderSection(name, this.renderRows(value)))
      } else {
        vars.push(this.renderVariable(name, value))
      }
    }

    const a11y = (key.indexOf('-a11y') >= 0)
    const themeKey = a11y ? key.split('-')[0] : key
    const params = a11y ? '{ accessible: true }' : `{ overrides: { colors: { brand: 'red' } } }`

    const code = `
// before mounting your React application:
import ${themeKey} from 'instructure-ui/lib/themes/${themeKey}'

${themeKey}.use(${params})
`
    return (
      <div className={styles.root}>
        <h2 className={styles.heading}>
          {key}
        </h2>
        <div className={styles.usage}>
          <CodeEditor readOnly code={code} mode="javascript" />
        </div>
        {sections}
        {vars.length > 0 && this.renderSection('brand variables', vars)}
      </div>
    )
  }
}
