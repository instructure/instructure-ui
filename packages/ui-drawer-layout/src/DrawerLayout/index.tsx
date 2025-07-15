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

import { ComponentElement, Children, Component, createContext } from 'react'

import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import {
  matchComponentTypes,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { createChainedFunction, px } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { testable } from '@instructure/ui-testable'

import { mirrorHorizontalPlacement } from '@instructure/ui-position'
import type { PlacementPropValues } from '@instructure/ui-position'

import { DrawerContent } from './DrawerContent'
import type {
  DrawerLayoutContentProps,
  DrawerContentSize
} from './DrawerContent/props'
import { DrawerTray } from './DrawerTray'
import type { DrawerLayoutTrayProps } from './DrawerTray/props'

import { withStyle } from '@instructure/emotion'
import generateStyle from './styles'

import { allowedProps } from './props'
import type { DrawerLayoutProps, DrawerLayoutState } from './props'

type TrayChild = ComponentElement<
  DrawerLayoutTrayProps & React.Attributes,
  DrawerTray
>
type ContentChild = ComponentElement<
  DrawerLayoutContentProps & React.Attributes,
  DrawerContent
>
type DrawerChildren = (TrayChild | ContentChild)[]

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, null)
@textDirectionContextConsumer()
@testable()
class DrawerLayout extends Component<DrawerLayoutProps, DrawerLayoutState> {
  static readonly componentId = 'DrawerLayout'

  static locatorAttribute = 'data-drawer-layout'
  static allowedProps = allowedProps
  static defaultProps = {
    minWidth: '30rem'
  }

  static Content = DrawerContent
  static Tray = DrawerTray

  constructor(props: DrawerLayoutProps) {
    super(props)

    this.state = {
      shouldOverlayTray: false,
      trayWidth: 0,
      contentWidth: 0
    }

    this._id = props.deterministicId!()
  }

  private readonly _id: string
  private _content: HTMLDivElement | null = null
  private _tray: HTMLDivElement | null = null

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get trayProps() {
    const tray = (
      Children.toArray(this.props.children) as DrawerChildren
    ).filter((child) =>
      matchComponentTypes<TrayChild>(child, [DrawerTray])
    )[0] as TrayChild
    return tray.props
  }

  get trayPlacement(): PlacementPropValues {
    const { placement, dir = this.props.dir } = this.trayProps
    const isRtl = dir === textDirectionContextConsumer.DIRECTION.rtl
    return isRtl ? mirrorHorizontalPlacement(placement!, ' ') : placement!
  }

  get contentMargin() {
    const trayWidth = this.state.trayWidth || 0
    return this.state.shouldOverlayTray ? 0 : trayWidth
  }

  get contentStyle() {
    const shouldOverlayTray = this.shouldOverlayTray(
      this.props.minWidth!,
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

  handleTrayContentRef = (el: HTMLDivElement | null) => {
    this._tray = el
  }

  shouldOverlayTray(
    minWidth: string,
    trayWidth: number,
    contentWidth: number,
    trayIsOverlayed: boolean
  ) {
    if (!this._content) return false

    const minWidthPx = px(minWidth, this._content)

    if (trayIsOverlayed) {
      return contentWidth - trayWidth < minWidthPx
    } else {
      return contentWidth < minWidthPx
    }
  }

  getNextState(
    minWidth: string,
    trayWidth: number,
    contentWidth: number,
    trayIsOverlayed: boolean
  ) {
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

  notifyOverlayTrayChange(shouldOverlayTray: boolean) {
    const { onOverlayTrayChange } = this.props

    if (typeof onOverlayTrayChange === 'function') {
      onOverlayTrayChange(shouldOverlayTray)
    }
  }

  handleContentSizeChange = ({ width }: DrawerContentSize) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth!,
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

  handleTraySizeChange = ({ width }: { width: number }) => {
    this.setState((state, props) => {
      const nextState = this.getNextState(
        props.minWidth!,
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

  renderChildren() {
    let trayCount = 0
    let contentCount = 0

    const children = Children.map(
      this.props.children as DrawerChildren,
      (child, _index) => {
        if (matchComponentTypes<TrayChild>(child, [DrawerTray])) {
          trayCount++
          return safeCloneElement(child, {
            label: child.props.label,
            key: child.props.label,
            [DrawerTray.locatorAttribute]: this._id,
            contentRef: this.handleTrayContentRef,
            onEnter: this.handleTrayTransitionEnter,
            onExit: this.handleTrayTransitionExit
          }) as TrayChild
        } else if (matchComponentTypes<ContentChild>(child, [DrawerContent])) {
          contentCount++

          const handleContentRef = (el: HTMLDivElement | null) => {
            const { contentRef } = child.props

            this._content = el

            if (typeof contentRef === 'function') {
              contentRef(el)
            }
          }

          return this.state.trayWidth !== null
            ? (safeCloneElement(child, {
                label: child.props.label,
                key: child.props.label,
                [DrawerContent.locatorAttribute]: this._id,
                style: this.contentStyle,
                onSizeChange: createChainedFunction(
                  this.handleContentSizeChange,
                  child.props.onSizeChange
                ),
                contentRef: handleContentRef
              }) as ContentChild)
            : null
        } else {
          return child as ContentChild | TrayChild
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
    const props = { [DrawerLayout.locatorAttribute]: this._id }
    return (
      <DrawerLayoutContext.Provider value={this.state.shouldOverlayTray}>
        <div
          {...props}
          css={this.props.styles?.drawerLayout}
          ref={this.handleRef}
        >
          {this.renderChildren()}
        </div>
      </DrawerLayoutContext.Provider>
    )
  }
}
export default DrawerLayout
export { DrawerLayout, DrawerContent, DrawerTray }
export const DrawerLayoutContext = createContext(false)
