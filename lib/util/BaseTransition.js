import React, { PropTypes, Children } from 'react'
import ReactDOM from 'react-dom'
import transitionInfo from 'dom-helpers/transition/properties'
import classes from 'dom-helpers/class'
import addEventListener from './addEventListener'

export const UNMOUNTED = 0
export const EXITED = 1
export const ENTERING = 2
export const ENTERED = 3
export const EXITING = 4

const addEndEventListener = function (node, handler) {
  return addEventListener(node, transitionInfo.end, handler)
}

const { addClass, removeClass } = classes
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
    transitionAppear: PropTypes.bool,
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
     * CSS class or classes applied when the component is exited
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
    transitionAppear: false,
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
      if (this.props.transitionAppear) {
        this.setTransitionClassName(EXITED)
      }
      this.performEnter()
    } else if (!this.props.unmountOnExit) {
      this.setTransitionClassName(EXITED)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.in !== prevProps.in) {
      this.cancelTimeouts()
      if (this.props.in) {
        this.performEnter()
      } else {
        this.performExit()
      }
    }
  }

  componentWillUnmount () {
    this.cancelTimeouts()
  }

  cancelTimeouts () {
    window.clearTimeout(this._transitionTimeout)
    this._transitionTimeout = null
  }

  performEnter () {
    const node = ReactDOM.findDOMNode(this)
    const { props } = this

    if (!props.transitionEnter) {
      return false
    }

    props.onEnter(node)

    this.setTransitionClassName(ENTERING)
    props.onEntering(node)

    this.handleTransitionEnd(node, () => {
      if (this._transitionTimeout === null) {
        return
      }
      this.setTransitionClassName(ENTERED)
      props.onEntered()
    }, this.props.enterDelay)
  }

  performExit () {
    const node = ReactDOM.findDOMNode(this)
    const { props } = this

    if (!props.transitionExit) {
      return false
    }

    props.onExit(node)

    this.setTransitionClassName(EXITING)
    props.onExiting(node)

    this.handleTransitionEnd(node, () => {
      if (this._transitionTimeout === null) {
        return
      } else if (props.unmountOnExit) {
        this.setState({
          shouldUnmount: true
        })
      } else {
        this.setTransitionClassName(EXITED)
      }
      props.onExited()
    }, this.props.exitDelay)
  }

  handleTransitionEnd (node, handler, timeout) {
    if (node) {
      addEndEventListener(node, handler)
      this._transitionTimeout = window.setTimeout(handler, timeout)
    } else {
      this._transitionTimeout = window.setTimeout(handler, 0)
    }
  }

  clearTransitionClassName () {
    const node = ReactDOM.findDOMNode(this)
    const transitionClassName = this._transitionClassName

    if (transitionClassName) {
      this.__transitionClassName = null
      removeClass(node, transitionClassName)
    }
  }

  setTransitionClassName (status) {
    const node = ReactDOM.findDOMNode(this)
    const transitionClassName = this.getTransitionClassName(status)
    const prevTransitionClassName = this._transitionClassName

    this._transitionClassName = transitionClassName

    addClass(node, this.props.transitionClassName)

    if (node) {
      if (prevTransitionClassName) {
        removeClass(node, prevTransitionClassName)
      }

      if (transitionClassName) {
        addClass(node, transitionClassName)
      }
    }
  }

  getTransitionClassName (status) {
    const { props } = this

    switch (status) {
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

  updateTransitionClassName () {
    const node = ReactDOM.findDOMNode(this)

    if (!node) {
      return
    }

    if (this.__transitionClassName) {
      removeClass(node, this.__transitionClassName)
    }

    const currentClassName = this.getTransitionClassName()

    if (currentClassName) {
      addClass(node, currentClassName)
      this._transitionClassName = currentClassName
    }
  }

  render () {
    const child = Children.only(this.props.children)

    if (this.state.shouldUnmount) {
      this.state.shouldUnmount = false // don't triggger a re-render
    }

    return (!this.state.shouldUnmount)
      ? child
      : null
  }
}
