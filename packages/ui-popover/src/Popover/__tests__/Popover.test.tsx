/*
 * The MIT License (MIT).
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

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { fireEvent } from '@testing-library/dom'

import { Popover } from '@instructure/ui-popover/latest'
import type { PopoverProps } from '@instructure/ui-popover/latest'

describe('<Popover />', () => {
  afterEach(() => {
    cleanup()
  })

  function testShowContent(
    on: 'click' | 'hover' | 'focus',
    eventType: 'click' | 'focus' | 'mouseOver',
    eventInit?: Record<string, any>
  ) {
    it(`should show content on ${on}`, async () => {
      const onValue: PopoverProps['on'] = [on]
      if (on === 'hover') {
        onValue.push('focus')
      }
      await render(
        <Popover on={onValue} renderTrigger={<button>Trigger</button>}>
          <h2>Popover Content</h2>
        </Popover>
      )

      const trigger = page.getByRole('button', { name: 'Trigger' }).element()

      switch (eventType) {
        case 'click':
          fireEvent.click(trigger, eventInit)
          break
        case 'focus':
          // `focus` doesn't bubble, so React never sees it: use `focusin`
          fireEvent.focusIn(trigger, eventInit)
          break
        case 'mouseOver':
          fireEvent.mouseOver(trigger, eventInit)
          break
        default:
          break
      }

      await expect
        .element(page.getByText('Popover Content'))
        .toBeInTheDocument()
    })
  }

  function testEventHandler(
    handler: 'onClick' | 'onFocus' | 'onBlur',
    eventType: 'focusOut' | 'blur' | 'click' | 'focus'
  ) {
    it(`should fire ${handler} handler for ${eventType} event`, async () => {
      const handlerSpy = vi.fn()
      const props = {
        [handler]: handlerSpy
      }
      await render(
        <Popover {...props} renderTrigger={<button>Trigger</button>}>
          <h2>Popover content</h2>
        </Popover>
      )

      const trigger = page.getByRole('button', { name: 'Trigger' }).element()

      switch (eventType) {
        case 'click':
          fireEvent.click(trigger)
          break
        case 'focus':
          // `focus`/`blur` don't bubble, so React never sees them
          fireEvent.focusIn(trigger)
          break
        case 'blur':
          fireEvent.focusOut(trigger)
          break
        case 'focusOut':
          fireEvent.focusOut(trigger)
          break
        default:
          break
      }

      expect(handlerSpy).toHaveBeenCalledTimes(1)
    })
  }

  it('should not render content by default', async () => {
    await render(
      <div>
        <Popover on="click" renderTrigger={<button>Trigger button</button>}>
          <h2>Popover Title</h2>
        </Popover>
      </div>
    )
    const triggerButton = page
      .getByRole('button', { name: 'Trigger button' })
      .element()
    const popoverContent = page.getByText('Popover Title').query()

    expect(triggerButton).toBeInTheDocument()
    expect(popoverContent).not.toBeInTheDocument()
  })

  describe('Popover Event Handlers', () => {
    testShowContent('click', 'click')
    testShowContent('focus', 'focus')
    testShowContent('hover', 'mouseOver', {
      relatedTarget: document.documentElement
    })

    testEventHandler('onClick', 'click')
    testEventHandler('onFocus', 'focus')
    testEventHandler('onBlur', 'blur')
    testEventHandler('onBlur', 'focusOut')
  })

  it('should hide content when trigger is clicked', async () => {
    const onHideContent = vi.fn()
    await render(
      <Popover
        on="click"
        onHideContent={(_e, o) => onHideContent(o)}
        shouldCloseOnDocumentClick={false}
        renderTrigger={<button>Trigger button</button>}
      >
        <h2>Popover Title</h2>
      </Popover>
    )
    const triggerButton = page
      .getByRole('button', { name: 'Trigger button' })
      .element()

    expect(triggerButton).toBeInTheDocument()
    expect(page.getByText('Popover Title').query()).not.toBeInTheDocument()

    fireEvent.click(triggerButton)

    expect(onHideContent).not.toHaveBeenCalled()
    await expect.element(page.getByText('Popover Title')).toBeInTheDocument()

    fireEvent.click(triggerButton)

    await vi.waitFor(() => {
      expect(onHideContent).toHaveBeenCalled()
    })
    expect(onHideContent).toHaveBeenCalledWith(
      expect.objectContaining({ documentClick: false })
    )
    await expect
      .element(page.getByText('Popover Title'))
      .not.toBeInTheDocument()
  })

  it('should show content if defaultIsShowingContent is true', async () => {
    await render(
      <Popover
        on="click"
        defaultIsShowingContent
        renderTrigger={<button>Trigger</button>}
      >
        <h2>Popover content</h2>
      </Popover>
    )
    const popoverContent = page.getByText('Popover content').query()

    expect(popoverContent).toBeInTheDocument()
  })

  describe('controlled', () => {
    it('should show content by default if isShowingContent is true', async () => {
      await render(
        <Popover
          on="click"
          isShowingContent={true}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const popoverContent = page.getByText('Popover content').query()

      expect(popoverContent).toBeInTheDocument()
    })

    it('should not show content if isShowingContent prop is false', async () => {
      await render(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const triggerButton = page
        .getByRole('button', { name: 'Trigger' })
        .element()
      const popoverContent = page.getByText('Popover content').query()

      expect(triggerButton).toBeInTheDocument()
      expect(popoverContent).not.toBeInTheDocument()
    })

    it('should show content if isShowingContent prop is true', async () => {
      await render(
        <Popover
          on="click"
          isShowingContent={true}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const popoverContent = page.getByText('Popover content').query()

      expect(popoverContent).toBeInTheDocument()
    })

    it('should call onShowContent', async () => {
      const onShowContent = vi.fn()

      await render(
        <Popover
          on="click"
          isShowingContent={false}
          shouldCloseOnDocumentClick={false}
          onShowContent={onShowContent}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const trigger = page.getByRole('button', { name: 'Trigger' }).element()

      fireEvent.click(trigger)

      expect(onShowContent).toHaveBeenCalledTimes(1)
    })

    it('should call onHideContent', async () => {
      const onHideContent = vi.fn()

      await render(
        <Popover
          on="click"
          isShowingContent={true}
          shouldCloseOnDocumentClick={false}
          onHideContent={(_e, o) => onHideContent(o)}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const trigger = page.getByRole('button', { name: 'Trigger' }).element()

      fireEvent.click(trigger)

      expect(onHideContent).toHaveBeenCalledWith({ documentClick: false })
    })

    it('should not show content on click', async () => {
      await render(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const triggerButton = page
        .getByRole('button', { name: 'Trigger' })
        .element()

      fireEvent.click(triggerButton)

      const popoverContent = page.getByText('Popover content').query()

      expect(popoverContent).not.toBeInTheDocument()
    })
  })

  it('should pass positionContainerDisplay prop to Position', async () => {
    await render(
      <Popover
        on="click"
        renderTrigger={<button>Trigger</button>}
        positionContainerDisplay="block"
      >
        <h2>Popover content</h2>
      </Popover>
    )
    const popover = document.querySelector('[data-position^="Popover_"]')

    expect(popover).toHaveStyle('display: block')
  })

  describe('shouldScrollContent', () => {
    it('does not wrap content when the prop is unset', async () => {
      await render(
        <Popover
          isShowingContent
          on="click"
          renderTrigger={<button>Trigger</button>}
        >
          <h2 data-testid="content">Popover content</h2>
        </Popover>
      )
      const content = await page.getByTestId('content').element()
      expect(content.closest('[class*="popover__scrollContainer"]')).toBeNull()
    })

    it('wraps content in an overflow:auto + auto-fit max-height container when set', async () => {
      await render(
        <Popover
          isShowingContent
          on="click"
          renderTrigger={<button>Trigger</button>}
          shouldScrollContent
        >
          <h2 data-testid="content">Popover content</h2>
        </Popover>
      )
      const content = await page.getByTestId('content').element()
      const wrapper = content.closest(
        '[class*="popover__scrollContainer"]'
      ) as HTMLElement
      expect(wrapper).not.toBeNull()
      const computed = getComputedStyle(wrapper)
      expect(computed.overflowY).toBe('auto')
      // the custom property resolves to a px value in a real browser
      const availableHeight =
        computed.getPropertyValue('--ui-position-available-height').trim() ||
        `${window.innerHeight}px`
      expect(computed.maxHeight).toBe(availableHeight)
    })
  })
})
