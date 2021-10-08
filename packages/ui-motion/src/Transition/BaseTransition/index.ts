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

import React, { createRef, ReactElement } from 'react'

import { getClassList } from '@instructure/ui-dom-utils'
import {
  ensureSingleChild,
  safeCloneElement
} from '@instructure/ui-react-utils'

import { allowedProps, propTypes } from './props'
import type {
  BaseTransitionProps,
  BaseTransitionState,
  BaseTransitionStateValue,
  BaseTransitionStatesType
} from './props'

const STATES: Record<BaseTransitionStateValue, BaseTransitionStatesType> = {
  EXITED: -2,
  EXITING: -1,
  ENTERING: 1,
  ENTERED: 2
}

/**
---
private: true
---
  Note: this is forked from https://github.com/react-bootstrap/react-overlays/blob/master/src/Transition.js
  so that it works with css modules. The internals are pretty different now, but it has roughly the same api.
**/
class BaseTransition extends React.Component<
  BaseTransitionProps,
  BaseTransitionState
> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    in: false,
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true,
    enterDelay: 300,
    exitDelay: 300,
    children: null
  }

  static states = STATES

  _timeouts: ReturnType<typeof setTimeout>[] = []
  _unmounted = false

  state = {
    transitioning: false
  }

  componentDidMount() {
    this.startTransition(this.props.in, this.props.transitionOnMount)
  }

  getSnapshotBeforeUpdate(
    prevProps: BaseTransitionProps,
    prevState: BaseTransitionState
  ) {
    if (this.props.in !== prevProps.in && prevState.transitioning) {
      // direction changed before previous transition finished
      return true
    }
    return null
  }

  componentDidUpdate(
    prevProps: BaseTransitionProps,
    _prevState: BaseTransitionState,
    cancelPrematurely: boolean
  ) {
    if (cancelPrematurely) {
      this.clearTransition(prevProps.transitionClassName)
    }

    if (this.props.transitionClassName !== prevProps.transitionClassName) {
      this.clearTransition(prevProps.transitionClassName)
    }

    if (prevProps.in !== this.props.in) {
      this.startTransition(this.props.in, true)
    }
  }

  componentWillUnmount() {
    this._timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })
    this._unmounted = true
  }

  startTransition = (
    transitionIn: BaseTransitionProps['in'],
    transitionOnStart: BaseTransitionProps['transitionOnMount']
  ) => {
    const { transitionEnter, transitionExit } = this.props
    if (transitionIn) {
      this.enter(transitionEnter && transitionOnStart ? STATES.EXITED : null)
    } else {
      this.exit(transitionExit && transitionOnStart ? STATES.ENTERED : null)
    }
  }

  transition = (
    toState: BaseTransitionStatesType | null,
    fromState: BaseTransitionStatesType | null,
    transitionCallback?: () => void,
    transitionDuration = 0
  ) => {
    if (this._unmounted) return

    const { onTransition } = this.props

    const classList = getClassList(this)

    const transitionClassName = this.getTransitionClassName(toState)
    const prevTransitionClassName = this.getTransitionClassName(fromState)
    const baseTransitionClassName = this.props.transitionClassName

    if (fromState && transitionDuration && this.transitionEnabled(toState)) {
      baseTransitionClassName && classList.add(baseTransitionClassName)
    } else {
      baseTransitionClassName && classList.remove(baseTransitionClassName)
    }

    if (prevTransitionClassName) {
      classList.remove(prevTransitionClassName)
    }

    if (transitionClassName) {
      classList.add(transitionClassName)
    }

    if (toState && fromState && typeof onTransition === 'function') {
      onTransition(toState, fromState)
    }

    this._timeouts.push(
      setTimeout(() => {
        if (this._unmounted) return

        if (typeof transitionCallback === 'function') {
          transitionCallback()
        }
      }, transitionDuration)
    )
  }

  clearTransition(transitionClassName: string) {
    if (this._unmounted) return

    this.setState({ transitioning: false }, () => {
      if (this._unmounted) return

      const classList = getClassList(this)

      ;(Object.values(STATES) as BaseTransitionStatesType[]).forEach(
        (state) => {
          const className = this.getTransitionClassName(state)
          if (className) {
            classList.remove(className)
          }
        }
      )

      classList.remove(transitionClassName)
    })
  }

  enter = (initialState: BaseTransitionStatesType | null) => {
    if (this.state.transitioning || this._unmounted) return

    const { props } = this

    if (typeof props.onEnter === 'function') {
      props.onEnter()
    }

    if (props.transitionEnter) {
      this.setState({ transitioning: true }, () => {
        const enter = () => {
          if (typeof props.onEntering === 'function') {
            props.onEntering()
          }
          this.transition(STATES.ENTERED, STATES.ENTERING, () => {
            this.setState({ transitioning: false }, () => {
              if (typeof props.onEntered === 'function') {
                props.onEntered()
              }
            })
          })
        }
        if (initialState) {
          this.transition(initialState, null, () => {
            this.transition(
              STATES.ENTERING,
              initialState,
              enter,
              props.enterDelay
            )
          })
        } else {
          enter()
        }
      })
    } else {
      this.setState({ transitioning: false }, () => {
        this.transition(STATES.ENTERED, STATES.EXITED)
        if (typeof props.onEntered === 'function') {
          props.onEntered()
        }
      })
    }
  }

  exit = (initialState: BaseTransitionStatesType | null) => {
    if (this.state.transitioning) return

    const { props } = this

    if (typeof props.onExit === 'function') {
      props.onExit()
    }

    if (props.transitionExit) {
      this.setState({ transitioning: true }, () => {
        const exit = () => {
          if (typeof props.onExiting === 'function') {
            props.onExiting()
          }
          this.transition(STATES.EXITED, STATES.EXITING, () => {
            this.setState({ transitioning: false }, () => {
              if (typeof props.onExited === 'function') {
                props.onExited()
              }
            })
          })
        }
        if (initialState) {
          this.transition(initialState, null, () => {
            this.transition(STATES.EXITING, initialState, exit, props.exitDelay)
          })
        } else {
          exit()
        }
      })
    } else {
      this.setState({ transitioning: false }, () => {
        this.transition(STATES.EXITED, STATES.ENTERED)
        if (typeof props.onExited === 'function') {
          props.onExited()
        }
      })
    }
  }

  transitionEnabled(toState: BaseTransitionStatesType | null) {
    const { props } = this

    switch (toState) {
      case STATES.EXITED:
      case STATES.EXITING:
        return props.transitionExit
      case STATES.ENTERED:
      case STATES.ENTERING:
        return props.transitionEnter
      default:
        return false
    }
  }

  getTransitionClassName(transitionState: BaseTransitionStatesType | null) {
    const { props } = this

    switch (transitionState) {
      case STATES.EXITED:
        return props.exitedClassName
      case STATES.ENTERING:
        return props.enteringClassName
      case STATES.ENTERED:
        return props.enteredClassName
      case STATES.EXITING:
        return props.exitingClassName
      default:
        return undefined
    }
  }

  ref = createRef()

  renderChildren() {
    return this.props.children
      ? safeCloneElement(
          ensureSingleChild(this.props.children) as ReactElement,
          {
            'aria-hidden': !this.props.in ? true : null,
            ref: this.ref
          }
        )
      : null
  }

  render() {
    if (
      !this.props.in &&
      this.props.unmountOnExit &&
      !this.state.transitioning
    ) {
      return null
    } else {
      return this.renderChildren()
    }
  }
}

export default BaseTransition
export { BaseTransition }
