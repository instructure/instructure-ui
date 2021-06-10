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
import { Children, Component, ReactElement } from 'react'
import PropTypes from 'prop-types'

import { Dialog } from '@instructure/ui-dialog'
import {
  element,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import {
  passthroughProps,
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { Transition } from '@instructure/ui-motion'
import { Portal } from '@instructure/ui-portal'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { Mask } from '@instructure/ui-overlays'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  label: string
  as?: React.ReactElement
  size?: 'auto' | 'small' | 'medium' | 'large' | 'fullscreen'
  variant?: 'default' | 'inverse'
  open?: boolean
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  onOpen?: (...args: any[]) => any
  onClose?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  contentRef?: (...args: any[]) => any
  mountNode?: any // PropTypes.oneOfType([element, PropTypes.func]),
  insertAt?: 'bottom' | 'top'
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  transition?: any // TODO: Transition.propTypes.type
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  constrain?: 'window' | 'parent'
  overflow?: 'scroll' | 'fit'
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
category: components
tags: overlay, portal, dialog
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Modal extends Component<Props> {
  static componentId = 'Modal'

  static propTypes = {
    /**
     * An accessible label for the `<Modal />` content
     */
    label: PropTypes.string.isRequired,

    /**
     * The children to be rendered within the `<Modal />`
     */
    children: ChildrenPropTypes.enforceOrder(
      [ModalHeader, ModalBody, ModalFooter],
      [ModalHeader, ModalBody],
      [ModalBody, ModalFooter],
      [ModalBody]
    ),

    /**
     * The element to render the dialog as, `span` by default
     */
    as: PropTypes.elementType,

    /**
     * The size of the `<Modal />` content
     */
    size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'fullscreen']),

    /**
     * Designates the background style of the `<Modal />`
     */
    variant: PropTypes.oneOf(['default', 'inverse']),

    /**
     * Whether or not the `<Modal />` is open
     */
    open: PropTypes.bool,

    /**
     * An element or a function returning an element to focus by default
     */
    defaultFocusElement: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),

    /**
     * Whether focus should be returned to the trigger when the `<Modal/>` is closed
     */
    shouldReturnFocus: PropTypes.bool,

    /**
     * Whether the `<Modal/>` should request close when the document is clicked
     */
    shouldCloseOnDocumentClick: PropTypes.bool,

    /**
     * Callback fired when `<Modal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Modal />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * Callback fired when the `<Modal />` is requesting to be closed
     */
    onDismiss: PropTypes.func,

    /**
     *
     * A function that returns a reference to the content element
     */
    contentRef: PropTypes.func,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Modal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * An element, function returning an element, or array of elements that will not be hidden from
     * the screen reader when the `<Modal />` is open
     */
    liveRegion: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.func
    ]),

    transition: Transition.propTypes.type,

    /**
     * Callback fired before the <Modal /> transitions in
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition in
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning in
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired right before the <Modal /> transitions out
     */
    onExit: PropTypes.func,
    /**
     * Callback fired as the <Modal /> begins to transition out
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the <Modal /> finishes transitioning out
     */
    onExited: PropTypes.func,
    /**
     * Constrain the Modal to the document window or its closest positioned parent
     */
    constrain: PropTypes.oneOf(['window', 'parent']),
    /**
     * Should ModalBody handle overflow with scrollbars, or fit its
     * content within its own height?
     */
    overflow: PropTypes.oneOf(['scroll', 'fit']),

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    open: false,
    size: 'auto',
    variant: 'default',
    transition: 'fade',
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onOpen: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClose: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onDismiss: (event) => {},
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    as: undefined,
    mountNode: null,
    insertAt: 'bottom',
    liveRegion: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    contentRef: (el) => {},
    shouldCloseOnDocumentClick: true,
    shouldReturnFocus: true,
    defaultFocusElement: null,
    children: null,
    constrain: 'window',
    overflow: 'scroll'
  }

  static Header = ModalHeader
  static Body = ModalBody
  static Footer = ModalFooter

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      transitioning: false
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.open && !this.props.open) {
      // closing
      this.setState({
        transitioning: prevProps.transition !== null
      })
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get defaultFocusElement() {
    return this.props.defaultFocusElement
  }

  get DOMNode() {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_DOMNode' does not exist on type 'Modal'... Remove this comment to see the full error message
    return this._DOMNode
  }

  get maskPlacement() {
    if (this.props.overflow === 'fit') {
      return 'stretch'
    } else {
      return 'center'
    }
  }

  set DOMNode(el) {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_DOMNode' does not exist on type 'Modal'... Remove this comment to see the full error message
    this._DOMNode = el
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'DOMNode' implicitly has an 'any' type.
  handlePortalOpen = (DOMNode) => {
    this.DOMNode = DOMNode
  }

  handleTransitionExited = () => {
    this.setState({
      transitioning: false
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  contentRef = (el) => {
    // @ts-expect-error ts-migrate(2551) FIXME: Property '_content' does not exist on type 'Modal'... Remove this comment to see the full error message
    this._content = el
    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(el)
    }
  }

  renderChildren() {
    const { children, variant, overflow } = this.props

    return Children.map(children, (child) => {
      if (!child) return // ignore null, falsy children

      if (matchComponentTypes(child, [ModalBody])) {
        return safeCloneElement(child as ReactElement, {
          variant: variant,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
          overflow: child.props.overflow || overflow
        })
      } else {
        return safeCloneElement(child as ReactElement, {
          variant: variant
        })
      }
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  renderDialog(props) {
    const {
      onDismiss,
      label,
      shouldCloseOnDocumentClick,
      shouldReturnFocus,
      liveRegion,
      size,
      constrain,
      as,
      styles
    } = this.props

    const isFullScreen = size === 'fullscreen'
    const dialog = (
      <Dialog
        {...passthroughProps(props)}
        as={as}
        open
        label={label}
        defaultFocusElement={this.defaultFocusElement}
        shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
        shouldCloseOnEscape
        shouldContainFocus
        shouldReturnFocus={shouldReturnFocus}
        liveRegion={liveRegion}
        onDismiss={onDismiss}
        // @ts-expect-error ts-migrate(2769) FIXME:
        css={styles.modal}
        ref={this.contentRef}
        // aria-modal="true" see VO bug https://bugs.webkit.org/show_bug.cgi?id=174667
      >
        {this.renderChildren()}
      </Dialog>
    )

    return (
      <Mask
        placement={this.maskPlacement}
        fullscreen={constrain === 'window'}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        themeOverride={
          isFullScreen ? { borderRadius: '0em', borderWidth: '0em' } : {}
        }
      >
        {dialog}
      </Mask>
    )
  }

  render() {
    const {
      open,
      onOpen,
      onClose,
      mountNode,
      insertAt,
      transition,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      constrain,
      overflow,
      ...passthroughProps
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitioning' does not exist on type 'R... Remove this comment to see the full error message
    const portalIsOpen = open || this.state.transitioning

    return (
      <Portal
        mountNode={mountNode}
        insertAt={insertAt}
        open={portalIsOpen}
        onOpen={createChainedFunction(this.handlePortalOpen, onOpen)}
        onClose={onClose}
      >
        {portalIsOpen && (
          <Transition
            in={open}
            transitionOnMount
            unmountOnExit
            type={transition}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}
            onExited={createChainedFunction(
              this.handleTransitionExited,
              onExited
            )}
          >
            {constrain === 'parent' ? (
              <span css={this.props.styles.constrainContext}>
                {this.renderDialog(passthroughProps)}
              </span>
            ) : (
              this.renderDialog(passthroughProps)
            )}
          </Transition>
        )}
      </Portal>
    )
  }
}

export default Modal
export { Modal, ModalHeader, ModalBody, ModalFooter }
