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
import { mount, expect, stub } from '@instructure/ui-test-utils'
import { ComponentIdentifier } from '../ComponentIdentifier'

describe('ComponentIdentifier', async () => {
  class Trigger extends ComponentIdentifier {
    static displayName = 'Trigger'
  }

  class App extends Component {
    static propTypes = {
      children: PropTypes.node
    }

    static defaultProps = {
      children: null
    }

    render () {
      const trigger = ComponentIdentifier.pick(Trigger, this.props.children)

      return (
        <div>
          <h2>Trigger</h2>
          {trigger}
        </div>
      )
    }
  }

  it('should render only child', async () => {
    let buttonRef
    await mount(
      <App>
        <Trigger>
          <button ref={el => buttonRef = el}>Click Me</button>
        </Trigger>
      </App>
    )

    expect(buttonRef.textContent).to.equal('Click Me')
  })

  it('should not error when no children provided', async () => {
    let error = false
    try {
      await mount(
        <App>
          <Trigger />
        </App>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.false()
  })

  it('should pass props', async () => {
    let buttonRef
    const onClick = stub()
    await mount(
      <App>
        <Trigger onClick={onClick}>
          <button ref={el => buttonRef = el}>Click Me</button>
        </Trigger>
      </App>
    )

    await buttonRef.click()
    expect(onClick).to.have.been.called()
  })
})
