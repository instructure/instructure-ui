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
import { expect, StoryConfig } from '..'

import { generateComponentExamples } from '../utils/generateComponentExamples'

type Props = {
  variant: 'circle' | 'rectangle'
  show: boolean
  message: string | null
  children: null
}

class TestComponent extends Component<Props> {
  static propTypes = {
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    show: PropTypes.bool,
    message: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    variant: 'circle',
    show: true,
    message: null,
    children: null
  }

  render() {
    return React.createElement('span')
  }
}

describe('generateComponentExamples', () => {
  it('should work with no propValues defined', () => {
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      getComponentProps: (_props) => {
        return { variant: 'circle', show: true }
      },
      getParameters: (_page) => {
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
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      getParameters: (_page) => {
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
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      maxExamples: 100,
      filter: (props: Props) => !props.show && props.variant === 'circle'
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

  it('should handle object type config props', () => {
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      propValues: {
        children: [
          <span key={1}>child 1</span>,
          <div key={2}>child 2</div>,
          <h1 key={3}>child 3</h1>
        ]
      },
      maxExamples: 100
    }
    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery([
        'key',
        '$$typeof',
        '_owner',
        'ref',
        'defaultProps',
        'propTypes',
        '_store'
      ])
      .to.deep.equal([
        {
          pages: [
            {
              examples: [
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    children: {
                      props: {
                        children: 'child 1'
                      },
                      type: 'span'
                    }
                  },
                  exampleProps: {}
                },
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    children: {
                      props: {
                        children: 'child 2'
                      },
                      type: 'div'
                    }
                  },
                  exampleProps: {}
                },
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    children: {
                      props: {
                        children: 'child 3'
                      },
                      type: 'h1'
                    }
                  },
                  exampleProps: {}
                }
              ],
              index: 0,
              parameters: {}
            }
          ],
          propName: 'variant',
          propValue: 'Examples',
          sectionName: 'Examples'
        }
      ])
  })

  it('should handle excluded props', () => {
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      excludeProps: ['show'],
      maxExamples: 100
    }
    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery([
        'key',
        '$$typeof',
        '_owner',
        'ref',
        'defaultProps',
        'propTypes',
        '_store'
      ])
      .to.deep.equal([
        {
          pages: [
            {
              examples: [
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    variant: 'circle'
                  },
                  exampleProps: {}
                }
              ],
              index: 0,
              parameters: {}
            }
          ],
          propName: 'variant',
          propValue: 'circle',
          sectionName: 'circle'
        },
        {
          pages: [
            {
              examples: [
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    variant: 'rectangle'
                  },
                  exampleProps: {}
                }
              ],
              index: 0,
              parameters: {}
            }
          ],
          propName: 'variant',
          propValue: 'rectangle',
          sectionName: 'rectangle'
        }
      ])
  })

  it('should handle example props', () => {
    const config: StoryConfig<Props> = {
      sectionProp: 'variant',
      propValues: {
        variant: ['circle', 'rectangle'],
        show: [true, false]
      },
      getExampleProps: (_props) => {
        return { message: 'hello' }
      },
      maxExamples: 100
    }
    expect(generateComponentExamples(TestComponent, config))
      .excludingEvery([
        'key',
        '$$typeof',
        '_owner',
        'ref',
        'defaultProps',
        'propTypes',
        '_store'
      ])
      .to.deep.equal([
        {
          pages: [
            {
              examples: [
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    show: true,
                    variant: 'circle'
                  },
                  exampleProps: {
                    message: 'hello'
                  }
                },
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    show: false,
                    variant: 'circle'
                  },
                  exampleProps: {
                    message: 'hello'
                  }
                }
              ],
              index: 0,
              parameters: {}
            }
          ],
          propName: 'variant',
          propValue: 'circle',
          sectionName: 'circle'
        },
        {
          pages: [
            {
              examples: [
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    show: true,
                    variant: 'rectangle'
                  },
                  exampleProps: {
                    message: 'hello'
                  }
                },
                {
                  Component: {
                    displayName: 'TestComponent'
                  },
                  componentProps: {
                    show: false,
                    variant: 'rectangle'
                  },
                  exampleProps: {
                    message: 'hello'
                  }
                }
              ],
              index: 0,
              parameters: {}
            }
          ],
          propName: 'variant',
          propValue: 'rectangle',
          sectionName: 'rectangle'
        }
      ])
  })
})
