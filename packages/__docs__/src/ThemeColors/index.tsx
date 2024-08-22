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

import { View } from '@instructure/ui-view'
import { Flex } from '@instructure/ui-flex'
import { Responsive } from '@instructure/ui-responsive'
import { contrast } from '@instructure/ui-color-utils'
import { ColorCard } from '../ColorCard'
import { Heading } from '../Heading'

import type { ThemeColorsProps, ThemeColorsState } from './props'

class ThemeColors extends Component<ThemeColorsProps, ThemeColorsState> {
  constructor(props: ThemeColorsProps) {
    super(props)
    const first = props.colors[Object.keys(props.colors)[0]]
    this.state = {
      backgroundColor: '#FFFFFF',
      foregroundColor: first,
      contrastRatio: contrast('#FFFFFF', first).toFixed(2)
    }
  }

  groupColors() {
    const { colors } = this.props

    return Object.keys(colors).reduce((res: any, color) => {
      const category = color
        .split('')
        .reduce(
          (acc: { hadNumber: boolean; res: string[] }, char: any) => {
            if (acc.hadNumber) {
              return acc
            }
            if (isNaN(char)) {
              return { ...acc, res: [...acc.res, char] }
            }
            return { ...acc, hadNumber: true }
          },
          { hadNumber: false, res: [] }
        )
        .res.join('')

      return {
        ...res,
        [category]: [...(res[category] ? res[category] : []), color]
      }
    }, {})
  }

  renderColorCards() {
    const { colors } = this.props
    const colorGroups = this.groupColors()
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
        render={(props) => {
          return (
            <View as="div" padding="small">
              <Heading level="h3" as="h4">
                {this.props.label}
              </Heading>
              {Object.keys(colorGroups).map((colorGroup) => (
                <Flex key={colorGroup} wrap="wrap" margin="0 0 large 0">
                  {colorGroups[colorGroup].map((color: string) => (
                    <Flex.Item
                      key={`${color}-flex`}
                      size={props && props.colWidth}
                      padding="small xx-small"
                    >
                      <ColorCard
                        hex={colors[color]}
                        name={color}
                        minimal={props && props.minimal}
                      />
                    </Flex.Item>
                  ))}
                </Flex>
              ))}
            </View>
          )
        }}
      />
    )
  }

  handleContrastChange = (
    value: string,
    which: 'background' | 'foreground'
  ) => {
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

  render() {
    return <div>{this.renderColorCards()}</div>
  }
}

export default ThemeColors
export { ThemeColors }
