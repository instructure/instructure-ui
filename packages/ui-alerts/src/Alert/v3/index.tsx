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

import { Fragment, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import {
  callRenderProp,
  passthroughProps,
  useDeterministicId
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
import { useStyleNew } from '@instructure/emotion'
import { frozenThemesDesignTokensV1 } from '@instructure/ui-themes'

import generateStyle from './styles.js'

import type { AlertProps } from './props'

const variantUI = {
  error: XCircleInstUIIcon,
  info: InfoInstUIIcon,
  success: CircleCheckInstUIIcon,
  warning: TriangleAlertInstUIIcon
}

// duck type for a dom node
const isDOMNode = (n: Element | null | undefined): n is Element =>
  !!n && typeof n === 'object' && n.nodeType === 1

const getLiveRegion = (liveRegion: AlertProps['liveRegion']) => {
  const lr = typeof liveRegion === 'function' ? liveRegion() : liveRegion
  return isDOMNode(lr) ? lr : null
}

/**
---
category: components
---
**/
const Alert = (props: AlertProps) => {
  const {
    children = null,
    variant = 'info',
    variantScreenReaderLabel,
    liveRegion,
    liveRegionPoliteness = 'assertive',
    isLiveRegionAtomic = false,
    screenReaderOnly = false,
    timeout = 0,
    margin = 'x-small 0',
    renderCloseButtonLabel,
    onDismiss,
    transition = 'fade',
    open: openProp = true,
    hasShadow = true,
    renderCustomIcon,
    elementRef,
    themeOverride,
    ...rest
  } = props

  const [open, setOpen] = useState(true)
  const srid = useDeterministicId('Alert')()
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { variant, hasShadow },
    componentId: 'Alert',
    displayName: 'Alert',
    frozenTheme: frozenThemesDesignTokensV1
  })

  const initLiveRegion = (region: Element) => {
    region.setAttribute('aria-live', liveRegionPoliteness)
    // indicates what notifications the user agent will trigger when the
    // accessibility tree within a live region is modified.
    // additions: elements are added, text: Text content is added
    region.setAttribute('aria-relevant', 'additions text')
    region.setAttribute('aria-atomic', `${isLiveRegionAtomic}`)
  }

  const removeScreenreaderAlert = () => {
    const region = getLiveRegion(liveRegion)
    if (region && document.getElementById(srid)) {
      // Accessibility attributes must be removed for the deletion of the node
      // and then reapplied because JAWS/IE will not respect the
      // "aria-relevant" attribute and read when the node is deleted if
      // the attributes are in place
      region.removeAttribute('aria-live')
      region.removeAttribute('aria-relevant')
      region.removeAttribute('aria-atomic')

      initLiveRegion(region)
    }
  }

  const clearTimeouts = () => {
    timeouts.current.forEach((t) => clearTimeout(t))
    timeouts.current = []
  }

  const close = () => {
    clearTimeouts()
    removeScreenreaderAlert()
    setOpen(false)
    // without a transition there is no exit callback, so dismiss right away
    if (onDismiss && (transition === 'none' || screenReaderOnly)) {
      onDismiss()
    }
  }

  // the timeout fires after later renders, so it must call the latest `close`
  const closeRef = useRef(close)
  useEffect(() => {
    closeRef.current = close
  })

  useEffect(() => {
    const region = getLiveRegion(liveRegion)
    if (region) {
      initLiveRegion(region)
    }
    if (timeout > 0) {
      timeouts.current.push(setTimeout(() => closeRef.current(), timeout))
    }
    return clearTimeouts
    // runs on mount only, like componentDidMount in the class version
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevOpenProp = useRef(openProp)
  useEffect(() => {
    if (!openProp && !!prevOpenProp.current) {
      // this outside world is asking us to close the alert, which needs to
      // take place internally so the transition runs
      closeRef.current()
    }
    prevOpenProp.current = openProp
  }, [openProp])

  const handleRef = (el: Element | null) => {
    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<ViewOwnProps>) => {
    if (renderCloseButtonLabel && event.key === 'Escape') {
      close()
    }
  }

  const renderIcon = () => {
    const Icon = variantUI[variant]
    return (
      <div css={styles?.icon}>
        {renderCustomIcon ? callRenderProp(renderCustomIcon) : <Icon />}
      </div>
    )
  }

  const renderCloseButton = () => {
    const closeButtonLabel =
      renderCloseButtonLabel && callRenderProp(renderCloseButtonLabel)

    return closeButtonLabel ? (
      <div css={styles?.closeButton} key="closeButton">
        <CloseButton
          onClick={close}
          size="small"
          screenReaderLabel={closeButtonLabel}
        />
      </div>
    ) : null
  }

  const renderAlert = () => (
    <View
      {...passthroughProps(rest)}
      as="div"
      margin={margin}
      css={styles?.alert}
      onKeyUp={handleKeyUp}
      elementRef={handleRef}
    >
      {renderIcon()}
      <div css={styles?.content}>
        {variantScreenReaderLabel && (
          <span css={styles?.variantScreenReaderLabel}>
            {variantScreenReaderLabel}
          </span>
        )}
        {children}
      </div>
      {renderCloseButton()}
    </View>
  )

  const region = getLiveRegion(liveRegion)
  const screenReaderContent =
    region && open
      ? ReactDOM.createPortal(
          <div id={srid}>
            <ScreenReaderContent>
              {variantScreenReaderLabel || ''} {children}
            </ScreenReaderContent>
          </div>,
          region
        )
      : null

  // Don't render anything if screen reader only
  if (screenReaderOnly) {
    error(
      !!region,
      `[Alert] The 'screenReaderOnly' prop must be used in conjunction with 'liveRegion'.`
    )

    return screenReaderContent
  }

  if (transition === 'none') {
    return open ? (
      <Fragment>
        {screenReaderContent}
        {renderAlert()}
      </Fragment>
    ) : null
  }

  return (
    <Fragment>
      {screenReaderContent}
      <Transition
        type={transition}
        transitionOnMount
        in={open}
        unmountOnExit
        onExited={() => onDismiss?.()}
      >
        {renderAlert()}
      </Transition>
    </Fragment>
  )
}

Alert.displayName = 'Alert'

export default Alert
export { Alert }
export type { AlertProps }
