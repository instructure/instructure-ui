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

import { useStyleNew } from '@instructure/emotion'
import { passthroughProps } from '@instructure/ui-react-utils'
import { warn } from '@instructure/console'
import { Button, CloseButton } from '@instructure/ui-buttons/latest'
import { Heading } from '@instructure/ui-heading/latest'
import { Text } from '@instructure/ui-text/latest'
import { DiamondInstUIIcon } from '@instructure/ui-icons'

import generateStyle from './styles.js'

import type { BannerProps } from './props'

/**
---
category: components
---

A Banner surfaces a short, prominent message -- typically an announcement
or a promotion -- with an optional header, an icon, a dismiss control, and
a call-to-action button.

```js
---
type: example
---
<Banner>Your assignments were graded.</Banner>
```
**/
const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      color = 'violet',
      density = 'relaxed',
      header,
      children,
      icon,
      isDismissible = false,
      onDismiss,
      closeButtonLabel,
      ctaText,
      onCtaClick,
      themeOverride,
      ...rest
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

    warn(
      !isDismissible || !!closeButtonLabel,
      '[Banner] `closeButtonLabel` should be provided whenever `isDismissible` is `true` so the dismiss button has an accessible label.'
    )

    const showCloseButton = isDismissible && !!onDismiss
    const showCta = !!ctaText && !!onCtaClick

    const iconSize = density === 'compact' ? 'sm' : 'md'
    const defaultIcon = <DiamondInstUIIcon size={iconSize} color="onColor" />
    const resolvedIcon = icon ?? defaultIcon

    return (
      <div
        {...passthroughProps(rest)}
        css={styles?.banner}
        ref={ref}
        data-cid="Banner"
      >
        {showCloseButton && (
          <div css={styles?.closeButton}>
            <CloseButton
              size="small"
              screenReaderLabel={closeButtonLabel ?? ''}
              onClick={() => onDismiss?.()}
            />
          </div>
        )}

        {resolvedIcon && (
          <div css={styles?.iconSwatch}>
            <div css={styles?.icon}>{resolvedIcon}</div>
          </div>
        )}

        <div css={styles?.content}>
          {header && (
            <Heading
              level="h3"
              variant={
                density === 'compact' ? 'titleCardMini' : 'titleCardRegular'
              }
              color="inherit"
            >
              {header}
            </Heading>
          )}
          <Text
            variant={density === 'compact' ? 'contentSmall' : 'content'}
            color="inherit"
          >
            {children}
          </Text>
          {showCta && (
            <div css={styles?.cta}>
              <Button
                size="small"
                color="primary-inverse"
                onClick={() => onCtaClick?.()}
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Banner.displayName = 'Banner'

export default Banner
export { Banner }
