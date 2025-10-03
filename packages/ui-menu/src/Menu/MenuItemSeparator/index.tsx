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

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import { withStyle } from '@instructure/emotion'
import { omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuSeparatorProps } from './props'

/**
---
parent: Menu
id: Menu.Separator
---
@module MenuItemSeparator
**/
const MenuItemSeparatorComponent = forwardRef<any, MenuSeparatorProps>(
  (props, ref) => {
    const { makeStyles, styles } = props
    const elementRef = useRef<Element | null>(null)

    useEffect(() => {
      makeStyles?.()
    }, [makeStyles])

    useImperativeHandle(
      ref,
      () => ({
        ref: elementRef.current
      }),
      []
    )

    const omittedProps = omitProps(props, allowedProps)

    // role="separator" would fit better here, but it causes NVDA to stop the
    // MenuItem count after it
    return (
      <div
        {...omittedProps}
        role="presentation"
        css={styles?.menuItemSeparator}
        ref={elementRef as any}
      />
    )
  }
)

MenuItemSeparatorComponent.displayName = 'MenuItemSeparator'

const MenuItemSeparator: any = withStyle(
  generateStyle,
  generateComponentTheme
)(MenuItemSeparatorComponent as any)

MenuItemSeparator.componentId = 'Menu.Separator'
;(MenuItemSeparator as any).propTypes = propTypes
;(MenuItemSeparator as any).allowedProps = allowedProps

export default MenuItemSeparator
export { MenuItemSeparator }
