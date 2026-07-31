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
import type { ComponentType } from 'react'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'

import { withStyle } from '@instructure/emotion'

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

// stands in for a real InstUI component, which ui-motion can't import (they
// depend on it)
type StyledChildProps = { elementRef?: (el: Element | null) => void }

class StyledChildBase extends Component<StyledChildProps> {
  static allowedProps = ['elementRef']
  render() {
    return <div ref={this.props.elementRef}>{COMPONENT_TEXT}</div>
  }
}

const StyledChild = withStyle(
  () => ({}),
  () => ({})
)(StyledChildBase) as unknown as ComponentType<StyledChildProps>

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
    it(`should correctly apply classes for '${type}' with html element`, async () => {
      await render(
        <Transition type={type} in={true}>
          <div>hello</div>
        </Transition>
      )
      const element = page.getByText('hello').element()

      expect(element).toHaveClass(getClass(type, 'entered'))
    })

    it(`should correctly apply classes for '${type}' with Component`, async () => {
      await render(
        <Transition type={type} in={true}>
          <ExampleComponent />
        </Transition>
      )
      const element = page.getByText(COMPONENT_TEXT).element()

      expect(element).toHaveClass(getClass(type, 'entered'))
    })
  }

  types.forEach((type) => {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', async () => {
    const type = 'fade'

    const { rerender } = await render(
      <Transition type={type} in={true}>
        <div>hello</div>
      </Transition>
    )
    const element = page.getByText('hello').element()

    expect(element).toHaveClass(getClass(type, 'entered'))

    await rerender(
      <Transition type={type} in={false}>
        <div>hello</div>
      </Transition>
    )

    await vi.waitFor(() => {
      expect(element).toHaveClass(getClass(type, 'exited'))
    })
  })

  it('should remove component from DOM when `unmountOnExit` is set', async () => {
    const { rerender } = await render(
      <Transition type="fade" in={true} unmountOnExit={true}>
        <div>hello</div>
      </Transition>
    )

    await expect.element(page.getByText('hello')).toBeInTheDocument()

    await rerender(
      <Transition type="fade" in={false} unmountOnExit={true}>
        <div>hello</div>
      </Transition>
    )

    await expect.element(page.getByText('hello')).not.toBeInTheDocument()
  })

  it('should not execute enter transition with `transitionEnter` set to false', async () => {
    const onEntering = vi.fn()

    const { rerender } = await render(
      <Transition
        type="fade"
        in={false}
        transitionEnter={true}
        onEntering={onEntering}
      >
        <div>hello</div>
      </Transition>
    )

    await rerender(
      <Transition
        type="fade"
        in={true}
        transitionEnter={false}
        onEntering={onEntering}
      >
        <div>hello</div>
      </Transition>
    )

    await vi.waitFor(() => {
      expect(onEntering).not.toHaveBeenCalled()
    })
  })

  it('should not execute exit transition with `transitionExit` set to false', async () => {
    const onExiting = vi.fn()

    const { rerender } = await render(
      <Transition
        type="fade"
        in={true}
        transitionExit={false}
        onExiting={onExiting}
      >
        <div>hello</div>
      </Transition>
    )

    await rerender(
      <Transition
        type="fade"
        in={false}
        transitionExit={false}
        onExiting={onExiting}
      >
        <div>hello</div>
      </Transition>
    )

    await vi.waitFor(() => {
      expect(onExiting).not.toHaveBeenCalled()
    })
  })

  it('should correctly call enter methods', async () => {
    const onEnter = vi.fn()
    const onEntering = vi.fn()
    const onEntered = vi.fn()

    await render(
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

    await vi.waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should correctly call exit methods', async () => {
    const onExit = vi.fn()
    const onExiting = vi.fn()
    const onExited = vi.fn()

    const { rerender } = await render(
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

    await rerender(
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

    await vi.waitFor(() => {
      expect(onExit).toHaveBeenCalled()
      expect(onExiting).toHaveBeenCalled()
      expect(onExited).toHaveBeenCalled()
    })
  })

  describe('capturing the child node', () => {
    const warningsMatching = (mock: MockInstance, pattern: RegExp) =>
      mock.mock.calls.filter((args: unknown[]) => pattern.test(args.join(' ')))

    const elementRefWarnings = (mock: MockInstance) =>
      warningsMatching(mock, /elementRef/)

    const refIsNotAPropWarnings = (mock: MockInstance) =>
      warningsMatching(mock, /`?ref`? is not a prop/)

    it('does not leak elementRef onto an emotion-wrapped host element', async () => {
      await render(
        <Transition type="fade" in={true}>
          <div css={{ color: 'red' }}>hello</div>
        </Transition>
      )
      const element = page.getByText('hello').element()

      expect(element).not.toHaveAttribute('elementref')
      expect(elementRefWarnings(consoleErrorMock)).toHaveLength(0)
    })

    it('still captures an emotion-wrapped host element', async () => {
      const elementRef = vi.fn()
      await render(
        <Transition type="fade" in={true} elementRef={elementRef}>
          <div css={{ color: 'red' }}>hello</div>
        </Transition>
      )

      // the node reached handleRef, so the transition classes could be applied
      expect(page.getByText('hello').element()).toHaveClass(
        getClass('fade', 'entered')
      )
      await vi.waitFor(() => {
        expect(elementRef).toHaveBeenCalledWith(expect.any(Element))
      })
    })

    // a withStyle child plus a running transition made React read `ref` off the
    // element; both conditions are needed to reproduce it
    it('does not read `ref` off a withStyle child mid-transition', async () => {
      const childElementRef = vi.fn()
      const transitionElementRef = vi.fn()

      await render(
        <Transition
          type="fade"
          in={false}
          transitionOnMount
          elementRef={transitionElementRef}
        >
          <StyledChild elementRef={childElementRef} />
        </Transition>
      )

      await vi.waitFor(() => {
        // the child's own elementRef is chained, not overwritten, and
        // Transition still captured the node
        expect(childElementRef).toHaveBeenCalledWith(expect.any(Element))
        expect(transitionElementRef).toHaveBeenCalledWith(expect.any(Element))
      })
      await expect.element(page.getByText(COMPONENT_TEXT)).toBeInTheDocument()
      expect(refIsNotAPropWarnings(consoleErrorMock)).toHaveLength(0)
      expect(elementRefWarnings(consoleErrorMock)).toHaveLength(0)
    })
  })
})
