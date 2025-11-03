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
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { Focusable } from '../index'
import type { FocusableRenderOptions } from '../props'

describe('<Focusable />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

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

  it('should render', () => {
    render(<Focusable>{() => <button>hello world</button>}</Focusable>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('hello world')
  })

  it('should call children function with focused when element receives focus', async () => {
    // Use real timers for this test due to userEvent async behavior
    vi.useRealTimers()

    const renderSpy = vi.fn()
    render(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button type="button">foo</button>
        }}
      </Focusable>
    )
    const focusable = screen.getByRole('button')

    await new Promise((resolve) => setTimeout(resolve, 0))

    const args1 = renderSpy.mock.lastCall![0]
    expect(args1).toHaveProperty('focused', false)
    expect(args1).toHaveProperty('focusable', focusable)
    expect(args1).toHaveProperty('focusVisible', false)

    await userEvent.type(focusable, '{enter}')
    await focusable.focus()

    await new Promise((resolve) => setTimeout(resolve, 0))

    const args2 = renderSpy.mock.lastCall![0]
    expect(document.activeElement).toBe(focusable)
    expect(args2).toHaveProperty('focused', true)
    expect(args2).toHaveProperty('focusable', focusable)
    expect(args2).toHaveProperty('focusVisible', true)

    await focusable.blur()

    await new Promise((resolve) => setTimeout(resolve, 0))

    const args3 = renderSpy.mock.lastCall![0]
    expect(document.activeElement).not.toBe(focusable)
    expect(args3).toHaveProperty('focused', false)
    expect(args3).toHaveProperty('focusable', focusable)
    expect(args3).toHaveProperty('focusVisible', false)

    vi.useFakeTimers()
  })

  it('should handle conditionally rendered focus elements', () => {
    const renderSpy = vi.fn(({ focused }) => (
      <div>
        {focused ? <input type="text" /> : <a href="http://focus.net">Click</a>}
      </div>
    ))

    render(<Focusable render={renderSpy} />)
    const firstFocusable = screen.getByText('Click')

    expect(firstFocusable.tagName).toBe('A')
    expect(firstFocusable).not.toHaveFocus()

    act(() => {
      vi.runAllTimers()
    })

    const args1 = renderSpy.mock.lastCall![0]
    expect(args1.focused).toBe(false)
    expect(args1.focusable).toBe(firstFocusable)

    act(() => {
      firstFocusable.focus()
      vi.runAllTimers()
    })

    const nextFocusable = screen.getByRole('textbox')

    expect(nextFocusable.tagName).toBe('INPUT')
    expect(nextFocusable).toHaveFocus()

    act(() => {
      vi.runAllTimers()
    })

    const args2 = renderSpy.mock.lastCall![0]
    expect(args2.focused).toBe(true)
    expect(args2.focusable).toBe(nextFocusable)

    act(() => {
      nextFocusable.blur()
      vi.runAllTimers()
    })

    const lastFocusable = screen.getByText('Click')

    expect(lastFocusable.tagName).toBe('A')
    expect(lastFocusable).not.toHaveFocus()

    act(() => {
      vi.runAllTimers()
    })

    const args3 = renderSpy.mock.lastCall![0]
    expect(args3.focused).toBe(false)
    expect(args3.focusable).toBe(lastFocusable)
  })

  it('should maintain focus when the focus element changes', () => {
    const renderSpy = vi.fn(() => <a href="http://focus.net">Click</a>)

    const { rerender } = render(<Focusable render={renderSpy} />)
    const firstFocusable = screen.getByText('Click')

    act(() => {
      firstFocusable.focus()
      vi.runAllTimers()
    })

    const lastCall = renderSpy.mock.lastCall as
      | [{ focused: boolean; focusable: HTMLElement }]
      | undefined
    const args = lastCall?.[0]

    expect(firstFocusable).toHaveFocus()
    expect(args?.focused).toBe(true)
    expect(args?.focusable).toBe(firstFocusable)

    // Set prop: render
    const nextRenderSpy = vi.fn(() => <button>Click</button>)
    rerender(<Focusable render={nextRenderSpy} />)

    const nextFocusable = screen.getByText('Click')

    expect(nextFocusable.tagName).toBe('BUTTON')
    expect(nextFocusable).toHaveFocus()

    act(() => {
      vi.runAllTimers()
    })

    const nextLastCall = nextRenderSpy.mock.lastCall as
      | [{ focused: boolean; focusable: HTMLElement }]
      | undefined
    const nextArgs = nextLastCall?.[0]

    expect(nextFocusable).toHaveFocus()
    expect(nextArgs?.focused).toBe(true)
    expect(nextArgs?.focusable).toBe(nextFocusable)
  })

  it('should update the focus element correctly', () => {
    const renderSpy = vi.fn()

    const { rerender } = render(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button>foo</button>
        }}
      </Focusable>
    )

    const firstButton = screen.getByText('foo')

    act(() => {
      firstButton.focus()
      vi.runAllTimers()
    })

    const args1 = renderSpy.mock.lastCall![0]
    expect(args1.focused).toBe(true)

    act(() => {
      firstButton.blur()
      vi.runAllTimers()
    })

    const args2 = renderSpy.mock.lastCall![0]
    expect(args2.focused).toBe(false)

    // Set child
    rerender(
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
    const secondButton = screen.getByText('bar')

    act(() => {
      secondButton.focus()
      vi.runAllTimers()
    })

    const args3 = renderSpy.mock.lastCall![0]
    expect(args3.focused).toBe(true)
  })

  it('should warn when there is more than one focusable descendant', () => {
    render(
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

  it('should warn when there are no focusable descendants', () => {
    render(
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

  it('should attach event listener correctly even when the focusable element is not the root', () => {
    const renderSpy = vi.fn()

    render(
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

    const button = screen.getByRole('button')

    act(() => {
      vi.runAllTimers()
    })

    const args1 = renderSpy.mock.lastCall![0]
    expect(args1.focused).toBe(false)

    act(() => {
      button.focus()
      vi.runAllTimers()
    })

    const args2 = renderSpy.mock.lastCall![0]
    expect(args2.focused).toBe(true)
  })

  it('should provide a focus method', () => {
    let focusable: Focusable
    render(
      <Focusable
        ref={(el: Focusable) => {
          focusable = el
        }}
      >
        {() => <button>hello world</button>}
      </Focusable>
    )

    focusable!.focus()

    const button = screen.getByText('hello world')

    expect(button).toHaveFocus()
  })

  it('should provide a focused getter', () => {
    let focusableInstance: any

    render(
      <Focusable>
        {(args) => {
          focusableInstance = args
          return <button>Click me</button>
        }}
      </Focusable>
    )
    const button = screen.getByText('Click me')

    expect(focusableInstance?.focused).toBe(false)

    act(() => {
      button.focus()
      vi.runAllTimers()
    })

    expect(focusableInstance?.focused).toBe(true)
    expect(button).toHaveFocus()
  })

  it('should properly restore the event handlers', () => {
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
    const { rerender, container } = render(<TestComponent changeValue="A" />)
    const initialInput = container.querySelector('input')

    act(() => {
      vi.runAllTimers()
    })

    expect(initialInput).toHaveValue('false_A')

    // Set Prop: changeValue
    rerender(<TestComponent changeValue="B" />)

    act(() => {
      inputRef!.focus()
      vi.runAllTimers()
    })

    expect(inputRef).toHaveValue('true_B')
  })

  it('should properly clear the focusable / focused state when focus is unexpectedly lost', async () => {
    // Use real timers for this test due to userEvent async behavior
    vi.useRealTimers()

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

    const { container } = render(<TestComponent />)
    const input = container.querySelector('input')

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(focusableRef!.focused).toBe(false)

    await userEvent.click(labelRef!)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(input).toHaveFocus()

    await userEvent.click(buttonRef!)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(input).not.toHaveFocus()

    vi.useFakeTimers()
  })
})
