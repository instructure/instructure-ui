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

import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { describe, it, expect, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { TruncateList } from '../index.js'
import type { TruncateListProps } from '../props.js'

describe('<TruncateList />', () => {
  it('should return ref with elementRef prop', async () => {
    const elementRef = vi.fn()

    const { container } = await render(
      <TruncateList elementRef={elementRef}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('ul[class$="-truncateList"]')

    await vi.waitFor(() => {
      expect(elementRef).toHaveBeenCalledWith(list)
    })
  })

  it('should render <ul> and <li> items', async () => {
    const { container } = await render(
      <TruncateList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('[class$="-truncateList"]')
    const items = container.querySelectorAll(
      '[class$="truncateList__listItem"]'
    )

    expect(list).toBeInTheDocument()
    expect(list?.tagName).toBe('UL')
    expect(items.length).toBe(3)

    items.forEach((item) => {
      expect(item.tagName).toBe('LI')
    })
  })

  it('should render only `visibleItemsCount` items', async () => {
    const { container } = await render(
      <TruncateList visibleItemsCount={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('ul[class$="-truncateList"]')
    const items = container.querySelectorAll(
      '[class$="truncateList__listItem"]'
    )

    expect(items.length).toBe(2)
    expect(list).not.toMatchTextContent('Item 3')
  })

  describe('renderHiddenItemMenu', () => {
    it('should render element', async () => {
      const { container } = await render(
        <TruncateList
          visibleItemsCount={2}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 3</div>
        </TruncateList>
      )
      const trigger = container.querySelector('[id="trigger"]')

      expect(trigger).toMatchTextContent('trigger label')
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = await render(<TruncateList />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  describe('Component tests', () => {
    const getItems = (container: HTMLElement) =>
      Array.from(container.querySelectorAll('li[class$="_listItem"]'))

    it('should pass how many items should be visible with `onUpdate` prop', async () => {
      const onUpdate = vi.fn()
      const { container } = await render(
        <TruncateList onUpdate={onUpdate} style={{ width: '100px' }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </TruncateList>
      )

      expect(getItems(container).length).toBe(3)

      await vi.waitFor(() => {
        expect(onUpdate).toHaveBeenCalledWith({ visibleItemsCount: 2 })
      })
    })

    it('should behave controlled', async () => {
      const initialItemNumber = 2
      const updatedItemNumber = 9

      const { container, rerender } = await render(
        <TruncateList
          visibleItemsCount={initialItemNumber}
          style={{ width: '400px' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )

      await vi.waitFor(() => {
        expect(getItems(container).length).toBe(initialItemNumber)
      })

      // Set Prop: visibleItemsCount
      await rerender(
        <TruncateList
          visibleItemsCount={updatedItemNumber}
          style={{ width: '400px' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )

      await vi.waitFor(() => {
        expect(getItems(container).length).toBe(updatedItemNumber)
      })
    })

    it('should renderHiddenItemMenu callback return hidden children', async () => {
      const renderHiddenItemMenu = vi.fn()
      await render(
        <TruncateList
          style={{ width: '100px' }}
          visibleItemsCount={2}
          renderHiddenItemMenu={renderHiddenItemMenu}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 3</div>
        </TruncateList>
      )

      await vi.waitFor(() => {
        expect(renderHiddenItemMenu).toHaveBeenCalled()
      })

      const args = renderHiddenItemMenu.mock.lastCall![0]

      expect(args.length).toEqual(3)

      args.forEach((item: any) => {
        expect(['Item 3', 'Item 4', 'Item 5']).toContain(item.props.children)
      })
    })

    it('should have no item spacing by default', async () => {
      const { container } = await render(
        <TruncateList>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      getItems(container).forEach((item) => {
        const styles = window.getComputedStyle(item)

        expect(styles.margin).toBe('0px')
        expect(styles.padding).toBe('0px')
      })
    })

    it('should add itemSpacing', async () => {
      const { container } = await render(
        <TruncateList
          itemSpacing={'1rem'}
          visibleItemsCount={3}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      await vi.waitFor(() => {
        expect(getItems(container).length).toBe(3)
      })

      getItems(container).forEach((item, idx) => {
        const styles = window.getComputedStyle(item)

        expect(styles.margin).toBe('0px')
        expect(styles.padding).toBe(idx === 0 ? '0px' : '0px 0px 0px 16px')
      })
    })

    it('should resize list when itemSpacing changed in runtime', async () => {
      const Example = ({
        itemSpacing
      }: {
        itemSpacing: TruncateListProps['itemSpacing']
      }) => {
        const [itemsCount, setItemsCount] = useState(5)

        return (
          <TruncateList
            onUpdate={({ visibleItemsCount }) => {
              setItemsCount(visibleItemsCount)
            }}
            visibleItemsCount={itemsCount}
            renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
            itemSpacing={itemSpacing}
            style={{ width: '400px' }}
          >
            {Array.from(Array(15)).map((_item, idx) => (
              <div key={idx}>Item {idx + 1}</div>
            ))}
          </TruncateList>
        )
      }

      const { container, rerender } = await render(
        <Example itemSpacing="1rem" />
      )

      await vi.waitFor(() => {
        expect(getItems(container).length).toBe(5)
      })

      getItems(container).forEach((item, idx) => {
        const styles = window.getComputedStyle(item)

        expect(styles.margin).toBe('0px')
        expect(styles.padding).toBe(idx === 0 ? '0px' : '0px 0px 0px 16px')
      })

      // Set prop: itemSpacing
      await rerender(<Example itemSpacing="4rem" />)

      await vi.waitFor(() => {
        expect(getItems(container).length).toBe(3)
      })

      getItems(container).forEach((item, idx) => {
        const styles = window.getComputedStyle(item)

        expect(styles.margin).toBe('0px')
        expect(styles.padding).toBe(idx === 0 ? '0px' : '0px 0px 0px 64px')
      })
    })

    it('should add fix width to the trigger li item via fixMenuTriggerWidth prop', async () => {
      const { container } = await render(
        <TruncateList
          fixMenuTriggerWidth="320px"
          visibleItemsCount={1}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      await vi.waitFor(() => {
        const trigger = container.querySelector('li[class$="_menuTrigger"]')!

        expect(window.getComputedStyle(trigger).width).toBe('320px')
      })
    })

    it('when not set, should be the width of its content', async () => {
      const { container } = await render(
        <TruncateList
          visibleItemsCount={1}
          renderHiddenItemMenu={() => (
            <div style={{ width: '80px' }} id="trigger">
              trigger label
            </div>
          )}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </TruncateList>
      )

      await vi.waitFor(() => {
        const trigger = container.querySelector('li[class$="_menuTrigger"]')!

        expect(window.getComputedStyle(trigger).width).toBe('80px')
      })
    })

    it('should resize list when fixMenuTriggerWidth changed in runtime', async () => {
      const Example = ({
        fixMenuTriggerWidth
      }: {
        fixMenuTriggerWidth: TruncateListProps['fixMenuTriggerWidth']
      }) => {
        const [itemsCount, setItemsCount] = useState(0)

        return (
          <TruncateList
            fixMenuTriggerWidth={fixMenuTriggerWidth}
            onUpdate={({
              visibleItemsCount
            }: {
              visibleItemsCount: number
            }) => {
              setItemsCount(visibleItemsCount)
            }}
            visibleItemsCount={itemsCount}
            renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
            itemSpacing="1rem"
            style={{ width: '400px' }}
          >
            {Array.from(Array(15)).map((_item, idx) => (
              <div key={idx}>Item {idx + 1}</div>
            ))}
          </TruncateList>
        )
      }

      const { container, rerender } = await render(
        <Example fixMenuTriggerWidth="1rem" />
      )

      await vi.waitFor(() => {
        const trigger = container.querySelector('li[class$="_menuTrigger"]')!

        expect(getItems(container).length).toBe(6)
        expect(window.getComputedStyle(trigger).width).toBe('16px')
      })

      // Set prop: fixMenuTriggerWidth
      await rerender(<Example fixMenuTriggerWidth="10rem" />)

      await vi.waitFor(() => {
        const trigger = container.querySelector('li[class$="_menuTrigger"]')!

        expect(getItems(container).length).toBe(4)
        expect(window.getComputedStyle(trigger).width).toBe('160px')
      })
    })
  })
})
