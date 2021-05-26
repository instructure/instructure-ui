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

import { expect } from '@instructure/ui-test-utils'

import { bidirectionalPolyfill } from '../bidirectionalPolyfill'

const propsToTransformValuesFor = ['float', 'clear', 'textAlign']

const startProps = [
  'paddingInlineStart',
  'borderInlineStart',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderTopInlineStartRadius',
  'borderBottomInlineStartRadius',
  'marginInlineStart',
  'offsetInlineStart',
  'insetInlineStart'
]

const endProps = [
  'paddingInlineEnd',
  'borderInlineEnd',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderTopInlineEndRadius',
  'borderBottomInlineEndRadius',
  'marginInlineEnd',
  'offsetInlineEnd',
  'insetInlineEnd'
]

const styleToLeaveUntouched = {
  style: {
    label: 'style',
    display: 'block',
    marginTop: '10px',
    paddingBottom: 'auto',
    textAlign: 'center',
    opacity: 0.9,
    nestedStyle: {
      marginBottom: 0,
      backgroundColor: 'rgba(0, 100, 200, 0.5)'
    }
  },
  extraVariable: '100rem'
}

const complexStyle = {
  component: {
    label: 'component',
    display: 'block',
    height: '2.5em',
    lineHeight: 0,
    boxSizing: 'border-box',
    textAlign: 'start',

    '&:hover': {
      marginBottom: 0,
      borderInlineStart: '1px',
      backgroundColor: 'rgba(0, 100, 200, 0.5)'
    }
  },
  child: {
    label: 'component__child',
    display: 'inline-block',
    paddingInlineStart: '1em',
    marginInlineEnd: '2em'
  },
  extraVariable: 'start'
}

describe('bidirectionalPolyfill', async () => {
  describe('in "ltr" text direction', async () => {
    const dir = 'ltr'

    it('should return "start" values changed to "left"', async () => {
      propsToTransformValuesFor.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: 'start'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const value = convertedStyle.style[prop]
        expect(value).to.equal('left')
      })
    })

    it('should return "end" values changed to "right"', async () => {
      propsToTransformValuesFor.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: 'end'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const value = convertedStyle.style[prop]
        expect(value).to.equal('right')
      })
    })

    it('should return props including "start" changed to "left"', async () => {
      startProps.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: '8px'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const propName = Object.keys(convertedStyle.style)[0].toLowerCase()
        expect(propName).to.contain('left')
      })
    })

    it('should return props including "end" changed to "right"', async () => {
      endProps.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: '8px'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const propName = Object.keys(convertedStyle.style)[0].toLowerCase()
        expect(propName).to.contain('right')
      })
    })

    it('should leave other props untouched', async () => {
      const convertedStyle = bidirectionalPolyfill(styleToLeaveUntouched, dir)
      expect(convertedStyle).to.deep.equal(styleToLeaveUntouched)
    })

    it('should handle complex styles', async () => {
      const convertedStyle = bidirectionalPolyfill(complexStyle, dir)

      expect(convertedStyle).to.deep.equal({
        component: {
          label: 'component',
          display: 'block',
          height: '2.5em',
          lineHeight: 0,
          boxSizing: 'border-box',
          textAlign: 'left',

          '&:hover': {
            marginBottom: 0,
            borderLeft: '1px',
            backgroundColor: 'rgba(0, 100, 200, 0.5)'
          }
        },
        child: {
          label: 'component__child',
          display: 'inline-block',
          paddingLeft: '1em',
          marginRight: '2em'
        },
        extraVariable: 'start'
      })
    })
  })

  describe('in "rtl" text direction', async () => {
    const dir = 'rtl'

    it('should return "start" values changed to "right"', async () => {
      propsToTransformValuesFor.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: 'start'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const value = convertedStyle.style[prop]
        expect(value).to.equal('right')
      })
    })

    it('should return "end" values changed to "left"', async () => {
      propsToTransformValuesFor.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: 'end'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const value = convertedStyle.style[prop]
        expect(value).to.equal('left')
      })
    })

    it('should return props including "start" changed to "right"', async () => {
      startProps.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: '8px'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const propName = Object.keys(convertedStyle.style)[0].toLowerCase()
        expect(propName).to.contain('right')
      })
    })

    it('should return props including "end" changed to "left"', async () => {
      endProps.forEach((prop) => {
        const convertedStyle = bidirectionalPolyfill(
          {
            style: {
              [prop]: '8px'
            }
          },
          dir
        )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{}'.
        const propName = Object.keys(convertedStyle.style)[0].toLowerCase()
        expect(propName).to.contain('left')
      })
    })

    it('should leave other props untouched', async () => {
      const convertedStyle = bidirectionalPolyfill(styleToLeaveUntouched, dir)
      expect(convertedStyle).to.deep.equal(styleToLeaveUntouched)
    })

    it('should handle complex styles', async () => {
      const convertedStyle = bidirectionalPolyfill(complexStyle, dir)

      expect(convertedStyle).to.deep.equal({
        component: {
          label: 'component',
          display: 'block',
          height: '2.5em',
          lineHeight: 0,
          boxSizing: 'border-box',
          textAlign: 'right',

          '&:hover': {
            marginBottom: 0,
            borderRight: '1px',
            backgroundColor: 'rgba(0, 100, 200, 0.5)'
          }
        },
        child: {
          label: 'component__child',
          display: 'inline-block',
          paddingRight: '1em',
          marginLeft: '2em'
        },
        extraVariable: 'start'
      })
    })
  })
})
