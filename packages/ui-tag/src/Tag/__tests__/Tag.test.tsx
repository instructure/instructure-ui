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

import { ComponentType } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import type { ViewProps } from '@instructure/ui-view/latest'
import { Tag } from '@instructure/ui-tag/latest'
import { View } from '@instructure/ui-view/latest'

const originalOmitViewProps = View.omitViewProps

describe('<Tag />', async () => {
  beforeAll(() => {
    // View component read Component.name instead of Component.displayName
    // causing [undefined] in error messages
    type TagComponentType = ComponentType & {
      name: 'Tag'
    }

    View.omitViewProps = (props, Component) => {
      const ModifiedComponent = {
        ...Component,
        name: 'Tag'
      } as TagComponentType
      return originalOmitViewProps(props, ModifiedComponent)
    }
  })
  afterAll(() => {
    View.omitViewProps = originalOmitViewProps
  })

  it('should display text', async () => {
    render(<Tag text="Summer" />)
    const tag = screen.getByText('Summer')

    expect(tag).toBeInTheDocument()
  })

  it('should render the body as a button and respond to onClick event', async () => {
    const onClick = vi.fn()
    render(<Tag text="Summer" onClick={onClick} />)

    const button = screen.getByRole('button')

    await userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(button.tagName).toBe('BUTTON')
    })
  })

  it('should render the body as a link when an href is provided', async () => {
    render(<Tag text="Summer" href="/summer" />)

    const link = screen.getByRole('link')

    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/summer')
  })

  it('should render a link and still fire onClick when both href and onClick are provided', async () => {
    const onClick = vi.fn((e) => e.preventDefault())
    render(<Tag text="Summer" href="/summer" onClick={onClick} />)

    const link = screen.getByRole('link')
    await userEvent.click(link)

    await waitFor(() => {
      expect(link.tagName).toBe('A')
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render a leading icon before the text', async () => {
    const { container } = render(
      <Tag text="Summer" renderIcon={<svg name="calendar" />} />
    )
    const icon = container.querySelector('svg[name="calendar"]')

    expect(icon).toBeInTheDocument()
  })

  it('should render a close button and fire onDismiss when it is dismissible', async () => {
    const onDismiss = vi.fn()
    const { container } = render(
      <Tag text="Summer" dismissible onDismiss={onDismiss} />
    )
    const icon = container.querySelector('svg')
    expect(icon).toHaveAttribute('name', 'X')

    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })
  })

  it('should only dismiss when the close button is clicked, not the body', async () => {
    const onClick = vi.fn()
    const onDismiss = vi.fn()
    render(
      <Tag text="Summer" onClick={onClick} dismissible onDismiss={onDismiss} />
    )

    // body button (contains the text) and close button (contains the X icon)
    const body = screen.getByText('Summer').closest('button')!
    await userEvent.click(body)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  it('should not fire onClick or onDismiss when disabled', async () => {
    const onClick = vi.fn()
    const onDismiss = vi.fn()
    const { container } = render(
      <Tag
        text="Summer"
        onClick={onClick}
        dismissible
        onDismiss={onDismiss}
        disabled
      />
    )

    const buttons = container.querySelectorAll('button')
    buttons.forEach((button) => {
      fireEvent.click(button, { button: 0, detail: 1 })
    })

    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  it('should move focus to the link body then the close button via Tab', async () => {
    render(
      <Tag text="Summer" href="/summer" dismissible onDismiss={() => {}} />
    )
    const link = screen.getByRole('link')
    const closeButton = screen.getByRole('button')

    await userEvent.tab()
    expect(link).toHaveFocus()

    await userEvent.tab()
    expect(closeButton).toHaveFocus()
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<Tag text="Summer" />)
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

            render(<Tag text="Summer" {...props} />)
            const warning = `Warning: [Tag] prop '${prop}' is not allowed.`

            expect(consoleError.mock.calls[0][0]).toBe(warning)
            consoleError.mockRestore()
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = vi.spyOn(console, 'error')

            render(<Tag text="Summer" {...props} />)

            expect(consoleError).not.toHaveBeenCalled()
            consoleError.mockRestore()
          })
        }
      })
  })
})
