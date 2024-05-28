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
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { AppNav } from '../index'
import AppNavExamples from '../__examples__/AppNav.examples'

const originalResizeObserver = global.ResizeObserver

describe('<AppNav />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })

  describe('for a11y', () => {
    it('should render a nav element with an aria-label', async () => {
      const { container } = render(
        <AppNav screenReaderLabel="Screen reader label" visibleItemsCount={2}>
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel="Some other label"
            href="http://instructure.design"
          />
        </AppNav>
      )

      const appNavList = container.querySelector('ul[class$="-appNav__list"]')!

      expect(appNavList).toBeInTheDocument()
      expect(appNavList.tagName).toBe('UL')
      expect(appNavList).toHaveAttribute('aria-label', 'Screen reader label')
    })

    it('should render a semantic list of items', async () => {
      render(
        <AppNav screenReaderLabel="App navigation" visibleItemsCount={2}>
          <AppNav.Item
            renderLabel="Some first label"
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel="Some second label"
            onClick={() => 'clicked'}
          />
        </AppNav>
      )

      const list = screen.getAllByRole('list')
      const items = screen.getAllByRole('listitem')
      const link = screen.getAllByRole('link')
      const button = screen.getAllByRole('button')

      expect(list.length).toBe(1)
      expect(items.length).toBe(2)
      expect(link.length).toBe(1)
      expect(button.length).toBe(1)
    })

    it('should render with a single item', async () => {
      render(
        <AppNav screenReaderLabel="App navigation" visibleItemsCount={1}>
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
        </AppNav>
      )

      const list = screen.getAllByRole('list')
      const items = screen.getAllByRole('listitem')
      const link = screen.getAllByRole('link')

      expect(list.length).toBe(1)
      expect(items.length).toBe(1)
      expect(link.length).toBe(1)
    })
  })

  describe('with rendered content', () => {
    it('should render content after the navigation', async () => {
      render(
        <AppNav
          screenReaderLabel="App navigation"
          renderAfterItems={<button type="button">I am rendered after!</button>}
          visibleItemsCount={2}
        >
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel="Some other label"
            href="http://instructure.design"
          />
        </AppNav>
      )
      const button = screen.getByRole('button')

      expect(button).toHaveTextContent('I am rendered after!')
    })
  })

  describe('with item truncation', () => {
    it('should pass a custom label to the menu trigger', async () => {
      render(
        <AppNav
          screenReaderLabel="App navigation"
          visibleItemsCount={2}
          renderTruncateLabel={function () {
            return 'I am sooo custom!'
          }}
        >
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
        </AppNav>
      )

      const items = screen.getAllByRole('listitem')

      expect(items.length).toBe(3)
      expect(items[2]).toHaveTextContent('I am sooo custom!')
    })
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(AppNav, AppNavExamples)
    for (const component of generatedComponents) {
      it(component.description, async () => {
        const { container } = render(component.content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      })
    }
  })
})
