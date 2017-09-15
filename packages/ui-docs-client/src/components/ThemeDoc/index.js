import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'
import Heading from '@instructure/ui-core/lib/components/Heading'

import ColorSwatch from '../ColorSwatch'
import CodeEditor from '../CodeEditor'

export default class ThemeDoc extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
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
      <div key={name}>
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

    for (const name in variables) { // eslint-disable-line no-restricted-syntax
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
import ${themeKey} from '@instructure/ui-themes/${themeKey}'

${themeKey}.use(${params})
`
    return (
      <div>
        <Heading level="h2" margin="0 0 medium 0">
          {key}
        </Heading>
        <div>
          <CodeEditor code={code} readOnly />
        </div>
        {sections}
        {vars.length > 0 && this.renderSection('brand variables', vars)}
      </div>
    )
  }
}
