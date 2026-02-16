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

import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { SmallViewportModeWrapper } from '../../utils/exampleHelpers'
import { elevateIcon } from '../../utils/exampleSvgFiles'
import { TopNavBarBrand } from '../index'

describe('<TopNavBarBrand />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    const { container } = render(
      <TopNavBarBrand screenReaderLabel="Brand name" />
    )
    const component = container.querySelector('[class$="-topNavBarBrand"]')

    expect(component).toBeInTheDocument()
  })

  describe('elementRef prop should return a ref to the root element', () => {
    it('should return root element', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <TopNavBarBrand
          screenReaderLabel="Brand name"
          elementRef={elementRef}
        />
      )
      const component = container.querySelector('[class$="-topNavBarBrand"]')

      expect(elementRef).toHaveBeenCalledWith(component)
    })
  })

  describe('screenReaderLabel prop', () => {
    it('should render label for SR', async () => {
      const { container } = render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
        />
      )
      const screenReaderLabel = container.querySelector(
        '[class$="-screenReaderContent"]'
      )

      expect(screenReaderLabel).toHaveTextContent('Test label')
    })
  })

  describe('renderIcon prop', () => {
    it('should render name in desktop mode', async () => {
      const { container } = render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
        />
      )
      const iconContainer = container.querySelector('[class$="iconContainer"]')
      const icon = container.querySelector('svg')

      expect(iconContainer).toBeVisible()
      expect(icon).toBeVisible()
      expect(icon).toHaveAttribute('id', 'elevateIcon')
    })

    it('should not render name in smallViewport mode', async () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarBrand
            screenReaderLabel="Test label"
            renderIcon={elevateIcon}
          />
        </SmallViewportModeWrapper>
      )
      const iconContainer = container.querySelector('[class$="iconContainer"]')

      expect(iconContainer).not.toBeInTheDocument()
    })
  })

  describe('iconBackground prop', () => {
    it('should be visible in desktop mode', async () => {
      const { container } = render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
          iconBackground="blue"
        />
      )
      const iconContainer = container.querySelector('[class$="iconContainer"]')!

      expect(getComputedStyle(iconContainer).backgroundColor).toBe(
        'rgb(0, 0, 255)'
      )
    })

    it('should not be visible in smallViewport mode', async () => {
      const { container } = render(
        <SmallViewportModeWrapper>
          <TopNavBarBrand
            screenReaderLabel="Test label"
            renderIcon={elevateIcon}
            iconBackground="blue"
          />
        </SmallViewportModeWrapper>
      )
      const iconContainer = container.querySelector('[class$="iconContainer"]')

      expect(iconContainer).not.toBeInTheDocument()
    })
  })

  describe('href prop', () => {
    it('should render component as link', async () => {
      render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
          href="/#TestHref"
        />
      )
      const link = screen.getByRole('link')

      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/#TestHref')
    })
  })

  describe('onClick prop', () => {
    it('should render component button', async () => {
      const onClick = vi.fn()
      render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
          href={undefined}
          onClick={onClick}
        />
      )
      const button = screen.getByRole('button')

      userEvent.click(button)

      await waitFor(() => {
        expect(button.tagName).toBe('BUTTON')
        expect(onClick).toHaveBeenCalled()
      })
    })
  })

  describe('as prop', () => {
    it('should render component as passed element', async () => {
      const onClick = vi.fn()
      render(
        <TopNavBarBrand
          screenReaderLabel="Test label"
          renderIcon={elevateIcon}
          href="/#TestHref"
          onClick={onClick}
          as="button"
        />
      )
      const button = screen.getByRole('button')

      userEvent.click(button)

      await waitFor(() => {
        expect(button.tagName).toBe('BUTTON')
        expect(onClick).toHaveBeenCalled()
      })
    })
  })

  it('should be accessible', async () => {
    const { container } = render(
      <TopNavBarBrand screenReaderLabel="Brand name" />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
