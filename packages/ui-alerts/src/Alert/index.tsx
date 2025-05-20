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

import { Fragment, Component } from 'react'
import ReactDOM from 'react-dom'
import keycode from 'keycode'

import {
  callRenderProp,
  withDeterministicId,
  passthroughProps
} from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons'
import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  IconCheckMarkSolid,
  IconInfoBorderlessSolid,
  IconWarningBorderlessSolid,
  IconNoSolid
} from '@instructure/ui-icons'
import { Transition } from '@instructure/ui-motion'
import { logError as error } from '@instructure/console'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { AlertProps, AlertState } from './props'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class Alert extends Component<AlertProps, AlertState> {
  static readonly componentId = 'Alert'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    variant: 'info',
    margin: 'x-small 0',
    timeout: 0,
    transition: 'fade',
    open: true,
    screenReaderOnly: false,
    liveRegionPoliteness: 'assertive',
    isLiveRegionAtomic: false,
    children: null,
    hasShadow: true
  }

  constructor(props: AlertProps) {
    super(props)

    this.srid = this.props.deterministicId!()
    this.state = {
      open: true
    }
  }

  _timeouts: ReturnType<typeof setTimeout>[] = []
  srid: string

  variantUI = {
    error: IconNoSolid,
    info: IconInfoBorderlessSolid,
    success: IconCheckMarkSolid,
    warning: IconWarningBorderlessSolid
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  handleTimeout = () => {
    if (this.props.timeout! > 0) {
      this._timeouts.push(
        setTimeout(() => {
          this.close()
        }, this.props.timeout)
      )
    }
  }

  clearTimeouts() {
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
    this._timeouts = []
  }

  onExitTransition = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }

  close = () => {
    this.clearTimeouts()
    this.removeScreenreaderAlert()
    this.setState({ open: false }, () => {
      if (
        this.props.onDismiss &&
        (this.props.transition === 'none' || this.props.screenReaderOnly)
      ) {
        this.props.onDismiss()
      }
    })
  }

  // duck type for a dom node
  isDOMNode(n: Element | null) {
    return n && typeof n === 'object' && n.nodeType === 1
  }

  getLiveRegion() {
    let lr = null
    if (typeof this.props.liveRegion === 'function') {
      lr = this.props.liveRegion()
    }

    return this.isDOMNode(lr) ? lr : null
  }

  initLiveRegion(liveRegion: Element) {
    error(
      liveRegion.getAttribute('role') === 'alert',
      `[Alert] live region must have role='alert' set on page load in order to announce content`
    )

    if (liveRegion) {
      liveRegion.setAttribute('aria-live', this.props.liveRegionPoliteness!)
      // indicates what notifications the user agent will trigger when the
      // accessibility tree within a live region is modified.
      // additions: elements are added, text: Text content is added
      liveRegion.setAttribute('aria-relevant', 'additions text')
      liveRegion.setAttribute(
        'aria-atomic',
        `${this.props.isLiveRegionAtomic!}`
      )
    }
  }

  createScreenreaderContentNode() {
    return <ScreenReaderContent>{this.props.children}</ScreenReaderContent>
  }

  createScreenreaderAlert() {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      const div = document.createElement('div')
      div.setAttribute('id', this.srid)

      liveRegion.appendChild(div)
    }
  }

  removeScreenreaderAlert() {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      const div = document.getElementById(this.srid!)
      if (div) {
        // Accessibility attributes must be removed for the deletion of the node
        // and then reapplied because JAWS/IE will not respect the
        // "aria-relevant" attribute and read when the node is deleted if
        // the attributes are in place
        liveRegion.removeAttribute('aria-live')
        liveRegion.removeAttribute('aria-relevant')
        liveRegion.removeAttribute('aria-atomic')

        this.initLiveRegion(liveRegion)
      }
    }
  }

  handleKeyUp = (event: React.KeyboardEvent<ViewOwnProps>) => {
    if (
      this.props.renderCloseButtonLabel &&
      event.keyCode === keycode.codes.esc
    ) {
      this.close()
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      this.initLiveRegion(liveRegion)
    }

    this.handleTimeout()
  }

  componentWillUnmount() {
    this.clearTimeouts()
  }

  componentDidUpdate(prevProps: AlertProps) {
    this.props.makeStyles?.()
    if (!!this.props.open === false && !!this.props.open !== !!prevProps.open) {
      // this outside world is asking us to close the alert, which needs to
      // take place internally so the transition runs
      this.close()
    }
  }

  renderIcon() {
    const Icon = this.variantUI[this.props.variant!]
    return (
      <div css={this.props.styles?.icon}>
        <Icon />
      </div>
    )
  }

  renderCloseButton() {
    const closeButtonLabel =
      this.props.renderCloseButtonLabel &&
      callRenderProp(this.props.renderCloseButtonLabel)

    return closeButtonLabel ? (
      <div css={this.props.styles?.closeButton} key="closeButton">
        <CloseButton
          onClick={this.close}
          size="small"
          screenReaderLabel={closeButtonLabel}
        />
      </div>
    ) : null
  }

  renderAlert() {
    // prevent onDismiss from being passed to the View component
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { margin, styles, children, onDismiss, ...props } = this.props
    return (
      <View
        {...passthroughProps({ ...props })}
        as="div"
        margin={margin}
        css={styles?.alert}
        onKeyUp={this.handleKeyUp}
        elementRef={this.handleRef}
      >
        {this.renderIcon()}
        <div css={styles?.content}>{children}</div>
        {this.renderCloseButton()}
      </View>
    )
  }

  createScreenReaderPortal(liveRegion: Element) {
    const { open } = this.state

    return open
      ? ReactDOM.createPortal(
          <div id={this.srid}>{this.createScreenreaderContentNode()}</div>,
          liveRegion
        )
      : null
  }

  render() {
    const liveRegion = this.getLiveRegion()
    const screenReaderContent = liveRegion
      ? this.createScreenReaderPortal(liveRegion)
      : null
    // Don't render anything if screen reader only
    if (this.props.screenReaderOnly) {
      error(
        !!this.getLiveRegion(),
        `[Alert] The 'screenReaderOnly' prop must be used in conjunction with 'liveRegion'.`
      )

      return screenReaderContent
    }

    if (this.props.transition === 'none') {
      return this.state.open ? (
        <Fragment>
          {screenReaderContent}
          {this.renderAlert()}
        </Fragment>
      ) : null
    }
    return (
      <Fragment>
        {screenReaderContent}
        <Transition
          type={this.props.transition}
          transitionOnMount
          in={this.state.open}
          unmountOnExit
          onExited={this.onExitTransition}
        >
          {this.renderAlert()}
        </Transition>
      </Fragment>
    )
  }
}

export default Alert
export { Alert }
