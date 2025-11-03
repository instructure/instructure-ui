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

import { Component, createRef, RefObject } from 'react'
import { act, render, waitForElementToBeRemoved } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { Transition } from '../index'
import { getClassNames } from '../styles'

import type { TransitionStyle, TransitionType } from '../props'

const COMPONENT_TEXT = 'Component Text'

const getClass = (
  type: TransitionType,
  phase: keyof TransitionStyle['classNames']
) => {
  const classNames = getClassNames(type)
  return classNames[phase]
}

class ExampleComponent extends Component<any, any> {
  private ref: RefObject<any>

  constructor(props: any) {
    super(props)
    this.ref = createRef()
  }
  render() {
    return <div ref={this.ref}>{COMPONENT_TEXT}</div>
  }
}

describe('<Transition />', () => {
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

  const types: TransitionType[] = [
    'fade',
    'scale',
    'slide-down',
    'slide-up',
    'slide-left',
    'slide-right'
  ]

  const expectTypeClass = function (type: TransitionType) {
    it(`should correctly apply classes for '${type}' with html element`, () => {
      const { getByText } = render(
        <Transition type={type} in={true}>
          <div>hello</div>
        </Transition>
      )
      const element = getByText('hello')

      expect(element).toHaveClass(getClass(type, 'entered'))
    })

    it(`should correctly apply classes for '${type}' with Component`, () => {
      const { getByText } = render(
        <Transition type={type} in={true}>
          <ExampleComponent />
        </Transition>
      )
      const element = getByText(COMPONENT_TEXT)

      expect(element).toHaveClass(getClass(type, 'entered'))
    })
  }

  types.forEach((type) => {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', () => {
    const type = 'fade'

    const { getByText, rerender } = render(
      <Transition type={type} in={true}>
        <div>hello</div>
      </Transition>
    )
    const element = getByText('hello')

    expect(element).toHaveClass(getClass(type, 'entered'))

    rerender(
      <Transition type={type} in={false}>
        <div>hello</div>
      </Transition>
    )

    act(() => {
      vi.runAllTimers()
    })

    expect(element).toHaveClass(getClass(type, 'exited'))
  })

  it('should remove component from DOM when `unmountOnExit` is set', async () => {
    // Use real timers for this test since waitForElementToBeRemoved has internal timeouts
    vi.useRealTimers()

    const { getByText, rerender } = render(
      <Transition type="fade" in={true} unmountOnExit={true}>
        <div>hello</div>
      </Transition>
    )

    expect(getByText('hello')).toBeInTheDocument()

    rerender(
      <Transition type="fade" in={false} unmountOnExit={true}>
        <div>hello</div>
      </Transition>
    )

    await waitForElementToBeRemoved(() => getByText('hello'))

    // Restore fake timers for subsequent tests
    vi.useFakeTimers()
  })

  it('should not execute enter transition with `transitionEnter` set to false', () => {
    const onEntering = vi.fn()

    const { rerender } = render(
      <Transition
        type="fade"
        in={false}
        transitionEnter={true}
        onEntering={onEntering}
      >
        <div>hello</div>
      </Transition>
    )

    rerender(
      <Transition
        type="fade"
        in={true}
        transitionEnter={false}
        onEntering={onEntering}
      >
        <div>hello</div>
      </Transition>
    )

    act(() => {
      vi.runAllTimers()
    })

    expect(onEntering).not.toHaveBeenCalled()
  })

  it('should not execute exit transition with `transitionExit` set to false', () => {
    const onExiting = vi.fn()

    const { rerender } = render(
      <Transition
        type="fade"
        in={true}
        transitionExit={false}
        onExiting={onExiting}
      >
        <div>hello</div>
      </Transition>
    )

    rerender(
      <Transition
        type="fade"
        in={false}
        transitionExit={false}
        onExiting={onExiting}
      >
        <div>hello</div>
      </Transition>
    )

    act(() => {
      vi.runAllTimers()
    })

    expect(onExiting).not.toHaveBeenCalled()
  })

  it('should correctly call enter methods', () => {
    const onEnter = vi.fn()
    const onEntering = vi.fn()
    const onEntered = vi.fn()

    render(
      <Transition
        type="fade"
        in={true}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div>hello</div>
      </Transition>
    )

    act(() => {
      vi.runAllTimers()
    })

    expect(onEnter).toHaveBeenCalled()
    expect(onEntering).toHaveBeenCalled()
    expect(onEntered).toHaveBeenCalled()
  })

  it('should correctly call exit methods', () => {
    const onExit = vi.fn()
    const onExiting = vi.fn()
    const onExited = vi.fn()

    const { rerender } = render(
      <Transition
        type="fade"
        in={true}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div>hello</div>
      </Transition>
    )

    rerender(
      <Transition
        type="fade"
        in={false}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div>hello</div>
      </Transition>
    )

    act(() => {
      vi.runAllTimers()
    })

    expect(onExit).toHaveBeenCalled()
    expect(onExiting).toHaveBeenCalled()
    expect(onExited).toHaveBeenCalled()
  })
})
