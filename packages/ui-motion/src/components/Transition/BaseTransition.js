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

import React from 'react'
import PropTypes from 'prop-types'
import getClassList from '@instructure/ui-utils/lib/dom/getClassList'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'

const STATES = {
  EXITED: -2,
  EXITING: -1,
  ENTERING: 1,
  ENTERED: 2
}

/**
  Note: this is forked from https://github.com/react-bootstrap/react-overlays/blob/master/src/Transition.js
  so that it works with css modules. The internals are pretty different now, but it has roughly the same api.
**/
export default class BaseTransition extends React.Component {
  static propTypes = {
    /**
     * Show the component? Triggers the enter or exit animation.
     */
    in: PropTypes.bool,

    /**
     * Unmount the component (remove it from the DOM) when it is not shown.
     */
    unmountOnExit: PropTypes.bool,

    /**
     * Run the enter animation when the component mounts, if it is initially
     * shown
     */
    transitionOnMount: PropTypes.bool,
    /**
     * Run the enter animation
     */
    transitionEnter: PropTypes.bool,
    /**
     * Run the exit animation
     */
    transitionExit: PropTypes.bool,

    /**
     * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
     * transition indefinately if the browser transitionEnd events are
     * canceled or interrupted.
     *
     * By default this is set to a high number (5 seconds) as a failsafe. You should consider
     * setting this to the duration of your animation (or a bit above it).
     */
    enterDelay: PropTypes.number,

    /**
     * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
     * transition indefinately if the browser transitionEnd events are
     * canceled or interrupted.
     *
     * By default this is set to a high number (5 seconds) as a failsafe. You should consider
     * setting this to the duration of your animation (or a bit above it).
     */
    exitDelay: PropTypes.number,

    /**
     * the base CSS class for the transition (transitions go here)
     */
    transitionClassName: PropTypes.string,

    /**
     * CSS class or classes applied when the component is exited
     */
    exitedClassName: PropTypes.string,
    /**
     * CSS class or classes applied while the component is exiting
     */
    exitingClassName: PropTypes.string,
    /**
     * CSS class or classes applied when the component is entered
     */
    enteredClassName: PropTypes.string,
    /**
     * CSS class or classes applied while the component is entering
     */
    enteringClassName: PropTypes.string,

    /**
     * Callback fired when transitioning to the next state
     */
    onTransition: PropTypes.func,

    /**
     * Callback fired before the "entering" classes are applied
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired after the "entering" classes are applied
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the "enter" classes are applied
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired before the "exiting" classes are applied
     */
    onExit: PropTypes.func,
    /**
     * Callback fired after the "exiting" classes are applied
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the "exited" classes are applied
     */
    onExited: PropTypes.func,

    children: PropTypes.node,

    className: PropTypes.string
  }

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
    onTransition: function (toState, fromState) {}
  }

  static states = STATES

  _timeouts = []

  state = {
    transitioning: false
  }

  componentDidMount () {
    this.startTransition(this.props.in, this.props.transitionOnMount)
  }

  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.in !== this.props.in && this.state.transitioning) {
      this.clearTransition(this.props.transitionClassName)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.transitionClassName !== prevProps.transitionClassName) {
      this.clearTransition(prevProps.transitionClassName)
    }

    if (prevProps.in !== this.props.in) {
      this.startTransition(this.props.in, true)
    }
  }

  componentWillUnmount () {
    this._timeouts.forEach((timeout) => {
      clearTimeout(timeout)
    })
    this._unmounted = true
  }

  startTransition = (transitionIn, transitionOnStart) => {
    const {
      transitionEnter,
      transitionExit
    } = this.props
    if (transitionIn) {
      this.enter((transitionEnter && transitionOnStart) ? STATES.EXITED : null)
    } else {
      this.exit((transitionExit && transitionOnStart) ? STATES.ENTERED : null)
    }
  }

  transition = (toState, fromState, transitionCallback, transitionDuration = 0) => {
    if (this._unmounted) return

    const classList = getClassList(this)

    const transitionClassName = this.getTransitionClassName(toState)
    const prevTransitionClassName = this.getTransitionClassName(fromState)
    const baseTransitionClassName = this.props.transitionClassName

    if (fromState && transitionDuration && this.transitionEnabled(toState)) {
      classList.add(baseTransitionClassName)
    } else {
      classList.remove(baseTransitionClassName)
    }

    if (prevTransitionClassName) {
      classList.remove(prevTransitionClassName)
    }

    if (transitionClassName) {
      classList.add(transitionClassName)
    }

    if (toState && fromState) {
      this.props.onTransition(toState, fromState)
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

  clearTransition (transitionClassName) {
    if (this._unmounted) return

    this.setState({ transitioning: false }, () => {
      if (this._unmounted) return

      const classList = getClassList(this)

      Object.keys(STATES).forEach((state) => {
        classList.remove(this.getTransitionClassName(state))
      })

      classList.remove(transitionClassName)
    })
  }

  enter = (initialState) => {
    if (this.state.transitioning || this._unmounted) return

    const { props } = this
    props.onEnter()

    if (props.transitionEnter) {
      this.setState({ transitioning: true }, () => {
        const enter = () => {
          props.onEntering()
          this.transition(STATES.ENTERED, STATES.ENTERING, () => {
            this.setState({ transitioning: false }, () => {
              props.onEntered()
            })
          })
        }
        if (initialState) {
          this.transition(initialState, null, () => {
            this.transition(STATES.ENTERING, initialState, enter, props.enterDelay)
          })
        } else {
          enter()
        }
      })
    } else {
      this.setState({ transitioning: false }, () => {
        this.transition(STATES.ENTERED, STATES.EXITED)
        props.onEntered()
      })
    }
  }

  exit = (initialState) => {
    if (this.state.transitioning) return

    const { props } = this
    props.onExit()

    if (props.transitionExit) {
      this.setState({ transitioning: true }, () => {
        const exit = () => {
          props.onExiting()
          this.transition(STATES.EXITED, STATES.EXITING, () => {
            this.setState({ transitioning: false }, () => {
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
        this.transition(STATES.EXITED, STATES.ENTERED)
        props.onExited()
      })
    }
  }

  transitionEnabled (toState) {
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

  getTransitionClassName (transitionState) {
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

  render () {
    if (!this.props.in && this.props.unmountOnExit && !this.state.transitioning) {
      return null
    } else {
      return ensureSingleChild(this.props.children)
    }
  }
}
