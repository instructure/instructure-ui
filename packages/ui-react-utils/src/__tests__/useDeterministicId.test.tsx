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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
  useDeterministicId,
  DeterministicIdContextProvider
} from '../DeterministicIdContext'

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
  it('should generate a deterministic ID', () => {
    render(<TestComponent componentName="TestComponent" />)
    const element = screen.getByTestId('test-component')

    expect(element).toBeInTheDocument()
    expect(element.id).toBe('TestComponent___0')
  })

  it('should generate unique IDs for multiple instances', () => {
    render(
      <div data-testid="container">
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
      </div>
    )
    const container = screen.getByTestId('container')

    expect(uniqueIds(container)).toBe(true)
  })

  it('should support custom instance names', () => {
    render(<TestComponentMultipleIds componentName="MyComponent" />)
    const container = screen.getByTestId('test-component')

    expect(container.id).toBe('MyComponent___0')
    expect(container.querySelector('label')?.id).toBe('MyComponent-label___0')
    expect(container.querySelector('input')?.id).toBe('MyComponent-input___0')
  })

  it('should generate unique IDs without Provider wrapper', () => {
    render(
      <div data-testid="test-components">
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
        <TestComponent componentName="TestComponent" />
      </div>
    )
    const el = screen.getByTestId('test-components')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique IDs when components are rendered both outside and inside of provider', () => {
    render(
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
    const el = screen.getByTestId('test-components')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should generate unique IDs with Provider only', () => {
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

    render(<Wrapper>{children}</Wrapper>)
    const el = screen.getByTestId('wrapper')

    expect(uniqueIds(el)).toBe(true)
  })

  it('should use the global instance counter', () => {
    const instUIInstanceCounter = '__INSTUI_GLOBAL_INSTANCE_COUNTER__'
    const counterValue = 500
    globalThis[instUIInstanceCounter].set('GlobalTestComponent', counterValue)

    render(
      <div data-testid="test-components">
        <TestComponent componentName="GlobalTestComponent" />
        <TestComponent componentName="GlobalTestComponent" />
        <TestComponent componentName="GlobalTestComponent" />
      </div>
    )

    const instanceCounter = globalThis[instUIInstanceCounter]
    expect(instanceCounter.get('GlobalTestComponent')).toBe(counterValue + 3)
  })

  it('should generate sequential IDs for the same component', () => {
    const { rerender } = render(
      <div data-testid="container">
        <TestComponent componentName="SequentialTest" />
      </div>
    )

    rerender(
      <div data-testid="container">
        <TestComponent componentName="SequentialTest" />
        <TestComponent componentName="SequentialTest" />
      </div>
    )

    const allElements = screen.getAllByTestId('test-component')
    expect(allElements).toHaveLength(2)

    // IDs should be sequential
    const ids = allElements.map((el) => el.id)
    expect(ids[0]).toMatch(/^SequentialTest___\d+$/)
    expect(ids[1]).toMatch(/^SequentialTest___\d+$/)
    expect(ids[0]).not.toBe(ids[1])
  })

  it('should work correctly with nested components', () => {
    const ParentComponent = () => {
      const deterministicId = useDeterministicId('ParentComponent')
      return (
        <div data-testid="parent" id={deterministicId()}>
          <TestComponent componentName="ChildComponent" />
          <TestComponent componentName="ChildComponent" />
        </div>
      )
    }

    render(<ParentComponent />)
    const parent = screen.getByTestId('parent')

    expect(parent.id).toBe('ParentComponent___0')
    expect(uniqueIds(parent)).toBe(true)
  })

  it('should handle multiple calls to the same deterministicId function', () => {
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

    render(<MultiCallComponent />)
    const container = screen.getByTestId('multi-call')

    const ids = Array.from(container.children).map((el) => el.id)
    expect(ids).toHaveLength(3)
    expect(new Set(ids).size).toBe(3) // All IDs should be unique
  })
})
