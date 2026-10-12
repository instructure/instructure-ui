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

import { runAxeCheck } from '@instructure/ui-axe-check'
import type { ViewProps } from '@instructure/ui-view/latest'
import { Tag } from '@instructure/ui-tag/latest'
import type { TagHandle } from '@instructure/ui-tag/latest'
import { View } from '@instructure/ui-view/latest'

describe('<Tag />', async () => {
  it('should display text', async () => {
    await render(<Tag text="Summer" />)
    const tag = page.getByText('Summer').element()

    expect(tag).toBeInTheDocument()
  })

  it('should not be focusable without a link or a close button', async () => {
    await render(<Tag text="Summer" />)

    await userEvent.tab()

    expect(document.activeElement).toBe(document.body)
  })

  it('should render the body as a link when an href is provided', async () => {
    await render(<Tag text="Summer" href="/summer" />)
    const link = page.getByRole('link').element()

    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/summer')
  })

  it('should render a leading icon', async () => {
    const { container } = await render(
      <Tag text="Summer" renderIcon={<svg name="calendar" />} />
    )

    expect(container.querySelector('svg[name="calendar"]')).toBeInTheDocument()
  })

  it('should render a labelled close button that calls onDismiss', async () => {
    const onDismiss = vi.fn()
    await render(
      <Tag
        text="Summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={onDismiss}
      />
    )

    await userEvent.click(page.getByRole('button', { name: 'Remove Summer' }))

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call onDismiss when the link is clicked', async () => {
    const onDismiss = vi.fn()
    await render(
      <Tag
        text="Summer"
        href="#summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={onDismiss}
      />
    )

    await userEvent.click(page.getByRole('link'))

    expect(onDismiss).not.toHaveBeenCalled()
  })

  it.each(['disabled', 'readOnly'] as const)(
    'should block the link and the close button when %s',
    async (state) => {
      const onDismiss = vi.fn()
      const { container } = await render(
        <Tag
          text="Summer"
          href="/summer"
          renderDismissButtonLabel="Remove Summer"
          onDismiss={onDismiss}
          {...{ [state]: true }}
        />
      )
      const link = container.querySelector('a')!

      container.querySelector('button')!.click()

      expect(link).not.toHaveAttribute('href')
      expect(link).toHaveAttribute('aria-disabled', 'true')
      expect(onDismiss).not.toHaveBeenCalled()
    }
  )

  it('should move focus to the link and then to the close button with Tab', async () => {
    await render(
      <Tag
        text="Summer"
        href="/summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={vi.fn()}
      />
    )

    await userEvent.tab()
    expect(page.getByRole('link').element()).toHaveFocus()

    await userEvent.tab()
    expect(page.getByRole('button').element()).toHaveFocus()
  })

  it('should focus the link through the ref', async () => {
    let tagRef: TagHandle | null = null
    await render(
      <Tag
        text="Summer"
        href="/summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={vi.fn()}
        ref={(el) => (tagRef = el)}
      />
    )

    tagRef!.focus()

    expect(page.getByRole('link').element()).toHaveFocus()
    expect(tagRef!.focused).toBe(true)
  })

  it('should focus the close button through the ref when it is the only focusable element', async () => {
    let tagRef: TagHandle | null = null
    await render(
      <Tag
        text="Summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={vi.fn()}
        ref={(el) => (tagRef = el)}
      />
    )

    tagRef!.focus()

    expect(page.getByRole('button').element()).toHaveFocus()
    expect(tagRef!.focused).toBe(true)
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<Tag text="Summer" />)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should meet a11y standards when dismissible', async () => {
    const { container } = await render(
      <Tag
        text="Summer"
        renderDismissButtonLabel="Remove Summer"
        onDismiss={vi.fn()}
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('when passing down props to View', async () => {
    const allowedProps: Partial<ViewProps> = {
      margin: 'small',
      elementRef: () => {}
    }
    View.allowedProps
      .filter((prop) => prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: 'foo'
            }
            const consoleError = vi
              .spyOn(console, 'error')
              .mockImplementation(() => {})

            await render(<Tag text="Summer" {...props} />)
            const warning = `Warning: [Tag] prop '${prop}' is not allowed.`

            expect(consoleError.mock.calls[0][0]).toBe(warning)
            consoleError.mockRestore()
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = vi.spyOn(console, 'error')

            await render(<Tag text="Summer" {...props} />)

            expect(consoleError).not.toHaveBeenCalled()
            consoleError.mockRestore()
          })
        }
      })
  })
})
