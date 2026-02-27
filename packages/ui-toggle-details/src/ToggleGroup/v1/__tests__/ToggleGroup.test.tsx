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
import { runAxeCheck } from '@instructure/ui-axe-check'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { ToggleGroup } from '../index'

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
    render(
      <ToggleGroup
        data-testId="toggle-group"
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
      >
        This is the details section
      </ToggleGroup>
    )
    const toggleGroup = screen.getByTestId('toggle-group')

    expect(toggleGroup).toHaveTextContent('This is the summary section')
    expect(toggleGroup).not.toHaveTextContent('This is the details section')
  })

  it('should render with children showing with the defaultExpanded prop', async () => {
    const { container } = render(
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
    const toggleGroup = screen.getByTestId('toggle-group')
    const toggle = container.querySelector('button')

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggleGroup).toHaveTextContent('This is the details section')
  })

  it('should have an aria-controls attribute', async () => {
    const { container } = render(
      <ToggleGroup
        transition={false}
        summary="This is the summary section"
        toggleLabel="This is the toggleLabel"
        defaultExpanded
      >
        This is the details section
      </ToggleGroup>
    )
    const content = screen.getByText('This is the details section')
    const toggle = container.querySelector('button')

    expect(toggle).toHaveAttribute('aria-controls', content.id)
  })

  it('should have an aria-expanded attribute', async () => {
    const { container } = render(
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
    const { container } = render(
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

    await waitFor(() => {
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
    })
  })

  it('should call onToggle on click events', async () => {
    const onToggle = vi.fn()

    const { container } = render(
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

    await waitFor(() => {
      const args = onToggle.mock.calls[0]

      expect(onToggle).toHaveBeenCalledTimes(1)
      expect(args[0].type).toBe('click')
      expect(args[1]).toBe(true)
    })
  })

  it('should update the toggle screenreader label based on the expanded state', async () => {
    const { container } = render(
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

    expect(scrContent).toHaveTextContent('Show content')

    await userEvent.click(toggle)

    await waitFor(() => {
      expect(scrContent).toHaveTextContent('Hide content')
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

    const { container } = render(
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
    const svg = container.querySelector('svg')!

    expect(svg).toHaveTextContent('Icon collapsed')

    await userEvent.click(toggle)

    await waitFor(() => {
      expect(svg).toHaveTextContent('Icon expanded')
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
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
    const { container } = render(
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
