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

const uniqueIds = (el: Element) => {
  const getAllIds = (element: Element): string[] => {
    const ids: string[] = []
    if (element.id) ids.push(element.id)
    Array.from(element.children).forEach((child) => {
      ids.push(...getAllIds(child))
    })
    return ids
  }

  const idList = getAllIds(el)
  return new Set(idList).size === idList.length
}

describe('useDeterministicId', () => {
  it('should generate a deterministic ID', async () => {
    await render(<TestComponent componentName="TestComponent" />)
    const element = page.getByTestId('test-component').element()

    expect(element).toBeInTheDocument()
    expect(element.id).toBe('TestComponent___0')
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

  it('should support custom instance names', async () => {
    await render(<TestComponentMultipleIds componentName="MyComponent" />)
    const container = page.getByTestId('test-component').element()

    expect(container.id).toBe('MyComponent___0')
    expect(container.querySelector('label')?.id).toBe('MyComponent-label___0')
    expect(container.querySelector('input')?.id).toBe('MyComponent-input___0')
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

  it('should generate unique IDs when components are rendered both outside and inside of provider', async () => {
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

  it('should use the global instance counter', async () => {
    const instUIInstanceCounter = '__INSTUI_GLOBAL_INSTANCE_COUNTER__'
    const counterValue = 500
    globalThis[instUIInstanceCounter].set('GlobalTestComponent', counterValue)

    await render(
      <div data-testid="test-components">
        <TestComponent componentName="GlobalTestComponent" />
        <TestComponent componentName="GlobalTestComponent" />
        <TestComponent componentName="GlobalTestComponent" />
      </div>
    )

    const instanceCounter = globalThis[instUIInstanceCounter]
    expect(instanceCounter.get('GlobalTestComponent')).toBe(counterValue + 3)
  })

  it('should generate sequential IDs for the same component', async () => {
    const { rerender } = await render(
      <div data-testid="container">
        <TestComponent componentName="SequentialTest" />
      </div>
    )

    await rerender(
      <div data-testid="container">
        <TestComponent componentName="SequentialTest" />
        <TestComponent componentName="SequentialTest" />
      </div>
    )

    const allElements = page.getByTestId('test-component').elements()
    expect(allElements).toHaveLength(2)

    // IDs should be sequential
    const ids = allElements.map((el) => el.id)
    expect(ids[0]).toMatch(/^SequentialTest___\d+$/)
    expect(ids[1]).toMatch(/^SequentialTest___\d+$/)
    expect(ids[0]).not.toBe(ids[1])
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

    expect(parent.id).toBe('ParentComponent___0')
    expect(uniqueIds(parent)).toBe(true)
  })

  it('should handle multiple calls to the same deterministicId function', async () => {
    const MultiCallComponent = () => {
      const deterministicId = useDeterministicId('MultiCallComponent')
      const id1 = deterministicId()
      const id2 = deterministicId()
      const id3 = deterministicId('custom-instance')

      return (
        <div data-testid="multi-call">
          <div id={id1}>First</div>
          <div id={id2}>Second</div>
          <div id={id3}>Third</div>
        </div>
      )
    }

    await render(<MultiCallComponent />)
    const container = page.getByTestId('multi-call').element()

    const ids = Array.from(container.children).map((el) => el.id)
    expect(ids).toHaveLength(3)
    expect(new Set(ids).size).toBe(3) // All IDs should be unique
  })
})
