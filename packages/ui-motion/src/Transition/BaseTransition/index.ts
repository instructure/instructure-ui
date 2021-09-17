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

import React, { createRef } from 'react'

import { getClassList } from '@instructure/ui-dom-utils'
import {
  ensureSingleChild,
  safeCloneElement
} from '@instructure/ui-react-utils'

import { allowedProps, propTypes } from './props'
import type { BaseTransitionProps } from './props'

const STATES = {
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
class BaseTransition extends React.Component<BaseTransitionProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    in: false,
    component: 'div',
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true,

    enterDelay: 300,
    exitDelay: 300,

    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},

    onExit: function () {},
    onExiting: function () {},
    onExited: function () {},
    onTransition: function () {},

    children: null
  }

  static states = STATES

  _timeouts = []

  state = {
    transitioning: false
  }

  componentDidMount() {
    this.startTransition(this.props.in, this.props.transitionOnMount)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.in !== prevProps.in && prevState.transitioning) {
      // direction changed before previous transition finished
      return true
    }
    return null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, cancelPrematurely) {
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
    this._unmounted = true
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'transitionIn' implicitly has an 'any' t... Remove this comment to see the full error message
  startTransition = (transitionIn, transitionOnStart) => {
    const { transitionEnter, transitionExit } = this.props
    if (transitionIn) {
      this.enter(transitionEnter && transitionOnStart ? STATES.EXITED : null)
    } else {
      this.exit(transitionExit && transitionOnStart ? STATES.ENTERED : null)
    }
  }

  transition = (
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toState' implicitly has an 'any' type.
    toState,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'fromState' implicitly has an 'any' type... Remove this comment to see the full error message
    fromState,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'transitionCallback' implicitly has an '... Remove this comment to see the full error message
    transitionCallback,
    transitionDuration = 0
  ) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
    if (this._unmounted) return

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

    if (toState && fromState) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onTransition' does not exist on type 'Re... Remove this comment to see the full error message
      this.props.onTransition(toState, fromState)
    }

    this._timeouts.push(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
      setTimeout(() => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
        if (this._unmounted) return

        if (typeof transitionCallback === 'function') {
          transitionCallback()
        }
      }, transitionDuration)
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'transitionClassName' implicitly has an ... Remove this comment to see the full error message
  clearTransition(transitionClassName) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
    if (this._unmounted) return

    this.setState({ transitioning: false }, () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
      if (this._unmounted) return

      const classList = getClassList(this)

      Object.keys(STATES).forEach((state) => {
        // @ts-expect-error FIXME: type
        classList.remove(this.getTransitionClassName(state))
      })

      classList.remove(transitionClassName)
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'initialState' implicitly has an 'any' t... Remove this comment to see the full error message
  enter = (initialState) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_unmounted' does not exist on type 'Base... Remove this comment to see the full error message
    if (this.state.transitioning || this._unmounted) return

    const { props } = this
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onEnter' does not exist on type 'Readonl... Remove this comment to see the full error message
    props.onEnter()

    if (props.transitionEnter) {
      this.setState({ transitioning: true }, () => {
        const enter = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onEntering' does not exist on type 'Read... Remove this comment to see the full error message
          props.onEntering()
          this.transition(STATES.ENTERED, STATES.ENTERING, () => {
            this.setState({ transitioning: false }, () => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'onEntered' does not exist on type 'Reado... Remove this comment to see the full error message
              props.onEntered()
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
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3-4 arguments, but got 2.
        this.transition(STATES.ENTERED, STATES.EXITED)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onEntered' does not exist on type 'Reado... Remove this comment to see the full error message
        props.onEntered()
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'initialState' implicitly has an 'any' t... Remove this comment to see the full error message
  exit = (initialState) => {
    if (this.state.transitioning) return

    const { props } = this
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onExit' does not exist on type 'Readonly... Remove this comment to see the full error message
    props.onExit()

    if (props.transitionExit) {
      this.setState({ transitioning: true }, () => {
        const exit = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onExiting' does not exist on type 'Reado... Remove this comment to see the full error message
          props.onExiting()
          this.transition(STATES.EXITED, STATES.EXITING, () => {
            this.setState({ transitioning: false }, () => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'onExited' does not exist on type 'Readon... Remove this comment to see the full error message
              props.onExited()
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
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3-4 arguments, but got 2.
        this.transition(STATES.EXITED, STATES.ENTERED)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onExited' does not exist on type 'Readon... Remove this comment to see the full error message
        props.onExited()
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toState' implicitly has an 'any' type.
  transitionEnabled(toState) {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'transitionState' implicitly has an 'any... Remove this comment to see the full error message
  getTransitionClassName(transitionState) {
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
        return null
    }
  }
  ref = createRef()
  renderChildren() {
    return safeCloneElement(ensureSingleChild(this.props.children)!, {
      'aria-hidden': !this.props.in ? true : null,
      ref: this.ref
    })
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
