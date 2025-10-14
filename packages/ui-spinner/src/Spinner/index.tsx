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

import { useState, useEffect, useId, forwardRef } from 'react'

import { useStyle } from '@instructure/emotion'
import { callRenderProp, omitProps } from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { SpinnerProps } from './props'
import { allowedProps } from './props'

/**
---
category: components
---
**/
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  const {
    size = 'medium',
    variant = 'default',
    delay,
    renderTitle,
    margin,
    // elementRef,
    themeOverride
  } = props

  const [shouldRender, setShouldRender] = useState(!delay)
  const titleId = useId()

  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: {
      size,
      variant,
      themeOverride,
      margin
    },
    componentId: 'Spinner',
    displayName: 'Spinner'
  })

  useEffect(() => {
    if (delay) {
      const delayTimeout = setTimeout(() => {
        setShouldRender(true)
      }, delay)

      return () => clearTimeout(delayTimeout)
    }
    return undefined
  }, [delay])

  const renderSpinner = () => {
    const hasTitle = renderTitle
    error(
      !!hasTitle,
      '[Spinner] The renderTitle prop is necessary for screen reader support.'
    )

    const passthroughProps = omitProps(props, allowedProps)

    return (
      <div {...passthroughProps} css={styles?.spinner} ref={ref}>
        <svg
          css={styles?.circle}
          role="img"
          aria-labelledby={titleId}
          focusable="false"
        >
          <title id={titleId}>{callRenderProp(renderTitle)}</title>
          <g role="presentation">
            {variant !== 'inverse' && (
              <circle
                css={styles?.circleTrack}
                cx="50%"
                cy="50%"
                r={styles?.radius as string}
              />
            )}
            <circle
              css={styles?.circleSpin}
              cx="50%"
              cy="50%"
              r={styles?.radius as string}
            />
          </g>
        </svg>
      </div>
    )
  }

  return shouldRender ? renderSpinner() : null
})

Spinner.displayName = 'Spinner'

export default Spinner
export { Spinner }
