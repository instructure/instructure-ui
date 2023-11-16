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

import React from 'react'

import { Drilldown } from '@instructure/ui-drilldown'
import {
  IconQuestionLine,
  IconAlertsLine,
  IconConfigureLine,
  IconSearchLine,
  IconDiscussionLine,
  IconDashboardLine
} from '@instructure/ui-icons'

import type { TopNavBarBrandProps } from '../TopNavBarBrand/props'
import type { TopNavBarActionItemsProps } from '../TopNavBarActionItems/props'
import type { TopNavBarMenuItemsProps } from '../TopNavBarMenuItems/props'
import type { TopNavBarUserProps } from '../TopNavBarUser/props'
import type { TopNavBarItemProps, ItemChild } from '../TopNavBarItem/props'
import type { TopNavBarLayoutProps } from '../TopNavBarLayout/props'

import { TopNavBarContext } from '../TopNavBarContext'
import type { TopNavBarContextType } from '../TopNavBarContext'

import { TopNavBar } from '../index'
import { elevateIcon, elevateLogo, elevateLogoInverse } from './exampleSvgFiles'
import { Breadcrumb } from '@instructure/ui-breadcrumb'

type ChildrenFuncProps = {
  currentLayout: TopNavBarContextType['layout']
  inverseColor: TopNavBarContextType['inverseColor']
}

type VariantConfig = Partial<ChildrenFuncProps> & {
  hideActionsUserSeparator?: boolean
  hasAlternativeTitle?: boolean
  hasRenderInPlaceDialogConfig?: boolean
  brandProps?: Partial<TopNavBarBrandProps>
  hasBrandNameBackground?: boolean
  hasRenderBreadcrumb?: boolean
  currentPageId?: string
  menuItemsWithSubmenu?: boolean
  menuItemsCustomIdList?: string[]
  menuItemsProps?: Partial<TopNavBarMenuItemsProps>
  menuItemsItemProps?:
    | Partial<TopNavBarItemProps>
    | ((id: string, idx: number) => Partial<TopNavBarItemProps>)
  menuItemsCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  actionItemsCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  actionItemsProps?: Partial<TopNavBarActionItemsProps>
  actionItemsItemProps?:
    | Partial<TopNavBarItemProps>
    | ((id: string, idx: number) => Partial<TopNavBarItemProps>)
  userVariant?: 'avatar' | 'default' | 'button'
  userWithAvatar?: boolean
  userWithSubmenu?: boolean
  userId?: string
  userProps?: Partial<TopNavBarUserProps>
  userItemProps?: Partial<TopNavBarItemProps>
}

const avatarExample = {
  avatarName: 'User Name',
  avatarSrc:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}

const itemSubmenuExample = (
  <Drilldown rootPageId="root">
    <Drilldown.Page id="root">
      <Drilldown.Option id="linkExampleOption1" href="/#One">
        Link One
      </Drilldown.Option>
      <Drilldown.Option id="linkExampleOption2" href="/#Two">
        Link Two
      </Drilldown.Option>
      <Drilldown.Option id="linkExampleOption3" href="/#Three">
        Link Three
      </Drilldown.Option>
    </Drilldown.Page>
  </Drilldown>
)

const getCustomPopoverConfig = (
  inverseColor?: ChildrenFuncProps['inverseColor'],
  extraProps: Partial<TopNavBarItemProps['customPopoverConfig']> = {}
): TopNavBarItemProps['customPopoverConfig'] => ({
  children: getCustomPopoverContent(!inverseColor),
  color: inverseColor ? 'primary-inverse' : 'primary',
  isShowingContent: true,
  placement: 'bottom center',
  ...extraProps
})

const getCustomPopoverContent = (
  inverseColor?: ChildrenFuncProps['inverseColor']
) => (
  <div
    style={{
      color: inverseColor ? 'black' : 'white',
      padding: '0 0.5rem'
    }}
  >
    dialog content
  </div>
)

const getInPlaceDialogConfig = (
  inverseColor?: ChildrenFuncProps['inverseColor'],
  extraProps: Partial<
    TopNavBarLayoutProps['smallViewportConfig']['renderInPlaceDialogConfig']
  > = {}
) => ({
  open: true,
  onClose: () => {},
  closeButtonLabel: 'Close Search and return to Navigation',
  returnFocusElement: () => document.getElementById('Search'),
  shouldCloseOnEscape: true,
  shouldCloseOnDocumentClick: false,
  shouldContainFocus: false,
  content: () => getCustomPopoverContent(inverseColor),
  ...extraProps
})

const SmallViewportModeWrapper = (
  props: {
    children: React.ReactNode
  } & TopNavBarContextType
) => {
  return (
    <TopNavBarContext.Provider
      value={{
        layout: props.layout || 'smallViewport',
        inverseColor:
          typeof props.inverseColor === 'undefined' ? false : props.inverseColor
      }}
    >
      {props.children}
    </TopNavBarContext.Provider>
  )
}
SmallViewportModeWrapper.defaultProps = {
  layout: 'smallViewport',
  inverseColor: false
}

const getBrand = (config: VariantConfig = {}) => {
  const logo = config.inverseColor ? elevateLogoInverse : elevateLogo
  const nameBackground = !config.hasBrandNameBackground
    ? undefined
    : config.inverseColor
    ? '#F5F5F5'
    : '#2D3B45'

  return (
    <TopNavBar.Brand
      screenReaderLabel="Brand name"
      renderName={logo}
      renderIcon={elevateIcon}
      iconBackground="#0097D3"
      nameBackground={nameBackground}
      href="/#TopNavBar"
      {...config.brandProps}
    />
  )
}

const getMenuItems = (config: VariantConfig = {}) => {
  const items = config.menuItemsCustomIdList || [
    'Overview',
    'Admin',
    'Settings',
    'Maps',
    'Assessments',
    'Community'
  ]
  const count =
    typeof config.menuItemsCount !== 'undefined' ? config.menuItemsCount : 6
  const itemsSubset = items.slice(0, count)

  return (
    <TopNavBar.MenuItems
      listLabel="Page navigation"
      currentPageId={config.currentPageId}
      renderHiddenItemsMenuTriggerLabel={(hiddenChildrenCount) =>
        `${hiddenChildrenCount} More`
      }
      {...config.menuItemsProps}
    >
      {itemsSubset.map((item, idx) => {
        const itemProps =
          typeof config.menuItemsItemProps === 'function'
            ? config.menuItemsItemProps(item, idx)
            : config.menuItemsItemProps
        return (
          <TopNavBar.Item
            key={item}
            id={item}
            href={config.menuItemsWithSubmenu ? undefined : '/#TopNavBar'}
            renderSubmenu={
              config.menuItemsWithSubmenu ? itemSubmenuExample : undefined
            }
            {...itemProps}
          >
            {itemProps?.children || item}
          </TopNavBar.Item>
        )
      })}
    </TopNavBar.MenuItems>
  )
}

const getActionItems = (config: VariantConfig = {}) => {
  const items = [
    { label: 'Search', icon: IconSearchLine },
    { label: 'Info', icon: IconQuestionLine },
    { label: 'Alerts', icon: IconAlertsLine },
    { label: 'Discussions', icon: IconDiscussionLine },
    { label: 'Dashboard', icon: IconDashboardLine },
    { label: 'Settings', icon: IconConfigureLine }
  ]
  const count =
    typeof config.actionItemsCount !== 'undefined' ? config.actionItemsCount : 3
  const itemsSubset = items.slice(0, count)

  return (
    <TopNavBar.ActionItems
      {...config.actionItemsProps}
      listLabel={config.actionItemsProps?.listLabel || 'Actions'}
      renderHiddenItemsMenuTriggerLabel={
        config.actionItemsProps?.renderHiddenItemsMenuTriggerLabel ||
        ((hiddenChildrenCount) => `${hiddenChildrenCount} more actions`)
      }
    >
      {itemsSubset.map((item, idx) => {
        const itemProps =
          typeof config.actionItemsItemProps === 'function'
            ? config.actionItemsItemProps(item.label, idx)
            : config.actionItemsItemProps
        return (
          <TopNavBar.Item
            key={item.label}
            id={item.label}
            renderIcon={item.icon}
            variant={'icon'}
            href="/#TopNavBar"
            customPopoverConfig={
              config.hasRenderInPlaceDialogConfig && item.label === 'Search'
                ? getCustomPopoverConfig(config.inverseColor)
                : undefined
            }
            {...itemProps}
          >
            {itemProps?.children || item.label}
          </TopNavBar.Item>
        )
      })}
    </TopNavBar.ActionItems>
  )
}

const getUser = (config: VariantConfig = {}) => {
  return (
    <TopNavBar.User {...config.userProps}>
      {config.userProps && 'children' in config.userProps ? (
        (config.userProps?.children as ItemChild)
      ) : (
        <TopNavBar.Item
          id={config.userId || 'User'}
          href={config.userWithSubmenu ? undefined : '/#TopNavBar'}
          variant={config.userVariant || 'default'}
          renderAvatar={config.userWithAvatar ? avatarExample : undefined}
          renderSubmenu={
            config.userWithSubmenu ? itemSubmenuExample : undefined
          }
          {...config.userItemProps}
        >
          {config.userItemProps?.children ||
            (config.userVariant === 'button' ? 'Log In/Register' : 'User Name')}
        </TopNavBar.Item>
      )}
    </TopNavBar.User>
  )
}

const getBreadcrumb = (_config: VariantConfig = {}) => {
  return (
    <TopNavBar.Breadcrumb>
      <Breadcrumb label="You are here">
        <Breadcrumb.Link>Course page 1</Breadcrumb.Link>
        <Breadcrumb.Link>Course page 2</Breadcrumb.Link>
        <Breadcrumb.Link>Course page 3</Breadcrumb.Link>
      </Breadcrumb>
    </TopNavBar.Breadcrumb>
  )
}

const getLayoutProps = (
  props: ChildrenFuncProps,
  config: VariantConfig = {}
): TopNavBarLayoutProps => {
  return {
    desktopConfig: {
      hideActionsUserSeparator: config.hideActionsUserSeparator
    },
    smallViewportConfig: {
      dropdownMenuToggleButtonLabel: 'Toggle Menu',
      dropdownMenuLabel: 'Main Menu',
      alternativeTitle: config.hasAlternativeTitle ? 'Page title' : undefined,
      renderInPlaceDialogConfig: config.hasRenderInPlaceDialogConfig
        ? getInPlaceDialogConfig(props.inverseColor)
        : undefined
    },
    renderBrand: config.hasRenderBreadcrumb
      ? undefined
      : getBrand({ ...props, ...config }),
    renderMenuItems: config.hasRenderBreadcrumb
      ? undefined
      : getMenuItems({ ...props, ...config }),
    renderActionItems: getActionItems({ ...props, ...config }),
    renderUser: getUser({ ...props, ...config }),
    renderBreadcrumb: config.hasRenderBreadcrumb
      ? getBreadcrumb({ ...props, ...config })
      : undefined
  }
}

export {
  avatarExample,
  itemSubmenuExample,
  SmallViewportModeWrapper,
  getCustomPopoverConfig,
  getCustomPopoverContent,
  getInPlaceDialogConfig,
  getBrand,
  getMenuItems,
  getActionItems,
  getUser,
  getLayoutProps,
  getBreadcrumb
}
export type { VariantConfig, ChildrenFuncProps }
