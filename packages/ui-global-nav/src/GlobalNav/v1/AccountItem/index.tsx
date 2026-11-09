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
import {
  AccessibleContent,
  ScreenReaderContent
} from '@instructure/ui-a11y-content'
import { Avatar } from '@instructure/ui-avatar/latest'
import { Badge } from '@instructure/ui-badge/latest'
import { SettingsInstUIIcon } from '@instructure/ui-icons'
import { Pill } from '@instructure/ui-pill/latest'
import { Tooltip } from '@instructure/ui-tooltip/latest'

import type { AccountItemProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.AccountItem
---
**/
const AccountItem = (props: AccountItemProps) => {
  const { account, collapsed, open, panelId, onActivate, elementRef } = props
  const current = !!account.current

  const styles = useStyleNew({
    generateStyle,
    params: { collapsed, current, open },
    componentId: 'MainNavAccountItem'
  })

  const badgeCount = account.badgeCount ?? 0
  const badgeLabel =
    typeof account.badgeLabel === 'function'
      ? account.badgeLabel(badgeCount)
      : account.badgeLabel
  const formatBadge = (formattedCount: string) =>
    badgeLabel ? (
      <AccessibleContent alt={badgeLabel}>{formattedCount}</AccessibleContent>
    ) : (
      formattedCount
    )

  const avatar = (
    <Avatar name={account.name} src={account.avatarSrc} size="small" />
  )

  const content = collapsed ? (
    <>
      <ScreenReaderContent>
        {[account.label, account.name, account.userType]
          .filter(Boolean)
          .join(' ')}
      </ScreenReaderContent>
      {badgeCount > 0 ? (
        <Badge count={badgeCount} formatOutput={formatBadge}>
          {avatar}
        </Badge>
      ) : (
        avatar
      )}
    </>
  ) : (
    <>
      {/* the panel heading, then the visible name and role, form the accessible name */}
      <ScreenReaderContent>{account.label}</ScreenReaderContent>
      <span css={styles?.avatar}>{avatar}</span>
      <span css={styles?.name}>{account.name}</span>
      {account.userType && (
        <span css={styles?.pill}>
          <Pill color="info">{account.userType}</Pill>
        </span>
      )}
      <span css={styles?.end}>
        {badgeCount > 0 && (
          <Badge standalone count={badgeCount} formatOutput={formatBadge} />
        )}
        <SettingsInstUIIcon />
      </span>
    </>
  )

  const element = (
    <button
      type="button"
      ref={elementRef}
      css={styles?.item}
      aria-expanded={open}
      aria-controls={panelId}
      aria-current={current ? 'page' : undefined}
      onClick={onActivate}
    >
      {content}
    </button>
  )

  return collapsed ? (
    <Tooltip renderTip={account.name} placement="end">
      {/* Tooltip overwrites the aria-expanded of its trigger, so the span is the trigger */}
      <span css={styles?.tooltipTrigger}>{element}</span>
    </Tooltip>
  ) : (
    element
  )
}

export default AccountItem
export { AccountItem }
