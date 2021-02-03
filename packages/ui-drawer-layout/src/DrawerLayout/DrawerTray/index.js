/* eslint-disable react/require-default-props */
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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyle, jsx } from '@instructure/emotion'
import { bidirectional } from '@instructure/ui-i18n'
import { Transition } from '@instructure/ui-motion'
import { omitProps } from '@instructure/ui-react-utils'
import { element } from '@instructure/ui-prop-types'
import { createChainedFunction } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'

import { Dialog } from '@instructure/ui-dialog'
import { Portal } from '@instructure/ui-portal'

import { mirrorHorizontalPlacement } from '@instructure/ui-position'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { DrawerLayoutContext } from '../index'

/**
---
parent: DrawerLayout
id: DrawerLayout.Tray
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
@bidirectional()
class DrawerTray extends Component {
  static locatorAttribute = 'data-drawer-tray'
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    render: PropTypes.func,
    /**
     * Placement of the `<DrawerLayout.Tray />`
     */
    placement: PropTypes.oneOf(['start', 'end']),

    /**
     * If the tray is open or closed.
     */
    open: PropTypes.bool,

    /**
     * Called when the `<DrawerLayout.Tray />` is opened
     */
    onOpen: PropTypes.func,
    /**
     * Called when the `<DrawerLayout.Tray />` is closed
     */
    onClose: PropTypes.func,
    /**
     * Should the `<DrawerLayout.Tray />` have a border
     */
    border: PropTypes.bool,
    /**
     * Should the `<DrawerLayout.Tray />` have a shadow
     */
    shadow: PropTypes.bool,
    /**
     * Callback fired when the `<DrawerLayout.Tray />` transitions in/out
     */
    onTransition: PropTypes.func,
    /**
     * Callback fired before the `<DrawerLayout.Tray />` transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the `<DrawerLayout.Tray />` begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the `<DrawerLayout.Tray />` transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the `<DrawerLayout.Tray />` begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning out
     */
    onExited: PropTypes.func,
    /**
     * Ref function for the `<DrawerLayout.Tray />` content
     */
    contentRef: PropTypes.func,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<DrawerLayout.Tray />` when tray is overlaying content
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<DrawerLayout.Tray />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    onDismiss: PropTypes.func,
    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool,

    makeStyles: PropTypes.func,
    styles: PropTypes.object,
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION)),
    rtl: PropTypes.bool,
    ltr: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    render: undefined,
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
    contentRef: (node) => {},
    onClose: undefined,
    onDismiss: undefined,
    defaultFocusElement: undefined,
    liveRegion: undefined,
    onTransition: undefined
  }

  static contextType = DrawerLayoutContext

  state = {
    transitioning: false,
    portalOpen: false
  }

  componentDidMount() {
    this.props.makeStyles(this.makeStyleProps())
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        transitioning: true
      })
    }
    this.props.makeStyles(this.makeStyleProps())
  }

  makeStyleProps = () => {
    return {
      placement: this.placement
    }
  }

  get placement() {
    const { placement, rtl } = this.props
    return rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get direction() {
    return this.placement === 'end' ? 'right' : 'left'
  }

  get transition() {
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
    this.setState({
      portalOpen: true
    })
  }

  get DOMNode() {
    return this._DOMNode
  }

  set DOMNode(el) {
    this._DOMNode = el
  }

  renderContent() {
    const { children, render } = this.props

    if (typeof render === 'function') {
      return render()
    } else if (typeof children === 'function') {
      return children()
    } else {
      return children
    }
  }

  render() {
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
      styles,
      ...props
    } = this.props

    return (
      <DrawerLayoutContext.Consumer>
        {(shouldOverlayTray) => {
          const { portalOpen } = this.state
          const needsPortal = shouldOverlayTray && mountNode

          // we have to handle the shadow version here,
          // because passing and handling it in styles.js makes it
          // rerender the component during the transition, breaking it
          const trayStyles =
            shadow && shouldOverlayTray
              ? styles.drawerTrayWithShadow
              : styles.drawerTray

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
              onEntered={createChainedFunction(
                this.handleTransitionEntered,
                onEntered,
                onOpen
              )}
              onExit={onExit}
              onExiting={onExiting}
              onExited={createChainedFunction(
                this.handleTransitionExited,
                onExited,
                onClose
              )}
              unmountOnExit
            >
              <div
                {...omitProps(props, DrawerTray.propTypes)}
                ref={this.handleContentRef}
                css={trayStyles}
              >
                {this.state.transitioning ? (
                  this.renderContent()
                ) : (
                  <Dialog
                    open
                    role={shouldOverlayTray ? 'dialog' : 'region'}
                    label={label}
                    shouldReturnFocus={shouldReturnFocus}
                    shouldContainFocus={shouldContainFocus && shouldOverlayTray}
                    shouldCloseOnDocumentClick={
                      shouldCloseOnDocumentClick && shouldOverlayTray
                    }
                    shouldCloseOnEscape={
                      shouldCloseOnEscape && shouldOverlayTray
                    }
                    defaultFocusElement={defaultFocusElement}
                    liveRegion={liveRegion}
                    onDismiss={onDismiss}
                    as="div"
                    css={this.props.styles.drawerTrayContent}
                  >
                    {this.renderContent()}
                  </Dialog>
                )}
              </div>
            </Transition>
          )
          if (needsPortal) {
            return (
              <Portal mountNode={mountNode} open onOpen={this.handlePortalOpen}>
                {content}
              </Portal>
            )
          } else {
            return content
          }
        }}
      </DrawerLayoutContext.Consumer>
    )
  }
}
export default DrawerTray
export { DrawerTray }
