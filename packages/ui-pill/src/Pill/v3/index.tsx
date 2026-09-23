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

import { useEffect, useRef, useState } from 'react'

import { View } from '@instructure/ui-view/latest'
import { passthroughProps } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip/latest'
import type { TooltipRenderChildrenArgs } from '@instructure/ui-tooltip/latest'

import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import type { PillProps } from './props'

/**
---
category: components
---
**/
const Pill = (props: PillProps) => {
  const {
    as,
    children,
    color = 'primary',
    elementRef,
    margin,
    statusLabel,
    renderIcon,
    themeOverride,
    ...rest
  } = props

  const [truncated, setTruncated] = useState(false)
  const ellipsisRef = useRef<HTMLDivElement | null>(null)

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { color },
    componentId: 'Pill',
    displayName: 'Pill'
  })

  useEffect(() => {
    const el = ellipsisRef.current
    if (el) {
      setTruncated(el.offsetWidth < el.scrollWidth)
    }
  }, [children, statusLabel])

  const handleRef = (el: Element | null) => {
    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  const renderPill = (
    focused?: TooltipRenderChildrenArgs['focused'],
    getTriggerProps?: TooltipRenderChildrenArgs['getTriggerProps']
  ) => {
    const filteredProps = passthroughProps(rest)
    const containerProps =
      typeof getTriggerProps === 'function'
        ? getTriggerProps(filteredProps)
        : filteredProps

    return (
      <View
        {...containerProps}
        as={as}
        {...(truncated ? {} : { elementRef: handleRef })}
        margin={margin}
        padding="0"
        maxWidth={styles?.maxWidth as string}
        background="transparent"
        borderRadius="pill"
        borderWidth="0"
        display="inline-block"
        position="relative"
        withFocusOutline={focused}
        focusColor="info"
        data-cid="Pill"
      >
        <div css={styles?.pill}>
          {renderIcon && <div css={styles?.icon}>{renderIcon}</div>}
          <div css={styles?.text} ref={ellipsisRef}>
            {statusLabel && (
              <span css={styles?.status}>{statusLabel.concat(':')}</span>
            )}
            {children}
          </div>
        </div>
      </View>
    )
  }

  if (truncated) {
    return (
      <Tooltip
        renderTip={
          statusLabel ? statusLabel.concat(': ', children as string) : children
        }
        elementRef={handleRef}
      >
        {({ focused, getTriggerProps }) => renderPill(focused, getTriggerProps)}
      </Tooltip>
    )
  }

  return renderPill()
}

Pill.displayName = 'Pill'

export default Pill
export { Pill }
export type { PillProps }
