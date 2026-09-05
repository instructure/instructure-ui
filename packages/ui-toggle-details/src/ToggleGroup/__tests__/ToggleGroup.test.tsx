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
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { ToggleGroup } from '@instructure/ui-toggle-details/latest'

describe('<ToggleGroup />', () => {
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

  it('should show its summary and hide its children by default', async () => {
    await render(
      <ToggleGroup
        data-testId="toggle-group"
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = page.getByTestId('toggle-group').element()

    expect(toggleGroup).toMatchTextContent('This is the summary section')
    expect(toggleGroup).not.toMatchTextContent('This is the details section')
  })

  it('should render with children showing with the defaultExpanded prop', async () => {
    const { container } = await render(
      <ToggleGroup
        data-testId="toggle-group"
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        defaultExpanded
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = page.getByTestId('toggle-group').element()
    const toggle = container.querySelector('button')

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggleGroup).toMatchTextContent('This is the details section')
  })

  it('should have an aria-controls attribute', async () => {
    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        defaultExpanded
      >
        This is the details section
      </ToggleGroup>
    )
    const content = page.getByText('This is the details section').element()
    const toggle = container.querySelector('button')

    expect(toggle).toHaveAttribute('aria-controls', content.id)
  })

  it('should have an aria-expanded attribute', async () => {
    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('should toggle on click events', async () => {
    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')!

    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)

    await vi.waitFor(() => {
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
    })
  })

  it('should call onToggle on click events', async () => {
    const onToggle = vi.fn()

    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        expanded={false}
        onToggle={onToggle}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')!

    await userEvent.click(toggle)

    await vi.waitFor(() => {
      const args = onToggle.mock.calls[0]

      expect(onToggle).toHaveBeenCalledTimes(1)
      expect(args[0].type).toBe('click')
      expect(args[1]).toBe(true)
    })
  })

  it('should update the toggle screenreader label based on the expanded state', async () => {
    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel={(expanded) => (expanded ? 'Hide content' : 'Show content')}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')!
    const scrContent = container.querySelector(
      '[class$="-screenReaderContent"]'
    )

    expect(scrContent).toMatchTextContent('Show content')

    await userEvent.click(toggle)

    await vi.waitFor(() => {
      expect(scrContent).toMatchTextContent('Hide content')
    })
  })

  it('should accept custom icons', async () => {
    const Icon = (
      <svg height="50" width="50">
        <title>Icon collapsed</title>
        <circle cx="25" cy="25" r="20" />
      </svg>
    )

    const IconExpanded = (
      <svg height="50" width="50">
        <title>Icon expanded</title>
        <circle cx="25" cy="25" r="20" />
      </svg>
    )

    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        icon={() => Icon}
        iconExpanded={() => IconExpanded}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')!
    let svg = container.querySelector('svg')!

    expect(svg).toMatchTextContent('Icon collapsed')

    await userEvent.click(toggle)

    await vi.waitFor(() => {
      svg = container.querySelector('svg')!
      expect(svg).toMatchTextContent('Icon expanded')
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('focuses with the focus helper', async () => {
    let toggleRef: any
    const { container } = await render(
      <ToggleGroup
        data-testId="toggle-group"
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        ref={(el) => {
          toggleRef = el
        }}
      >
        This is the details section
      </ToggleGroup>
    )
    const toggle = container.querySelector('button')!

    expect(document.activeElement).not.toBe(toggle)

    toggleRef?.focus()

    expect(document.activeElement).toBe(toggle)
  })
})
