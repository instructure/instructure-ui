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
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Tab } from '../index'

describe('<Tabs.Tab />', () => {
  it('should render children', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const children = screen.getByText('Tab Label')

    expect(children).toBeInTheDocument()
  })

  it('should have appropriate role attribute', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).toBeInTheDocument()
  })

  it('should have appropriate aria attributes', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).not.toHaveAttribute('aria-selected')
    expect(tab).not.toHaveAttribute('aria-disabled')
  })

  it('should set the aria-selected attribute', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel" isSelected>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).toHaveAttribute('aria-selected', 'true')
  })

  it('should set the aria-disabled attribute', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel" isDisabled>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set the tabindex to 0 when selected', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel" isSelected>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).toHaveAttribute('tabindex', '0')
  })

  it('should not set the tabindex when not selected', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).not.toHaveAttribute('tabindex')
  })

  it('should remove the tabindex attribute when disabled', async () => {
    render(
      <Tab id="foo" index={0} controls="foo-panel" isDisabled>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    expect(tab).not.toHaveAttribute('tabindex')
  })

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn()
    const index = 2

    render(
      <Tab id="foo" index={index} controls="foo-panel" onClick={onClick}>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    await userEvent.click(tab)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()

      const args = onClick.mock.calls[0][1]
      expect(args).toHaveProperty('index', index)
    })
  })

  it('should NOT call onClick when clicked and tab is disabled', async () => {
    const onClick = vi.fn()

    render(
      <Tab id="foo" index={0} controls="foo-panel" onClick={onClick} isDisabled>
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    await userEvent.click(tab)

    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  it('should call onKeyDown when keys are pressed and tab is selected', async () => {
    const onKeyDown = vi.fn()
    const index = 2

    render(
      <Tab
        id="foo"
        isSelected
        index={index}
        controls="foo-panel"
        onKeyDown={onKeyDown}
      >
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    await userEvent.type(tab, '{enter}')

    await waitFor(() => {
      expect(onKeyDown).toHaveBeenCalled()

      const args = onKeyDown.mock.calls[0][1]
      expect(args).toHaveProperty('index', index)
    })
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', async () => {
    const onKeyDown = vi.fn()

    render(
      <Tab
        id="foo"
        index={0}
        controls="foo-panel"
        onKeyDown={onKeyDown}
        isDisabled
      >
        Tab Label
      </Tab>
    )
    const tab = screen.getByRole('tab')

    await userEvent.type(tab, '{enter}')

    await waitFor(() => {
      expect(onKeyDown).not.toHaveBeenCalled()
    })
  })
})
