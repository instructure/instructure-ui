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

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import TopNavBar from '../index'
import TopNavBarExamples from '../__examples__/TopNavBar.examples'

const TEST_MENU_ITEM_TEXT = 'Test menu item text'

let originalResizeObserver: typeof ResizeObserver
let originalMatchMedia: typeof window.matchMedia

beforeAll(() => {
  originalResizeObserver = global.ResizeObserver
  originalMatchMedia = window.matchMedia

  class MockResizeObserver {
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
  }
  global.ResizeObserver = MockResizeObserver

  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  })
})

afterAll(() => {
  global.ResizeObserver = originalResizeObserver
  window.matchMedia = originalMatchMedia
})

const BaseExample = () => {
  return (
    <TopNavBar breakpoint={700}>
      {() => (
        <TopNavBar.Layout
          desktopConfig={{}}
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu'
          }}
          renderMenuItems={
            <TopNavBar.MenuItems
              listLabel="Page navigation"
              currentPageId="Overview"
              renderHiddenItemsMenuTriggerLabel={(hiddenChildrenCount) =>
                `${hiddenChildrenCount} More`
              }
            >
              <TopNavBar.Item id="Overview" href="/#TopNavBar">
                {TEST_MENU_ITEM_TEXT}
              </TopNavBar.Item>
            </TopNavBar.MenuItems>
          }
        />
      )}
    </TopNavBar>
  )
}

describe('<TopNavBar />', () => {
  it('should render', () => {
    const { getByText } = render(<BaseExample />)

    expect(getByText(TEST_MENU_ITEM_TEXT)).toBeInTheDocument()
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(<BaseExample />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    describe('with generated examples', () => {
      const generatedComponents = generateA11yTests(
        TopNavBar,
        TopNavBarExamples
      )

      it.each(generatedComponents)(
        'should be accessible with example: $description',
        async ({ content }) => {
          const { container } = render(content)
          const axeCheck = await runAxeCheck(container)

          expect(axeCheck).toBe(true)
        }
      )
    })
  })
})
