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
import React from 'react'
import PropTypes from 'prop-types'
import ReactComponentWrapper from '../utils/reactComponentWrapper'

import { expect, stub } from '../index'

class Component extends React.Component {
  static displayName = 'Component'

  static propTypes = {
    foo: PropTypes.string
  }

  static contextTypes = {
    foo: PropTypes.string
  }

  test (cb) {
    cb('test')
  }

  render () {
    const { foo } = this.props
    return foo === 'baz' ? null : <div>Hello World</div>
  }
}

describe('reactComponentWrapper', async () => {
  it('should handle components that render `null`', async () => {
    const subject = await ReactComponentWrapper.mount(
      <Component foo="baz" />
    )

    expect(subject.getDOMNode()).to.equal(null)
  })

  it('should allow a componentRef to be passed via props', async () => {
    let component
    await ReactComponentWrapper.mount(
      <Component componentRef={(el) => { component = el }} />
    )
    const test = stub()
    component.test(test)

    expect(test).to.have.been.calledWith('test')
  })

  it('should omit componentRef when passing props to component', async () => {
    let component
    await ReactComponentWrapper.mount(
      <Component componentRef={(el) => {component = el}} />
    )
    expect(component.props.componentRef).to.not.exist()
  })

  describe('options', async () => {
    it('should support setting props', async () => {
      let component
      await ReactComponentWrapper.mount(
        <Component componentRef={(el) => {component = el}} />,
        {
          props: {
            foo: 'bar'
          }
        }
      )

      expect(component.props.foo).to.equal('bar')
    })
    it('should support setting context', async () => {
      let component
      await ReactComponentWrapper.mount(
        <Component componentRef={(el) => {component = el}} />,
        {
          context: {
            foo: 'bar'
          }
        }
      )

      expect(component.context.foo).to.equal('bar')
    })
  })

  describe('#setProps', async () => {
    it('should support setting props', async () => {
      let component
      const subject = await ReactComponentWrapper.mount(
        <Component componentRef={(el) => {component = el}} />
      )

      await subject.setProps({
        foo: 'bar'
      })

      expect(component.props.foo).to.equal('bar')
    })
  })

  describe('#setContext', async () => {
    it('should support setting context', async () => {
      let component
      const subject = await ReactComponentWrapper.mount(
        <Component componentRef={(el) => {component = el}} />
      )

      await subject.setContext({
        foo: 'bar'
      })

      expect(component.context.foo).to.equal('bar')
    })
  })
})
