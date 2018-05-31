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
import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import bidirectional from '@instructure/ui-i18n/lib/bidirectional'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import px from '@instructure/ui-utils/lib/px'

import { mirrorHorizontalPlacement } from '../../utils/mirrorPlacement'
import DrawerContent from './DrawerContent'
import DrawerTray from './DrawerTray'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/layout
---
**/
@bidirectional()
@themeable(theme, styles)
class DrawerLayout extends Component {
  static propTypes = {
    /**
     * Exactly one of each of the following child types: `DrawerContent`, `DrawerTray`
     */
    children: CustomPropTypes.Children.oneOfEach([DrawerContent, DrawerTray]),
    /**
     * Min width for the `<DrawerContent />`
     */
    minWidth: PropTypes.string,
    /**
     * Function called when the `<DrawerContent />` is resized and hits the `minWidth` breakpoint
     * Called with a boolean value, `true` if the tray is now overlaying the content or `false` if
     * it is side by side
     */
    onOverlayTrayChange: PropTypes.func
  }

  static defaultProps = {
    children: null,
    minWidth: '30rem',
    onOverlayTrayChange: (overlayTray) => {}
  }

  static childContextTypes = {
    overlay: PropTypes.bool
  }

  state = {
    overlayTray: false,
    transitioning: false
  }

  _content = null
  _trayWidth = 0
  _contentWidth = 0
  _transitionContent = true
  _updatingLayout = false
  _unappliedLayoutChanges = false

  getChildContext() {
    return {
      overlay: this.state.overlayTray && this._transitionContent
    }
  }

  componentWillMount () {
    // When the tray is open initially, we need to prevent
    // the content transition, otherwise it moves on page load
    if (this.trayProps.open) {
      this._transitionContent = false
    }
  }

  get trayProps () {
    return Children.toArray(this.props.children).filter(
      (child) => matchComponentTypes(child, [DrawerTray])
    )[0].props
  }

  get trayPlacement () {
    const { placement } = this.trayProps
    return this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get contentMargin () {
    if (this.state.overlayTray) {
      return 0
    }
    return this._trayWidth
  }

  get minWidth () {
    return px(this.props.minWidth, this._content)
  }

  handleContentSizeChange = (size) => {
    this._contentWidth = size.width
    if (!this.state.transitioning) {
      this.updateLayout()
    }
  }

  handleTraySizeChange = (size) => {
    this._trayWidth = size.width
    if (this._transitionContent) {
      this._contentWidth = this._contentWidth - this._trayWidth
    }
    this.updateLayout()
  }

  handleTrayTransitionBegin = () => {
    this.setState({ transitioning: true })
  }

  handleTrayTransitionEnd = () => {
    // We only prevent content transition for the first transition cycle
    // when the tray is open initially
    if (!this._transitionContent) {
      this._transitionContent = true
    }

    this.setState({ transitioning: false })
  }

  updateLayout = () => {
    // We setState when overlayTray is configured to true or false.
    // If we're currently making a setState call when a new layout
    // update comes in, we wait until setState is finished
    if (this._updatingLayout) {
      this._unappliedLayoutChanges = true
      return
    }

    const contentWidth = this._contentWidth
    const trayWidth = this._trayWidth

    if (this.state.overlayTray) {
      // Take the tray width into account if we're collapsed. We need room such
      // that the difference between the content width and the overlayed tray
      // is greater than the designated min width
      if (contentWidth - trayWidth > this.minWidth) {
        this.applyLayoutChanges(false)
      }
    } else {
      if (contentWidth <= this.minWidth) {
        this.applyLayoutChanges(true)
      }
    }
  }

  applyLayoutChanges = (overlayTray) => {
    const { onOverlayTrayChange } = this.props

    if (typeof onOverlayTrayChange === 'function') {
      onOverlayTrayChange(overlayTray)
    }

    this._updatingLayout = true
    this.setState({ overlayTray }, () => {
      this._updatingLayout = false

      if (this._unappliedLayoutChanges) {
        this._unappliedLayoutChanges = false
        this.updateLayout()
      }
    })
  }

  renderChildren () {
    const { children, minWidth } = this.props

    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [DrawerTray])) {
        return safeCloneElement(child, {
          key: child.props.label,
          onSizeChange: this.handleTraySizeChange,
          onEnter: this.handleTrayTransitionBegin,
          onEntered: this.handleTrayTransitionEnd,
          onExit: this.handleTrayTransitionBegin,
          onExited: this.handleTrayTransitionEnd
        })
      } else if (matchComponentTypes(child, [DrawerContent])) {
        return safeCloneElement(child, {
          key: child.props.label,
          style: {
            marginLeft: `${this.trayPlacement === 'start' ? this.contentMargin : 0}px`,
            marginRight: `${this.trayPlacement === 'end' ? this.contentMargin : 0}px`,
            minWidth: minWidth
          },
          transition: this._transitionContent,
          onSizeChange: this.handleContentSizeChange,
          contentRef: (node) => { this._content = node }
        })
      } else {
        return child
      }
    })
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderChildren()}
      </div>
    )
  }
}

export default DrawerLayout
export { default as DrawerContent } from './DrawerContent'
export { default as DrawerTray } from './DrawerTray'
