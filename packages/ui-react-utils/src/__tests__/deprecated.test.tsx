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

import { Component } from 'react'
import { vi } from 'vitest'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { deprecated } from '../deprecated'

type TestComponentProps = {
  bar: string
  qux: string
}
class TestComponent extends Component<TestComponentProps> {
  static defaultProps = {
    bar: null,
    qux: 'Hello'
  }

  render() {
    return (
      <div>
        {this.props.qux} {this.props.bar}
      </div>
    )
  }
}

describe('@deprecated', () => {
  describe('deprecated props', () => {
    const DeprecatedComponent = deprecated('2.1.0', {
      foo: 'bar',
      baz: true
    })(TestComponent)

    it('should warn when suggesting new prop when using old prop', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      render(<DeprecatedComponent foo="Jane" />)

      const expectedWarningMessage =
        'Warning: [TestComponent] `foo` is deprecated and will be removed in version 2.1.0. Use `bar` instead. '

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should warn when using old prop with no new prop', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      render(<DeprecatedComponent baz="Goodbye" />)

      const expectedWarningMessage =
        'Warning: [TestComponent] `baz` is deprecated and will be removed in version 2.1.0.'

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should not output a warning using new prop', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      render(<DeprecatedComponent bar="Jane" />)

      expect(consoleWarningSpy).not.toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })
  })

  describe('deprecated component', () => {
    const DeprecatedComponent = deprecated('3.4.0')(TestComponent)

    it('should warn that the entire component is deprecated if no old props are supplied', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      render(<DeprecatedComponent />)

      const expectedWarningMessage =
        'Warning: [TestComponent] is deprecated and will be removed in version 3.4.0.'

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })
  })

  describe('deprecated component with a changed package message', () => {
    const DeprecatedComponent = deprecated(
      '5.0.0',
      null,
      deprecated.changedPackageWarning('ui-forms', 'ui-number-input')
    )(TestComponent)

    it('should warn that the component is deprecated and output a warning that the package changed', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const expectedWarningMessage =
        'Warning: [TestComponent] is deprecated and will be removed in version 5.0.0. It has been moved from @instructure/ui-forms to @instructure/ui-number-input.'

      render(<DeprecatedComponent />)

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })
  })

  describe('component with deprecated prop values', () => {
    it('should not warn when an allowed prop value is supplied', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      type DeprecatedPropValueComponentProps = {
        color: string
      }
      class DeprecatedPropValueComponent extends Component<DeprecatedPropValueComponentProps> {
        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      render(<DeprecatedPropValueComponent color="yellow" />)

      expect(consoleWarningSpy).not.toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })

    it('should warn when a forbidden prop value is supplied', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const color = 'orange'
      type DeprecatedPropValueComponentProps = {
        color: string
      }
      class DeprecatedPropValueComponent extends Component<DeprecatedPropValueComponentProps> {
        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      render(<DeprecatedPropValueComponent color={color} />)

      const expectedWarningMessage = `The '${color}' value for the \`color\` prop is deprecated.`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should warn with additional message text when a forbidden prop value is supplied and has message text', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const color = 'gold'
      const message = 'It will be removed in v8.0.0.'
      type DeprecatedPropValueComponentProps = {
        color: string
      }
      class DeprecatedPropValueComponent extends Component<DeprecatedPropValueComponentProps> {
        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      render(<DeprecatedPropValueComponent color={color} />)

      const expectedWarningMessage = `The '${color}' value for the \`color\` prop is deprecated. ${message}`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })

    it('should call functional message with the correct props', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      const messageMock = vi.fn()

      const color = 'gold'
      type DeprecatedPropValueComponentProps = {
        color: string
      }
      class DeprecatedPropValueComponent extends Component<DeprecatedPropValueComponentProps> {
        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      render(<DeprecatedPropValueComponent color={color} />)

      const { props, propName, propValue } = messageMock.mock.calls[0][0]

      expect(props).toEqual({ color })
      expect(propName).toBe('color')
      expect(propValue).toBe(color)
      expect(consoleWarningSpy).toHaveBeenCalled()

      consoleWarningSpy.mockRestore()
    })

    it('should warn with a completely custom message when provided message is functional and prop value is forbidden', () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const color = 'gold'
      type DeprecatedPropValueComponentProps = {
        color: string
      }
      class DeprecatedPropValueComponent extends Component<DeprecatedPropValueComponentProps> {
        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      render(<DeprecatedPropValueComponent color={color} />)

      const expectedWarningMessage = `The ${color} value for color has been deprecated. Use the FooBar component with the 'baz' prop set instead.`

      expect(consoleWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )

      consoleWarningSpy.mockRestore()
    })
  })
})
