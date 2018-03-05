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

import FocusRegion from '@instructure/ui-a11y/lib/components/FocusRegion'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import BaseTransition from '@instructure/ui-motion/lib/components/Transition/BaseTransition'

import themeable from '@instructure/ui-themeable'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getBoundingClientRect from '@instructure/ui-utils/lib/dom/getBoundingClientRect'
import getClassList from '@instructure/ui-utils/lib/dom/getClassList'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import ms from '@instructure/ui-utils/lib/ms'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DrawerLayout
---
**/

@themeable(theme, styles)
class DrawerTray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,

    children: PropTypes.node,

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
     * Should the `<DrawerTray />` have a border
     */
    border: PropTypes.bool,

    /**
     * Should the `<DrawerTray />` have a shadow
     */
    shadow: PropTypes.bool,

    /**
     * Boolean designating if the `<DrawerTray />` is overlaying the content
     */
    overlay: PropTypes.bool,

    /**
     * Callback fired when the `<DrawerTray />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

    /**
     * A function that returns a reference to the close button element
     */
    closeButtonRef: PropTypes.func,

    /**
     * An accessible label for the close button. The close button won't display without this label.
     */
    closeButtonLabel: PropTypes.string.isRequired,

    /**
     * variant specifying a standard dark close button, or an inverse variant for dark backgrounds
     */
    closeButtonVariant: PropTypes.oneOf(['icon', 'icon-inverse']),

    /**
     * Should `<DrawerTray />` contain focus
     */
    shouldContainFocus: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

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
     * Callback fired with the tray dimensions when the <DrawerTray /> opens and closes
     */
    onSizeChange: PropTypes.func,
    /**
     * Ref function for the <DrawerTray /> content
     */
    contentRef: PropTypes.func,

    /**
     * Function that returns the DIV where screenreader alerts will be placed.
     */
    liveRegion: PropTypes.func
  }

  static defaultProps = {
    children: null,
    open: false,
    onOpen: () => {},
    shadow: true,
    overlay: false,
    border: true,
    placement: 'start',
    onDismiss: () => {},
    closeButtonRef: (node) => {},
    closeButtonVariant: 'icon',
    shouldContainFocus: true,
    defaultFocusElement: null,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    onSizeChange: (size) => {},
    contentRef: (node) => {}
  }

  state = {
    positioned: false
  }

  _closeButton = null
  _trayContent = null

  get trayRect () {
    return getBoundingClientRect(this._trayContent)
  }

  componentWillMount () {
    if (this.props.open) {
      this.notifySizeChange()
      this.notifyOpen()
    }
  }

  componentWillReceiveProps (nextProps) {
    // drawer tray is closing
    if (this.props.open && !nextProps.open) {
      this.setState({
        positioned: false
      })
    }

    if (!this.props.open && nextProps.open) {
      this.notifyOpen()
    }
  }

  componentDidUpdate (prevProps) {
    const {
      overlay,
      shadow
    } = this.props

    // This could live in the render method with the standard class
    // logic for trayContent. However, currently when the overlay prop
    // updates after the transition classes have been applied, the
    // transition classes are overwritten. We place it here and use the
    // classList util so we can append and remove the shadow class
    // when overlay updates without breaking transition.
    if (shadow) {
      const classList = getClassList(this._trayContent)

      if (overlay && !classList.contains(styles.shadow)) {
        classList.add(styles.shadow)
      }

      if (!overlay && classList.contains(styles.shadow)) {
        classList.remove(styles.shadow)
      }
    }
  }

  handleTransitionEnter = () => {
    this.notifySizeChange()
  }

  handleTransitionExit = () => {
    this.notifySizeChange(0)
  }

  notifySizeChange = (width = this.trayRect.width, height = this.trayRect.height) => {
    const { onSizeChange } = this.props
    if (typeof onSizeChange === 'function') {
      onSizeChange({ width, height })
    }
  }

  notifyOpen = () => {
    const { onOpen } = this.props
    if (typeof onOpen === 'function') {
      onOpen()
    }
  }

  handleTransitionEntered = () => {
    this.setState({ positioned: true })
  }

  handleContentRef = (node) => {
    this._trayContent = node
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(node)
    }
  }

  render () {
    const {
      open,
      border,
      placement,
      closeButtonLabel,
      closeButtonVariant,
      onDismiss,
      onEnter,
      onEntered,
      onExit,
      children
    } = this.props

    const duration = ms(this.theme.duration)

    let trayContent = children

    // If we render the dialog before the content is positioned, we get
    // jolted offscreen when the default focus element gets focus
    if (this.state.positioned) {
      trayContent = (
        <FocusRegion
          {...pickProps(this.props, FocusRegion.propTypes)}
          open
          shouldCloseOnDocumentClick={false}
          shouldReturnFocus
          role="region"
        >
          <CloseButton
            buttonRef={el => {
              this._closeButton = el
              this.props.closeButtonRef(el)
            }}
            variant={closeButtonVariant}
            placement="end"
            offset="medium"
            onClick={onDismiss}
          >
            {closeButtonLabel}
          </CloseButton>
          {trayContent}
        </FocusRegion>
      )
    }

    return (
      <BaseTransition
        {...pickProps(this.props, BaseTransition.propTypes)}
        onEnter={createChainedFunction(this.handleTransitionEnter, onEnter)}
        onEntered={createChainedFunction(this.handleTransitionEntered, onEntered)}
        onExit={createChainedFunction(this.handleTransitionExit, onExit)}
        unmountOnExit
        in={open}
        enterDelay={duration}
        exitDelay={duration}
        transitionClassName={styles[`slide-${placement}`]}
        exitedClassName={styles[`slide-${placement}--exited`]}
        exitingClassName={styles[`slide-${placement}--exiting`]}
        enteredClassName={styles[`slide-${placement}--entered`]}
        enteringClassName={styles[`slide-${placement}--entering`]}
      >
        <span
          ref={this.handleContentRef}
          className={classnames({
            [styles.root]: true,
            [styles.border]: border,
            [styles[`placement--${placement}`]]: true
          })}
        >
          {trayContent}
        </span>
      </BaseTransition>
    )
  }
}

export default DrawerTray
