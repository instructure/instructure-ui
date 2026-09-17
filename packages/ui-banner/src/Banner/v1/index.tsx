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

import { forwardRef } from 'react'

import {
  callRenderProp,
  omitProps,
  useDeterministicId
} from '@instructure/ui-react-utils'
import { CloseButton } from '@instructure/ui-buttons/latest'
import { View } from '@instructure/ui-view/latest'
import { MegaphoneInstUIIcon } from '@instructure/ui-icons'
import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'
import { allowedProps } from './props.js'
import type { BannerProps } from './props'

/**
---
category: components
---

A `Banner` is a prominent, proactive message used to promote a feature,
offer, event, or announcement. Unlike `Alert`, which communicates system or
account status in response to something the user did, a `Banner` is present
to inform or market to the user rather than react to them — so it never uses
live-region semantics that would interrupt a screen reader.

```js
---
type: example
---
<Banner renderTitle="New: dark mode" renderCloseButtonLabel="Close">
  Switch your workspace to dark mode from account settings.
</Banner>
```
**/
const Banner = forwardRef<Element, BannerProps>((props, ref) => {
  const {
    color = 'plum',
    renderIcon,
    renderTitle,
    children,
    renderActions,
    renderCloseButtonLabel,
    onDismiss,
    screenReaderLabel,
    elementRef,
    margin,
    themeOverride,
    ...rest
  } = props

  const deterministicId = useDeterministicId('Banner')()
  const titleId = renderTitle ? `${deterministicId}-title` : undefined

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { color },
    componentId: 'Banner',
    displayName: 'Banner'
  })

  const handleRef = (el: Element | null) => {
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      const refObject = ref as React.MutableRefObject<Element | null>
      refObject.current = el
    }
    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  const closeButtonLabel =
    renderCloseButtonLabel && callRenderProp(renderCloseButtonLabel)

  const landmarkProps = titleId
    ? { 'aria-labelledby': titleId }
    : screenReaderLabel
    ? { 'aria-label': screenReaderLabel }
    : {}

  return (
    <View
      {...omitProps(rest, [...allowedProps])}
      as="section"
      margin={margin}
      css={styles?.banner}
      elementRef={handleRef}
      {...landmarkProps}
    >
      <div css={styles?.iconContainer} aria-hidden="true">
        {renderIcon ? callRenderProp(renderIcon) : <MegaphoneInstUIIcon />}
      </div>
      <div css={styles?.content}>
        {renderTitle && (
          <div css={styles?.title} id={titleId}>
            {callRenderProp(renderTitle)}
          </div>
        )}
        {children && <div css={styles?.message}>{children}</div>}
        {renderActions && (
          <div css={styles?.actions}>{callRenderProp(renderActions)}</div>
        )}
      </div>
      {closeButtonLabel && (
        <div css={styles?.closeButton}>
          <CloseButton
            onClick={onDismiss}
            size="small"
            screenReaderLabel={closeButtonLabel}
          />
        </div>
      )}
    </View>
  )
})

Banner.displayName = 'Banner'

export default Banner
export { Banner, allowedProps }
