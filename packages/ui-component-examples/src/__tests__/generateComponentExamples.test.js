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

export default class TestComponent extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    show: PropTypes.bool,
    message: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    variant: 'circle',
    show: true,
    message: null
  }

  render () {
    return (
      <span>{this.props.children}</span>
    )
  }
}

/* eslint-disable mocha/no-synchronous-tests */
describe('generateComponentExamples', () => {
  it('should work', () => {
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
                  exampleProps: {},
                  key: '59d40acdc7ae53876cf6f5492ca1dc3f6fbb6084'
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'circle', show: false },
                  exampleProps: {},
                  key: '03541b2f3d348c4f3cc95f12b4b08696a72d3138'
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
                  exampleProps: {},
                  key: '47730c74cfccfd0356a8d8381201f541687ce512'
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: false },
                  exampleProps: {},
                  key: '98a535f4504f6f304545863e0a7474b903fab9db'
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
                  exampleProps: {},
                  key: '59d40acdc7ae53876cf6f5492ca1dc3f6fbb6084'
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
                  exampleProps: {},
                  key: '47730c74cfccfd0356a8d8381201f541687ce512'
                },
                {
                  Component: TestComponent,
                  componentProps: { variant: 'rectangle', show: false },
                  exampleProps: {},
                  key: '98a535f4504f6f304545863e0a7474b903fab9db'
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
/* eslint-enable mocha/no-synchronous-tests */
