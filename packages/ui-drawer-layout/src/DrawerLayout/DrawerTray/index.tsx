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
import PropTypes from 'prop-types'
import { withStyle, jsx } from '@instructure/emotion'
import { bidirectional, BidirectionalProps } from '@instructure/ui-i18n'
import { Transition } from '@instructure/ui-motion'
import { omitProps } from '@instructure/ui-react-utils'
import { element } from '@instructure/ui-prop-types'
import { createChainedFunction } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { Dialog } from '@instructure/ui-dialog'
import { Portal, PortalNode } from '@instructure/ui-portal'
import {
  mirrorHorizontalPlacement,
  PositionMountNode
} from '@instructure/ui-position'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { DrawerLayoutContext } from '../index'

type Props = {
  label: string
  render?: (...args: any[]) => any
  placement?: 'start' | 'end'
  open?: boolean
  onOpen?: (...args: any[]) => any
  onClose?: (...args: any[]) => any
  border?: boolean
  shadow?: boolean
  onTransition?: (...args: any[]) => any
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  contentRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  onDismiss?: (...args: any[]) => any
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
parent: DrawerLayout
id: DrawerLayout.Tray
---
**/
@withStyle(generateStyle, generateComponentTheme)
@bidirectional()
@testable()
class DrawerTray extends Component<Props & BidirectionalProps> {
  static componentId = 'DrawerLayout.Tray'

  static locatorAttribute = 'data-drawer-tray'
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    render: PropTypes.func,
    /**
     * Placement of the `<DrawerLayout.Tray />`
     */
    placement: PropTypes.oneOf(['start', 'end']),
    /**
     * If the tray is open or closed.
     */
    open: PropTypes.bool,
    /**
     * Called when the `<DrawerLayout.Tray />` is opened
     */
    onOpen: PropTypes.func,
    /**
     * Called when the `<DrawerLayout.Tray />` is closed
     */
    onClose: PropTypes.func,
    /**
     * Should the `<DrawerLayout.Tray />` have a border
     */
    border: PropTypes.bool,
    /**
     * Should the `<DrawerLayout.Tray />` have a shadow
     */
    shadow: PropTypes.bool,
    /**
     * Callback fired when the `<DrawerLayout.Tray />` transitions in/out
     */
    onTransition: PropTypes.func,
    /**
     * Callback fired before the `<DrawerLayout.Tray />` transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the `<DrawerLayout.Tray />` begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the `<DrawerLayout.Tray />` transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the `<DrawerLayout.Tray />` begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the `<DrawerLayout.Tray />` finishes transitioning out
     */
    onExited: PropTypes.func,
    /**
     * Ref function for the `<DrawerLayout.Tray />` content
     */
    contentRef: PropTypes.func,
    /**
     * An element or a function returning an element to use as the mount node
     * for the `<DrawerLayout.Tray />` when tray is overlaying content
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<DrawerLayout.Tray />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),
    onDismiss: PropTypes.func,
    shouldContainFocus: PropTypes.bool,
    shouldReturnFocus: PropTypes.bool,
    shouldCloseOnDocumentClick: PropTypes.bool,
    shouldCloseOnEscape: PropTypes.bool,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
  }
  static defaultProps = {
    children: null,
    render: undefined,
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
    contentRef: (node: any) => {},
    onClose: undefined,
    onDismiss: undefined,
    defaultFocusElement: undefined,
    liveRegion: undefined,
    onTransition: undefined
  }
  state = {
    transitioning: false,
    portalOpen: false
  }
  _DOMNode?: PortalNode = null
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
  makeStyleProps = () => {
    return {
      placement: this.placement
    }
  }
  get placement() {
    const { placement, dir } = this.props
    const isRtl = dir === bidirectional.DIRECTION.rtl
    return isRtl ? mirrorHorizontalPlacement(placement, ' ') : placement
  }
  get direction() {
    return this.placement === 'end' ? 'right' : 'left'
  }
  get transition() {
    return `slide-${this.direction}`
  }
  handleContentRef = (node: any) => {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Drawer... Remove this comment to see the full error message
    this._content = node
    if (typeof (this.props as any).contentRef === 'function') {
      ;(this.props as any).contentRef(node)
    }
  }
  handleTransitionEntered = () => {
    this.setState({ transitioning: false })
  }
  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }
  handlePortalOpen = (DOMNode?: PortalNode) => {
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
        {(shouldOverlayTray: any) => {
          const { portalOpen } = this.state
          const needsPortal = shouldOverlayTray && mountNode
          // we have to handle the shadow version here,
          // because passing and handling it in styles.js makes it
          // rerender the component during the transition, breaking it
          const trayStyles =
            shadow && shouldOverlayTray
              ? (styles as any).drawerTrayWithShadow
              : (styles as any).drawerTray
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
                {...omitProps(props, DrawerTray.propTypes)}
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
                    css={(this.props as any).styles.drawerTrayContent}
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
