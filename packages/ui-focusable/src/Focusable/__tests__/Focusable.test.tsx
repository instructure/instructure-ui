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

import { Component } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'

import { Focusable } from '../index.js'
import type { FocusableRenderOptions } from '../props'

describe('<Focusable />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
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

  it('should render', async () => {
    await render(<Focusable>{() => <button>hello world</button>}</Focusable>)
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('hello world')
  })

  it('should call children function with focused when element receives focus', async () => {
    const renderSpy = vi.fn()
    await render(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button type="button">foo</button>
        }}
      </Focusable>
    )
    const focusable = page.getByRole('button').element()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args).toHaveProperty('focused', false)
      expect(args).toHaveProperty('focusable', focusable)
      expect(args).toHaveProperty('focusVisible', false)
    })

    await userEvent.type(focusable, '{enter}')
    await focusable.focus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(document.activeElement).toBe(focusable)
      expect(args).toHaveProperty('focused', true)
      expect(args).toHaveProperty('focusable', focusable)
      expect(args).toHaveProperty('focusVisible', true)
    })

    await focusable.blur()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(document.activeElement).not.toBe(focusable)
      expect(args).toHaveProperty('focused', false)
      expect(args).toHaveProperty('focusable', focusable)
      expect(args).toHaveProperty('focusVisible', false)
    })
  })

  it('should handle conditionally rendered focus elements', async () => {
    const renderSpy = vi.fn(({ focused }) => (
      <div>
        {focused ? <input type="text" /> : <a href="http://focus.net">Click</a>}
      </div>
    ))

    await render(<Focusable render={renderSpy} />)
    const firstFocusable = page.getByText('Click').element()

    expect(firstFocusable.tagName).toBe('A')
    expect(firstFocusable).not.toHaveFocus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(false)
      expect(args.focusable).toBe(firstFocusable)
    })

    await firstFocusable.focus()

    const nextFocusable = page.getByRole('textbox').element()

    expect(nextFocusable.tagName).toBe('INPUT')
    expect(nextFocusable).toHaveFocus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]
      expect(args.focused).toBe(true)
      expect(args.focusable).toBe(nextFocusable)
    })

    await nextFocusable.blur()

    const lastFocusable = page.getByText('Click').element()

    expect(lastFocusable.tagName).toBe('A')
    expect(lastFocusable).not.toHaveFocus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]
      expect(args.focused).toBe(false)
      expect(args.focusable).toBe(lastFocusable)
    })
  })

  it('should maintain focus when the focus element changes', async () => {
    const renderSpy = vi.fn(() => <a href="http://focus.net">Click</a>)

    const { rerender } = await render(<Focusable render={renderSpy} />)
    const firstFocusable = page.getByText('Click').element()

    await firstFocusable.focus()

    await vi.waitFor(() => {
      const lastCall = renderSpy.mock.lastCall as
        | [{ focused: boolean; focusable: HTMLElement }]
        | undefined
      const args = lastCall?.[0]

      expect(firstFocusable).toHaveFocus()
      expect(args?.focused).toBe(true)
      expect(args?.focusable).toBe(firstFocusable)
    })

    // Set prop: render
    const nextRenderSpy = vi.fn(() => <button>Click</button>)
    await rerender(<Focusable render={nextRenderSpy} />)

    const nextFocusable = page.getByText('Click').element()

    expect(nextFocusable.tagName).toBe('BUTTON')
    expect(nextFocusable).toHaveFocus()

    await vi.waitFor(() => {
      const nextLastCall = nextRenderSpy.mock.lastCall as
        | [{ focused: boolean; focusable: HTMLElement }]
        | undefined
      const nextArgs = nextLastCall?.[0]

      expect(nextFocusable).toHaveFocus()
      expect(nextArgs?.focused).toBe(true)
      expect(nextArgs?.focusable).toBe(nextFocusable)
    })
  })

  it('should update the focus element correctly', async () => {
    const renderSpy = vi.fn()

    const { rerender } = await render(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button>foo</button>
        }}
      </Focusable>
    )

    const firstButton = page.getByText('foo').element()

    await firstButton.focus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(true)
    })

    await firstButton.blur()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(false)
    })

    // Set child
    await rerender(
      <Focusable>
        {(args: FocusableRenderOptions) => {
          renderSpy(args)
          return (
            <span>
              some content text<button>bar</button>
            </span>
          )
        }}
      </Focusable>
    )
    const secondButton = page.getByText('bar').element()

    await secondButton.focus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(true)
    })
  })

  it('should warn when there is more than one focusable descendant', async () => {
    await render(
      <Focusable>
        {() => {
          return (
            <span>
              <button>foo</button>
              <span>
                <button>bar</button>
              </span>
            </span>
          )
        }}
      </Focusable>
    )

    const expectedWarningMessage =
      'Warning: [Focusable] Exactly one focusable child is required (2 found).'

    expect(consoleWarningMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedWarningMessage),
      expect.any(String)
    )
  })

  it('should warn when there are no focusable descendants', async () => {
    await render(
      <Focusable>
        {() => {
          return <span>hello!</span>
        }}
      </Focusable>
    )

    const expectedWarningMessage =
      'Warning: [Focusable] Exactly one focusable child is required (0 found).'

    expect(consoleWarningMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedWarningMessage),
      expect.any(String)
    )
  })

  it('should attach event listener correctly even when the focusable element is not the root', async () => {
    const renderSpy = vi.fn()

    await render(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return (
            <span>
              <h1>hello world</h1>
              <p>some content</p>
              <span>
                <button>foo</button>
              </span>
            </span>
          )
        }}
      </Focusable>
    )

    const button = page.getByRole('button').element()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(false)
    })

    await button.focus()

    await vi.waitFor(() => {
      const args = renderSpy.mock.lastCall![0]

      expect(args.focused).toBe(true)
    })
  })

  it('should provide a focus method', async () => {
    let focusable: Focusable
    await render(
      <Focusable
        ref={(el: Focusable) => {
          focusable = el
        }}
      >
        {() => <button>hello world</button>}
      </Focusable>
    )

    await focusable!.focus()

    const button = page.getByText('hello world').element()

    expect(button).toHaveFocus()
  })

  it('should provide a focused getter', async () => {
    let focusableInstance: any

    await render(
      <Focusable>
        {(args) => {
          focusableInstance = args
          return <button>Click me</button>
        }}
      </Focusable>
    )
    const button = page.getByText('Click me').element()

    expect(focusableInstance?.focused).toBe(false)

    await button.focus()

    await vi.waitFor(() => {
      expect(focusableInstance?.focused).toBe(true)
      expect(button).toHaveFocus()
    })
  })

  it('should properly restore the event handlers', async () => {
    let inputRef: HTMLInputElement | null = null
    class TestComponent extends Component<{ changeValue: string }> {
      render() {
        const { changeValue } = this.props

        return (
          <Focusable>
            {({ focusVisible }) => {
              return (
                <input
                  readOnly
                  ref={(el) => {
                    inputRef = el
                  }}
                  value={`${focusVisible}_${changeValue}`}
                />
              )
            }}
          </Focusable>
        )
      }
    }
    const { rerender, container } = await render(
      <TestComponent changeValue="A" />
    )
    const initialInput = container.querySelector('input')

    await vi.waitFor(() => {
      expect(initialInput).toHaveValue('false_A')
    })

    // Set Prop: changeValue
    await rerender(<TestComponent changeValue="B" />)

    await inputRef!.focus()

    await vi.waitFor(() => {
      expect(inputRef).toHaveValue('true_B')
    })
  })

  it('should properly clear the focusable / focused state when focus is unexpectedly lost', async () => {
    let buttonRef: HTMLButtonElement | null
    let focusableRef: Focusable | null
    let labelRef: HTMLLabelElement | null

    class TestComponent extends Component {
      state = {
        checked: false,
        disabled: false
      }

      render() {
        const { checked, disabled } = this.state

        return (
          <div>
            <Focusable
              ref={(el) => {
                focusableRef = el
              }}
            >
              {() => {
                return (
                  <label
                    ref={(el) => {
                      labelRef = el
                    }}
                    aria-label={'test-label'}
                  >
                    <input
                      checked={checked}
                      disabled={disabled}
                      onChange={() => {
                        this.setState({ checked: true })
                      }}
                      type="checkbox"
                    />
                  </label>
                )
              }}
            </Focusable>
            <button
              onClick={() => {
                this.setState({ disabled: true })
              }}
              ref={(el) => {
                buttonRef = el
              }}
            >
              hello world
            </button>
          </div>
        )
      }
    }

    const { container } = await render(<TestComponent />)
    const input = container.querySelector('input')

    await vi.waitFor(() => {
      expect(focusableRef!.focused).toBe(false)
    })

    await userEvent.click(labelRef!)

    await vi.waitFor(() => {
      expect(input).toHaveFocus()
    })

    await userEvent.click(buttonRef!)

    await vi.waitFor(() => {
      expect(input).not.toHaveFocus()
    })
  })
})
