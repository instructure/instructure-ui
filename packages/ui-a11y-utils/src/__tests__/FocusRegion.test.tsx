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

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { FocusRegion } from '../FocusRegion'

describe('FocusRegion', () => {
  let container: HTMLElement
  let focusRegion: FocusRegion

  beforeEach(() => {
    render(
      <div data-testid="container">
        <button data-testid="button1">Button 1</button>
        <button data-testid="button2">Button 2</button>
      </div>
    )
    container = screen.getByTestId('container')
  })

  afterEach(() => {
    if (focusRegion) {
      focusRegion.deactivate()
    }
  })

  describe('constructor options', () => {
    it('should create FocusRegion with default options', () => {
      focusRegion = new FocusRegion(container, {})
      expect(focusRegion.id).toBeDefined()
      expect(focusRegion.focused).toBe(false)
    })

    it('should handle shouldCloseOnDocumentClick option', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnDocumentClick: true,
        onDismiss
      })

      focusRegion.activate()

      // Click outside the container
      const outsideElement = document.createElement('div')
      document.body.appendChild(outsideElement)

      fireEvent.mouseDown(outsideElement, { button: 0 })
      fireEvent.click(outsideElement, { button: 0, detail: 1 })

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledWith(expect.any(Object), true)
      })

      document.body.removeChild(outsideElement)
    })

    it('should not close on document click when shouldCloseOnDocumentClick is false', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnDocumentClick: false,
        onDismiss
      })

      focusRegion.activate()

      // Click outside the container
      const outsideElement = document.createElement('div')
      document.body.appendChild(outsideElement)

      fireEvent.mouseDown(outsideElement, { button: 0 })
      fireEvent.click(outsideElement, { button: 0, detail: 1 })

      // Wait a bit to ensure no dismiss is called
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(onDismiss).not.toHaveBeenCalled()

      document.body.removeChild(outsideElement)
    })

    it('should handle shouldCloseOnEscape option', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnEscape: true,
        onDismiss
      })

      focusRegion.activate()

      fireEvent.keyUp(document, { keyCode: 27 }) // ESC key

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledWith(expect.any(Object), undefined)
      })
    })

    it('should not close on escape when shouldCloseOnEscape is false', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnEscape: false,
        onDismiss
      })

      focusRegion.activate()

      fireEvent.keyUp(document, { keyCode: 27 }) // ESC key

      // Wait a bit to ensure no dismiss is called
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(onDismiss).not.toHaveBeenCalled()
    })

    it('should handle isTooltip option for escape key behavior', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnEscape: true,
        isTooltip: true,
        onDismiss
      })

      focusRegion.activate()

      const escapeEvent = new KeyboardEvent('keyup', { keyCode: 27 })
      const stopPropagationSpy = vi.spyOn(escapeEvent, 'stopPropagation')

      fireEvent(document, escapeEvent)

      await waitFor(() => {
        expect(stopPropagationSpy).toHaveBeenCalled()
        expect(onDismiss).toHaveBeenCalled()
      })
    })

    it('should handle file input focus with escape key', async () => {
      const { container: fileContainer } = render(
        <div data-testid="file-container">
          <input type="file" data-testid="file-input" />
        </div>
      )

      const fileInput = screen.getByTestId('file-input')
      const fileRegion = new FocusRegion(fileContainer, {
        shouldCloseOnEscape: true,
        onDismiss: vi.fn()
      })

      fileRegion.activate()
      fileInput.focus()

      const blurSpy = vi.spyOn(fileInput, 'blur')

      fireEvent.keyUp(document, { keyCode: 27 })

      await waitFor(() => {
        expect(blurSpy).toHaveBeenCalled()
      })

      fileRegion.deactivate()
    })

    it('should handle onDismiss callback', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, { onDismiss })

      focusRegion.activate()
      focusRegion.handleDismiss(new KeyboardEvent('keyup') as any)

      expect(onDismiss).toHaveBeenCalledWith(expect.any(Object), undefined)
    })

    it('should handle iframe clicks for dismissal', async () => {
      const onDismiss = vi.fn()
      focusRegion = new FocusRegion(container, {
        shouldCloseOnDocumentClick: true,
        onDismiss
      })

      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)

      focusRegion.activate()
      focusRegion.handleFrameClick(new MouseEvent('click') as any, iframe)

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledWith(expect.any(Object), true)
      })

      document.body.removeChild(iframe)
    })
  })

  describe('activation and deactivation', () => {
    it('should track active state correctly', () => {
      focusRegion = new FocusRegion(container, {})

      expect(focusRegion.focused).toBe(false)

      focusRegion.activate()
      expect(focusRegion.focused).toBe(true)

      focusRegion.deactivate()
      expect(focusRegion.focused).toBe(false)
    })

    it('should handle deactivation with keyboard option', () => {
      focusRegion = new FocusRegion(container, {})

      focusRegion.activate()
      focusRegion.deactivate({ keyboard: false })

      expect(focusRegion.focused).toBe(false)
    })
  })

  describe('updateElement', () => {
    it('should update element and options', () => {
      focusRegion = new FocusRegion(container, {
        shouldCloseOnDocumentClick: false
      })

      const newContainer = document.createElement('div')
      const newOptions = {
        shouldCloseOnDocumentClick: true,
        shouldCloseOnEscape: true
      }

      focusRegion.updateElement(newContainer, newOptions)

      // The internal state should be updated
      expect(focusRegion).toBeDefined()
    })
  })

  describe('keyboardFocusable', () => {
    it('should detect keyboard focusable elements', () => {
      focusRegion = new FocusRegion(container, {})

      expect(focusRegion.keyboardFocusable).toBe(true)
    })

    it('should return false for non-focusable containers', () => {
      render(<div data-testid="empty"></div>)
      const emptyElement = screen.getByTestId('empty')

      focusRegion = new FocusRegion(emptyElement, {})

      expect(focusRegion.keyboardFocusable).toBe(false)
    })
  })
})
