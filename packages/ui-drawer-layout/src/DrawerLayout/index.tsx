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
import { Children, Component, createContext } from 'react'
import PropTypes from 'prop-types'

import { bidirectional } from '@instructure/ui-i18n'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import {
  matchComponentTypes,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { createChainedFunction, px } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import { mirrorHorizontalPlacement } from '@instructure/ui-position'
import { DrawerContent } from './DrawerContent'
import { DrawerTray } from './DrawerTray'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'

type Props = {
  minWidth?: string
  onOverlayTrayChange?: (...args: any[]) => any
  makeStyles?: (...args: any[]) => any
  styles?: any
  dir?: any // TODO: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
}

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
@bidirectional()
@testable()
class DrawerLayout extends Component<Props> {
  static componentId = 'DrawerLayout'

  static locatorAttribute = 'data-drawer-layout'
  static propTypes = {
    /**
     * Exactly one of each of the following child types: `DrawerLayout.Content`, `DrawerLayout.Tray`
     */
    children: ChildrenPropTypes.oneOfEach([DrawerContent, DrawerTray]),
    /**
     * Min width for the `<DrawerLayout.Content />`
     */
    minWidth: PropTypes.string,
    /**
     * Function called when the `<DrawerLayout.Content />` is resized and hits the `minWidth` breakpoint
     * Called with a boolean value, `true` if the tray is now overlaying the content or `false` if
     * it is side by side
     */
    onOverlayTrayChange: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    //@ts-expect-error FIXME:
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
  }

  static defaultProps = {
    children: null,
    minWidth: '30rem',
    // @ts-expect-error ts-migrate(6133) FIXME: 'shouldOverlayTray' is declared but its value is n... Remove this comment to see the full error message
    onOverlayTrayChange: (shouldOverlayTray) => {}
  }

  static Content = DrawerContent
  static Tray = DrawerTray

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      shouldOverlayTray: false,
      trayWidth: 0,
      contentWidth: 0
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'DrawerLayou... Remove this comment to see the full error message
    this._id = uid('DrawerLayout')
  }

  _content = null

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get trayProps() {
    const tray = Children.toArray(this.props.children).filter((child) =>
      matchComponentTypes(child, [DrawerTray])
    )[0]
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'ReactChil... Remove this comment to see the full error message
    return tray.props
  }

  get trayPlacement() {
    const { placement, dir } = this.trayProps
    //@ts-expect-error FIXME:

    const isRtl = dir === bidirectional.DIRECTION.rtl

    return isRtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }

  get contentMargin() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trayWidth' does not exist on type 'Reado... Remove this comment to see the full error message
    const trayWidth = this.state.trayWidth || 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
    return this.state.shouldOverlayTray ? 0 : trayWidth
  }

  get contentStyle() {
    const shouldOverlayTray = this.shouldOverlayTray(
      this.props.minWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'trayWidth' does not exist on type 'Reado... Remove this comment to see the full error message
      this.state.trayWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentWidth' does not exist on type 'Re... Remove this comment to see the full error message
      this.state.contentWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleTrayContentRef = (el) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tray' does not exist on type 'DrawerLay... Remove this comment to see the full error message
    this._tray = el
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'minWidth' implicitly has an 'any' type.
  shouldOverlayTray(minWidth, trayWidth, contentWidth, trayIsOverlayed) {
    if (!this._content) return false

    const minWidthPx = px(minWidth, this._content)

    if (trayIsOverlayed) {
      return contentWidth - trayWidth < minWidthPx
    } else {
      return contentWidth < minWidthPx
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'minWidth' implicitly has an 'any' type.
  getNextState(minWidth, trayWidth, contentWidth, trayIsOverlayed) {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'shouldOverlayTray' implicitly has an 'a... Remove this comment to see the full error message
  notifyOverlayTrayChange(shouldOverlayTray) {
    const { onOverlayTrayChange } = this.props
    if (typeof onOverlayTrayChange === 'function') {
      onOverlayTrayChange(shouldOverlayTray)
    }
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
  handleContentSizeChange = ({ width }) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'trayWidth' does not exist on type 'Reado... Remove this comment to see the full error message
        state.trayWidth,
        width,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
        state.shouldOverlayTray
      )
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
      if (state.shouldOverlayTray !== nextState.shouldOverlayTray) {
        this.notifyOverlayTrayChange(nextState.shouldOverlayTray)
      }

      return nextState
    })
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
  handleTraySizeChange = ({ width }) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth,
        width,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentWidth' does not exist on type 'Re... Remove this comment to see the full error message
        state.contentWidth,
        true
      )

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
      if (state.shouldOverlayTray !== nextState.shouldOverlayTray) {
        this.notifyOverlayTrayChange(nextState.shouldOverlayTray)
      }

      return nextState
    })
  }

  handleTrayTransitionEnter = () => {
    let width = 0

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tray' does not exist on type 'DrawerLay... Remove this comment to see the full error message
    if (this._tray) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tray' does not exist on type 'DrawerLay... Remove this comment to see the full error message
      width = getBoundingClientRect(this._tray).width
    }

    this.handleTraySizeChange({ width })
  }

  handleTrayTransitionExit = () => {
    this.handleTraySizeChange({ width: 0 })
  }

  renderChildren() {
    let trayCount = 0
    let contentCount = 0

    const shouldOverlayTray = this.shouldOverlayTray(
      this.props.minWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'trayWidth' does not exist on type 'Reado... Remove this comment to see the full error message
      this.state.trayWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentWidth' does not exist on type 'Re... Remove this comment to see the full error message
      this.state.contentWidth,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
      this.state.shouldOverlayTray
    )

    // @ts-expect-error ts-migrate(6133) FIXME: 'index' is declared but its value is never read.
    const children = Children.map<ReactNode, ReactNode>(
      this.props.children,
      // @ts-expect-error index is unused
      (child, index) => {
        if (matchComponentTypes(child, [DrawerTray])) {
          trayCount++
          return safeCloneElement(child, {
            key: child.props.label,
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'DrawerLayou... Remove this comment to see the full error message
            [DrawerTray.locatorAttribute]: this._id,
            contentRef: this.handleTrayContentRef,
            onEnter: this.handleTrayTransitionEnter,
            onExit: this.handleTrayTransitionExit
          })
        } else if (matchComponentTypes(child, [DrawerContent])) {
          contentCount++

          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
          const handleContentRef = (el) => {
            this._content = el

            if (typeof child.props.contentRef === 'function') {
              child.props.contentRef(el)
            }
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'trayWidth' does not exist on type 'Reado... Remove this comment to see the full error message
          return this.state.trayWidth !== null
            ? safeCloneElement(child, {
                key: child.props.label,
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'DrawerLayou... Remove this comment to see the full error message
                [DrawerContent.locatorAttribute]: this._id,
                style: this.contentStyle,
                onSizeChange: createChainedFunction(
                  this.handleContentSizeChange,
                  child.props.onSizeChange
                ),
                contentRef: handleContentRef,
                shouldTransition: !shouldOverlayTray
              })
            : null
        } else {
          return child
        }
      }
    )

    error(
      trayCount <= 1,
      `[DrawerLayout] Only one 'DrawerTray' per 'DrawerLayout' is supported.`
    )
    error(
      contentCount <= 1,
      `[DrawerLayout] Only one 'DrawerContent' per 'DrawerLayout' is supported.`
    )
    return children
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'DrawerLayou... Remove this comment to see the full error message
    const props = { [DrawerLayout.locatorAttribute]: this._id }
    return (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldOverlayTray' does not exist on typ... Remove this comment to see the full error message
      <DrawerLayoutContext.Provider value={this.state.shouldOverlayTray}>
        <div {...props} css={this.props.styles.drawerLayout}>
          {this.renderChildren()}
        </div>
      </DrawerLayoutContext.Provider>
    )
  }
}
export default DrawerLayout
export { DrawerLayout, DrawerContent, DrawerTray }
export const DrawerLayoutContext = createContext(false)
