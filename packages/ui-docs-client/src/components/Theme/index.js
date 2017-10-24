import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '@instructure/ui-core/lib/components/Table'

import Description from '../Description'
import ColorSwatch from '../ColorSwatch'
import CodeEditor from '../CodeEditor'

export default class Theme extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    variables: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    requirePath: PropTypes.string.isRequired,
    immutable: PropTypes.bool
  }

  static defaultProps = {
    immutable: false
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

      if (value && typeof value === 'object') {
        sections.push(this.renderSection(name, this.renderRows(value)))
      } else {
        vars.push(this.renderVariable(name, value))
      }
    })

    const params = this.props.immutable ?
      '/* this theme does not allow overrides */' :
      `{ overrides: { colors: { brand: 'red' } } }`

    return (
      <div>

        {sections}
        {vars.length > 0 && this.renderSection('brand variables', vars)}

        <Description
          id={`${themeKey}ApplicationUsage`}
          content={`
            ### Usage in React applications

            ${'```js'}
            // before mounting your React application:
            import theme from '${this.props.requirePath}'

            theme.use(${params})
            ${'```'}
          `}
          title={`${themeKey} Theme Usage in applications`}
        />


        <Description
          id={`${themeKey}ComponentThemeUsage`}
          content={`
            ### Usage in component themes

            ${'```js'}
            // my-component/theme.js

            // define the default theme:
            export default function generator ({ colors }) {
              return {
                color: colors.brand
              }
            }

            // define the theme for ${themeKey}:
            generator['${themeKey}'] = function ({ colors }) {
              return {
                color: colors.white
              }
            }
            ${'```'}
          `}
          title={`${themeKey} Theme Usage in applications`}
        />
      </div>
    )
  }
}
