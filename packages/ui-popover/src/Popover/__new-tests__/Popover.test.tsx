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

import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import Popover from '../index'
import type { PopoverProps } from '../props'

describe('<Popover />', () => {
  afterEach(() => {
    jest.resetAllMocks()
    cleanup()
  })

  function testShowContent(
    on: 'click' | 'hover' | 'focus',
    eventType: 'click' | 'focus' | 'mouseOver',
    eventInit?: Record<string, any>
  ) {
    it(`should show content on ${on}`, () => {
      const onValue: PopoverProps['on'] = [on]
      if (on === 'hover') {
        onValue.push('focus')
      }
      render(
        <Popover on={onValue} renderTrigger={<button>Trigger</button>}>
          <h2>Popover Content</h2>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Trigger' })

      switch (eventType) {
        case 'click':
          fireEvent.click(trigger, eventInit)
          break
        case 'focus':
          fireEvent.focus(trigger, eventInit)
          break
        case 'mouseOver':
          fireEvent.mouseOver(trigger, eventInit)
          break
        default:
          break
      }

      expect(screen.getByText('Popover Content')).toBeInTheDocument()
    })
  }

  function testEventHandler(
    handler: 'onClick' | 'onFocus' | 'onBlur',
    eventType: 'focusOut' | 'blur' | 'click' | 'focus'
  ) {
    it(`should fire ${handler} handler for ${eventType} event`, () => {
      const handlerSpy = jest.fn()
      const props = {
        [handler]: handlerSpy
      }
      render(
        <Popover {...props} renderTrigger={<button>Trigger</button>}>
          <h2>Popover content</h2>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Trigger' })

      switch (eventType) {
        case 'click':
          fireEvent.click(trigger)
          break
        case 'focus':
          fireEvent.focus(trigger)
          break
        case 'blur':
          fireEvent.blur(trigger)
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

  it('should not render content by default', () => {
    render(
      <div>
        <Popover on="click" renderTrigger={<button>Trigger button</button>}>
          <h2>Popover Title</h2>
        </Popover>
      </div>
    )
    const triggerButton = screen.getByRole('button', { name: 'Trigger button' })
    const popoverContent = screen.queryByText('Popover Title')

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

  it('should hide content when trigger is clicked', () => {
    const onHideContent = jest.fn()
    render(
      <Popover
        on="click"
        onHideContent={(_e, o) => onHideContent(o)}
        shouldCloseOnDocumentClick={false}
        renderTrigger={<button>Trigger button</button>}
      >
        <h2>Popover Title</h2>
      </Popover>
    )
    const triggerButton = screen.getByRole('button', { name: 'Trigger button' })

    expect(triggerButton).toBeInTheDocument()
    expect(screen.queryByText('Popover Title')).not.toBeInTheDocument()

    fireEvent.click(triggerButton)

    expect(onHideContent).not.toHaveBeenCalled()
    expect(screen.queryByText('Popover Title')).toBeInTheDocument()

    fireEvent.click(triggerButton)

    expect(onHideContent).toHaveBeenCalled()
    expect(onHideContent).toHaveBeenCalledWith(
      expect.objectContaining({ documentClick: false })
    )
    expect(screen.queryByText('Popover Title')).not.toBeInTheDocument()
  })

  it('should show content if defaultIsShowingContent is true', () => {
    render(
      <Popover
        on="click"
        defaultIsShowingContent
        renderTrigger={<button>Trigger</button>}
      >
        <h2>Popover content</h2>
      </Popover>
    )
    const popoverContent = screen.queryByText('Popover content')

    expect(popoverContent).toBeInTheDocument()
  })

  describe('controlled', () => {
    it('should show content by default if isShowingContent is true', () => {
      render(
        <Popover
          on="click"
          isShowingContent={true}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const popoverContent = screen.queryByText('Popover content')

      expect(popoverContent).toBeInTheDocument()
    })

    it('should not show content if isShowingContent prop is false', () => {
      render(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const triggerButton = screen.getByRole('button', { name: 'Trigger' })
      const popoverContent = screen.queryByText('Popover content')

      expect(triggerButton).toBeInTheDocument()
      expect(popoverContent).not.toBeInTheDocument()
    })

    it('should show content if isShowingContent prop is true', () => {
      render(
        <Popover
          on="click"
          isShowingContent={true}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const popoverContent = screen.queryByText('Popover content')

      expect(popoverContent).toBeInTheDocument()
    })

    it('should call onShowContent', () => {
      const onShowContent = jest.fn()

      render(
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
      const trigger = screen.getByRole('button', { name: 'Trigger' })

      fireEvent.click(trigger)

      expect(onShowContent).toHaveBeenCalledTimes(1)
    })

    it('should call onHideContent', () => {
      const onHideContent = jest.fn()

      render(
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
      const trigger = screen.getByRole('button', { name: 'Trigger' })

      fireEvent.click(trigger)

      expect(onHideContent).toHaveBeenCalledWith({ documentClick: false })
    })

    it('should not show content on click', () => {
      render(
        <Popover
          on="click"
          isShowingContent={false}
          renderTrigger={<button>Trigger</button>}
        >
          <h2>Popover content</h2>
        </Popover>
      )
      const triggerButton = screen.getByRole('button', { name: 'Trigger' })

      fireEvent.click(triggerButton)

      const popoverContent = screen.queryByText('Popover content')

      expect(popoverContent).not.toBeInTheDocument()
    })
  })

  it('should pass positionContainerDisplay prop to Position', () => {
    render(
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
})
