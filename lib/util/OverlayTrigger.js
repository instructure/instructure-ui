import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { pickProps } from './passthroughProps'
import isOneOf from './isOneOf'
import invariant from 'invariant'
import createChainedFunction from './createChainedFunction'
import CustomPropTypes from './CustomPropTypes'
import contains from 'dom-helpers/query/contains'
import safeCloneElement from './safeCloneElement'

import Overlay from './Overlay'

export default class OverlayTrigger extends Component {
  static propTypes = {
    ...Overlay.propTypes,

    overlay: PropTypes.node.isRequired,
    trigger: PropTypes.oneOfType([
      PropTypes.oneOf(['click', 'hover', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),

    /**
     * Use animation
     */
    transition: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node
    ]),

    delay: PropTypes.number,
    delayShow: PropTypes.number,
    delayHide: PropTypes.number,

    /**
    * the overlay should be shown for the initial render
    */
    defaultShow: PropTypes.bool,
    /**
    * is the overlay shown (should be accompanied by `onToggle`)
    */
    show: CustomPropTypes.controllable(PropTypes.bool, 'onToggle', 'defaultShow'),
    /**
    * Call this function when the overlay is toggled open/closed. When used with `show`,
    * the component will not control its own state.
    */
    onToggle: PropTypes.func,

    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static defaultProps = {
    defaultShow: false,
    trigger: ['hover', 'focus']
  };

  constructor (props) {
    super()

    this.state = {}

    if (props.show === undefined) {
      this.state.show = props.show
    }
  }

  componentWillMount () {
    this._handleMouseOver = this.handleMouseOverOut.bind(null, this.handleDelayedShow)
    this._handleMouseOut = this.handleMouseOverOut.bind(null, this.handleDelayedHide)
  }

  componentDidMount () {
    this._mountNode = document.createElement('div')
    this._mountNode.setAttribute('data-overlayroot', 'true')
    this.renderOverlay()
  }

  componentDidUpdate () {
    if (this._mountNode) {
      this.renderOverlay()
    }
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this._mountNode)
    this._mountNode = null
    clearTimeout(this._hoverShowDelay)
    clearTimeout(this._hoverHideDelay)
  }

  get show () {
    return (this.props.show === undefined) ? this.state.show : this.props.show
  }

  getOverlay () {
    const overlayProps = {
      ...pickProps(this.props, Overlay.propTypes),
      show: this.show,
      target: this.getOverlayTarget
    }

    const overlay = safeCloneElement(this.props.overlay, {
      placement: overlayProps.placement,
      container: overlayProps.container
    })

    return (
      <Overlay {...overlayProps}>
        {overlay}
      </Overlay>
    )
  }

  getOverlayTarget = () => {
    return ReactDOM.findDOMNode(this)
  }

  toggle = () => {
    const show = !this.show

    if (this.props.show === undefined) {
      this.setState({ show })
    }

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(show)
    }
  }

  handleDelayedShow = () => {
    if (this._hoverHideDelay != null) {
      window.clearTimeout(this._hoverHideDelay)
      this._hoverHideDelay = null
      return
    }

    if (this.show || this._hoverShowDelay != null) {
      return
    }

    const delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay

    if (!delay) {
      this.toggle()
      return
    }

    this._hoverShowDelay = window.setTimeout(() => {
      this._hoverShowDelay = null
      this.toggle()
    }, delay)
  }

  handleDelayedHide = () => {
    if (this._hoverShowDelay != null) {
      window.clearTimeout(this._hoverShowDelay)
      this._hoverShowDelay = null
      return
    }

    if (!this.show || this._hoverHideDelay != null) {
      return
    }

    const delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay

    if (!delay) {
      this.toggle()
      return
    }

    this._hoverHideDelay = window.setTimeout(() => {
      this._hoverHideDelay = null
      this.toggle()
    }, delay)
  }

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
  // from one child element to another.
  handleMouseOverOut = (handler, e) => {
    const target = e.currentTarget
    const related = e.relatedTarget || e.nativeEvent.toElement

    if (!related || related !== target && !contains(target, related)) {
      handler(e)
    }
  }

  renderOverlay () {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, this._overlay, this._mountNode
    )
  }

  render () {
    const trigger = React.Children.only(this.props.children)
    const triggerProps = trigger.props

    const props = {
      'aria-expanded': this.props.renderOffscreen ? null : this.show
    }

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay()

    props.onClick = createChainedFunction(triggerProps.onClick, this.props.onClick)

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, props.onClick)
    }

    if (isOneOf('hover', this.props.trigger)) {
      invariant(!(this.props.trigger === 'hover'),
        'Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' +
        'Consider also including the `"focus"` trigger ' +
        'so that touch and keyboard only users can see the overlay as well.')

      props.onMouseOver = createChainedFunction(this._handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver)
      props.onMouseOut = createChainedFunction(this._handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut)
    } else {
      props.onMouseOver = this.props.onMouseOver
      props.onMouseOut = this.props.onMouseOut
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus)
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur)
    } else {
      props.onFocus = this.props.onFocus
      props.onBlur = this.props.onBlur
    }

    return safeCloneElement(
      trigger,
      props
    )
  }
}
