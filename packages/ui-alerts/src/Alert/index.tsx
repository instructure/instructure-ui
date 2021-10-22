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
import ReactDOM from 'react-dom'
import keycode from 'keycode'

import { callRenderProp } from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons'
import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  IconCheckMarkSolid,
  IconInfoBorderlessSolid,
  IconWarningBorderlessSolid,
  IconNoSolid
} from '@instructure/ui-icons'
import { Transition } from '@instructure/ui-motion'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { canvas } from '@instructure/ui-themes'
import { withStyle, jsx, InstUISettingsProvider } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { AlertProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Alert extends Component<AlertProps> {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      open: true
    }
  }

  _timeouts = []

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
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (this.props.timeout > 0) {
      this._timeouts.push(
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
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
      if (this.props.onDismiss && this.props.transition === 'none') {
        this.props.onDismiss()
      }
    })
  }

  // duck type for a dom node
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
  isDOMNode(n) {
    return n && typeof n === 'object' && n.nodeType === 1
  }

  getLiveRegion() {
    let lr = null
    if (typeof this.props.liveRegion === 'function') {
      lr = this.props.liveRegion()
    }

    return this.isDOMNode(lr) ? lr : null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'liveRegion' implicitly has an 'any' typ... Remove this comment to see the full error message
  initLiveRegion(liveRegion) {
    error(
      liveRegion.getAttribute('role') === 'alert',
      `[Alert] live region must have role='alert' set on page load in order to announce content`
    )

    if (liveRegion) {
      liveRegion.setAttribute('aria-live', this.props.liveRegionPoliteness)
      liveRegion.setAttribute('aria-relevant', 'additions text')
      liveRegion.setAttribute('aria-atomic', this.props.isLiveRegionAtomic)
    }
  }

  createScreenreaderContentNode() {
    return <ScreenReaderContent>{this.props.children}</ScreenReaderContent>
  }

  createScreenreaderAlert() {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'srid' does not exist on type 'Alert'.
      this.srid = uid('Alert')

      const div = document.createElement('div')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'srid' does not exist on type 'Alert'.
      div.setAttribute('id', this.srid)

      this.renderScreenreeaderAlert(div)
      liveRegion.appendChild(div)
    }
  }

  updateScreenreaderAlert() {
    if (this.getLiveRegion()) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'srid' does not exist on type 'Alert'.
      const div = document.getElementById(this.srid)
      if (div) {
        // @ts-expect-error FIXME should not pass null?
        ReactDOM.render(null, div, () => {
          this.renderScreenreeaderAlert(div)
        })
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'div' implicitly has an 'any' type.
  renderScreenreeaderAlert(div) {
    const content = this.createScreenreaderContentNode()
    ReactDOM.render(
      // since ScreenReaderContent gets rendered outside the app,
      // and uses the withStyle decorator, we need to provide a theme for it,
      // otherwise throws warning (any theme, doesn't use any theme variables)
      <InstUISettingsProvider theme={canvas}>{content}</InstUISettingsProvider>,
      div
    )
  }

  removeScreenreaderAlert() {
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'srid' does not exist on type 'Alert'.
      const div = document.getElementById(this.srid)
      if (div) {
        // Accessibility attributes must be removed for the deletion of the node
        // and then reapplied because JAWS/IE will not respect the
        // "aria-relevant" attribute and read when the node is deleted if
        // the attributes are in place
        liveRegion.removeAttribute('aria-live')
        liveRegion.removeAttribute('aria-relevant')
        liveRegion.removeAttribute('aria-atomic')

        ReactDOM.unmountComponentAtNode(div)
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        div.parentNode.removeChild(div)

        this.initLiveRegion(liveRegion)
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyUp = (event) => {
    if (
      this.props.renderCloseButtonLabel &&
      event.keyCode === keycode.codes.esc
    ) {
      this.close()
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
    const liveRegion = this.getLiveRegion()
    if (liveRegion) {
      this.initLiveRegion(liveRegion)
    }

    this.handleTimeout()
    this.createScreenreaderAlert()
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'Readonly<{... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
    if (!!this.props.open === false && !!this.props.open !== !!prevProps.open) {
      // this outside world is asking us to close the alert, which needs to
      // take place internally so the transition runs
      this.close()
    } else {
      if (this.props.children !== prevProps.children) {
        this.updateScreenreaderAlert()
      }
    }
  }

  componentWillUnmount() {
    this.removeScreenreaderAlert()
    this.clearTimeouts()
  }

  renderIcon() {
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    const Icon = this.variantUI[this.props.variant]
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
    return (
      <View
        as="div"
        margin={this.props.margin}
        css={this.props.styles?.alert}
        onKeyUp={this.handleKeyUp}
        elementRef={this.handleRef}
      >
        {this.renderIcon()}
        <div css={this.props.styles?.content}>{this.props.children}</div>
        {this.renderCloseButton()}
      </View>
    )
  }

  render() {
    // Don't render anything if screen reader only
    if (this.props.screenReaderOnly) {
      error(
        this.getLiveRegion(),
        `[Alert] The 'screenReaderOnly' prop must be used in conjunction with 'liveRegion'.`
      )

      return null
    }

    if (this.props.transition === 'none') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      return this.state.open ? this.renderAlert() : null
    }
    return (
      <Transition
        type={this.props.transition}
        transitionOnMount
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        in={this.state.open}
        unmountOnExit
        onExited={this.onExitTransition}
      >
        {this.renderAlert()}
      </Transition>
    )
  }
}

export default Alert
export { Alert }
