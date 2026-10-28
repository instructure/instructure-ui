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
import { renderIconWithProps } from '@instructure/ui-icons'
import { Transition } from '@instructure/ui-motion'
import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import type { BannerProps } from './props'

const variantToIconSize = {
  relaxed: 'sm',
  compact: 'xs'
} as const

// duck type for a dom node
const isDOMNode = (n: Element | null | undefined): n is Element =>
  !!n && typeof n === 'object' && n.nodeType === 1

const getLiveRegion = (liveRegion: BannerProps['liveRegion']) => {
  const lr = typeof liveRegion === 'function' ? liveRegion() : liveRegion
  return isDOMNode(lr) ? lr : null
}

/**
---
category: components
---
**/
const Banner = (props: BannerProps) => {
  const {
    children = null,
    title,
    color = 'violet',
    variant = 'relaxed',
    renderIcon,
    liveRegion,
    isLiveRegionAtomic = false,
    timeout = 0,
    margin,
    renderCloseButtonLabel,
    onDismiss,
    transition = 'fade',
    open: openProp = true,
    elementRef,
    themeOverride,
    ...rest
  } = props

  const [open, setOpen] = useState(true)
  const srid = useDeterministicId('Banner')()
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { color, variant },
    componentId: 'Banner',
    displayName: 'Banner'
  })

  const initLiveRegion = (region: Element) => {
    region.setAttribute('aria-live', 'polite')
    region.setAttribute('aria-relevant', 'additions text')
    region.setAttribute('aria-atomic', `${isLiveRegionAtomic}`)
  }

  const removeScreenReaderContent = () => {
    const region = getLiveRegion(liveRegion)
    if (region && document.getElementById(srid)) {
      // JAWS ignores `aria-relevant` and reads the removed node unless the
      // attributes are removed and reapplied
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
    removeScreenReaderContent()
    setOpen(false)
    // without a transition there is no exit callback, so dismiss right away
    if (onDismiss && transition === 'none') {
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
    // an inline `liveRegion` function would restart the timeout on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevOpenProp = useRef(openProp)
  useEffect(() => {
    if (!openProp && !!prevOpenProp.current) {
      // closing internally lets the exit transition run
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

  const renderCloseButton = () => {
    const closeButtonLabel =
      renderCloseButtonLabel && callRenderProp(renderCloseButtonLabel)

    return closeButtonLabel ? (
      <div css={styles?.closeButton}>
        <CloseButton
          onClick={close}
          size="small"
          screenReaderLabel={closeButtonLabel}
        />
      </div>
    ) : null
  }

  const renderBanner = () => (
    <View
      {...passthroughProps(rest)}
      as="div"
      margin={margin}
      css={styles?.banner}
      onKeyUp={handleKeyUp}
      elementRef={handleRef}
    >
      {renderIcon && (
        <div css={styles?.icon}>
          {renderIconWithProps(
            renderIcon,
            variantToIconSize[variant],
            'inherit'
          )}
        </div>
      )}
      <div css={styles?.content}>
        {title && <div css={styles?.title}>{title}</div>}
        {children && <div css={styles?.body}>{children}</div>}
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
              {title} {children}
            </ScreenReaderContent>
          </div>,
          region
        )
      : null

  if (transition === 'none') {
    return open ? (
      <Fragment>
        {screenReaderContent}
        {renderBanner()}
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
        {renderBanner()}
      </Transition>
    </Fragment>
  )
}

Banner.displayName = 'Banner'

export default Banner
export { Banner }
export type { BannerProps }
