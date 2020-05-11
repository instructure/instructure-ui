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
import { expect } from '@instructure/ui-test-utils'

import generateComponentExamples from '../generateComponentExamples'


class TestComponent extends Component {
  render() {
    return React.createElement('span')
  }
}

TestComponent.propTypes = {
  variant: PropTypes.oneOf(['circle', 'rectangle']),
  show: PropTypes.bool,
  message: PropTypes.object,
  children: PropTypes.node
}

TestComponent.defaultProps = {
  variant: 'circle',
  show: true,
  message: null,
  children: null
}

describe('generateComponentExamples', () => {
  it('should work with no propValues defined', () => {
    const config = {
      sectionProp: 'variant',
      getComponentProps: (props) => {
        return { variant: 'circle', show: true }
      },
      getParameters: (page) => {
        return { delay: 200 }
      },
      maxExamples: 500
    }

    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery(['key'])
      .to.deep.equal([
        {
          sectionName: 'circle',
          propName: 'variant',
          propValue: 'circle',
          pages: [
            {
              examples: [
                {
                  Component: TestComponent,
                  componentProps: { variant: 'circle', show: true },
                  exampleProps: {}
                }
              ],
              parameters: { delay: 200 },
              index: 0
            }
          ]
        }
      ])
  })
  it('should work with propValues defined', () => {
    const config = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      getParameters: (page) => {
        return { delay: 200 }
      },
      maxExamples: 500
    }
    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery(['key'])
      .to.deep.equal([
        {
          sectionName: 'circle',
          propName: 'variant',
          propValue: 'circle',
          pages: [
            {
              examples: [
                {
                  Component: TestComponent,
                  componentProps: { variant: 'circle', show: true },
                  exampleProps: {}
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'circle', show: false },
                  exampleProps: {}
                }
              ],
              parameters: { delay: 200 },
              index: 0
            }
          ]
        },
        {
          sectionName: 'rectangle',
          propName: 'variant',
          propValue: 'rectangle',
          pages: [
            {
              examples: [
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: true },
                  exampleProps: {}
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: false },
                  exampleProps: {}
                }
              ],
              parameters: { delay: 200 },
              index: 0
            }
          ]
        }
      ])
  })

  it('should filter', () => {
    const config = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      filter: (props) => props.show === false && props.variant === 'circle'
    }
    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery(['key'])
      .to.deep.equal([
        {
          sectionName: 'circle',
          propName: 'variant',
          propValue: 'circle',
          pages: [
            {
              examples: [
                {
                  Component: TestComponent,
                  componentProps: { variant: 'circle', show: true },
                  exampleProps: {}
                }
              ],
              parameters: {},
              index: 0
            }
          ]
        },
        {
          sectionName: 'rectangle',
          propName: 'variant',
          propValue: 'rectangle',
          pages: [
            {
              examples: [
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: true },
                  exampleProps: {}
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: false },
                  exampleProps: {}
                }
              ],
              parameters: {},
              index: 0
            }
          ]
        }
      ])
  })
})
