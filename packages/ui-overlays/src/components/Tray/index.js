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

import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import bidirectional from '@instructure/ui-i18n/lib/bidirectional'
import themeable from '@instructure/ui-themeable'

import Portal from '@instructure/ui-portal/lib/components/Portal'

import Transition from '@instructure/ui-motion/lib/components/Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/dialogs
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
    * Placment to determine where the `<Tray />` should display in the viewport
    */
    placement: PropTypes.oneOf(['top', 'bottom', 'start', 'end']),

    /**
     * Wheter or not the `<Tray />` is open
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
     * Whether focus should contained within the `<Tray/>` when it is open
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

  constructor (props) {
    super(props)

    this.state = {
      portalOpen: false,
      transitioning: false,
      dir: 'ltr'
    }
  }

  _raf = []

  componentDidMount () {
    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open && !nextProps.open) {
      // closing
      this.setState({
        transitioning: true
      })
    }
  }

  componentWillUnmount () {
    this._raf.forEach(request => request.cancel())
    this._raf = []
  }

  get transition () {
    const { placement, open } = this.props

    return classnames({
      'slide-down':
        (placement === 'top' && open) || (placement === 'bottom' && !open),
      'slide-up':
        (placement === 'bottom' && open) || (placement === 'top' && !open),
      [`slide-${this.dir === 'rtl' ? 'right' : 'left'}`]:
        (placement === 'start' && !open) || (placement === 'end' && open),
      [`slide-${this.dir === 'rtl' ? 'left' : 'right'}`]:
        (placement === 'end' && !open) || (placement === 'start' && open)
    })
  }

  get defaultFocusElement () {
    return this.props.defaultFocusElement || (() => this._closeButton)
  }

  handlePortalOpen = () => {
    this._raf.push(requestAnimationFrame(() => {
      this.setState({ portalOpen: true })
    }))
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  renderCloseButton () {
    return this.props.closeButtonLabel
      ? <CloseButton
        placement={this.props.placement === 'end' ? 'start' : 'end'}
        offset="x-small"
        variant={this.props.closeButtonVariant}
        buttonRef={el => {
          this._closeButton = el
          if (typeof this.props.closeButtonRef === 'function') {
            this.props.closeButtonRef(el)
          }
        }}
        onClick={this.props.onDismiss}
      >
        {this.props.closeButtonLabel}
      </CloseButton>
      : null
  }

  render () {
    const { children, contentRef, open, onOpen, ...props } = this.props

    return (
      <Portal
        {...pickProps(props, Portal.propTypes)}
        open={this.props.open || this.state.transitioning}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
      >
        <Transition
          {...pickProps(this.props, Transition.propTypes)}
          in={this.props.open}
          transitionOnMount
          transitionExit
          unmountOnExit
          type={this.transition}
          onExited={createChainedFunction(this.handleTransitionExited, this.props.onExited)}
        >
          <span
            {...omitProps(this.props, Tray.propTypes)}
            className={classnames({
              [styles.root]: true,
              [styles.border]: this.props.border,
              [styles.shadow]: this.props.shadow,
              [styles[this.props.size]]: true,
              [styles[`placement--${this.props.placement}`]]: true,
              [this.props.className]: this.props.className // eslint-disable-line react/prop-types
            })}
            ref={(el) => {
              this._content = el

              if (typeof contentRef === 'function') {
                contentRef(el)
              }
            }}
          >
            <Dialog
              {...pickProps(props, Dialog.propTypes)}
              defaultFocusElement={this.defaultFocusElement}
              open={this.state.portalOpen || this.state.transitioning}
              shouldCloseOnEscape
            >
              {this.renderCloseButton()}
              {children}
            </Dialog>
          </span>
        </Transition>
      </Portal>
    )
  }
}

export default Tray
