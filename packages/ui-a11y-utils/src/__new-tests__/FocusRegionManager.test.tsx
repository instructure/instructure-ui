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

import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FocusRegionManager } from '../FocusRegionManager'

describe('FocusRegionManager', () => {
  beforeEach(async () => {
    FocusRegionManager.clearEntries()
  })

  it('should focus the first tabbable element when focused', async () => {
    render(
      <div data-test-parent role="main" aria-label="test app" id="test-parent3">
        <div data-test-ignore role="alert">
          <span>test alert</span>
        </div>
        <div data-test-child>
          <div data-test-descendant></div>
          <div data-test-descendant>
            <div data-test-descendant>
              <button data-testid="button">click me</button>
            </div>
          </div>
        </div>
        <div data-test-parent aria-hidden="true" id="test-parent2">
          <div data-test-child></div>
          <div
            role="dialog"
            aria-label="some content"
            data-test-parent
            id="test-parent1"
          >
            <div data-testid="content">
              <div>Hello world</div>
              <button data-testid="first-tabbable">click me</button>
              <button>or click me</button>
            </div>
            <span data-test-child>
              <ul data-test-descendant>
                <li data-test-descendant>item 1</li>
                <li data-test-descendant>item 2</li>
                <li data-test-descendant>item 3</li>
              </ul>
            </span>
          </div>
        </div>
        <div data-test-child aria-hidden="true">
          <div data-test-descendant></div>
          <div data-test-descendant></div>
        </div>
        <iframe id="frame" title="frame"></iframe>
      </div>
    )

    const button = screen.getByTestId('button')
    const content = screen.getByTestId('content')
    const firstTabbable = screen.getByTestId('first-tabbable')

    button.focus()

    expect(document.activeElement).toBe(button)

    FocusRegionManager.focusRegion(content)

    await waitFor(() => {
      expect(document.activeElement).toBe(firstTabbable)
    })
  })

  it('should return focus when blurred', async () => {
    render(
      <div data-test-parent role="main" aria-label="test app" id="test-parent3">
        <div data-test-ignore role="alert">
          <span>test alert</span>
        </div>
        <div data-test-child>
          <div data-test-descendant></div>
          <div data-test-descendant>
            <div data-test-descendant>
              <button data-testid="button">click me</button>
            </div>
          </div>
        </div>
        <div data-test-parent aria-hidden="true" id="test-parent2">
          <div data-test-child></div>
          <div
            role="dialog"
            aria-label="some content"
            data-test-parent
            id="test-parent1"
          >
            <div data-testid="content">
              <div>Hello world</div>
              <button data-test-first-tabbable>click me</button>
              <button>or click me</button>
            </div>
            <span data-test-child>
              <ul data-test-descendant>
                <li data-test-descendant>item 1</li>
                <li data-test-descendant>item 2</li>
                <li data-test-descendant>item 3</li>
              </ul>
            </span>
          </div>
        </div>
        <div data-test-child aria-hidden="true">
          <div data-test-descendant></div>
          <div data-test-descendant></div>
        </div>
        <iframe id="frame" title="frame"></iframe>
      </div>
    )
    const button = screen.getByTestId('button')
    const content = screen.getByTestId('content')

    button.focus()

    expect(document.activeElement).toBe(button)

    FocusRegionManager.focusRegion(content)
    FocusRegionManager.blurRegion(content)

    await waitFor(() => {
      expect(document.activeElement).toBe(button)
    })
  })
})
