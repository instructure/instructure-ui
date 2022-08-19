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

import { expect, mount } from '@instructure/ui-test-utils'
import {
  withDeterministicId,
  DeterministicIdContextProvider,
  generateInstanceCounterMap
} from '../DeterministicIdContext'
import type { WithDeterministicIdProps } from '../DeterministicIdContext'

@withDeterministicId()
class TestComponent extends React.Component<
  React.PropsWithChildren<WithDeterministicIdProps>
> {
  render() {
    return <div id={this.props.deterministicId!()}>{this.props.children}</div>
  }
}

describe('DeterministicIdContext', () => {
  it('should add id correctly by default', async () => {
    const el = await mount(<TestComponent></TestComponent>)
    const domNode = el.getDOMNode()

    expect(domNode.id).to.eq('TestComponent_0')
  })
  //skipping this test because it will fail either in strictmode or normal mode
  it.skip('should increment id by default', async () => {
    const Wrapper = ({ children }: any) => {
      return (
        <DeterministicIdContextProvider
          instanceCounterMap={generateInstanceCounterMap()}
        >
          <div id="wrapper">{children}</div>
        </DeterministicIdContextProvider>
      )
    }
    const children = []
    for (let i = 0; i < 10; i++) {
      children.push(<TestComponent></TestComponent>)
    }

    const el = await mount(<Wrapper>{children}</Wrapper>)
    Array.from(el.getDOMNode().children).forEach((el, i) => {
      // since the double mounting we have to increase i by i*2 every iteration
      expect(el.id).to.eq(`TestComponent_${i * 2}`)
    })
  })

  it('should work when instanceCounterMap is reset', async () => {
    for (let i = 0; i < 10; i++) {
      const el = await mount(
        <DeterministicIdContextProvider
          instanceCounterMap={generateInstanceCounterMap()}
        >
          <TestComponent></TestComponent>
        </DeterministicIdContextProvider>
      )
      const domNode = el.getDOMNode()

      expect(domNode.id).to.eq('TestComponent_0')
    }
  })
  it('should work correctly when seeding the instanceCounterMap to the Context', async () => {
    const seed = generateInstanceCounterMap()
    seed.set('TestComponent', 20)
    const el = await mount(
      <DeterministicIdContextProvider instanceCounterMap={seed}>
        <TestComponent></TestComponent>
      </DeterministicIdContextProvider>
    )
    const domNode = el.getDOMNode()

    expect(domNode.id).to.eq('TestComponent_21')
  })
})
