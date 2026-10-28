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

import type {
  AnchorHTMLAttributes,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent
} from 'react'

import type { ComponentStyle, NewThemeOverrideProp } from '@instructure/emotion'
import type { OtherHTMLAttributes, Renderable } from '@instructure/shared-types'
import type { NewComponentTypes } from '@instructure/ui-themes'

type GlobalNavCountLabel = string | ((count: number) => string)

type GlobalNavElementProps = Pick<
  AnchorHTMLAttributes<HTMLElement>,
  'id' | 'className' | 'target' | 'rel'
> & {
  // object literals typed as HTML attributes reject data-* keys without this
  [key: `data-${string}`]: string | number | boolean | undefined
}

type GlobalNavSubNavItem = {
  /**
   * Identifies the item in `openSubNav` and is its React key, but isn't rendered to the DOM.
   */
  itemID: string
  /**
   * The visible text and accessible name of the item.
   */
  label: string
  /**
   * The URL of the page, ignored for items with a `subNav`.
   */
  href?: string
  /**
   * Called when the user activates the item, also when it opens a deeper level.
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void
  /**
   * Whether the item is the current page, which sets `aria-current="page"`.
   */
  current?: boolean
  /**
   * The deeper level that the item opens as a disclosure button.
   */
  subNav?: GlobalNavSubNav
  /**
   * HTML attributes for the item's link or button: `id`, `className`, `target`, `rel` and `data-*`.
   */
  elementProps?: GlobalNavElementProps
}

type GlobalNavMainNavItem = GlobalNavSubNavItem & {
  /**
   * The icon of the rail item.
   */
  icon: Renderable
  /**
   * The number in the badge, which is hidden when it is 0 or missing.
   */
  badgeCount?: number
  /**
   * Screen reader text of the badge.
   */
  badgeLabel?: GlobalNavCountLabel
}

type GlobalNavSubNav = {
  /**
   * The heading of the panel.
   */
  title: string
  /**
   * The links of the panel.
   */
  items?: GlobalNavSubNavItem[]
  /**
   * Any content, rendered after the items.
   */
  renderContent?: Renderable
  /**
   * Whether the items are loading, which shows a spinner in their place.
   */
  loading?: boolean
  /**
   * Screen reader text of the loading spinner.
   */
  loadingLabel?: string
  /**
   * Whether more items can be loaded, which shows a "load more" button after the items.
   */
  hasMore?: boolean
  /**
   * Called when the user clicks the "load more" button.
   */
  onLoadMore?: (event: SyntheticEvent) => void
  /**
   * Text of the "load more" button.
   */
  loadMoreLabel?: string
}

type GlobalNavLogo = {
  /**
   * The URL of the institution logo. A placeholder shows without it.
   */
  src?: string
  /**
   * The institution name, used as the alternative text of the logo.
   */
  name: string
  /**
   * The URL that the logo links to.
   */
  href?: string
}

type GlobalNavToggle = {
  /**
   * Identifies the toggle and is its React key.
   */
  itemID: string
  /**
   * The icon before the label.
   */
  icon?: Renderable
  /**
   * The visible text and accessible name of the toggle.
   */
  label: string
  /**
   * Whether the toggle is on.
   */
  checked: boolean
  /**
   * Called when the user switches the toggle, with the new `checked` value.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

type GlobalNavAccount = {
  /**
   * Identifies the account panel in `openSubNav`.
   */
  itemID: string
  /**
   * The heading of the account panel.
   */
  label: string
  /**
   * The user's name, shown on the rail item and in the panel.
   */
  name: string
  /**
   * The URL of the user's avatar.
   */
  avatarSrc?: string
  /**
   * The text of the role pill.
   */
  userType?: string
  /**
   * The name of the user's institution.
   */
  institution?: string
  /**
   * The number in the badge of the rail item, which is hidden when it is 0 or missing.
   */
  badgeCount?: number
  /**
   * Screen reader text of the badge.
   */
  badgeLabel?: GlobalNavCountLabel
  /**
   * Whether the panel items are loading.
   */
  loading?: boolean
  /**
   * Screen reader text of the loading spinner.
   */
  loadingLabel?: string
  /**
   * The links of the panel.
   */
  items?: GlobalNavSubNavItem[]
  /**
   * A section of toggles with a heading, for example user interface settings.
   */
  toggles?: {
    label: string
    items: GlobalNavToggle[]
  }
  /**
   * Any content, rendered after the toggles.
   */
  renderContent?: Renderable
  /**
   * The log out button at the end of the panel.
   */
  logout?: {
    label: string
    href?: string
    onClick?: (event: MouseEvent<HTMLElement>) => void
  }
}

type GlobalNavOwnProps = {
  /**
   * Accessible name of the navigation landmark, read by screen readers.
   */
  label: string
  /**
   * Whether the rail is collapsed, a state that the app updates in `onCollapse`.
   */
  collapsed: boolean
  /**
   * Called when the user clicks the collapse button, with the new `collapsed` value.
   */
  onCollapse: (event: SyntheticEvent, collapsed: boolean) => void
  /**
   * Screen reader text and tooltip of the collapse button when the rail is expanded.
   */
  collapseLabel: string
  /**
   * Screen reader text and tooltip of the collapse button when the rail is collapsed.
   */
  expandLabel: string
  /**
   * Screen reader text of the back button in a deeper SubNav level.
   */
  backLabel: string
  /**
   * Screen reader text of the handle that closes the open SubNav.
   */
  closeSubNavLabel: string
  /**
   * The `itemID` of the item or account whose SubNav is open, or `undefined` when none is open.
   */
  openSubNav?: string
  /**
   * Called when the user opens or closes a SubNav, with the `itemID` of the item or `undefined`.
   */
  onSubNavChange?: (event: SyntheticEvent, itemID: string | undefined) => void
  /**
   * The rail items, top to bottom.
   */
  items: GlobalNavMainNavItem[]
  /**
   * The institution logo at the top of the rail.
   */
  logo: GlobalNavLogo
  /**
   * The account item of the rail and its panel.
   */
  account?: GlobalNavAccount
}

type PropKeys = keyof GlobalNavOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type GlobalNavProps = GlobalNavOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['GlobalNav']>> &
  OtherHTMLAttributes<GlobalNavOwnProps>

type GlobalNavStyle = ComponentStyle<'globalNav' | 'rail'>

type MainNavStyle = ComponentStyle<'mainNav' | 'header' | 'items'>

const allowedProps: AllowedPropKeys = [
  'label',
  'collapsed',
  'onCollapse',
  'collapseLabel',
  'expandLabel',
  'backLabel',
  'closeSubNavLabel',
  'openSubNav',
  'onSubNavChange',
  'items',
  'logo',
  'account'
]

export type {
  GlobalNavProps,
  GlobalNavStyle,
  MainNavStyle,
  GlobalNavMainNavItem,
  GlobalNavSubNav,
  GlobalNavSubNavItem,
  GlobalNavLogo,
  GlobalNavAccount,
  GlobalNavToggle,
  GlobalNavCountLabel,
  GlobalNavElementProps
}
export { allowedProps }
