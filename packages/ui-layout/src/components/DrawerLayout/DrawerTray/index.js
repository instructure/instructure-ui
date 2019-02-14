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
import PropTypes from 'prop-types'
import classnames from 'classnames'

import bidirectional from '@instructure/ui-i18n/lib/bidirectional'
import Transition from '@instructure/ui-motion/lib/components/Transition'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import themeable from '@instructure/ui-themeable'
import { element } from '@instructure/ui-prop-types'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import testable from '@instructure/ui-testable'

import Dialog from '@instructure/ui-a11y/lib/components/Dialog'
import Portal from '@instructure/ui-portal/lib/components/Portal'

import { mirrorHorizontalPlacement } from '../../../utils/mirrorPlacement'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DrawerLayout
---
**/
@testable()
@bidirectional()
@themeable(theme, styles)
class DrawerTray extends Component {
  static locatorAttribute = 'data-drawer-tray'
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    render: PropTypes.func,
    /**
     * Placement of the `<DrawerTray />`
     */
    placement: PropTypes.oneOf(['start', 'end']),

    /**
     * If the tray is open or closed.
     */
    open: PropTypes.bool,

    /**
     * Called when the `<DrawerTray />` is opened
     */
    onOpen: PropTypes.func,
    /**
     * Called when the `<DrawerTray />` is closed
     */
    onClose: PropTypes.func,
    /**
     * Should the `<DrawerTray />` have a border
     */
    border: PropTypes.bool,
    /**
     * Should the `<DrawerTray />` have a shadow
     */
    shadow: PropTypes.bool,
    /**
     * Callback fired when the <DrawerTray /> transitions in/out
     */
    onTransition: PropTypes.func,
    /**
     * Callback fired before the <DrawerTray /> transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the <DrawerTray /> begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the <DrawerTray /> finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the <DrawerTray /> transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the <DrawerTray /> begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the <DrawerTray /> finishes transitioning out
     */
    onExited: PropTypes.func,
    /**
     * Ref function for the <DrawerTray /> content
     */
    contentRef: PropTypes.func,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<DrawerTray />` when tray is overlaying content
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<DrawerTray />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),
    onDismiss: PropTypes.func,
    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool
  }

  static defaultProps = {
    shouldContainFocus: true,
    shouldCloseOnEscape: true,
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    open: false,
    onOpen: () => {},
    shadow: true,
    border: true,
    placement: 'start',
    mountNode: null,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    contentRef: (node) => {}
  }

  static contextTypes = {
    shouldOverlayTray: PropTypes.bool
  }

  state = {
    transitioning: false,
    portalOpen: false
  }

  componentDidUpdate (prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        transitioning: true
      })
    }
  }

  get placement () {
    const { placement } = this.props
    return this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get direction () {
    return (this.placement === 'end') ? 'right' : 'left'
  }

  get transition () {
    return `slide-${this.direction}`
  }

  handleContentRef = (node) => {
    this._content = node
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(node)
    }
  }

  handleTransitionEntered = () => {
    this.setState({ transitioning: false })
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  handlePortalOpen = (DOMNode) => {
    this.DOMNode = DOMNode
    // We apply the theme here because now we have a DOM node (provided by Portal)
    DOMNode && this.applyTheme(DOMNode)
    this.setState({
      portalOpen: true
    })
  }

  get DOMNode () {
    return this._DOMNode
  }

  set DOMNode (el) {
    this._DOMNode = el
  }

  renderContent () {
    const { children, render } = this.props

    if (typeof render === 'function') {
      return render()
    } else if (typeof children === 'function') {
      return children()
    } else {
      return children
    }
  }

  render () {
    const {
      label,
      children,
      render,
      placement,
      open,
      onOpen,
      onClose,
      border,
      shadow,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      contentRef,
      mountNode,
      defaultFocusElement,
      liveRegion,
      onDismiss,
      onTransition,
      shouldReturnFocus,
      shouldCloseOnEscape,
      shouldCloseOnDocumentClick,
      shouldContainFocus,
      ...props
    } = this.props

    const { shouldOverlayTray } = this.context
    const { portalOpen } = this.state
    const needsPortal = (shouldOverlayTray && mountNode)

    let transitionIn = open

    if (needsPortal && !portalOpen) {
      transitionIn = false
    }

    const content = (
      <Transition
        in={transitionIn}
        type={this.transition}
        onTransition={onTransition}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={createChainedFunction(this.handleTransitionEntered, onEntered, onOpen)}
        onExit={onExit}
        onExiting={onExiting}
        onExited={createChainedFunction(this.handleTransitionExited, onExited, onClose)}
        unmountOnExit
      >
        <div
          {...omitProps(props, DrawerTray.propTypes)}
          ref={this.handleContentRef}
          className={classnames({
            [styles.root]: true,
            [styles.border]: border,
            [styles.shadow]: shadow && shouldOverlayTray,
            [styles[`placement--${this.placement}`]]: true
          })}
        >
          {
            (this.state.transitioning) ? this.renderContent() : (
              <Dialog
                open
                role={shouldOverlayTray ? 'dialog' : 'region'}
                label={label}
                shouldReturnFocus={shouldReturnFocus}
                shouldContainFocus={shouldContainFocus && shouldOverlayTray}
                shouldCloseOnDocumentClick={shouldCloseOnDocumentClick && shouldOverlayTray}
                shouldCloseOnEscape={shouldCloseOnEscape && shouldOverlayTray}
                defaultFocusElement={defaultFocusElement}
                liveRegion={liveRegion}
                onDismiss={onDismiss}
                as="div"
              >
                {this.renderContent()}
              </Dialog>
            )
          }
        </div>
      </Transition>
    )

    if (needsPortal) {
      return (
        <Portal
          mountNode={mountNode}
          open
          onOpen={this.handlePortalOpen}
        >
          {content}
        </Portal>
      )
    } else {
      return content
    }
  }
}

export default DrawerTray
