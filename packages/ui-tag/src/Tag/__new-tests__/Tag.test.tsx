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

import React, { ComponentType } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

import { Tag } from '../index'
import { runAxeCheck } from '@instructure/ui-axe-check'
import type { ViewProps } from '@instructure/ui-view'
import { View } from '@instructure/ui-view'

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

  it('should render as a button and respond to onClick event', async () => {
    const onClick = vi.fn()
    render(<Tag data-testid="summer-button" text="Summer" onClick={onClick} />)

    const button = screen.getByTestId('summer-button')

    userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(button.tagName).toBe('BUTTON')
    })
  })

  it('should render a close icon when it is dismissible and clickable', async () => {
    const onClick = vi.fn()
    const { container } = render(
      <Tag text="Summer" onClick={onClick} dismissible={true} />
    )
    const icon = container.querySelector('svg')

    expect(icon).toHaveAttribute('name', 'IconX')
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
