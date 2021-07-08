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
/** @jsx jsx */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyle, jsx } from '@instructure/emotion'

import { px } from '@instructure/ui-utils'

import { Table } from '@instructure/ui-table'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { Alert } from '@instructure/ui-alerts'

import { Heading } from '../Heading'
import { Description } from '../Description'
import { ColorSwatch } from '../ColorSwatch'
import { ThemeColors } from '../ThemeColors'

import generateStyle from './styles'
import generateComponentTheme from './theme'

@withStyle(generateStyle, generateComponentTheme)
class Theme extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    variables: PropTypes.object.isRequired,
    requirePath: PropTypes.string.isRequired,
    description: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    description: undefined
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
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
    let convertedValue
    if (typeof value === 'object') {
      convertedValue = value.color
      valueColor = value.color
      valueText = value.text
    }
    if (typeof valueText === 'string') {
      if (valueText.charAt(0) === '#' && this._colorMap) {
        convertedValue = valueText
        valueColor = valueText
        valueText = this._colorMap[valueText]
      } else {
        const values = valueText.split(' ')
        const convertedValues = values.map((value) => {
          return value.slice(-2) === 'em' ? `${px(value)}px` : value
        })
        if (valueText !== convertedValues.join(' ')) {
          convertedValue = convertedValues.join(' ')
        }
      }
    }

    const display = (
      <code>
        {valueText}{' '}
        {convertedValue ? (
          <span css={this.props.styles.convertedValue}>({convertedValue})</span>
        ) : null}
      </code>
    )

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
              {display}
            </span>
          ) : (
            display
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

    return (
      <div>
        {description && (
          <Text size="medium" as="p">
            {description}
          </Text>
        )}

        <Alert margin="large 0">
          The <code>rem</code> values on this page are based on{' '}
          <code>1rem={px('1rem')}px</code>. The <code>rem</code> unit represents
          the font-size of the root <code>&lt;html&gt;</code> element.
        </Alert>

        {sections}
        {vars.length > 0 && this.renderTable('brand variables', vars)}

        <Description
          id={`${themeKey}ApplicationUsage`}
          content={`
            ### Usage in React applications

            ${'```js'}
            // before mounting your React application:
            import { theme } from '${this.props.requirePath}'
            const themeOverrides = { colors: { brand: 'red' } }

            ReactDOM.render(
              <EmotionThemeProvider theme={{ ...theme, ...themeOverrides }}>
                <App />
              </EmotionThemeProvider>,
              element
            )
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

            /**
             * Generates the theme object for the component from the theme and provided additional information
             * @param  {Object} theme The actual theme object.
             * @return {Object} The final theme object with the overrides and component variables
             */
            const generateComponentTheme = (theme) => {
              const { colors, key: themeName } = theme

              // define the theme for ${themeKey}:
              const themeSpecificStyle = {
                '${themeKey}': {
                  color: colors.textLightest
                }
              }

              // define the default theme:
              const componentVariables = {
                color: colors.textBrand
              }

              return {
                ...componentVariables,
                ...themeSpecificStyle[themeName]
              }
            }

            export default generateComponentTheme
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
