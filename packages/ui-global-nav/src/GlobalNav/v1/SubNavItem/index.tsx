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

import { useStyleNew } from '@instructure/emotion'

import { getItemElementProps } from '../utils/getItemElementProps.js'
import type { SubNavItemProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.SubNavItem
---
**/
const SubNavItem = (props: SubNavItemProps) => {
  const { item, elementRef } = props

  const styles = useStyleNew({
    generateStyle,
    params: { current: !!item.current },
    componentId: 'SubNavItem'
  })

  const { isLink, props: elementProps } = getItemElementProps(item)

  return (
    <li>
      {isLink ? (
        <a {...elementProps} ref={elementRef} css={styles?.item}>
          {item.label}
        </a>
      ) : (
        <button {...elementProps} ref={elementRef} css={styles?.item}>
          {item.label}
        </button>
      )}
    </li>
  )
}

export default SubNavItem
export { SubNavItem }
