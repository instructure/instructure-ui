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

/** @jsx jsx */
import React, { Component } from 'react'

import {
  omitProps,
  withDeterministicId,
  callRenderProp
} from '@instructure/ui-react-utils'
import { px } from '@instructure/ui-utils'
import { warn } from '@instructure/console'
import { testable } from '@instructure/ui-testable'
import {
  getBoundingClientRect,
  requestAnimationFrame
} from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'

import { withStyle, jsx, Global } from '@instructure/emotion'

import { Tray } from '@instructure/ui-tray'
import {
  IconXLine,
  IconHamburgerLine,
  IconArrowOpenDownSolid,
  IconArrowOpenUpSolid
} from '@instructure/ui-icons'
import { Avatar } from '@instructure/ui-avatar'
import { Dialog } from '@instructure/ui-dialog'
import { Drilldown } from '@instructure/ui-drilldown'
import type { DrilldownPageChildren } from '@instructure/ui-drilldown'

import { TopNavBarItem } from '../../TopNavBarItem'
import type { ItemChild, TopNavBarItemProps } from '../../TopNavBarItem/props'
import {
  mapItemsForDrilldown,
  renderMappedItemDrilldownSubpages,
  renderMappedItemsAsDrilldownOptions
} from '../../utils/mapItemsForDrilldown'
import type { RenderOptionContent } from '../../utils/mapItemsForDrilldown'

import { TopNavBarContext } from '../../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutState,
  TopNavBarSmallViewportLayoutStyleProps
} from './props'

/**
---
private: true
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBarSmallViewportLayout extends Component<
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutState
> {
  static readonly componentId = 'TopNavBar.SmallViewportLayout'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLElement | null = null

  private readonly _trayContainerId: string
  private readonly _trayId: string
  private readonly _drilldownId: string
  private readonly _menuTriggerId: string
  private readonly _menuId: string
  private readonly _inPlaceDialogId: string
  private readonly _inPlaceDialogCloseButtonId: string
  private readonly _separatorId: string

  private _raf: RequestAnimationFrameType[] = []

  handleRef = (el: HTMLElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TopNavBarSmallViewportLayoutProps) {
    super(props)

    this._trayContainerId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-trayContainer'
    )
    this._trayId = props.deterministicId!('TopNavBarSmallViewportLayout-tray')
    this._menuId = props.deterministicId!('TopNavBarSmallViewportLayout-menu')
    this._menuTriggerId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-menuTrigger'
    )
    this._drilldownId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-drilldown'
    )
    this._inPlaceDialogId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-inPlaceDialog'
    )
    this._inPlaceDialogCloseButtonId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-inPlaceDialogCloseButton'
    )
    this._separatorId = props.deterministicId!(
      'TopNavBarSmallViewportLayout-separator'
    )

    this.state = {
      isDropdownMenuOpen: false,
      isDropdownMenuVisible: false,
      menuBottomPosition: px(props.styles?.navbarHeight || 0)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
    this.updateMenuBottomPosition()
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentWillUnmount() {
    this._raf.forEach((request) => request.cancel())

    if (this.state.isDropdownMenuOpen) {
      this.toggleDropdownMenu()
    }
  }

  get makeStylesVariables(): TopNavBarSmallViewportLayoutStyleProps {
    return {
      isDropdownMenuVisible: this.state.isDropdownMenuVisible,
      drilldownId: this._drilldownId,
      trayId: this._trayId,
      menuBottomPosition: this.state.menuBottomPosition,
      inverseColor: this.context.inverseColor
    }
  }

  hasBrandBlock(
    renderBrand: TopNavBarSmallViewportLayoutProps['renderBrand']
  ): renderBrand is NonNullable<
    TopNavBarSmallViewportLayoutProps['renderBrand']
  > {
    return !!renderBrand && !!renderBrand.props.renderIcon
  }

  hasMenuItemsBlock(
    renderMenuItems: TopNavBarSmallViewportLayoutProps['renderMenuItems']
  ): renderMenuItems is NonNullable<
    TopNavBarSmallViewportLayoutProps['renderMenuItems']
  > {
    return (
      !!renderMenuItems &&
      React.Children.count(renderMenuItems.props.children) > 0
    )
  }

  hasActionItemsBlock(
    renderActionItems: TopNavBarSmallViewportLayoutProps['renderActionItems']
  ): renderActionItems is NonNullable<
    TopNavBarSmallViewportLayoutProps['renderActionItems']
  > {
    return (
      !!renderActionItems &&
      React.Children.count(renderActionItems.props.children) > 0
    )
  }

  hasUserBlock(
    renderUser: TopNavBarSmallViewportLayoutProps['renderUser']
  ): renderUser is NonNullable<
    TopNavBarSmallViewportLayoutProps['renderUser']
  > {
    return !!renderUser && React.Children.count(renderUser.props.children) > 0
  }

  get hasSubmenu() {
    return (this.dropdownMenuContent || []).length > 0
  }

  get hasBreadcrumbBlock() {
    const { renderBreadcrumb } = this.props
    return (
      !!renderBreadcrumb &&
      React.Children.count(renderBreadcrumb.props.children) > 0
    )
  }

  get isInPlaceDialogOpen() {
    return this.props.renderInPlaceDialogConfig?.open
  }

  get mappedUserOptions() {
    const { renderUser } = this.props

    if (!this.hasUserBlock(renderUser)) {
      return []
    }

    const userChildren = React.Children.toArray(
      renderUser.props.children
    ) as ItemChild[]

    return mapItemsForDrilldown(userChildren, {
      renderOptionContent: this.renderOptionContent
    })
  }

  get mappedMenuItemsOptions() {
    const { renderMenuItems } = this.props

    if (!this.hasMenuItemsBlock(renderMenuItems)) {
      return []
    }

    const menuItemsChildren = React.Children.toArray(
      renderMenuItems.props.children
    ) as ItemChild[]

    return mapItemsForDrilldown(menuItemsChildren, {
      renderOptionContent: this.renderOptionContent,
      currentPageId: renderMenuItems.props.currentPageId
    })
  }

  get extractDrilldownSubpages() {
    return renderMappedItemDrilldownSubpages([
      ...this.mappedUserOptions,
      ...this.mappedMenuItemsOptions
    ])
  }

  updateMenuBottomPosition() {
    const boundingRect = getBoundingClientRect(this.ref)
    this.setState({
      menuBottomPosition: boundingRect.top + boundingRect.height
    })
  }

  toggleDropdownMenu() {
    const { onDropdownMenuToggle } = this.props
    const { isDropdownMenuOpen } = this.state

    if (!isDropdownMenuOpen) {
      this.updateMenuBottomPosition()
    }

    if (typeof onDropdownMenuToggle === 'function') {
      onDropdownMenuToggle(!isDropdownMenuOpen)
    }

    this.setState({ isDropdownMenuOpen: !isDropdownMenuOpen })
  }

  renderOptionContent: RenderOptionContent = (children, itemProps) => {
    const { styles } = this.props
    const { status, renderAvatar } = itemProps

    let content = children
    let optionStyle =
      status === 'active'
        ? styles?.dropdownMenuOptionActive
        : styles?.dropdownMenuOption

    if (renderAvatar) {
      const { avatarName, avatarSrc, avatarAlt } = renderAvatar

      const label =
        avatarAlt ||
        (typeof children === 'string' ? (children as string) : undefined)

      optionStyle = styles?.dropdownMenuOptionWithAvatar

      content = (
        <React.Fragment>
          <Avatar
            name={avatarName}
            src={avatarSrc}
            alt={label}
            size="small"
            margin="0 small 0 0"
            role="presentation"
            aria-hidden="true"
          />
          {children}
        </React.Fragment>
      )
    }

    return <span css={optionStyle}>{content}</span>
  }

  renderMenuTrigger() {
    const {
      dropdownMenuToggleButtonLabel,
      dropdownMenuToggleButtonTooltip,
      renderBrand,
      alternativeTitle,
      styles
    } = this.props
    const { isDropdownMenuOpen } = this.state

    let menuTrigger: React.ReactNode

    const menuTriggerStyle = [
      styles?.menuTrigger,
      ...(alternativeTitle ? [styles?.alternativeTitleContainer] : [])
    ]

    if (!this.hasSubmenu) {
      menuTrigger = null

      if (alternativeTitle) {
        warn(
          false,
          'There are no menu items or user menu to display in the <TopNavBar> dropdown menu! The menu trigger and the alternative title will not display.'
        )
      }
    } else {
      const itemProps: Omit<TopNavBarItemProps, 'children'> = {
        id: this._menuTriggerId,
        onClick: () => {
          this.toggleDropdownMenu()
        },
        tooltip: dropdownMenuToggleButtonTooltip,
        themeOverride: { itemSpacing: '0.375rem' },
        'aria-haspopup': 'menu',
        'aria-expanded': isDropdownMenuOpen
      }

      const alternativeTitleIconProps = {
        size: 'x-small' as const,
        style: { marginInlineEnd: '0.5em' }
      }

      menuTrigger = (
        <div css={menuTriggerStyle}>
          {alternativeTitle ? (
            <TopNavBarItem
              {...itemProps}
              aria-label={dropdownMenuToggleButtonLabel}
            >
              {isDropdownMenuOpen ? (
                <IconArrowOpenUpSolid {...alternativeTitleIconProps} />
              ) : (
                <IconArrowOpenDownSolid {...alternativeTitleIconProps} />
              )}
              {alternativeTitle}
            </TopNavBarItem>
          ) : (
            <TopNavBarItem
              {...itemProps}
              variant="icon"
              renderIcon={
                isDropdownMenuOpen ? <IconXLine /> : <IconHamburgerLine />
              }
            >
              {dropdownMenuToggleButtonLabel}
            </TopNavBarItem>
          )}
        </div>
      )
    }

    return (
      <div css={styles?.menuTriggerContainer}>
        {menuTrigger}

        {this.hasBrandBlock(renderBrand) && !alternativeTitle && (
          <div css={styles?.brandContainer}>{renderBrand}</div>
        )}
      </div>
    )
  }

  get dropdownMenuContent() {
    const { renderUser, renderMenuItems } = this.props
    const hasMenuItems = this.hasMenuItemsBlock(renderMenuItems)
    const hasUser = this.hasUserBlock(renderUser)

    let pageChildren: DrilldownPageChildren[] = []

    if (hasUser) {
      pageChildren = renderMappedItemsAsDrilldownOptions(this.mappedUserOptions)

      if (hasMenuItems) {
        pageChildren.push(
          <Drilldown.Separator id={this._separatorId} key={this._separatorId} />
        )
      }
    }

    if (hasMenuItems) {
      pageChildren = [
        ...pageChildren,
        ...renderMappedItemsAsDrilldownOptions(this.mappedMenuItemsOptions)
      ]
    }

    return pageChildren.length ? pageChildren : undefined
  }

  renderDropdownMenu() {
    const { dropdownMenuLabel, onDropdownMenuSelect } = this.props

    return (
      <Drilldown
        id={this._drilldownId}
        rootPageId={this._menuId}
        label={dropdownMenuLabel}
        height="100%"
        width="100%"
        onSelect={(e, args) => {
          if (typeof onDropdownMenuSelect === 'function') {
            onDropdownMenuSelect(e, args)
          }

          if (
            (args.selectedOption.props.shouldCloseOnClick === 'auto' &&
              !!args.selectedOption.props.href) ||
            args.selectedOption.props.shouldCloseOnClick === 'always'
          ) {
            this.toggleDropdownMenu()
          }
        }}
      >
        {[
          <Drilldown.Page id={this._menuId} key={this._menuId}>
            {this.dropdownMenuContent}
          </Drilldown.Page>,
          ...this.extractDrilldownSubpages
        ]}
      </Drilldown>
    )
  }

  renderDropdownMenuTray() {
    const { trayMountNode } = this.props

    if (!this.hasSubmenu) {
      return null
    }

    return (
      <Tray
        id={this._trayId}
        label={''}
        role="none"
        open={this.state.isDropdownMenuOpen}
        transitionExit={false}
        onDismiss={() => {
          this.toggleDropdownMenu()
        }}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            this.toggleDropdownMenu()
          }
        }}
        onEnter={() => {
          this.setState({ isDropdownMenuVisible: true })
        }}
        onExited={() => {
          this.setState({ isDropdownMenuVisible: false })
        }}
        shouldCloseOnDocumentClick
        placement="top"
        shadow={false}
        mountNode={
          trayMountNode || document.getElementById(this._trayContainerId)
        }
        defaultFocusElement={() => document.getElementById(this._drilldownId)}
        themeOverride={{ position: 'absolute' }}
      >
        {this.renderDropdownMenu()}
      </Tray>
    )
  }

  renderInPlaceDialog() {
    const { renderInPlaceDialogConfig, styles } = this.props

    if (!renderInPlaceDialogConfig) {
      return null
    }

    const {
      content,
      open,
      onClose,
      closeButtonLabel,
      shouldContainFocus,
      shouldCloseOnEscape,
      shouldCloseOnDocumentClick,
      returnFocusElement
    } = renderInPlaceDialogConfig

    const handleClose = () => {
      if (typeof onClose === 'function') {
        onClose()
      }

      if (returnFocusElement) {
        this._raf.push(
          requestAnimationFrame(() => {
            returnFocusElement()?.focus()
          })
        )
      }
    }

    const dialog = (
      <Dialog
        display="block"
        open={open}
        shouldContainFocus={shouldContainFocus}
        shouldCloseOnEscape={shouldCloseOnEscape}
        shouldCloseOnDocumentClick={shouldCloseOnDocumentClick}
        onDismiss={handleClose}
      >
        <div id={this._inPlaceDialogId} css={styles?.inPlaceDialogContainer}>
          <div css={styles?.inPlaceDialogContainerContent}>
            {callRenderProp(content, { closeInPlaceDialog: handleClose })}
          </div>
          <div css={styles?.inPlaceDialogContainerButton}>
            <TopNavBarItem
              id={this._inPlaceDialogCloseButtonId}
              renderIcon={IconXLine}
              variant="icon"
              onClick={handleClose}
            >
              {closeButtonLabel}
            </TopNavBarItem>
          </div>
        </div>
      </Dialog>
    )

    return dialog
  }

  render() {
    const {
      trayMountNode,
      navLabel,
      renderActionItems,
      renderBreadcrumb,
      styles
    } = this.props

    return (
      <nav
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        aria-label={navLabel}
      >
        <Global styles={styles?.globalStyles} />

        {this.hasBreadcrumbBlock && (
          <div css={styles?.navbar}>{renderBreadcrumb}</div>
        )}

        {!this.hasBreadcrumbBlock && !this.isInPlaceDialogOpen && (
          <div css={styles?.navbar}>
            {this.renderMenuTrigger()}
            {this.hasActionItemsBlock(renderActionItems) && renderActionItems}
          </div>
        )}

        {!this.hasBreadcrumbBlock && this.renderInPlaceDialog()}

        {!this.hasBreadcrumbBlock && !trayMountNode && (
          <div css={styles?.trayContainer} id={this._trayContainerId} />
        )}

        {!this.hasBreadcrumbBlock && this.renderDropdownMenuTray()}
      </nav>
    )
  }
}

export { TopNavBarSmallViewportLayout }
export default TopNavBarSmallViewportLayout
