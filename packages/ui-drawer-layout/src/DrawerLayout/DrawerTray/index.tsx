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

import { Component } from 'react'

import { withStyle } from '@instructure/emotion'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import { Transition } from '@instructure/ui-motion'
import type { TransitionType } from '@instructure/ui-motion'
import { omitProps } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { Dialog } from '@instructure/ui-dialog'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { mirrorHorizontalPlacement } from '@instructure/ui-position'

import generateStyle from './styles'
import { DrawerLayoutContext } from '../index'

import { allowedProps } from './props'
import type {
  DrawerLayoutTrayProps,
  DrawerLayoutTrayState,
  DrawerLayoutTrayStyleProps,
  DrawerTrayPlacement
} from './props'

/**
---
parent: DrawerLayout
id: DrawerLayout.Tray
---
**/
@withStyle(generateStyle)
@textDirectionContextConsumer()
class DrawerTray extends Component<
  DrawerLayoutTrayProps,
  DrawerLayoutTrayState
> {
  static readonly componentId = 'DrawerLayout.Tray' as const

  static locatorAttribute = 'data-drawer-tray'

  static allowedProps = allowedProps
  static defaultProps = {
    shouldContainFocus: true,
    shouldCloseOnEscape: true,
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    open: false,
    shadow: true,
    border: true,
    placement: 'start'
  }

  ref: HTMLDivElement | null = null

  private _DOMNode: PortalNode = null

  get _content() {
    console.warn(
      '_content property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  constructor(props: DrawerLayoutTrayProps) {
    super(props)

    this.state = {
      transitioning: false,
      portalOpen: false
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentDidUpdate(prevProps: DrawerLayoutTrayProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        transitioning: true
      })
    }
    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): DrawerLayoutTrayStyleProps => {
    return {
      placement: this.placement
    }
  }

  get placement() {
    const { placement, dir } = this.props
    const isRtl = dir === textDirectionContextConsumer.DIRECTION.rtl
    return (
      isRtl ? mirrorHorizontalPlacement(placement!, ' ') : placement!
    ) as DrawerTrayPlacement
  }

  get transition(): TransitionType {
    return this.placement === 'end' ? 'fade' : 'slide-left'
  }

  handleContentRef = (node: HTMLDivElement | null) => {
    this.ref = node

    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(node)
    }
  }

  handleTransitionEntered = (_transitionType?: TransitionType) => {
    this.setState({ transitioning: false })
  }

  handleTransitionExited = (_transitionType?: TransitionType) => {
    this.setState({
      transitioning: false
    })
  }

  handlePortalOpen = (DOMNode: PortalNode) => {
    this.DOMNode = DOMNode
    this.setState({
      portalOpen: true
    })
  }

  get DOMNode() {
    return this._DOMNode
  }

  set DOMNode(el: PortalNode) {
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
        {(shouldOverlayTray: boolean) => {
          const { portalOpen } = this.state
          const needsPortal = shouldOverlayTray && !!mountNode
          // we have to handle the shadow version here,
          // because passing and handling it in styles.js makes it
          // rerender the component during the transition, breaking it
          const trayStyles =
            shadow && shouldOverlayTray
              ? styles?.drawerTrayWithShadow
              : styles?.drawerTray
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
                {...omitProps(props, DrawerTray.allowedProps)}
                ref={this.handleContentRef}
                css={trayStyles}
                data-cid="DrawerTray"
              >
                <Dialog
                  open
                  role={shouldOverlayTray ? 'dialog' : 'region'}
                  label={label}
                  shouldReturnFocus={shouldReturnFocus}
                  shouldContainFocus={
                    !this.state.transitioning &&
                    shouldContainFocus &&
                    shouldOverlayTray
                  }
                  shouldCloseOnDocumentClick={
                    shouldCloseOnDocumentClick && shouldOverlayTray
                  }
                  shouldCloseOnEscape={shouldCloseOnEscape && shouldOverlayTray}
                  defaultFocusElement={defaultFocusElement}
                  liveRegion={liveRegion}
                  onDismiss={onDismiss}
                  as="div"
                  css={this.props.styles?.drawerTrayContent}
                >
                  {this.renderContent()}
                </Dialog>
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
