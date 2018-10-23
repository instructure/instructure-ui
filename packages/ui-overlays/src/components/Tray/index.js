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

import Dialog from '@instructure/ui-a11y/lib/components/Dialog'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import bidirectional from '@instructure/ui-i18n/lib/bidirectional'
import themeable from '@instructure/ui-themeable'

import Portal from '@instructure/ui-portal/lib/components/Portal'
import { mirrorHorizontalPlacement } from '@instructure/ui-layout/lib/utils/mirrorPlacement'

import Transition from '@instructure/ui-motion/lib/components/Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('3.0.0', {
  onRequestClose: 'onDismiss',
  isOpen: 'open',
  onReady: 'onOpen',
  onAfterOpen: 'onOpen',
  getDefaultFocusElement: 'defaultFocusElement',
  trapFocus: 'shouldContainFocus'
})
@deprecated('5.0.0', {
  closeButtonLabel: true,
  closeButtonRef: true,
  closeButtonVariant: true,
  applicationElement: true
})
@bidirectional()
@themeable(theme, styles)
class Tray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,

    /**
     * An accessible label for the close button. The close button won't display without this label.
     */
    closeButtonLabel: PropTypes.string,

    children: PropTypes.node,

    /*
     * The size (width) of the `<Tray />` when placement is `start` or `end`
     */
    size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),

    /**
    * Placement to determine where the `<Tray />` should display in the viewport
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

    /**
     * Whether or not the `<Tray />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    /**
     * A function that returns a reference to the close button element
     */
    closeButtonRef: PropTypes.func,

    /**
     * Whether focus should be contained within the `<Tray/>` when it is open
     */
    shouldContainFocus: PropTypes.bool,

    /**
     * Whether focus should be restored when the `<Tray/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Should the `<Tray />` hide when clicks occur outside the content
     */
    shouldCloseOnDocumentClick: PropTypes.bool,

    /**
     * Callback fired when `<Tray />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Tray />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when the `<Tray />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Tray />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),

    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Tray />` is open
     */
    liveRegion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.func]),

    /**
     * Callback fired when the <Tray /> transitions in/out
     */
    onTransition: PropTypes.func,
    /**
     * Callback fired before the <Tray /> transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the <Tray /> begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the <Tray /> finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the <Tray /> transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the <Tray /> begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the <Tray /> finishes transitioning out
     */
    onExited: PropTypes.func,

    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse']),

    /**
     * Should the `<Tray />` have a border
     */
    border: PropTypes.bool,

    /**
     * Should the `<Tray />` have a box shadow
     */
    shadow: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    onOpen: event => {},
    onClose: event => {},
    onDismiss: event => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    contentRef: el => {},
    shouldCloseOnDocumentClick: false,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    defaultFocusElement: null,
    size: 'small',
    placement: 'start',
    shadow: true,
    border: false,
    children: null
  }

  state = {
    transitioning: false
  }

  componentDidUpdate (prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ transitioning: true })
    }
  }

  get placement () {
    const { placement } = this.props
    return this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get direction () {
    switch (this.placement) {
      case 'top':
        return 'up'
      case 'bottom':
        return 'down'
      case 'end':
        return 'right'
      default: // start
        return 'left'
    }
  }

  get transition () {
    return `slide-${this.direction}`
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  handleTransitionComplete = () => {
    this.setState({ transitioning: false })
  }

  get DOMNode () {
    return this._DOMNode
  }

  set DOMNode (el) {
    this._DOMNode = el
  }

  handlePortalOpen = (DOMNode) => {
    this.DOMNode = DOMNode
    // We apply the theme here because now we have a DOM node (provided by Portal)
    DOMNode && this.applyTheme(DOMNode)
  }

  closeButtonRef = el => {
    this._closeButton = el
    if (typeof this.props.closeButtonRef === 'function') {
     this.props.closeButtonRef(el)
    }
  }

  renderCloseButton () {
    return this.props.closeButtonLabel ? (
      <CloseButton
        placement={this.props.placement === 'end' ? 'start' : 'end'}
        offset="x-small"
        variant={this.props.closeButtonVariant}
        buttonRef={this.closeButtonRef}
        onClick={this.props.onDismiss}
     >
       {this.props.closeButtonLabel}
     </CloseButton>
    ) : null
  }

  renderContent () {
    return (
      <div>
        {this.renderCloseButton()}
        {this.props.children}
      </div>
    )
  }

  render () {
    const {
      label,
      closeButtonLabel,
      children,
      size,
      placement,
      open,
      defaultFocusElement,
      contentRef,
      closeButtonRef,
      shouldContainFocus,
      shouldReturnFocus,
      shouldCloseOnDocumentClick,
      onOpen,
      onClose,
      onDismiss,
      mountNode,
      insertAt,
      liveRegion,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onTransition,
      closeButtonVariant,
      border,
      shadow,
      ...props
    } = this.props

    const portalIsOpen = open || this.state.transitioning

    return (
      <Portal
        open={portalIsOpen}
        onOpen={this.handlePortalOpen}
        insertAt={insertAt}
        mountNode={mountNode}
      >
        {portalIsOpen && (
          <Transition
            in={open}
            type={this.transition}
            onTransition={onTransition}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={createChainedFunction(this.handleTransitionComplete, onEntered, onOpen)}
            onExit={onExit}
            onExiting={onExiting}
            onExited={createChainedFunction(this.handleTransitionComplete, onExited, onClose)}
            transitionOnMount
            transitionEnter
            transitionExit
          >
            <span
              {...omitProps(props, Tray.propTypes)}
              className={classnames({
                [styles.root]: true,
                [styles.border]: border,
                [styles.shadow]: shadow,
                [styles[size]]: true,
                [styles[`placement--${this.props.placement}`]]: true
              })}
              ref={contentRef}
            >
              {
                (this.state.transitioning) ? this.renderContent() : (
                  <Dialog
                    label={label}
                    defaultFocusElement={this.defaultFocusElement}
                    open
                    shouldContainFocus={shouldContainFocus}
                    shouldReturnFocus={shouldReturnFocus}
                    shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
                    shouldCloseOnEscape
                    liveRegion={liveRegion}
                    onDismiss={onDismiss}
                  >
                    {this.renderContent()}
                  </Dialog>
                )
              }
            </span>
          </Transition>
        )}
      </Portal>
    )
  }
}

export default Tray
