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

import { bidirectional } from '@instructure/ui-i18n'
import { themeable } from '@instructure/ui-themeable'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { matchComponentTypes, safeCloneElement } from '@instructure/ui-react-utils'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { px } from '@instructure/ui-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import { mirrorHorizontalPlacement } from '../mirrorHorizontalPlacement'
import { DrawerContent } from './DrawerContent'
import { DrawerTray } from './DrawerTray'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@bidirectional()
@themeable(theme, styles)
class DrawerLayout extends Component {
  static locatorAttribute = 'data-drawer-layout'
  static propTypes = {
    /**
     * Exactly one of each of the following child types: `DrawerContent`, `DrawerTray`
     */
    children: ChildrenPropTypes.oneOfEach([DrawerContent, DrawerTray]),
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
    onOverlayTrayChange: (shouldOverlayTray) => {}
  }

  static childContextTypes = {
    shouldOverlayTray: PropTypes.bool
  }

  static Content = DrawerContent
  static Tray = DrawerTray

  constructor (props) {
    super(props)

    this.state = {
      shouldOverlayTray: false,
      trayWidth: 0,
      contentWidth: 0
    }

    this._id = uid('DrawerLayout')
  }

  _content = null

  getChildContext () {
    return {
      shouldOverlayTray: this.state.shouldOverlayTray
    }
  }

  get trayProps () {
    const tray = Children.toArray(this.props.children).filter(
      (child) => matchComponentTypes(child, [DrawerTray])
    )[0]
    return tray.props
  }

  get trayPlacement () {
    const { placement } = this.trayProps
    return this.rtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get contentMargin () {
    const trayWidth = this.state.trayWidth || 0
    return (this.state.shouldOverlayTray) ? 0 : trayWidth
  }

  get contentStyle () {
    const shouldOverlayTray = this.shouldOverlayTray(
      this.props.minWidth,
      this.state.trayWidth,
      this.state.contentWidth,
      this.state.shouldOverlayTray
    )
    let marginLeft = 0
    let marginRight = 0

    if (!shouldOverlayTray) {
      if (this.trayPlacement === 'start') {
        marginLeft = this.contentMargin
      }

      if (this.trayPlacement === 'end') {
        marginRight = this.contentMargin
      }
    }

    return {
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }
  }

  handleContentRef = (el) => {
    this._content = el
  }

  handleTrayContentRef = (el) => {
    this._tray = el
  }

  shouldOverlayTray (minWidth, trayWidth, contentWidth, trayIsOverlayed) {
    if (!this._content) return false

    const minWidthPx = px(minWidth, this._content)

    if (trayIsOverlayed) {
      return (contentWidth - trayWidth) < minWidthPx
    } else {
      return contentWidth < minWidthPx
    }
  }

  getNextState (minWidth, trayWidth, contentWidth, trayIsOverlayed) {
    const shouldOverlayTray = this.shouldOverlayTray(
      minWidth,
      trayWidth,
      contentWidth,
      trayIsOverlayed
    )

    return {
      trayWidth,
      contentWidth,
      shouldOverlayTray
    }
  }

  notifyOverlayTrayChange (shouldOverlayTray) {
    const { onOverlayTrayChange } = this.props
    if (typeof onOverlayTrayChange === 'function') {
      onOverlayTrayChange(shouldOverlayTray)
    }
  }

  handleContentSizeChange = ({ width }) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth,
        state.trayWidth,
        width,
        state.shouldOverlayTray
      )

      if (state.shouldOverlayTray !== nextState.shouldOverlayTray) {
        this.notifyOverlayTrayChange(nextState.shouldOverlayTray)
      }

      return nextState
    })
  }

  handleTraySizeChange = ({ width }) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth,
        width,
        state.contentWidth,
        true
      )

      if (state.shouldOverlayTray !== nextState.shouldOverlayTray) {
        this.notifyOverlayTrayChange(nextState.shouldOverlayTray)
      }

      return nextState
    })
  }

  handleTrayTransitionEnter = () => {
    let width = 0

    if (this._tray) {
      width = getBoundingClientRect(this._tray).width
    }

    this.handleTraySizeChange({ width })
  }

  handleTrayTransitionExit = () => {
    this.handleTraySizeChange({ width: 0 })
  }

  renderChildren () {
    let trayCount = 0
    let contentCount = 0

    const shouldOverlayTray = this.shouldOverlayTray(
      this.props.minWidth,
      this.state.trayWidth,
      this.state.contentWidth,
      this.state.shouldOverlayTray
    )

    const children = Children.map(this.props.children, (child, index) => {
      if (matchComponentTypes(child, [DrawerTray])) {
        trayCount++
        return safeCloneElement(child, {
          key: child.props.label,
          [DrawerTray.locatorAttribute]: this._id,
          contentRef: this.handleTrayContentRef,
          onEnter: this.handleTrayTransitionEnter,
          onExit: this.handleTrayTransitionExit
        })
      } else if (matchComponentTypes(child, [DrawerContent])) {
        contentCount++
        return (this.state.trayWidth !== null) ? safeCloneElement(child, {
          key: child.props.label,
          [DrawerContent.locatorAttribute]: this._id,
          style: this.contentStyle,
          onSizeChange: this.handleContentSizeChange,
          contentRef: this.handleContentRef,
          shouldTransition: !shouldOverlayTray
        }) : null
      } else {
        return child
      }
    })

    error((trayCount <= 1), `[DrawerLayout] Only one 'DrawerTray' per 'DrawerLayout' is supported.`)
    error((contentCount <= 1), `[DrawerLayout] Only one 'DrawerContent' per 'DrawerLayout' is supported.`)

    return children
  }

  render () {
    const props = { [DrawerLayout.locatorAttribute]: this._id }
    return (
      <div {...props} className={styles.root}>
        {this.renderChildren()}
      </div>
    )
  }
}

export default DrawerLayout
export { DrawerLayout, DrawerContent, DrawerTray }
