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
import BaseTransition from '@instructure/ui-motion/lib/components/Transition/BaseTransition'

import themeable from '@instructure/ui-themeable'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getBoundingClientRect from '@instructure/ui-utils/lib/dom/getBoundingClientRect'
import getClassList from '@instructure/ui-utils/lib/dom/getClassList'
import getDisplayName from '@instructure/ui-utils/lib/react/getDisplayName'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import ms from '@instructure/ui-utils/lib/ms'
import warning from '@instructure/ui-utils/lib/warning'

import Portal from '@instructure/ui-portal/lib/components/Portal'

import { mirrorHorizontalPlacement } from '../../../utils/mirrorPlacement'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DrawerLayout
---
**/

@bidirectional()
@themeable(theme, styles)
class DrawerTray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    /**
     * Function returning content for `<DrawerTray />` which is called with a single boolean
     * argument indicating when the tray has finished positioning.
     */
    children: PropTypes.func,
    /**
     * Function returning content for `<DrawerTray />`  which is called with a single boolean
     * argument indicating when the tray has finished positioning.
     */
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
     * Should the `<DrawerTray />` have a border
     */
    border: PropTypes.bool,
    /**
     * Should the `<DrawerTray />` have a shadow
     */
    shadow: PropTypes.bool,
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
     * An element or a function returning an element to use as the mount node
     * for the `<DrawerTray />` when tray is overlaying content
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func])
  }

  static defaultProps = {
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
    onSizeChange: (size) => {},
    contentRef: (node) => {}
  }

  static contextTypes = {
    overlay: PropTypes.bool
  }

  state = {
    positioned: false
  }

  _trayContent = null

  get trayRect () {
    return getBoundingClientRect(this._trayContent)
  }

  componentWillMount () {
    if (this.props.open) {
      this.notifySizeChange()
      this.notifyOpen()
    }

    warning(
      (this.props.render || this.props.children),
      `[${getDisplayName(DrawerTray)}] must have either a \`render\` prop or \`children\` prop.`
    )
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
    const { shadow } = this.props
    const { overlay } = this.context

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

  get placement () {
    const { placement } = this.props
    return this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
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
      label,
      border,
      onEnter,
      onEntered,
      onExit,
      children,
      render,
      mountNode
    } = this.props

    const { overlay } = this.context

    const duration = ms(this.theme.duration)
    const renderFunc = children || render

    const content = (
      <BaseTransition
        {...pickProps(this.props, BaseTransition.propTypes)}
        onEnter={createChainedFunction(this.handleTransitionEnter, onEnter)}
        onEntered={createChainedFunction(this.handleTransitionEntered, onEntered)}
        onExit={createChainedFunction(this.handleTransitionExit, onExit)}
        unmountOnExit
        in={open}
        enterDelay={duration}
        exitDelay={duration}
        transitionClassName={styles[`slide-${this.placement}`]}
        exitedClassName={styles[`slide-${this.placement}--exited`]}
        exitingClassName={styles[`slide-${this.placement}--exiting`]}
        enteredClassName={styles[`slide-${this.placement}--entered`]}
        enteringClassName={styles[`slide-${this.placement}--entering`]}
      >
        <span
          ref={this.handleContentRef}
          role="region"
          aria-label={label}
          className={classnames({
            [styles.root]: true,
            [styles.border]: border,
            [styles[`placement--${this.placement}`]]: true
          })}
        >
          {renderFunc(this.state.positioned)}
        </span>
      </BaseTransition>
    )

    if (overlay && mountNode) {
      return (
        <Portal
          mountNode={mountNode}
          open={true}
        >
          {content}
        </Portal>
      )
    }

    return content
  }
}

export default DrawerTray
