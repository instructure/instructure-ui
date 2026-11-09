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
import { Avatar } from '@instructure/ui-avatar/latest'
import { Checkbox } from '@instructure/ui-checkbox/latest'
import { LogOutInstUIIcon } from '@instructure/ui-icons'
import { Pill } from '@instructure/ui-pill/latest'
import { callRenderProp } from '@instructure/ui-react-utils'
import { Text } from '@instructure/ui-text/latest'

import { SubNavItem } from '../SubNavItem/index.js'
import type { AccountPanelProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.AccountPanel
---
**/
const AccountPanel = (props: AccountPanelProps) => {
  const { account } = props
  const { items = [], toggles, logout } = account

  const styles = useStyleNew({
    generateStyle,
    componentId: 'SubNav'
  })

  return (
    <div css={styles?.panel}>
      <div css={styles?.card}>
        <div css={styles?.cardHeader}>
          <Avatar name={account.name} src={account.avatarSrc} />
          {account.userType && <Pill color="info">{account.userType}</Pill>}
        </div>
        <Text weight="bold">{account.name}</Text>
        {account.institution && <Text size="small">{account.institution}</Text>}
      </div>
      <div css={styles?.divider} />
      {items.length > 0 && (
        <ul css={styles?.items}>
          {items.map((item) => (
            <SubNavItem key={item.itemID} item={item} />
          ))}
        </ul>
      )}
      <div css={styles?.footer}>
        {toggles && (
          <div css={styles?.toggles}>
            <h3 css={styles?.togglesTitle}>
              <Text weight="bold">{toggles.label}</Text>
            </h3>
            <ul css={styles?.items}>
              {toggles.items.map((toggle) => (
                <li key={toggle.itemID}>
                  <Checkbox
                    variant="toggle"
                    size="small"
                    labelPlacement="start-stretch"
                    label={
                      <span css={styles?.toggleLabel}>
                        {callRenderProp(toggle.icon)}
                        {toggle.label}
                      </span>
                    }
                    checked={toggle.checked}
                    disabled={toggle.disabled}
                    onChange={(event) =>
                      toggle.onChange(event, event.target.checked)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {logout && (
          <ul css={styles?.items}>
            <SubNavItem
              logout
              item={{ itemID: 'logout', icon: <LogOutInstUIIcon />, ...logout }}
            />
          </ul>
        )}
      </div>
    </div>
  )
}

export default AccountPanel
export { AccountPanel }
