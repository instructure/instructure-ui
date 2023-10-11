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

const uniqueIds = (el: { getDOMNode: () => Element }) => {
  const idList = Array.from(el.getDOMNode().children).map((el) => el.id)

  return new Set(idList).size === idList.length
}

describe('DeterministicIdContext', () => {
  it('should generate unique ids without Provider wrapper', async () => {
    const el = await mount(
      <div>
        <TestComponent></TestComponent>
        <TestComponent></TestComponent>
        <TestComponent></TestComponent>
        <TestComponent></TestComponent>
        <TestComponent></TestComponent>
      </div>
    )

    expect(uniqueIds(el)).to.be.true()
  })

  it('should generate unique ids when components are rendered both out and inside of provider', async () => {
    const el = await mount(
      <div>
        <DeterministicIdContextProvider>
          <TestComponent></TestComponent>
          <TestComponent></TestComponent>
          <TestComponent></TestComponent>
        </DeterministicIdContextProvider>
        <TestComponent></TestComponent>
        <TestComponent></TestComponent>
      </div>
    )

    expect(uniqueIds(el)).to.be.true()
  })

  //skipping this test because it will fail either in strictmode or normal mode
  it('should generate unique ids with provider only', async () => {
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

    expect(uniqueIds(el)).to.be.true()
  })
})
