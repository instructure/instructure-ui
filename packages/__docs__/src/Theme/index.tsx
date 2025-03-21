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
import { withStyle } from '@instructure/emotion'

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

import { ThemeProps } from './props'
import { BaseTheme, Colors, Primitives } from '@instructure/shared-types'

type valueof<X> = X[keyof X]

@withStyle(generateStyle, generateComponentTheme)
class Theme extends Component<ThemeProps> {
  static defaultProps = {
    description: undefined
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  _colorMap: Record<string, string> = {}

  mapColors(colorKey: Record<string, string>) {
    const map: Record<string, string> = {}
    Object.keys(colorKey).forEach((color) => {
      const hex = colorKey[color]
      if (typeof map[hex] === 'undefined') {
        map[hex] = color
      }
    })
    return map
  }

  renderVariable(
    name: string,
    value: string | number | { text: string; color: string }
  ) {
    let valueText: string
    let valueColor = ''
    let convertedValue
    if (typeof value === 'object') {
      convertedValue = value.color
      valueColor = value.color
      valueText = value.text
    } else if (typeof value === 'string') {
      valueText = value
    } else {
      valueText = String(value)
    }
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

    const display = (
      <code>
        {valueText}{' '}
        {convertedValue ? (
          <span css={this.props?.styles?.convertedValue}>
            ({convertedValue})
          </span>
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

  renderRows(
    section: Record<string, string | number | { text: string; color: string }>
  ) {
    return Object.keys(section).map((name) => {
      return this.renderVariable(name, section[name])
    })
  }

  renderTable(name: string, content: React.ReactElement[], sub = false) {
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

  renderSection(name: string, data: valueof<BaseTheme>) {
    const subSections = []
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    let baseColors: Primitives | {} = {}
    const newData = Object.assign({}, data)
    if (name === 'colors' && (data as Colors).primitives) {
      baseColors = (data as Colors).primitives
      this._colorMap = this.mapColors({
        ...baseColors,
        ...(data as Colors).additionalPrimitives
      })
      subSections.push(<ThemeColors colors={baseColors} label="primitives" />)
    }
    Object.keys(newData).forEach((key) => {
      //primitives are the color palette above
      if (
        key === 'primitives' ||
        key === 'additionalPrimitives' ||
        key === 'dataVisualization'
      ) {
        return
      }
      // @ts-ignore TODO type later
      const item = data![key]

      if (typeof item === 'object') {
        const subData: Record<string, { text: string; color: string }> = {}
        const subKeys = Object.keys(item) as string[]
        subKeys.forEach((subKey, i) => {
          const val: string = item[subKey]
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
      return this.renderTable(name, this.renderRows(data as any))
    }
  }

  render() {
    const sections: React.ReactElement[] = []

    const { themeKey, variables } = this.props

    const sortedKeys = Object.keys(variables).sort((a, b) =>
      a === 'colors' ? -1 : b === 'colors' ? 1 : 0
    ) as Array<keyof BaseTheme>
    for (const name of sortedKeys) {
      const value = variables[name]
      if (value && typeof value === 'object') {
        sections.push(this.renderSection(name, value))
      }
    }

    return (
      <div>
        {variables.description && (
          <Text size="medium" as="p">
            {variables.description}
          </Text>
        )}

        <Alert margin="large 0">
          The <code>rem</code> values on this page are based on{' '}
          <code>1rem={px('1rem')}px</code>. The <code>rem</code> unit represents
          the font-size of the root <code>&lt;html&gt;</code> element.
        </Alert>

        {sections}

        <Description
          id={`${themeKey}ApplicationUsage`}
          content={`
### Usage (before mounting your application)
##### (DEPRECATED) Global theming
${'```javascript\n \
---\n \
type: code\n \
---'}
import { theme } from '${this.props.requirePath}'

theme.use({ overrides: { colors: { brand: 'red' } }})

${'```'}

##### Application level theming
${'```javascript\n \
---\n \
type: code\n \
---'}
import { theme } from '${this.props.requirePath}'
const themeOverrides = { colors: { brand: 'red' } }

ReactDOM.render(
  <InstUISettingsProvider theme={{ ...theme, ...themeOverrides }}>
    <App />
  </InstUISettingsProvider>,
  element
)
${'```'}


> You can read more about how our theming system works and how to use it [here](/#using-theme-overrides)
          `}
          title={`${themeKey} Theme Usage in applications`}
        />

        <Description
          id={`${themeKey}ComponentThemeUsage`}
          content={`
### Usage in component themes

${'```javascript\n \
---\n \
type: code\n \
---'}
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
