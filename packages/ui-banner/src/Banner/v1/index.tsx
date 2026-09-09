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

import { CloseButton } from '@instructure/ui-buttons/latest'
import { Heading } from '@instructure/ui-heading/latest'
import { View } from '@instructure/ui-view/latest'

import { useStyleNew } from '@instructure/emotion'
import generateStyle from './styles.js'

import type { BannerProps } from './props'

/**
---
category: components
---

A `Banner` is a promotional message used to proactively surface a feature,
offer, event, or announcement. Unlike `Alert`, a `Banner` doesn't communicate
system or account status — use `Alert` for that instead.

```js
---
type: example
---
<Banner header="Banner header" onDismiss={() => {}}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua.
</Banner>
```
**/
const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      color = 'violet',
      density = 'relaxed',
      dismissible = true,
      onDismiss,
      closeButtonLabel = 'Close banner',
      renderIcon,
      header,
      children,
      renderPrimaryAction,
      renderSecondaryAction,
      elementRef,
      margin,
      themeOverride
    },
    ref
  ) => {
    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      params: {
        color,
        density
      },
      componentId: 'Banner',
      displayName: 'Banner'
    })

    const handleRef = (el: Element | null) => {
      if (typeof elementRef === 'function') {
        elementRef(el)
      }
      if (typeof ref === 'function') {
        ref(el as HTMLDivElement)
      } else if (ref) {
        const refObject = ref
        refObject.current = el as HTMLDivElement
      }
    }

    const hasPrimaryAction = typeof renderPrimaryAction === 'function'
    const hasSecondaryAction =
      hasPrimaryAction && typeof renderSecondaryAction === 'function'

    return (
      <View
        as="div"
        css={styles?.banner}
        elementRef={handleRef}
        margin={margin}
      >
        {renderIcon && (
          <span css={styles?.icon} aria-hidden="true">
            {renderIcon()}
          </span>
        )}
        <span css={styles?.content}>
          <span css={styles?.contentInner}>
            {header && (
              <Heading level="h3" margin="0">
                {header}
              </Heading>
            )}
            {children && <div>{children}</div>}
          </span>
          {hasPrimaryAction && (
            <span css={styles?.actions}>
              {renderPrimaryAction!()}
              {hasSecondaryAction && renderSecondaryAction!()}
            </span>
          )}
        </span>
        {dismissible && (
          <span css={styles?.closeButton}>
            <CloseButton
              size="small"
              placement="static"
              screenReaderLabel={closeButtonLabel}
              onClick={onDismiss}
            />
          </span>
        )}
      </View>
    )
  }
)

Banner.displayName = 'Banner'

export default Banner
export { Banner }
