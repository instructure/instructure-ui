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

import { MetricGroup, Metric } from '@instructure/ui-metric'
import { Text } from '@instructure/ui-text'
import { ContextView, View } from '@instructure/ui-view'
import { Flex, FlexItem } from '@instructure/ui-flex'
import { Responsive } from '@instructure/ui-responsive'
import { contrast } from '@instructure/ui-color-utils'
import { SimpleSelect } from '@instructure/ui-simple-select'

import { ColorSwatch } from '../ColorSwatch'
import { ColorCard } from '../ColorCard'
import { Heading } from '../Heading'

class ThemeColors extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const first = props.colors[Object.keys(props.colors)[0]]
    this.state = {
      backgroundColor: '#FFFFFF',
      foregroundColor: first,
      contrastRatio: contrast('#FFFFFF', first).toFixed(2)
    }
  }

  renderColorCards() {
    const { colors } = this.props

    return (
      <Responsive
        query={{
          xsmall: { maxWidth: '23rem' },
          small: { minWidth: '23rem' },
          medium: { minWidth: '36rem' },
          large: { minWidth: '50rem' }
        }}
        props={{
          xsmall: { colWidth: `${100 / 1}%`, minimal: true },
          small: { colWidth: `${100 / 2}%`, minimal: true },
          medium: { colWidth: `${100 / 4}%`, minimal: false },
          large: { colWidth: `${100 / 5}%`, minimal: false }
        }}
        render={(props, matches) => {
          const cards = []
          Object.keys(colors).forEach((color, index) => {
            cards.push(
              <ColorCard
                hex={colors[color]}
                name={color}
                minimal={props.minimal}
              />
            )
          })
          return (
            <View as="div" padding="small">
              <Heading level="h3" as="h4">
                theme palette
              </Heading>
              <Flex wrap="wrap">
                {React.Children.map(cards, (child) => (
                  <FlexItem size={props.colWidth} padding="small xx-small">
                    {child}
                  </FlexItem>
                ))}
              </Flex>
            </View>
          )
        }}
      />
    )
  }

  handleContrastChange = (value, which) => {
    let ratio
    if (which === 'background') {
      ratio = contrast(this.state.foregroundColor, value).toFixed(2)
      this.setState({
        backgroundColor: value,
        contrastRatio: ratio
      })
    } else {
      ratio = contrast(this.state.backgroundColor, value).toFixed(2)
      this.setState({
        foregroundColor: value,
        contrastRatio: ratio
      })
    }
  }

  renderContrastChecker() {
    const { colors } = this.props
    const { contrastRatio } = this.state
    const values = []
    const options = Object.keys(colors).map((color) => {
      const val = colors[color]
      if (values.indexOf(val) === -1) {
        values.push(val)
        return (
          <SimpleSelect.Option
            key={color}
            id={val}
            value={val}
            renderBeforeLabel={() => <ColorSwatch color={val} />}
          >
            {color}
          </SimpleSelect.Option>
        )
      }
    })

    const ratio = `${contrastRatio}:1`
    const pass = (
      <Text size="large" color="success">
        PASS
      </Text>
    )
    const fail = (
      <Text size="large" color="danger">
        FAIL
      </Text>
    )

    const normalWCAG = {
      canvascontrast: contrastRatio > 3.0,
      aa: contrastRatio > 4.5
    }

    return (
      <View as="div" padding="small small none">
        <Heading level="h3" as="h4">
          contrast
        </Heading>
        <Flex
          as="div"
          margin="small 0"
          background="default"
          alignItems="center"
          wrap="wrap"
        >
          <FlexItem padding="small">
            <SimpleSelect
              name="color-1"
              defaultValue={this.state.backgroundColor}
              renderLabel="Background Color"
              renderBeforeInput={
                <ColorSwatch color={this.state.backgroundColor} />
              }
              onChange={(e, { value }) =>
                this.handleContrastChange(value, 'background')
              }
            >
              {React.Children.map(options, (option) => option)}
            </SimpleSelect>
          </FlexItem>
          <FlexItem padding="small">
            <SimpleSelect
              name="color-2"
              defaultValue={this.state.foregroundColor}
              renderLabel="Foreground Color"
              renderBeforeInput={
                <ColorSwatch color={this.state.foregroundColor} />
              }
              onChange={(e, { value }) =>
                this.handleContrastChange(value, 'foreground')
              }
            >
              {React.Children.map(options, (option) => option)}
            </SimpleSelect>
          </FlexItem>
          {this.state.contrastRatio && (
            <FlexItem padding="small">
              <ContextView padding="small" placement="center start">
                <MetricGroup>
                  <Metric
                    renderLabel={<div>Contrast Ratio</div>}
                    renderValue={<Text size="large">{ratio}</Text>}
                  />
                  <Metric
                    renderLabel={<div>Canvas 3:1</div>}
                    renderValue={normalWCAG.canvascontrast ? pass : fail}
                  />
                  <Metric
                    renderLabel={<div>WCAG AA</div>}
                    renderValue={normalWCAG.aa ? pass : fail}
                  />
                </MetricGroup>
              </ContextView>
            </FlexItem>
          )}
        </Flex>
      </View>
    )
  }

  render() {
    return (
      <div>
        {this.renderColorCards()}
        {this.renderContrastChecker()}
      </div>
    )
  }
}

export default ThemeColors
export { ThemeColors }
