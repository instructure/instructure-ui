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

import { expect, mount, spy } from '@instructure/ui-test-utils'

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

describe('@deprecated', async () => {
  describe('deprecated props', async () => {
    const DeprecatedComponent = deprecated('2.1.0', {
      foo: 'bar',
      baz: true
    })(TestComponent)

    it('should warn when suggesting new prop when using old prop', async () => {
      const warning = spy(console, 'warn')

      await mount(<DeprecatedComponent foo="Jane" />)

      expect(warning).to.have.been.calledWithExactly(
        'Warning: [%s] `%s` was deprecated in %s%s. %s',
        'TestComponent',
        'foo',
        '2.1.0',
        '. Use `bar` instead',
        ''
      )
    })

    it('should warn when using old prop with no new prop', async () => {
      const warning = spy(console, 'warn')

      await mount(<DeprecatedComponent baz="Goodbye" />)

      expect(warning).to.have.been.calledWithExactly(
        'Warning: [%s] `%s` was deprecated in %s%s. %s',
        'TestComponent',
        'baz',
        '2.1.0',
        '',
        ''
      )
    })

    it('should not output a warning using new prop', async () => {
      const warning = spy(console, 'warn')

      await mount(<DeprecatedComponent bar="Jane" />)

      expect(warning).to.not.have.been.called()
    })
  })

  describe('deprecated component', async () => {
    const DeprecatedComponent = deprecated('3.4.0')(TestComponent)

    it('should warn that the entire component is deprecated if no old props are supplied', async () => {
      const warning = spy(console, 'warn')

      await mount(<DeprecatedComponent />)

      expect(warning).to.have.been.calledWithExactly(
        'Warning: [%s] was deprecated in version %s. %s',
        'TestComponent',
        '3.4.0',
        ''
      )
    })
  })

  describe('deprecated component with a changed package message', async () => {
    const DeprecatedComponent = deprecated('5.0.0', null, changedPackageWarning(
      'ui-core',
      'ui-portal'
    ))(TestComponent)

    it('should warn that the component is deprecated and output a warning that the package changed', async () => {
      const warning = spy(console, 'warn')

      await mount(<DeprecatedComponent />)

      const message = `It has been moved from @instructure/ui-core to @instructure/ui-portal.`

      expect(warning).to.have.been.calledWithExactly(
        'Warning: [%s] was deprecated in version %s. %s',
        'TestComponent',
        '5.0.0',
        message
      )
    })
  })
})
