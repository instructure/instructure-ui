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
import { omitProps } from '@instructure/ui-react-utils'

import type { GlobalNavProps } from './props.js'
import { allowedProps } from './props.js'
import generateStyle from './styles.js'

/**
---
category: components
isWIP: true
---
**/
const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  (props: GlobalNavProps, ref) => {
    const { label, themeOverride } = props

    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      componentId: 'GlobalNav',
      displayName: 'GlobalNav'
    })

    return (
      <nav
        {...omitProps(props, allowedProps)}
        ref={ref}
        aria-label={label}
        css={styles?.globalNav}
      />
    )
  }
)

GlobalNav.displayName = 'GlobalNav'

export default GlobalNav
export { GlobalNav }
