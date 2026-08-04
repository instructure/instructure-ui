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
import { describe, it, expect, vi } from 'vitest'

import { TabsTab as Tab } from '@instructure/ui-tabs/latest'

describe('<Tabs.Tab />', () => {
  it('should render children', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const children = page.getByText('Tab Label').element()

    expect(children).toBeInTheDocument()
  })

  it('should have appropriate role attribute', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).toBeInTheDocument()
  })

  it('should have appropriate aria attributes', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).not.toHaveAttribute('aria-selected')
    expect(tab).not.toHaveAttribute('aria-disabled')
  })

  it('should set the aria-selected attribute', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel" isSelected>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).toHaveAttribute('aria-selected', 'true')
  })

  it('should set the aria-disabled attribute', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel" isDisabled>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set the tabindex to 0 when selected', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel" isSelected>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).toHaveAttribute('tabindex', '0')
  })

  it('should not set the tabindex when not selected', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel">
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).not.toHaveAttribute('tabindex')
  })

  it('should remove the tabindex attribute when disabled', async () => {
    await render(
      <Tab id="foo" index={0} controls="foo-panel" isDisabled>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    expect(tab).not.toHaveAttribute('tabindex')
  })

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn()
    const index = 2

    await render(
      <Tab id="foo" index={index} controls="foo-panel" onClick={onClick}>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    await userEvent.click(tab)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalled()

      const args = onClick.mock.calls[0][1]
      expect(args).toHaveProperty('index', index)
    })
  })

  it('should NOT call onClick when clicked and tab is disabled', async () => {
    const onClick = vi.fn()

    await render(
      <Tab id="foo" index={0} controls="foo-panel" onClick={onClick} isDisabled>
        Tab Label
      </Tab>
    )
    const tab = page.getByRole('tab').element()

    await userEvent.click(tab, { force: true })

    await vi.waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  it('should call onKeyDown when keys are pressed and tab is selected', async () => {
    const onKeyDown = vi.fn()
    const index = 2

    await render(
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
    const tab = page.getByRole('tab').element()

    tab.focus()
    await userEvent.keyboard('{Enter}')

    await vi.waitFor(() => {
      expect(onKeyDown).toHaveBeenCalled()

      const args = onKeyDown.mock.calls[0][1]
      expect(args).toHaveProperty('index', index)
    })
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', async () => {
    const onKeyDown = vi.fn()

    await render(
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
    const tab = page.getByRole('tab').element()

    tab.focus()
    await userEvent.keyboard('{Enter}')

    await vi.waitFor(() => {
      expect(onKeyDown).not.toHaveBeenCalled()
    })
  })
})
