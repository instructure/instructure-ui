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

import { Component, forwardRef, memo, useCallback } from 'react'
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { Transition } from '../index.js'
import { getClassNames } from '../styles.js'

import type { TransitionStyle, TransitionType } from '../props'

const COMPONENT_TEXT = 'Component Text'

const getClass = (
  type: TransitionType,
  phase: keyof TransitionStyle['classNames']
) => {
  const classNames = getClassNames(type)
  return classNames[phase]
}

// A non-InstUI forwardRef component: exposes the DOM node via React's
// built-in ref forwarding only. Intentionally does not spread all props
// onto the DOM so unrecognized props (like the InstUI-convention
// `elementRef` BaseTransition also passes) don't leak as DOM attributes.
const ExampleComponent = forwardRef<HTMLDivElement>((_props, ref) => {
  return <div ref={ref}>{COMPONENT_TEXT}</div>
})
ExampleComponent.displayName = 'ExampleComponent'

// Mirrors the InstUI functional-component pattern: exposes the DOM node via
// an `elementRef` prop rather than via React's built-in ref forwarding.
type InstUIStyleComponentProps = {
  elementRef?: (el: Element | null) => void
}
const InstUIStyleComponent = ({ elementRef }: InstUIStyleComponentProps) => {
  return (
    <div
      ref={(el) => {
        if (elementRef) elementRef(el)
      }}
    >
      {COMPONENT_TEXT}
    </div>
  )
}

// Mirrors an InstUI v1 class component: exposes the DOM node only via
// `elementRef`, not via React's built-in ref.
class InstUIStyleClassComponent extends Component<InstUIStyleComponentProps> {
  render() {
    const { elementRef } = this.props
    return (
      <div
        ref={(el) => {
          if (elementRef) elementRef(el)
        }}
      >
        {COMPONENT_TEXT}
      </div>
    )
  }
}

// Honors both `ref` (via forwardRef) and `elementRef` (InstUI convention),
// letting us verify BaseTransition doesn't fire its ref bookkeeping twice
// when a child wires up both.
const DualRefComponent = forwardRef<HTMLDivElement, InstUIStyleComponentProps>(
  ({ elementRef }, ref) => {
    // Memoized to avoid a fresh ref callback on every render, which would
    // cause React to detach/reattach the ref and muddy the dedupe assertion.
    const setRef = useCallback(
      (el: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
          ref(el)
        } else if (ref) {
          // eslint-disable-next-line no-param-reassign
          ref.current = el
        }
        if (elementRef) elementRef(el)
      },
      [ref, elementRef]
    )
    return <div ref={setRef}>{COMPONENT_TEXT}</div>
  }
)
DualRefComponent.displayName = 'DualRefComponent'

// memo(forwardRef(...)) — a common third-party shape. BaseTransition must
// unwrap the memo layer to detect the forwardRef underneath, otherwise the
// DOM node isn't captured.
const MemoForwardRefComponent = memo(
  forwardRef<HTMLDivElement>((_props, ref) => {
    return <div ref={ref}>{COMPONENT_TEXT}</div>
  })
)
MemoForwardRefComponent.displayName = 'MemoForwardRefComponent'

describe('<Transition />', () => {
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
      // BaseTransition passes both `ref` and `elementRef` to component
      // children so InstUI and non-InstUI forwardRef components both work.
      // A well-behaved forwardRef child must not leak the unrecognized
      // `elementRef` prop onto the DOM (React would warn in dev).
      expect(consoleErrorMock).not.toHaveBeenCalled()
    })

    it(`should correctly apply classes for '${type}' with a component that only exposes elementRef`, () => {
      const { getByText } = render(
        <Transition type={type} in={true}>
          <InstUIStyleComponent />
        </Transition>
      )
      const element = getByText(COMPONENT_TEXT)

      expect(element).toHaveClass(getClass(type, 'entered'))
    })

    it(`should correctly apply classes for '${type}' with a class component that only exposes elementRef`, () => {
      const { getByText } = render(
        <Transition type={type} in={true}>
          <InstUIStyleClassComponent />
        </Transition>
      )
      const element = getByText(COMPONENT_TEXT)

      expect(element).toHaveClass(getClass(type, 'entered'))
    })
  }

  types.forEach((type) => {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', async () => {
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

    await waitFor(() => {
      expect(element).toHaveClass(getClass(type, 'exited'))
    })
  })

  it('should remove component from DOM when `unmountOnExit` is set', async () => {
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
  })

  it('should not execute enter transition with `transitionEnter` set to false', async () => {
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

    await waitFor(() => {
      expect(onEntering).not.toHaveBeenCalled()
    })
  })

  it('should not execute exit transition with `transitionExit` set to false', async () => {
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

    await waitFor(() => {
      expect(onExiting).not.toHaveBeenCalled()
    })
  })

  it('should correctly call enter methods', async () => {
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

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should correctly call exit methods', async () => {
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

    await waitFor(() => {
      expect(onExit).toHaveBeenCalled()
      expect(onExiting).toHaveBeenCalled()
      expect(onExited).toHaveBeenCalled()
    })
  })

  it("should forward the child's rendered DOM element to Transition's elementRef", () => {
    const transitionElementRef = vi.fn()

    const { getByText } = render(
      <Transition type="fade" in={true} elementRef={transitionElementRef}>
        <InstUIStyleComponent />
      </Transition>
    )
    const element = getByText(COMPONENT_TEXT)

    expect(transitionElementRef).toHaveBeenCalledWith(element)
  })

  it('should not double-fire elementRef when the child honors both ref and elementRef', () => {
    const transitionElementRef = vi.fn()

    render(
      <Transition type="fade" in={true} elementRef={transitionElementRef}>
        <DualRefComponent />
      </Transition>
    )

    const calls = transitionElementRef.mock.calls.filter(
      ([arg]) => arg instanceof Element
    )
    expect(calls).toHaveLength(1)
  })

  it('should capture the DOM of a memo(forwardRef(...)) child', () => {
    const transitionElementRef = vi.fn()

    const { getByText } = render(
      <Transition type="fade" in={true} elementRef={transitionElementRef}>
        <MemoForwardRefComponent />
      </Transition>
    )
    const element = getByText(COMPONENT_TEXT)

    expect(element).toHaveClass(getClass('fade', 'entered'))
    expect(transitionElementRef).toHaveBeenCalledWith(element)
  })

  it("should chain the consumer's own elementRef with Transition's", () => {
    const transitionElementRef = vi.fn()
    const childElementRef = vi.fn()

    const { getByText } = render(
      <Transition type="fade" in={true} elementRef={transitionElementRef}>
        <InstUIStyleComponent elementRef={childElementRef} />
      </Transition>
    )
    const element = getByText(COMPONENT_TEXT)

    expect(transitionElementRef).toHaveBeenCalledWith(element)
    expect(childElementRef).toHaveBeenCalledWith(element)
  })

  it('should not throw when the child has a non-callback elementRef prop', () => {
    // Some consumers may pass a RefObject instead of a callback. InstUI's
    // convention is callback-style, but a runtime throw would be worse than
    // quietly ignoring the unsupported shape.
    const objectRef = { current: null }

    expect(() =>
      render(
        <Transition type="fade" in={true}>
          <InstUIStyleComponent
            elementRef={objectRef as unknown as (el: Element | null) => void}
          />
        </Transition>
      )
    ).not.toThrow()
  })
})
