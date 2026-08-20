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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect } from 'vitest'

import {
  useDeterministicId,
  DeterministicIdContextProvider
} from '../DeterministicIdContext/index.js'

// Test component using the hook
const TestComponent = ({ componentName }: { componentName: string }) => {
  const deterministicId = useDeterministicId(componentName)
  return (
    <div data-testid="test-component" id={deterministicId()}>
      Test Component
    </div>
  )
}

// Test component with multiple IDs
const TestComponentMultipleIds = ({
  componentName
}: {
  componentName: string
}) => {
  const deterministicId = useDeterministicId(componentName)
  const mainId = deterministicId()
  const labelId = deterministicId(`${componentName}-label`)
  const inputId = deterministicId(`${componentName}-input`)

  return (
    <div data-testid="test-component" id={mainId}>
      <label id={labelId}>Label</label>
      <input id={inputId} />
    </div>
  )
}

const getAllIds = (element: Element): string[] => {
  const ids: string[] = []
  if (element.id) ids.push(element.id)
  Array.from(element.children).forEach((child) => {
    ids.push(...getAllIds(child))
  })
  return ids
}

const uniqueIds = (el: Element) => {
  const idList = getAllIds(el)
  return new Set(idList).size === idList.length
}

describe('useDeterministicId', () => {
  it('should generate a deterministic ID', async () => {
    await render(<TestComponent componentName="TestComponent" />)
    const element = page.getByTestId('test-component').element()

    expect(element).toBeInTheDocument()
    expect(element.id).toBeTruthy()
  })

  it('should generate unique IDs for multiple instances', async () => {
    await render(
      <div data-testid="container">
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
      </div>
    )
    const container = page.getByTestId('container').element()

    expect(uniqueIds(container)).toBe(true)
  })

  it('should support custom instance names that yield distinct ids', async () => {
    await render(<TestComponentMultipleIds componentName="MyComponent" />)
    const container = page.getByTestId('test-component').element()

    const mainId = container.id
    const labelId = container.querySelector('label')?.id
    const inputId = container.querySelector('input')?.id

    expect(mainId).toBeTruthy()
    expect(labelId).toBeTruthy()
    expect(inputId).toBeTruthy()
    expect(new Set([mainId, labelId, inputId]).size).toBe(3)
  })

  it('should generate unique IDs without Provider wrapper', async () => {
    await render(
      <div data-testid="test-components">
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
      </div>
    )
    const el = page.getByTestId('test-components').element()

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique IDs when components are rendered both outside and inside of the (deprecated) provider', async () => {
    await render(
      <div data-testid="test-components">
        <DeterministicIdContextProvider>
          <TestComponent componentName="TestComponent" />
          <TestComponent componentName="TestComponent" />
          <TestComponent componentName="TestComponent" />
        </DeterministicIdContextProvider>
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
      </div>
    )
    const el = page.getByTestId('test-components').element()

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique IDs with Provider only', async () => {
    const Wrapper = ({ children }: any) => {
      return (
        <DeterministicIdContextProvider>
          <div data-testid="wrapper">{children}</div>
        </DeterministicIdContextProvider>
      )
    }
    const children = []
    for (let i = 0; i < 10; i++) {
      children.push(<TestComponent key={i} componentName="TestComponent" />)
    }

    await render(<Wrapper>{children}</Wrapper>)
    const el = page.getByTestId('wrapper').element()

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate stable, unique IDs across re-renders', async () => {
    const { rerender } = await render(
      <div data-testid="container">
        <TestComponent key="a" componentName="StableTest" />
      </div>
    )
    const firstId = page.getByTestId('test-component').element().id

    await rerender(
      <div data-testid="container">
        <TestComponent key="a" componentName="StableTest" />
      </div>
    )
    // Same instance (same key/position) keeps the same id after a re-render
    expect(page.getByTestId('test-component').element().id).toBe(firstId)
  })

  it('should work correctly with nested components', async () => {
    const ParentComponent = () => {
      const deterministicId = useDeterministicId('ParentComponent')
      return (
        <div data-testid="parent" id={deterministicId()}>
          <TestComponent componentName="ChildComponent" />
          <TestComponent componentName="ChildComponent" />
        </div>
      )
    }

    await render(<ParentComponent />)
    const parent = page.getByTestId('parent').element()

    expect(parent.id).toBeTruthy()
    expect(uniqueIds(parent)).toBe(true)
  })

  it('should return the same id for repeated no-arg calls and distinct ids for distinct names', async () => {
    const MultiCallComponent = () => {
      const deterministicId = useDeterministicId('MultiCallComponent')
      const id1 = deterministicId()
      const id2 = deterministicId()
      const id3 = deterministicId('custom-instance')

      return (
        <div data-testid="multi-call" data-id1={id1} data-id2={id2}>
          <div id={id3}>Third</div>
        </div>
      )
    }

    await render(<MultiCallComponent />)
    const container = page.getByTestId('multi-call').element()

    // Repeated no-arg calls are idempotent (same stable base id)
    expect(container.getAttribute('data-id1')).toBe(
      container.getAttribute('data-id2')
    )
    // A distinct instance name produces a distinct id
    expect(container.querySelector('div')?.id).not.toBe(
      container.getAttribute('data-id1')
    )
  })
})
