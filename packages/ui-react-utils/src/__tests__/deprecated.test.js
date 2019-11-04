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

import { expect, mount, stub } from '@instructure/ui-test-utils'

import { deprecated } from '../deprecated'

class TestComponent extends Component {
  static propTypes = {
    bar: PropTypes.string,
    qux: PropTypes.string
  }

  static defaultProps = {
    bar: null,
    qux: 'Hello'
  }

  render () {
    return <div>{this.props.qux} {this.props.bar}</div>
  }
}

describe('@deprecated', async () => {
  describe('deprecated props', async () => {
    const DeprecatedComponent = deprecated('2.1.0', {
      foo: 'bar',
      baz: true
    })(TestComponent)

    it('should warn when suggesting new prop when using old prop', async () => {
      const consoleWarn = stub(console, 'warn')

      const warning =
        'Warning: [TestComponent] `foo` is deprecated and will be removed in version 2.1.0. Use `bar` instead.'

      await mount(<DeprecatedComponent foo="Jane" />)

      expect(consoleWarn)
        .to.have.been.calledWithMatch(warning)
    })

    it('should warn when using old prop with no new prop', async () => {
      const consoleWarn = stub(console, 'warn')

      const warning = 'Warning: [TestComponent] `baz` is deprecated and will be removed in version 2.1.0.'

      await mount(<DeprecatedComponent baz="Goodbye" />)

      expect(consoleWarn)
        .to.have.been.calledWithMatch(warning)
    })

    it('should not output a warning using new prop', async () => {
      const consoleWarn = stub(console, 'warn')

      await mount(<DeprecatedComponent bar="Jane" />)

      expect(consoleWarn).to.not.have.been.called()
    })
  })

  describe('deprecated component', async () => {
    const DeprecatedComponent = deprecated('3.4.0')(TestComponent)

    it('should warn that the entire component is deprecated if no old props are supplied', async () => {
      const consoleWarn = stub(console, 'warn')

      const warning = 'Warning: [TestComponent] is deprecated and will be removed in version 3.4.0.'

      await mount(<DeprecatedComponent />)

      expect(consoleWarn)
        .to.have.been.calledWithMatch(warning)
    })
  })

  describe('deprecated component with a changed package message', async () => {
    const DeprecatedComponent = deprecated('5.0.0', null, deprecated.changedPackageWarning(
      'ui-forms',
      'ui-number-input'
    ))(TestComponent)

    it('should warn that the component is deprecated and output a warning that the package changed', async () => {
      const consoleWarn = stub(console, 'warn')

      const warning = [
        'Warning: [TestComponent] is deprecated and will be removed in version 5.0.0.',
        `It has been moved from @instructure/ui-forms to @instructure/ui-number-input.`
      ].join(' ')

      await mount(<DeprecatedComponent />)

      expect(consoleWarn).to.have.been.calledWithMatch(warning)
    })
  })

  describe('component with deprecated prop values', async () => {
    it('should not warn when an allowed prop value is supplied', async () => {
      const consoleWarn = stub(console, 'warn')

      class DeprecatedPropValueComponent extends Component {
        static propTypes = {
          color: deprecated.deprecatePropValues(PropTypes.oneOf([
            'red',
            'yellow',
            'blue',
            'orange',
            'gold'
          ]), ['blue', 'orange', 'gold'])
        }

        static defaultProps = {
          color: 'red'
        }

        render () {
          return <div>{this.props.color}</div>
        }
      }

      await mount(<DeprecatedPropValueComponent color="yellow" />)

      expect(consoleWarn).to.not.have.been.called()
    })

    it('should warn when a forbidden prop value is supplied', async () => {
      const consoleWarn = stub(console, 'warn')

      const color = 'orange'

      class DeprecatedPropValueComponent extends Component {
        static propTypes = {
          color: deprecated.deprecatePropValues(PropTypes.oneOf([
            'red',
            'yellow',
            'blue',
            'orange',
            'gold'
          ]), ['blue', 'orange', 'gold'])
        }

        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      await mount(<DeprecatedPropValueComponent color={color} />)

      const warning = `The '${color}' value for the \`color\` prop is deprecated.`

      expect(consoleWarn).to.have.been.calledWithMatch(warning)
    })

    it('should warn with additional message text when a forbidden prop value is supplied and has message text', async () => {
      const consoleWarn = stub(console, 'warn')

      const color = 'gold'
      const message = 'It will be removed in v8.0.0.'

      class DeprecatedPropValueComponent extends Component {
        static propTypes = {
          color: deprecated.deprecatePropValues(PropTypes.oneOf([
            'red',
            'yellow',
            'blue',
            'orange',
            'gold'
          ]), ['blue', 'orange', 'gold'], 'It will be removed in v8.0.0.')
        }

        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      await mount(<DeprecatedPropValueComponent color={color} />)

      const warning = `The '${color}' value for the \`color\` prop is deprecated. ${message}`

      expect(consoleWarn).to.have.been.calledWithMatch(warning)
    })

    it('should call functional message with the correct props', async () => {
      stub(console, 'warn')
      const messageStub = stub()

      const color = 'gold'

      class DeprecatedPropValueComponent extends Component {
        static propTypes = {
          color: deprecated.deprecatePropValues(PropTypes.oneOf([
            'red',
            'yellow',
            'blue',
            'orange',
            'gold'
          ]), ['blue', 'orange', 'gold'], messageStub)
        }

        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      await mount(<DeprecatedPropValueComponent color={color} />)

      const { props, propName, propValue } = messageStub.lastCall.args[0]

      expect(props).to.deep.equal({ color })
      expect(propName).to.equal('color')
      expect(propValue).to.equal(color)
    })

    it('should warn with a completely custom message when provided message is functional and prop value is forbidden', async () => {
      const consoleWarn = stub(console, 'warn')

      const color = 'gold'

      class DeprecatedPropValueComponent extends Component {
        static propTypes = {
          color: deprecated.deprecatePropValues(PropTypes.oneOf([
            'red',
            'yellow',
            'blue',
            'orange',
            'gold'
          ]), ['blue', 'orange', 'gold'], ({ propValue, propName }) => (
            `The ${propValue} value for ${propName} has been deprecated. Use the FooBar component with the 'baz' prop set instead.`
          ))
        }

        static defaultProps = {
          color: 'red'
        }

        render() {
          return <div>{this.props.color}</div>
        }
      }

      await mount(<DeprecatedPropValueComponent color={color} />)

      const warning = `The ${color} value for color has been deprecated. Use the FooBar component with the 'baz' prop set instead.`

      expect(consoleWarn).to.have.been.calledWithMatch(warning)
    })
  })
})
