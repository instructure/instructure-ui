import React, { Children } from 'react'
import PropTypes from 'prop-types'
import getClassList from './dom/getClassList'

export const UNMOUNTED = 0
export const EXITED = 1
export const ENTERING = 2
export const ENTERED = 3
export const EXITING = 4

/**
  Note: this is forked from https://github.com/react-bootstrap/react-overlays/blob/master/src/Transition.js
  so that it works with css modules. The internals are pretty different now, but it has roughly the same api.
**/
export default class Transition extends React.Component {
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

    enterDelay: 5000,
    exitDelay: 5000,

    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},

    onExit: function () {},
    onExiting: function () {},
    onExited: function () {}
  }

  constructor (props, context) {
    super(props, context)
    this._transitionClassName = null

    this.state = {
      shouldUnmount: !props.in && props.unmountOnExit
    }
  }

  componentDidMount () {
    if (this.props.in) {
      if (this.props.transitionOnMount) {
        this.transitionTo(EXITED, () => {
          this.performEnter()
        })
      } else {
        this.performEnter()
      }
    } else {
      this.transitionTo(EXITED)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.transitionClassName !== prevProps.transitionClassName) {
      this.clearTransition(prevProps.transitionClassName)
      this.transitionTo(prevProps.in ? ENTERED : EXITED)
    }

    if (this.props.in !== prevProps.in) {
      if (this.props.in) {
        this.transitionTo(EXITED, () => {
          this.performEnter()
        })
      } else {
        this.performExit()
      }
    }
  }

  componentWillUnmount () {
    this.isUnmounted = true
    this.cancelTimeouts()
  }

  cancelTimeouts () {
    clearTimeout(this._transitionTimeout)
    this._transitionTimeout = null
  }

  performEnter = () => {
    if (this.isUnmounted) {
      return
    }

    const { props } = this

    props.onEnter()

    if (props.transitionEnter) {
      props.onEntering()

      this.transitionTo(ENTERING, () => {
        this.transitionTo(ENTERED, () => {
          props.onEntered()
        })
      }, this.props.enterDelay)
    } else {
      this.transitionTo(ENTERED, () => {
        props.onEntered()
      })
    }
  }

  performExit () {
    if (this.isUnmounted) {
      return
    }

    const { props } = this

    props.onExit()

    if (props.transitionExit) {
      props.onExiting()

      this.transitionTo(EXITING, () => {
        this.transitionTo(EXITED, () => {
          if (props.unmountOnExit) {
            this.setState({ shouldUnmount: true })
          }
          props.onExited()
        })
      }, this.props.exitDelay)
    } else {
      this.transitionTo(EXITED, () => {
        props.onExited()
        if (this.props.unmountOnExit) {
          this.setState({ shouldUnmount: true })
        }
      })
    }
  }

  transitionTo (transitionState, transitionCallback, transitionDuration = 0) {
    if (this.isUnmounted) {
      return
    }

    const classList = getClassList(this)
    const transitionClassName = this.getTransitionClassName(transitionState)
    const prevTransitionClassName = this._transitionClassName
    const baseTransitionClassName = this.props.transitionClassName

    this._transitionClassName = transitionClassName

    if (!classList || this._transitionTimeout === null) {
      return
    }

    if (this.transitionEnabled(transitionState)) {
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

    this._transitionTimeout = setTimeout(() => {
      if (typeof transitionCallback === 'function') {
        transitionCallback()
      }
    }, transitionDuration)
  }

  clearTransition (transitionClassName) {
    if (this.isUnmounted) {
      return
    }

    getClassList(this).remove(transitionClassName)
  }

  transitionEnabled (toState) {
    const { props } = this

    switch (toState) {
      case EXITED:
      case EXITING:
        return props.transitionExit
      case ENTERED:
      case ENTERING:
        return props.transitionEnter
      default:
        return false
    }
  }

  getTransitionClassName (transitionState) {
    const { props } = this

    switch (transitionState) {
      case EXITED:
        return props.exitedClassName
      case ENTERING:
        return props.enteringClassName
      case ENTERED:
        return props.enteredClassName
      case EXITING:
        return props.exitingClassName
      default:
        return null
    }
  }

  render () {
    const child = this.props.children ? Children.only(this.props.children) : null
    const shouldUnmount = this.state.shouldUnmount

    if (shouldUnmount) {
      this.state.shouldUnmount = false // don't triggger a re-render
      return null
    } else {
      return child
    }
  }
}
