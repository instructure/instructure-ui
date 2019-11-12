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

import { Table } from '@instructure/ui-table'
import { Heading } from '@instructure/ui-heading'
import { PresentationContent } from '@instructure/ui-a11y-content'

import { Description } from '../Description'
import { ColorSwatch } from '../ColorSwatch'

class Theme extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    variables: PropTypes.object.isRequired,
    requirePath: PropTypes.string.isRequired,
    immutable: PropTypes.bool
  }

  static defaultProps = {
    immutable: false
  }

  renderVariable (name, value) {
    return (
      <Table.Row key={name}>
        <Table.Cell>
          <code>{name}</code>
        </Table.Cell>
        <Table.Cell>
          <ColorSwatch color={value} />
          <code>{value}</code>
        </Table.Cell>
      </Table.Row>
    )
  }

  renderRows (section) {
    return Object.keys(section).map((name) => {
      return this.renderVariable(name, section[name])
    })
  }

  renderSection (name, content) {
    return (
      <div>
        <PresentationContent>
          <Heading as="h3" margin="large 0 x-small 0">{name}</Heading>
        </PresentationContent>
        <Table caption={<h3>{name}</h3>} key={name} layout="fixed">
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="Name">Name</Table.ColHeader>
              <Table.ColHeader id="Value">Value</Table.ColHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {content}
          </Table.Body>
        </Table>
      </div>
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
            import { theme } from '${this.props.requirePath}'

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
                color: colors.textBrand
              }
            }

            // define the theme for ${themeKey}:
            generator['${themeKey}'] = function ({ colors }) {
              return {
                color: colors.textLightest
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

export default Theme
export { Theme }
