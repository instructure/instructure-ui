import React, { Component, PropTypes } from 'react'
import RootCloseWrapper from './RootCloseWrapper'
import Portal from 'react-overlays/lib/Portal'
import Position from 'react-overlays/lib/Position'
import Transition from '../components/Transition'
import ScreenReaderContent from '../components/ScreenReaderContent'

export default class Overlay extends Component {

  static propTypes = {
    ...Portal.propTypes,
    ...Position.propTypes,

    /**
     * Set the visibility of the Overlay
     */
    show: PropTypes.bool,
    /**
     * Specify whether the overlay should trigger `onHide` when the user clicks outside the Overlay
     */
    rootClose: PropTypes.bool,

    /**
     * Specify whether the overlay should render offscreen (visible to screen readers) when not shown
     */
    renderOffscreen: PropTypes.bool,

    /**
     * A Callback fired by the Overlay when it wishes to be hidden.
     *
     * __required__ when `rootClose` is `true`.
     *
     * @type func
     */
    onHide: PropTypes.func,

    /**
     * A `<Transition/>` component or `false` to disable, used to animate the overlay changes visibility.
     */
    transition: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node
    ]),

    /**
     * Callback fired before the Overlay transitions in
     */
    onEnter: PropTypes.func,

    /**
     * Callback fired as the Overlay begins to transition in
     */
    onEntering: PropTypes.func,

    /**
     * Callback fired after the Overlay finishes transitioning in
     */
    onEntered: PropTypes.func,

    /**
     * Callback fired right before the Overlay transitions out
     */
    onExit: PropTypes.func,

    /**
     * Callback fired as the Overlay begins to transition out
     */
    onExiting: PropTypes.func,

    /**
     * Callback fired after the Overlay finishes transitioning out
     */
    onExited: PropTypes.func
  }

  static defaultProps = {
    animation: Transition,
    rootClose: false,
    show: false,
    renderOffscreen: false
  }

  constructor (props, context) {
    super(props, context)

    this.state = { exited: !props.show }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false })
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true })
    }
  }

  handleHidden = (...args) => {
    this.setState({ exited: true })

    if (typeof this.props.onExited === 'function') {
      this.props.onExited(...args)
    }
  }

  render () {
    const {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      rootClose,
      children,
      renderOffscreen,
      transition: Transition,
      ...props
    } = this.props

    // Don't un-render the overlay while it's transitioning out.
    const shouldRenderOverlay = props.show || (Transition && !this.state.exited)

    let child = children

    if (!shouldRenderOverlay) {
      if (renderOffscreen) {
        child = (
          <ScreenReaderContent>
            {child}
          </ScreenReaderContent>
        )
      } else {
        // Don't bother showing anything if we don't have to.
        return null
      }
    } else {
      // Position is be inner-most because it adds inline styles into the child,
      // which the other wrappers don't forward correctly.
      child = (
        <Position {...{container, containerPadding, target, placement, shouldUpdatePosition}}>
          {child}
        </Position>
      )

      if (Transition) {
        const {
          onExit,
          onExiting,
          onEnter,
          onEntering,
          onEntered
        } = props

        // This animates the child node by injecting props, so it must precede
        // anything that adds a wrapping div.
        child = (
          <Transition
            in={props.show}
            transitionAppear
            onExit={onExit}
            onExiting={onExiting}
            onExited={this.onHiddenListener}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
          >
            {child}
          </Transition>
        )
      }

      // This goes after everything else because it adds a wrapping div.
      if (rootClose) {
        child = (
          <RootCloseWrapper onRootClose={props.onHide}>
            {child}
          </RootCloseWrapper>
        )
      }
    }

    return (
      <Portal container={container}>
        {child}
      </Portal>
    )
  }
}
