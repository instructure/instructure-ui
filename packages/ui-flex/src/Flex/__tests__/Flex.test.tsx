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
import { describe, it, expect, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Flex } from '@instructure/ui-flex/latest'

describe('<Flex />', () => {
  it('should render Flex.Items as children', async () => {
    const { container } = await render(
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
    const { container } = await render(
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
    await render(<Flex>{() => <div>hello world</div>}</Flex>)
    const child = page.getByText('hello world').element()

    expect(child).toBeInTheDocument()
  })

  it('should render no markup if there are no children', async () => {
    const { container } = await render(<Flex></Flex>)
    const flex = container.querySelector('[class*="flex"]')

    expect(flex).not.toBeInTheDocument()
  })

  it('should accept width and height as props', async () => {
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
      <Flex alignItems="end">
        <Flex.Item align="stretch">Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')!
    const item = page.getByText('Flex item 1').element()

    const flexStyle = window.getComputedStyle(flex)
    const itemStyle = window.getComputedStyle(item)

    expect(flexStyle.alignItems).toBe('flex-end')
    expect(itemStyle.alignSelf).toBe('stretch')
  })

  it('should let Flex.Items flex-grow with the shouldGrow property', async () => {
    await render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldGrow>Flex item 2</Flex.Item>
      </Flex>
    )
    const item1 = page.getByText('Flex item 1').element()
    const item2 = page.getByText('Flex item 2').element()

    const item1Style = window.getComputedStyle(item1)
    const item2Style = window.getComputedStyle(item2)

    expect(item1Style.flexGrow).toBe('0')
    expect(item2Style.flexGrow).toBe('1')
  })

  it('should let Flex.Items flex-shrink with the shouldShrink property', async () => {
    await render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item shouldShrink>Flex item 2</Flex.Item>
      </Flex>
    )
    const item1 = page.getByText('Flex item 1').element()
    const item2 = page.getByText('Flex item 2').element()

    const item1Style = window.getComputedStyle(item1)
    const item2Style = window.getComputedStyle(item2)

    expect(item1Style.flexShrink).toBe('0')
    expect(item2Style.flexShrink).toBe('1')
  })

  it('should set flex-basis and min-width on Flex.Items with the size property', async () => {
    await render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
        <Flex.Item size="100px">Flex item 3</Flex.Item>
      </Flex>
    )
    const item2 = page.getByText('Flex item 2').element()
    const item3 = page.getByText('Flex item 3').element()

    const item2Style = window.getComputedStyle(item2)
    const item3Style = window.getComputedStyle(item3)

    expect(item2Style.flexBasis).toBe('auto')
    expect(item3Style.flexBasis).toBe('100px')
    expect(item3Style.minWidth).toBe('100px')
  })

  it('should support an elementRef prop', async () => {
    const elementRef = vi.fn()

    const { container } = await render(
      <Flex elementRef={elementRef}>
        <Flex.Item>Flex item</Flex.Item>
      </Flex>
    )
    const flex = container.querySelector('[class*="flex"]')

    await vi.waitFor(() => {
      expect(elementRef).toHaveBeenCalledWith(flex)
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Flex>
        <Flex.Item>Flex item 1</Flex.Item>
        <Flex.Item>Flex item 2</Flex.Item>
      </Flex>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
