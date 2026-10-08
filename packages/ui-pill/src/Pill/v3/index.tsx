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

import { View } from '@instructure/ui-view/latest'
import { passthroughProps } from '@instructure/ui-react-utils'
import { renderIconWithProps } from '@instructure/ui-icons'

import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import type { PillProps } from './props'
import { pillSizeToIconSize } from './props.js'

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
    size = 'small',
    elementRef,
    margin,
    statusLabel,
    renderIcon,
    themeOverride,
    ...rest
  } = props

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { color, size },
    componentId: 'Pill',
    displayName: 'Pill'
  })

  return (
    <View
      {...passthroughProps(rest)}
      as={as}
      elementRef={elementRef}
      margin={margin}
      padding="0"
      background="transparent"
      borderRadius="pill"
      borderWidth="0"
      display="inline-block"
      position="relative"
      data-cid="Pill"
    >
      <div css={styles?.pill}>
        {renderIcon && (
          <div css={styles?.icon}>
            {renderIconWithProps(
              renderIcon,
              pillSizeToIconSize[size],
              undefined
            )}
          </div>
        )}
        <div css={styles?.text}>
          {statusLabel && (
            <span css={styles?.status}>{statusLabel.concat(':')}</span>
          )}
          {children}
        </div>
      </div>
    </View>
  )
}

Pill.displayName = 'Pill'

export default Pill
export { Pill }
export type { PillProps }
