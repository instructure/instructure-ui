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

import experimental from '../experimental'

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

describe('@experimental', () => {
  describe('experimental props', () => {
    const ExperimentalComponent = experimental(['bar'])(TestComponent)

    const testbed = new Testbed(<ExperimentalComponent />)

    it('should warn when using an experimental prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        bar: 'Jane'
      })

      spy.should.have.been.calledWithExactly(
        'Warning: [%s] The `%s` prop is experimental and its API could change significantly in a future release. %s',
        'TestComponent',
        'bar',
        ''
      )
    })



    it('should not output a warning using a non-experimental prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        qux: 'Jane'
      })

      spy.should.not.have.been.called
    })
  })

  describe('experimental component', () => {
    const ExperimentalComponent = experimental()(TestComponent)

    const testbed = new Testbed(<ExperimentalComponent />)

    it('should warn that the entire component is experimental if no props are supplied', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render()

      spy.should.have.been.calledWithExactly(
        'Warning: [%s] is experimental and its API could change significantly in a future release. %s',
        'TestComponent',
        ''
      )
    })
  })
})
