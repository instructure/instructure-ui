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

import {
  callRenderProp,
  withDeterministicId,
  passthroughProps
} from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons/latest'
import { View } from '@instructure/ui-view/latest'
import type { ViewOwnProps } from '@instructure/ui-view/latest'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  InfoInstUIIcon,
  XCircleInstUIIcon,
  CircleCheckInstUIIcon,
  TriangleAlertInstUIIcon
} from '@instructure/ui-icons'
import { Transition } from '@instructure/ui-motion'
import { logError as error } from '@instructure/console'
import { withStyleNew } from '@instructure/emotion'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { AlertProps, AlertState } from './props'

import {
  AlertLiveRegionController,
  createDismissTimer,
  describeScreenReaderContent,
  resolveLiveRegion,
  shouldCloseOnKey,
  type DismissTimer
} from './behavior'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyleNew(generateStyle)
class Alert extends Component<AlertProps, AlertState> {
  static readonly componentId = 'Alert'

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

    // Behavior layer wiring. Callbacks (rather than captured values) so the
    // controller always reads the consumer's current props — matches the
    // original `initLiveRegion`/`handleTimeout` behavior of reading
    // `this.props.*` at call time.
    this.timer = createDismissTimer(this.props.timeout!, () => this.close())
    this.liveRegionController = new AlertLiveRegionController(
      () => resolveLiveRegion(this.props.liveRegion),
      () => this.props.liveRegionPoliteness!,
      () => this.props.isLiveRegionAtomic!
    )
  }

  srid: string
  private timer: DismissTimer
  private liveRegionController: AlertLiveRegionController

  variantUI = {
    error: XCircleInstUIIcon,
    info: InfoInstUIIcon,
    success: CircleCheckInstUIIcon,
    warning: TriangleAlertInstUIIcon
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  // Kept for backward compatibility — historically present but not invoked
  // from React's render flow (the SR content goes through `createScreenReader-
  // Portal`). Delegates to the behavior-layer controller so call sites that
  // still reach for it get the unchanged DOM effect.
  createScreenreaderAlert() {
    this.liveRegionController.appendContent(this.srid)
  }

  onExitTransition = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }

  close = () => {
    this.timer.clear()
    this.liveRegionController.refresh(this.srid)
    this.setState({ open: false }, () => {
      if (
        this.props.onDismiss &&
        (this.props.transition === 'none' || this.props.screenReaderOnly)
      ) {
        this.props.onDismiss()
      }
    })
  }

  // Preserved as a thin wrapper for compatibility with any tests or external
  // call sites that referenced this method on the instance.
  getLiveRegion() {
    return resolveLiveRegion(this.props.liveRegion)
  }

  createScreenreaderContentNode() {
    const { label, children } = describeScreenReaderContent({
      variantScreenReaderLabel: this.props.variantScreenReaderLabel,
      children: this.props.children
    })
    return (
      <ScreenReaderContent>
        {label} {children}
      </ScreenReaderContent>
    )
  }

  handleKeyUp = (event: React.KeyboardEvent<ViewOwnProps>) => {
    if (shouldCloseOnKey(event, !!this.props.renderCloseButtonLabel)) {
      this.close()
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    this.liveRegionController.init()
    this.timer.arm()
  }

  componentWillUnmount() {
    this.timer.clear()
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
    const { renderCustomIcon, variant, styles } = this.props
    const Icon = this.variantUI[variant!]
    return (
      <div css={styles?.icon}>
        {renderCustomIcon ? callRenderProp(renderCustomIcon) : <Icon />}
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
    const {
      margin,
      styles,
      children,
      onDismiss,
      variantScreenReaderLabel,
      ...props
    } = this.props
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
        <div css={styles?.content}>
          {variantScreenReaderLabel && (
            <span css={styles?.variantScreenReaderLabel}>
              {variantScreenReaderLabel}
            </span>
          )}
          {children}
        </div>
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
