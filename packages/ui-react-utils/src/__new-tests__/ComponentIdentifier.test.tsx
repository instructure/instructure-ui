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

import React, { Component, ReactNode } from 'react'
import PropTypes from 'prop-types'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ComponentIdentifier } from '../ComponentIdentifier'

describe('ComponentIdentifier', () => {
  beforeAll(() => {
    // Mocking console warnings to prevent test output pollution
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })

  class Trigger extends ComponentIdentifier<any> {
    static displayName = 'Trigger'
  }

  class App extends Component<{ children: ReactNode }> {
    static propTypes = {
      children: PropTypes.node
    }

    static defaultProps = {
      children: null
    }

    render() {
      const trigger = ComponentIdentifier.pick(Trigger, this.props.children)

      return (
        <div>
          <h2>Trigger</h2>
          {trigger}
        </div>
      )
    }
  }

  it('should render only child', () => {
    let buttonRef: HTMLButtonElement
    render(
      <App>
        <Trigger>
          <button ref={(el) => (buttonRef = el!)}>Click Me</button>
        </Trigger>
      </App>
    )

    expect(buttonRef!.textContent).toEqual('Click Me')
  })

  it('should not error when no children provided', () => {
    const renderApp = () =>
      render(
        <App>
          <Trigger />
        </App>
      )

    expect(renderApp).not.toThrow()
  })

  it('should pass props', () => {
    let buttonRef: HTMLButtonElement | null
    const onClick = jest.fn()
    render(
      <App>
        <Trigger onClick={onClick}>
          <button ref={(el) => (buttonRef = el)}>Click Me</button>
        </Trigger>
      </App>
    )

    buttonRef!.click()
    expect(onClick).toHaveBeenCalled()
  })
})
