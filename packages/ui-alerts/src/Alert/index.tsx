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
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
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
import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  EmotionThemeProvider,
  ThemeablePropValues
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  variant?: 'info' | 'success' | 'warning' | 'error'
  liveRegion?: (...args: any[]) => any
  liveRegionPoliteness?: 'polite' | 'assertive'
  isLiveRegionAtomic?: boolean
  screenReaderOnly?: boolean
  timeout?: number
  margin?: keyof typeof ThemeablePropValues.SPACING

  renderCloseButtonLabel?: ((...args: any[]) => any) | React.ReactNode
  onDismiss?: (...args: any[]) => any
  transition?: 'none' | 'fade'
  open?: boolean
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Alert extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * content to be rendered within Alert
     */
    children: PropTypes.node,
    /**
     * Determines color and icon
     */
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Function that returns the DIV where screenreader alerts will be placed.
     */
    liveRegion: PropTypes.func,
    /**
     * Choose the politeness level of screenreader alerts.
     */
    liveRegionPoliteness: PropTypes.oneOf(['polite', 'assertive']),
    /**
     * If the screenreader alert should be atomic
     */
    isLiveRegionAtomic: PropTypes.bool,
    /**
     * If the alert should only be visible to screen readers
     */
    screenReaderOnly: PropTypes.bool,
    /**
     * Milliseconds until the Alert is dismissed automatically
     */
    timeout: PropTypes.number,
    /**
     * Close button label. Can be a React component
     */
    renderCloseButtonLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]),
    /**
     * Callback after the alert is closed
     */
    onDismiss: PropTypes.func,
    /**
     * Transition used to make the alert appear and disappear
     */
    transition: PropTypes.oneOf(['none', 'fade']),
    /**
     * if open transitions from truthy to falsey, it's a signal to close and unmount the alert.
     * This is necessary to close the alert from the outside and still run the transition.
     */
    open: PropTypes.bool
  }

  static defaultProps = {
    variant: 'info',
    margin: 'x-small 0',
    timeout: 0,
    transition: 'fade',
    open: true,
    screenReaderOnly: false,
    liveRegionPoliteness: 'assertive',
    isLiveRegionAtomic: false,
    onDismiss: undefined,
    liveRegion: undefined,
    renderCloseButtonLabel: undefined,
    children: null
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
    // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 6 arguments, but got 2.
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; theme: { 'ic-brand-prim... Remove this comment to see the full error message
      <EmotionThemeProvider theme={canvas}>{content}</EmotionThemeProvider>,
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
      <div css={this.props.styles.icon}>
        <Icon />
      </div>
    )
  }

  renderCloseButton() {
    const closeButtonLabel =
      this.props.renderCloseButtonLabel &&
      callRenderProp(this.props.renderCloseButtonLabel)

    return closeButtonLabel ? (
      <div css={this.props.styles.closeButton} key="closeButton">
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
        // @ts-expect-error ts-migrate(2322) FIXME:
        margin={this.props.margin}
        css={this.props.styles.alert}
        onKeyUp={this.handleKeyUp}
      >
        {this.renderIcon()}
        <div css={this.props.styles.content}>{this.props.children}</div>
        {this.renderCloseButton()}
      </View>
    )
  }

  render() {
    // Don't render anything if screen reader only
    if (this.props.screenReaderOnly) {
      // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 6 arguments, but got 2.
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
