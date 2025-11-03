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

import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Flex } from '../index'

describe('<Flex />', () => {
  it('should render Flex.Items as children', async () => {
    const { container } = render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item>Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')
    expect(flex).toBeInTheDocument()

    const items = flex?.querySelectorAll('[class*="-flexItem"]')
    expect(items?.length).toBe(4)
  })

  it('should render other markup as children', async () => {
    const { container } = render(
      <Flex>
        <div>foo</div>
        <div>bar</div>
        <div>baz</div>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')
    const childs = flex?.childNodes

    expect(childs?.length).toBe(3)
  })

  it('should render children when children is a function', async () => {
    render(<Flex>{() => <div>hello world</div>}</Flex>)
    const child = screen.getByText('hello world')

    expect(child).toBeInTheDocument()
  })

  it('should render no markup if there are no children', async () => {
    const { container } = render(<Flex></Flex>)
    const flex = container.querySelector('[class*="flex"]')

    expect(flex).not.toBeInTheDocument()
  })

  it('should accept width and height as props', async () => {
    const { container } = render(
      <Flex width="400px" height="200px">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item>Flex item 3</Flex.Item>
        <Flex.Item>Flex item 4</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.width).toBe('400px')
    expect(flexStyle.height).toBe('200px')
  })

  it('should set flex-direction with the direction property', async () => {
    const { container } = render(
      <Flex direction="column">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.flexDirection).toBe('column')
  })

  it('should render an inline-flex container with the display property', async () => {
    const { container } = render(
      <Flex display="inline-flex">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector(
      '[class*="inlineFlex"][class*="flex"]'
    )!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.display).toBe('inline-flex')
  })

  it('should set align-items with the alignItems property', async () => {
    const { container } = render(
      <Flex alignItems="start">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.alignItems).toBe('flex-start')
  })

  it('should set justify-content with the justifyItems property', async () => {
    const { container } = render(
      <Flex justifyItems="space-between">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.justifyContent).toBe('space-between')
  })

  it('should set flex-wrap with the wrap property', async () => {
    const { container } = render(
      <Flex wrap="wrap">
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const flexStyle = window.getComputedStyle(flex)

    expect(flexStyle.flexWrap).toBe('wrap')
  })

  it('should let Flex.Items align themselves with the align property', async () => {
    const { container } = render(
      <Flex alignItems="end">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const item = screen.getByText('Flex item 1')

    const flexStyle = window.getComputedStyle(flex)
    const itemStyle = window.getComputedStyle(item)

    expect(flexStyle.alignItems).toBe('flex-end')
    expect(itemStyle.alignSelf).toBe('stretch')
  })

  it('should let Flex.Items flex-grow with the shouldGrow property', async () => {
    render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldGrow>Flex item 2</Flex.Item>
      </Flex>
    )
    const item1 = screen.getByText('Flex item 1')
    const item2 = screen.getByText('Flex item 2')

    const item1Style = window.getComputedStyle(item1)
    const item2Style = window.getComputedStyle(item2)

    expect(item1Style.flexGrow).toBe('')
    expect(item2Style.flexGrow).toBe('1')
  })

  it('should let Flex.Items flex-shrink with the shouldShrink property', async () => {
    render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldShrink>Flex item 2</Flex.Item>
      </Flex>
    )
    const item1 = screen.getByText('Flex item 1')
    const item2 = screen.getByText('Flex item 2')

    const item1Style = window.getComputedStyle(item1)
    const item2Style = window.getComputedStyle(item2)

    expect(item1Style.flexShrink).toBe('0')
    expect(item2Style.flexShrink).toBe('1')
  })

  it('should set flex-basis and min-width on Flex.Items with the size property', async () => {
    render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
      </Flex>
    )
    const item2 = screen.getByText('Flex item 2')
    const item3 = screen.getByText('Flex item 3')

    const item2Style = window.getComputedStyle(item2)
    const item3Style = window.getComputedStyle(item3)

    expect(item2Style.flexBasis).toBe('')
    expect(item3Style.flexBasis).toBe('100px')
    expect(item3Style.minWidth).toBe('100px')
  })

  it('should support an elementRef prop', () => {
    vi.useFakeTimers()
    const elementRef = vi.fn()

    const { container } = render(
      <Flex elementRef={elementRef}>
        <Flex.Item>Flex item</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')

    act(() => {
      vi.runAllTimers()
    })
    expect(elementRef).toHaveBeenCalledWith(flex)
    vi.useRealTimers()
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
