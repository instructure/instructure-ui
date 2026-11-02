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

import { useStyleNew } from '@instructure/emotion'
import {
  AccessibleContent,
  ScreenReaderContent
} from '@instructure/ui-a11y-content'
import { Badge } from '@instructure/ui-badge/latest'
import { ChevronRightInstUIIcon } from '@instructure/ui-icons'
import { callRenderProp } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip/latest'
import { safeLinkProps } from '@instructure/ui-utils'

import type { MainNavItemProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.MainNavItem
---
**/
const MainNavItem = (props: MainNavItemProps) => {
  const { item, collapsed, open, onSubNavChange } = props
  const current = !!item.current

  const styles = useStyleNew({
    generateStyle,
    params: { collapsed, current, open },
    componentId: 'MainNavItem'
  })

  const label = item.label
  const icon = <span css={styles?.icon}>{callRenderProp(item.icon)}</span>

  const badgeCount = item.badgeCount ?? 0
  const badgeLabel =
    typeof item.badgeLabel === 'function'
      ? item.badgeLabel(badgeCount)
      : item.badgeLabel
  const formatBadge = (formattedCount: string) =>
    badgeLabel ? (
      <AccessibleContent alt={badgeLabel}>{formattedCount}</AccessibleContent>
    ) : (
      formattedCount
    )

  const content = collapsed ? (
    <>
      {/* before the icon, so the name reads the label first and then the badge */}
      <ScreenReaderContent>{label}</ScreenReaderContent>
      {badgeCount > 0 ? (
        <Badge count={badgeCount} formatOutput={formatBadge}>
          {icon}
        </Badge>
      ) : (
        icon
      )}
    </>
  ) : (
    <>
      {icon}
      <span css={styles?.label}>{label}</span>
      {badgeCount > 0 && (
        <Badge standalone count={badgeCount} formatOutput={formatBadge} />
      )}
      {item.subNav && (
        // the icon mirrors itself in RTL
        <span css={styles?.chevron}>
          <ChevronRightInstUIIcon />
        </span>
      )}
    </>
  )

  const isLink = !!item.href && !item.subNav

  let ownProps
  if (item.subNav) {
    const handleClick = (event: MouseEvent<HTMLElement>) => {
      item.onClick?.(event)
      onSubNavChange?.(event, open ? undefined : item.itemID)
    }
    ownProps = {
      type: 'button' as const,
      'aria-expanded': open,
      onClick: handleClick
    }
  } else if (isLink) {
    // drops unsafe hrefs, for example javascript: URLs that would run code on click
    ownProps = {
      ...safeLinkProps({
        href: item.href,
        tag: 'a',
        attr: 'href',
        target: item.elementProps?.target,
        rel: item.elementProps?.rel
      }),
      onClick: item.onClick
    }
  } else {
    ownProps = { type: 'button' as const, onClick: item.onClick }
  }

  // InstUI's own props come last, so the app can't override them
  const mergedProps = {
    ...item.elementProps,
    ...ownProps,
    'aria-current': current ? ('page' as const) : undefined
  }

  let element
  if (isLink) {
    element = (
      <a {...mergedProps} css={styles?.item}>
        {content}
      </a>
    )
  } else {
    element = (
      <button {...mergedProps} css={styles?.item}>
        {content}
      </button>
    )
  }

  return (
    <li>
      {collapsed ? (
        <Tooltip renderTip={label} placement="end">
          {/* Tooltip overwrites the aria-expanded of its trigger, so the span is the trigger */}
          <span css={styles?.tooltipTrigger}>{element}</span>
        </Tooltip>
      ) : (
        element
      )}
    </li>
  )
}

export default MainNavItem
export { MainNavItem }
