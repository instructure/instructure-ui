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

import deprecated, { changedPackageWarning } from '../deprecated'

class TestComponent extends Component {
  static propTypes = {
    bar: PropTypes.string,
    qux: PropTypes.string
  }

  static defaultProps = {
    qux: 'Hello'
  }

  render () {
    return <div>{this.props.qux} {this.props.bar}</div>
  }
}

describe('@deprecated', () => {
  describe('deprecated props', () => {
    const DeprecatedComponent = deprecated('2.1.0', {
      foo: 'bar',
      baz: true
    })(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn when suggesting new prop when using old prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        foo: 'Jane'
      })

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in %s%s. %s',
        'foo',
        '2.1.0',
        ' use bar instead',
        ''
      )
    })

    it('should warn when using old prop with no new prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        baz: 'Goodbye'
      })

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in %s%s. %s',
        'baz',
        '2.1.0',
        '',
        ''
      )
    })

    it('should not output a warning using new prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        bar: 'Jane'
      })

      spy.should.not.have.been.called
    })
  })

  describe('deprecated component', () => {
    const DeprecatedComponent = deprecated('3.4.0')(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn that the entire component is deprecated if no old props are supplied', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render()

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in version %s %s',
        'TestComponent',
        '3.4.0',
        ''
      )
    })
  })

  describe('deprecated component with a changed package message', () => {
    const DeprecatedComponent = deprecated('5.0.0', null, changedPackageWarning(
      'ui-core',
      'ui-portal'
    ))(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn that the component is deprecated and output a warning that the package changed', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render()

      const message = `It has been moved from ui-core to ui-portal. See ui-portal ` +
        `in the documentation for more details`

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in version %s %s',
        'TestComponent',
        '5.0.0',
        message
      )
    })
  })
})
