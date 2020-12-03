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
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'

import { Heading } from '../Heading'
import { Description } from '../Description'
import { ColorSwatch } from '../ColorSwatch'
import { ThemeColors } from '../ThemeColors'

class Theme extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    variables: PropTypes.object.isRequired,
    requirePath: PropTypes.string.isRequired,
    description: PropTypes.string,
    immutable: PropTypes.bool
  }

  static defaultProps = {
    immutable: false,
    description: undefined
  }

  _colorMap = {}

  mapColors(colorKey) {
    const map = {}
    Object.keys(colorKey).forEach((color) => {
      const hex = colorKey[color]
      if (typeof map[hex] === 'undefined') {
        map[hex] = color
      }
    })
    return map
  }

  renderVariable(name, value) {
    let valueText = value
    let valueColor = ''
    if (typeof value === 'object') {
      valueColor = value.color
      valueText = value.text
    }
    if (
      typeof valueText === 'string' &&
      valueText.charAt(0) === '#' &&
      this._colorMap
    ) {
      valueColor = valueText
      valueText = this._colorMap[valueText]
    }
    return (
      <Table.Row key={name}>
        <Table.Cell>
          <code>{name}</code>
        </Table.Cell>
        <Table.Cell>
          {valueColor.toString().charAt(0) === '#' ? (
            <span>
              <View margin="0 xx-small 0 0">
                <ColorSwatch color={valueColor} />
              </View>
              <code>{valueText}</code>
            </span>
          ) : (
            <code>{valueText}</code>
          )}
        </Table.Cell>
      </Table.Row>
    )
  }

  renderRows(section) {
    return Object.keys(section).map((name) => {
      return this.renderVariable(name, section[name])
    })
  }

  renderTable(name, content, sub = false) {
    const headingElement = sub ? 'h4' : 'h3'
    const headingLevel = sub ? 'h3' : 'h2'
    const margin = sub ? 'small none small' : 'small none large'
    const padding = 'small'
    const label = name + 'variables'
    return (
      <View key={label} as="div" padding={sub ? padding : 'none'}>
        <Heading as={headingElement} level={headingLevel}>
          {name}
        </Heading>
        <View
          as="div"
          background="secondary"
          padding={!sub ? padding : 'none'}
          margin={!sub ? margin : 'small none none'}
          borderRadius="medium"
        >
          <Table caption={label} key={name} layout="fixed">
            <Table.Head>
              <Table.Row>
                <Table.ColHeader id="Name" key="Name">
                  Name
                </Table.ColHeader>
                <Table.ColHeader id="Value" key="value">
                  Value
                </Table.ColHeader>
              </Table.Row>
            </Table.Head>
            <Table.Body>{content}</Table.Body>
          </Table>
        </View>
      </View>
    )
  }

  renderSection(name, data) {
    const subSections = []
    let baseColors = {}
    let newData = Object.assign({}, data)

    if (name === 'colors' && data.values) {
      baseColors = data.values
      delete newData.values

      this._colorMap = this.mapColors(baseColors)
      subSections.push(<ThemeColors colors={baseColors} />)
    }

    Object.keys(newData).forEach((key, index) => {
      const item = data[key]
      if (typeof item === 'object') {
        const subData = {}
        const subKeys = Object.keys(item)
        subKeys.forEach((subKey, i) => {
          const val = item[subKey]
          subData[subKeys[i]] = {
            text: val.charAt(0) === '#' ? this._colorMap[val] : val,
            color: val.charAt(0) === '#' ? val : ''
          }
        })
        // sub categories
        subSections.push(this.renderTable(key, this.renderRows(subData), true))
      }
    })

    if (subSections.length > 0) {
      return (
        <View key={name + 'variables'}>
          <Heading as="h3" level="h2">
            {name}
          </Heading>
          {data.description && (
            <Text size="medium" as="p">
              {data.description}
            </Text>
          )}
          <View
            background="secondary"
            as="div"
            padding="none"
            margin="small none large"
            borderRadius="medium"
          >
            {React.Children.map(subSections, (sub) => sub)}
          </View>
        </View>
      )
    } else {
      return this.renderTable(name, this.renderRows(data))
    }
  }

  render() {
    const sections = []
    const vars = []

    const { themeKey, variables, description } = this.props

    Object.keys(variables).forEach((name) => {
      const value = variables[name]

      if (value && typeof value === 'object') {
        sections.push(this.renderSection(name, value))
      } else {
        vars.push(this.renderVariable(name, value))
      }
    })

    const params = this.props.immutable
      ? '/* this theme does not allow overrides */'
      : `{ overrides: { colors: { brand: 'red' } } }`

    return (
      <div>
        {description && (
          <Text size="medium" as="p">
            {description}
          </Text>
        )}

        {sections}
        {vars.length > 0 && this.renderTable('brand variables', vars)}

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
