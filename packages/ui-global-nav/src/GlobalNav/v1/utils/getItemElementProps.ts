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

import type { MouseEvent } from 'react'

import { safeLinkProps } from '@instructure/ui-utils'

import type { GlobalNavSubNavItem } from '../props.js'

type DisclosureProps = {
  'aria-expanded': boolean
  'aria-controls'?: string
}

/**
 * ---
 * private: true
 * ---
 * Returns whether the item renders as a link, and the props of its link or button
 */
const getItemElementProps = (
  item: GlobalNavSubNavItem,
  onActivate?: (event: MouseEvent<HTMLElement>) => void,
  disclosureProps?: DisclosureProps
) => {
  const isLink = !!item.href && !item.subNav

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    item.onClick?.(event)
    onActivate?.(event)
  }

  const ownProps = isLink
    ? {
        // drops unsafe hrefs, for example javascript: URLs that would run code on click
        ...safeLinkProps({
          href: item.href,
          tag: 'a',
          attr: 'href',
          target: item.elementProps?.target,
          rel: item.elementProps?.rel
        }),
        onClick: handleClick
      }
    : { type: 'button' as const, onClick: handleClick, ...disclosureProps }

  return {
    isLink,
    // InstUI's own props come last, so the app can't override them
    props: {
      ...item.elementProps,
      ...ownProps,
      'aria-current': item.current ? ('page' as const) : undefined
    }
  }
}

export default getItemElementProps
export { getItemElementProps }
