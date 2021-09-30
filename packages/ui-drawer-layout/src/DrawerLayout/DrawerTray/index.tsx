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

import { withStyle, jsx } from '@instructure/emotion'
import { bidirectional } from '@instructure/ui-i18n'
import { Transition } from '@instructure/ui-motion'
import { omitProps } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { Dialog } from '@instructure/ui-dialog'
import { Portal } from '@instructure/ui-portal'
import type { PortalNode } from '@instructure/ui-portal'
import { mirrorHorizontalPlacement } from '@instructure/ui-position'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { DrawerLayoutContext } from '../index'

import { propTypes, allowedProps } from './props'
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
@withStyle(generateStyle, generateComponentTheme)
@bidirectional()
@testable()
class DrawerTray extends Component<
  DrawerLayoutTrayProps,
  DrawerLayoutTrayState
> {
  static readonly componentId = 'DrawerLayout.Tray' as const

  static locatorAttribute = 'data-drawer-tray'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'node' is declared but its value is never read.
    contentRef: (node: any) => {}
  }

  state: DrawerLayoutTrayState = {
    transitioning: false,
    portalOpen: false
  }

  _DOMNode: PortalNode = null
  ref: Element | null = null
  _content: Element | null = null

  componentDidMount() {
    ;(this.props as any).makeStyles(this.makeStyleProps())
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevState' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if ((this.props as any).open !== prevProps.open) {
      this.setState({
        transitioning: true
      })
    }
    ;(this.props as any).makeStyles(this.makeStyleProps())
  }

  makeStyleProps = (): DrawerLayoutTrayStyleProps => {
    return {
      placement: this.placement
    }
  }

  get placement() {
    const { placement, dir } = this.props
    const isRtl = dir === bidirectional.DIRECTION.rtl
    return (isRtl
      ? mirrorHorizontalPlacement(placement!, ' ')
      : placement!) as DrawerTrayPlacement
  }

  get direction() {
    return this.placement === 'end' ? 'right' : 'left'
  }

  get transition() {
    return `slide-${this.direction}`
  }

  handleContentRef = (node: Element | null) => {
    this.ref = node
    // TODO: deprecate _content? ref should be enough
    this._content = node
    this.props.contentRef?.(node)
  }

  handleTransitionEntered = () => {
    this.setState({ transitioning: false })
  }

  handleTransitionExited = () => {
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
      // @ts-expect-error TODO: fix
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
          const needsPortal = shouldOverlayTray && mountNode
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
              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
                    css={this.props.styles?.drawerTrayContent}
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
