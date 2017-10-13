import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'

import ColorSwatch from '../ColorSwatch'
import CodeEditor from '../CodeEditor'

export default class Theme extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    variables: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
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

    for (const name in section) { // eslint-disable-line no-restricted-syntax
      const value = section[name]
      rows.push(this.renderVariable(name, value))
    }

    return rows
  }

  renderSection (name, content) {
    return (
      <Table caption={<h3>{name}</h3>} key={name}>
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
    )
  }

  render () {
    const sections = []
    const vars = []

    const { themeKey, variables } = this.props

    Object.keys(variables).forEach((name) => {
      const value = variables[name]

      if (typeof value === 'object') {
        sections.push(this.renderSection(name, this.renderRows(value)))
      } else {
        vars.push(this.renderVariable(name, value))
      }
    })

    const a11y = (themeKey.indexOf('-a11y') >= 0)
    const themeBaseName = a11y ? themeKey.split('-')[0] : themeKey
    const params = a11y ? '{ accessible: true }' : `{ overrides: { colors: { brand: 'red' } } }`

    const code = `
// before mounting your React application:
import theme from '@instructure/ui-themes/${themeBaseName}'

theme.use(${params})
`
    return (
      <div>
        <CodeEditor label={`${themeKey} Theme Usage`} code={code} readOnly />
        {sections}
        {vars.length > 0 && this.renderSection('brand variables', vars)}
      </div>
    )
  }
}
