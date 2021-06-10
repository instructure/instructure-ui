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

import { experimental } from '../experimental'
type TestComponentProps = {
  bar: string
  qux: string
}
class TestComponent extends Component<TestComponentProps> {
  static propTypes = {
    bar: PropTypes.string,
    qux: PropTypes.string
  }

  static defaultProps = {
    bar: undefined,
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

describe('@experimental', async () => {
  describe('experimental props', async () => {
    const ExperimentalComponent = experimental(['bar'])(TestComponent)

    it('should warn when using an experimental prop', async () => {
      const consoleWarn = spy(console, 'warn')
      await mount(<ExperimentalComponent bar="Jane" />)
      await expect(consoleWarn).to.have.been.calledWithMatch(
        [
          'Warning: [TestComponent] ',
          'The `bar` prop is experimental and its API could change significantly in a future release.'
        ].join('')
      )
    })

    it('should not output a warning using a non-experimental prop', async () => {
      const consoleWarn = spy(console, 'warn')

      await mount(<ExperimentalComponent qux="Jane" />)

      await expect(consoleWarn).to.not.have.been.called()
    })

    it('should not output a warning for an experimental prop when dangerously ignored', async () => {
      const consoleWarn = spy(console, 'warn')

      await mount(
        <ExperimentalComponent
          qux="Jane"
          __dangerouslyIgnoreExperimentalWarnings
        />
      )

      await expect(consoleWarn).to.not.have.been.called()
    })
  })

  describe('experimental component', async () => {
    const ExperimentalComponent = experimental()(TestComponent)

    it('should warn that the entire component is experimental if no props are supplied', async () => {
      const consoleWarn = spy(console, 'warn')
      await mount(<ExperimentalComponent />)
      const warning =
        'Warning: [TestComponent] is experimental and its API could change significantly in a future release.'

      await expect(consoleWarn).to.have.been.calledWithMatch(warning)
    })

    it('should not output a warning for a component when dangerously ignored', async () => {
      const consoleWarn = spy(console, 'warn')
      await mount(
        <ExperimentalComponent __dangerouslyIgnoreExperimentalWarnings />
      )

      await expect(consoleWarn).to.not.have.been.called()
    })
  })
})
