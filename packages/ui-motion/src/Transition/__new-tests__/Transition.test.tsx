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

import React, { Component } from 'react'
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
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

class ExampleComponent extends Component {
  render() {
    return <div>{COMPONENT_TEXT}</div>
  }
}

describe('<Transition />', () => {
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
    const onEntering = jest.fn()

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
    const onExiting = jest.fn()

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
    const onEnter = jest.fn()
    const onEntering = jest.fn()
    const onEntered = jest.fn()

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
    const onExit = jest.fn()
    const onExiting = jest.fn()
    const onExited = jest.fn()

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
})
