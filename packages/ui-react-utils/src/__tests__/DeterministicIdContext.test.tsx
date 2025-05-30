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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
  withDeterministicId,
  DeterministicIdContextProvider
} from '../DeterministicIdContext'
import type { WithDeterministicIdProps } from '../DeterministicIdContext'

@withDeterministicId()
class TestComponent extends Component<
  React.PropsWithChildren<WithDeterministicIdProps>
> {
  render() {
    return (
      <div data-testid="test-component" id={this.props.deterministicId!()}>
        {this.props.children}
      </div>
    )
  }
}

class WrapperComponent extends Component {
  render() {
    return (
      <div>
        <TestComponent />
      </div>
    )
  }
}

const uniqueIds = (el: Element) => {
  const idList = Array.from(el.children).map((child) => child.id)
  return new Set(idList).size === idList.length
}

describe('DeterministicIdContext', () => {
  it('can be found and tested with ReactTestUtils', () => {
    render(<WrapperComponent />)
    const testComponent = screen.getByTestId('test-component')

    expect(testComponent).toBeInTheDocument()
    expect(testComponent.id).toBeDefined()
  })

  it('should generate unique ids without Provider wrapper', () => {
    render(
      <div data-testid="test-components">
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TestComponent />
      </div>
    )
    const el = screen.getByTestId('test-components')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique ids when components are rendered both out and inside of provider', () => {
    render(
      <div data-testid="test-components">
        <DeterministicIdContextProvider>
          <TestComponent />
          <TestComponent />
          <TestComponent />
        </DeterministicIdContextProvider>
        <TestComponent />
        <TestComponent />
      </div>
    )
    const el = screen.getByTestId('test-components')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique ids with provider only', () => {
    const Wrapper = ({ children }: any) => {
      return (
        <DeterministicIdContextProvider>
          <div data-testid="wrapper">{children}</div>
        </DeterministicIdContextProvider>
      )
    }
    const children = []
    for (let i = 0; i < 10; i++) {
      children.push(<TestComponent key={i} />)
    }

    render(<Wrapper>{children}</Wrapper>)
    const el = screen.getByTestId('wrapper')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should use a global object for ID counter', () => {
    const instUIInstanceCounter = '__INSTUI_GLOBAL_INSTANCE_COUNTER__'
    const counterValue = 345
    globalThis[instUIInstanceCounter].set('TestComponent', counterValue)
    render(
      <div data-testid="test-components">
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TestComponent />
      </div>
    )
    const instanceCounter = globalThis[instUIInstanceCounter]
    expect(instanceCounter.get('TestComponent')).toBe(counterValue + 5)
  })
})
