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

import { Component, ComponentElement } from 'react'

import {
  callRenderProp,
  matchComponentTypes,
  omitProps,
  passthroughProps,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { warn, error } from '@instructure/console'

import { withStyle, InstUISettingsProvider } from '@instructure/emotion'

import {
  IconArrowOpenDownSolid,
  IconArrowOpenUpSolid
} from '@instructure/ui-icons'
import { Avatar } from '@instructure/ui-avatar'
import { BaseButton } from '@instructure/ui-buttons'
import type { BaseButtonProps } from '@instructure/ui-buttons'
import { Tooltip } from '@instructure/ui-tooltip'
import type { TooltipProps } from '@instructure/ui-tooltip'
import { Popover } from '@instructure/ui-popover'
import type { PopoverProps } from '@instructure/ui-popover'
import { Drilldown } from '@instructure/ui-drilldown'
import type { DrilldownProps } from '@instructure/ui-drilldown'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { TopNavBarContext } from '../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type {
  TopNavBarItemProps,
  TopNavBarItemState,
  TopNavBarItemStyleProps
} from './props'

type BaseButtonElement = ComponentElement<BaseButtonProps, BaseButton>

const navbarStackingDefault = 10000
const submenuStacking = navbarStackingDefault + 1
const tooltipStacking = navbarStackingDefault + 2

/**
---
parent: TopNavBar
id: TopNavBar.Item
---
@module TopNavBarItem
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class TopNavBarItem extends Component<TopNavBarItemProps, TopNavBarItemState> {
  static readonly componentId = 'TopNavBar.Item'

  static allowedProps = allowedProps
  static defaultProps = {
    status: 'default',
    variant: 'default',
    showSubmenuChevron: true,
    shouldCloseOnClick: 'auto'
  } as const

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLDivElement | null = null
  private _itemRef: HTMLButtonElement | HTMLLinkElement | null = null

  private readonly _tooltipContentId: string

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleItemRef = (el: HTMLButtonElement | HTMLLinkElement | null) => {
    const { itemRef } = this.props

    this._itemRef = el

    if (typeof itemRef === 'function') {
      itemRef(el)
    }
  }

  constructor(props: TopNavBarItemProps) {
    super(props)

    this._tooltipContentId = props.deterministicId!('TopNavBarItem-tooltip')

    this.state = {
      isSubmenuOpen: false,
      isPopoverOpen: false,
      isFocused: false
    }
  }

  componentDidMount() {
    const { makeStyles, customPopoverConfig } = this.props

    makeStyles?.(this.makeStylesVariables)

    if (customPopoverConfig && this.isCustomPopoverControlled) {
      this.setState({
        isPopoverOpen: !!customPopoverConfig.isShowingContent
      })
    }
  }

  componentDidUpdate() {
    const { makeStyles, customPopoverConfig } = this.props

    makeStyles?.(this.makeStylesVariables)

    if (
      customPopoverConfig &&
      this.isCustomPopoverControlled &&
      customPopoverConfig.isShowingContent !== this.state.isPopoverOpen
    ) {
      this.setState({
        isPopoverOpen: !!customPopoverConfig.isShowingContent
      })
    }
  }

  get makeStylesVariables(): TopNavBarItemStyleProps {
    const { layout, inverseColor } = this.context
    return { layout, inverseColor }
  }

  get shouldRenderSubmenu() {
    const { renderSubmenu } = this.props

    return !!renderSubmenu && matchComponentTypes(renderSubmenu, [Drilldown])
  }

  get shouldRenderPopover() {
    const { id, renderSubmenu, customPopoverConfig } = this.props

    if (!customPopoverConfig) {
      return false
    }

    if (!customPopoverConfig.children) {
      warn(
        false,
        `Pass the content of the custom Popover as "customPopoverConfig.children" for the item with id: "${id}".`
      )
      return false
    }

    if (customPopoverConfig && renderSubmenu) {
      warn(
        false,
        `TopNavBar.Items are not allowed to have both the "renderSubmenu" and "customPopoverConfig" props. For submenus, pass a Drilldown component via the "renderSubmenu" prop, and only use "customPopoverConfig" for custom features. Item with id: "${id}" will ignore the "customPopoverConfig" prop.`
      )
      return false
    }

    return true
  }

  get isCustomPopoverControlled() {
    const { customPopoverConfig } = this.props

    return (
      customPopoverConfig &&
      typeof customPopoverConfig.isShowingContent !== 'undefined'
    )
  }

  get hasOpenPopover() {
    return this.state.isSubmenuOpen || this.state.isPopoverOpen
  }

  get isDefaultVariant() {
    return (
      this.props.variant === 'default' ||
      this.props.variant === 'forceIconWithLabel'
    )
  }

  get isButtonVariant() {
    return this.props.variant === 'button'
  }

  get isIconVariant() {
    return this.props.variant === 'icon'
  }

  get isAvatarOnlyVariant() {
    return this.props.variant === 'avatar'
  }

  get hasAvatar() {
    const { id, renderIcon, renderAvatar, variant } = this.props
    const hasAvatar = !!renderAvatar

    if (this.isAvatarOnlyVariant && !hasAvatar) {
      warn(
        false,
        `The "renderAvatar" config is required for the 'variant="avatar"' type <TopNavBar.Item> components, but received none for the item with id "${id}".`
      )
      return false
    }

    if (hasAvatar && (renderIcon || variant === 'icon')) {
      warn(
        false,
        `<TopNavBar.Item> components with icons cannot display avatars, so the "renderAvatar" config prop will be ignored for item with id "${id}".`
      )
      return false
    }

    return hasAvatar
  }

  get submenuIcon() {
    if (
      !(this.shouldRenderSubmenu || this.shouldRenderPopover) ||
      !this.props.showSubmenuChevron
    ) {
      return null
    }

    return (
      <span css={this.props.styles?.submenuIcon}>
        {(this.shouldRenderSubmenu && this.state.isSubmenuOpen) ||
        (this.shouldRenderPopover && this.state.isPopoverOpen) ? (
          <IconArrowOpenUpSolid />
        ) : (
          <IconArrowOpenDownSolid />
        )}
      </span>
    )
  }

  get buttonThemeOverride() {
    const { styles } = this.props

    const themeOverride: BaseButtonProps['themeOverride'] = {}

    if (this.isDefaultVariant || this.hasAvatar) {
      themeOverride.mediumPaddingHorizontal = styles?.itemInlinePadding
    }

    if (this.hasAvatar) {
      themeOverride.mediumPaddingTop = '0.125rem'
      themeOverride.mediumPaddingBottom = '0.125rem'
    }

    if (this.isAvatarOnlyVariant && !this.submenuIcon) {
      themeOverride.mediumPaddingHorizontal = '0'
      themeOverride.mediumPaddingTop = '0'
      themeOverride.mediumPaddingBottom = '0'
    }

    return Object.keys(themeOverride).length > 0 ? themeOverride : undefined
  }

  get colorProps(): Pick<BaseButtonProps, 'color' | 'focusColor'> {
    let color: BaseButtonProps['color'] = 'primary-inverse'
    let focusColor: BaseButtonProps['focusColor'] = 'inverse'

    if (this.context.inverseColor) {
      color = 'secondary'
      focusColor = 'info'

      if (this.isButtonVariant) {
        color = 'primary'
      }
    }

    return { color, focusColor }
  }

  get ariaProps(): Pick<
    React.AriaAttributes,
    'aria-haspopup' | 'aria-expanded'
  > {
    let hasPopup: React.AriaAttributes['aria-haspopup']
    let expanded: React.AriaAttributes['aria-expanded']

    if (this.shouldRenderSubmenu) {
      hasPopup = 'menu'
      expanded = this.state.isSubmenuOpen
    }

    if (this.shouldRenderPopover) {
      hasPopup = 'true'
      expanded = this.state.isPopoverOpen
    }

    return { 'aria-haspopup': hasPopup, 'aria-expanded': expanded }
  }

  get itemProps(): BaseButtonProps | null {
    const {
      id,
      as,
      variant,
      href: hrefOriginal,
      onClick: onClickOriginal,
      onMouseOver,
      onMouseOut,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      renderSubmenu,
      status: statusOriginal,
      renderAvatar,
      renderIcon,
      withFocusOutline
    } = this.props

    let href = hrefOriginal
    let onClick = onClickOriginal
    let status = statusOriginal

    if (renderSubmenu) {
      if (href) {
        warn(
          false,
          `TopNavBar.Items with submenus are not allowed to have 'href' property, but received href "${href}" for item with the id: "${id}".`
        )
        href = undefined
      }
      if (onClick) {
        warn(
          false,
          `TopNavBar.Items with submenus are not allowed to have 'onClick' property, but received onClick for item with the id: "${id}".Use the \`onSubmenuToggle\` prop instead. OnClick: ${onClick}`
        )
        onClick = undefined
      }
    }

    if (status === 'active' && !this.isDefaultVariant) {
      warn(
        false,
        `Only \`variant="default"\` <TopNavBar.Item> components can be set to active, but item with id "${id}" has variant: "${variant}".`
      )
      status = 'default'
    }

    if (this.hasAvatar) {
      if (!renderAvatar?.avatarName) {
        error(
          false,
          `The "avatarName" prop is required for for <TopNavBar.Item> components with avatar, but the item with id "${id}" is missing it.`
        )
        return null
      }

      if (status === 'active') {
        warn(
          false,
          `<TopNavBar.Item> components with avatar cannot have "active" status, so the "active" status on the item with id "${id}" will be ignored.`
        )
        status = 'default'
      }
    }

    if (this.isIconVariant) {
      if (!renderIcon) {
        error(
          false,
          `The "renderIcon" prop is required for the \`variant="icon"\` type <TopNavBar.Item> components, but the item with id "${id}" is missing it.`
        )
        return null
      }
    }

    return {
      id,
      as,
      ...this.colorProps,
      ...this.ariaProps,
      size: 'medium',
      withBorder: this.isButtonVariant,
      withBackground: this.isButtonVariant,
      interaction: status === 'disabled' ? 'disabled' : undefined,
      'aria-disabled': status === 'disabled' ? 'true' : undefined,
      shape:
        this.isAvatarOnlyVariant && !this.submenuIcon ? 'circle' : 'rectangle',
      href,
      onClick,
      onMouseOver,
      onMouseOut,
      onFocus: createChainedFunction(onFocus, this.onFocus),
      onBlur: createChainedFunction(onBlur, this.onBlur),
      onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
      onKeyUp,
      renderIcon,
      themeOverride: this.buttonThemeOverride,
      elementRef: (e) => {
        this.handleItemRef(e as HTMLButtonElement | HTMLLinkElement)
      },
      withFocusOutline:
        withFocusOutline || this.hasOpenPopover ? true : undefined
    }
  }

  onFocus = () => {
    this.setState({ isFocused: true })
  }

  onBlur = () => {
    this.setState({ isFocused: false })
  }

  handleKeyDown: TopNavBarItemProps['onKeyDown'] = (e) => {
    if (e.key === 'ArrowDown') {
      if (
        (this.shouldRenderSubmenu && !this.state.isSubmenuOpen) ||
        (this.shouldRenderPopover && !this.state.isPopoverOpen)
      ) {
        e.preventDefault()
        this._itemRef?.click()
      }
    }

    if (e.key === 'Tab') {
      if (this.state.isPopoverOpen && !this.isCustomPopoverControlled) {
        this.setState({ isPopoverOpen: false })
      }
    }
  }

  handleMenuToggle: NonNullable<DrilldownProps['onToggle']> = (event, args) => {
    this.setState({ isSubmenuOpen: args.shown })

    if (typeof this.props.onSubmenuToggle === 'function') {
      this.props.onSubmenuToggle(event, args)
    }
  }

  renderContent() {
    const { children, styles } = this.props
    const { itemProps } = this

    if (!itemProps) {
      return null
    }

    let content = children

    if (this.isAvatarOnlyVariant) {
      content = this.renderAvatar()
    } else if (this.isIconVariant) {
      content = <ScreenReaderContent>{content}</ScreenReaderContent>
    }

    const button: BaseButtonElement = (
      <BaseButton
        {...itemProps}
        // rest of the props should go to the Button
        {...passthroughProps(omitProps(this.props, allowedProps))}
      >
        {this.isIconVariant && !this.submenuIcon ? (
          content
        ) : (
          <div css={styles?.content}>
            {this.hasAvatar && !this.isAvatarOnlyVariant && (
              <span css={this.props.styles?.avatarContainer}>
                {this.renderAvatar()}
              </span>
            )}
            <span css={styles?.contentText}>{content}</span>
            {this.submenuIcon}
          </div>
        )}
      </BaseButton>
    )

    return (
      <div css={styles?.container}>
        {this.props.tooltip
          ? this.wrapButtonInTooltip(button, children)
          : button}
      </div>
    )
  }

  wrapButtonInTooltip(button: BaseButtonElement, content: React.ReactNode) {
    const { tooltip, styles } = this.props

    if (!tooltip) {
      return button
    }

    let tooltipProps: Partial<TooltipProps> = {
      placement: 'bottom',
      color: this.context.inverseColor ? 'primary' : 'primary-inverse'
    }

    if (typeof tooltip === 'string') {
      tooltipProps.renderTip = tooltip
    } else {
      tooltipProps = { ...tooltipProps, ...tooltip }
    }

    const tipContent = callRenderProp(tooltipProps.renderTip)

    if (!tipContent) {
      return button
    }

    const contentAndTooltipIdentical = tipContent === content

    return (
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            View: {
              // moves tooltips above submenus/popovers
              stackingTopmost: tooltipStacking
            }
          }
        }}
      >
        <Tooltip
          {...tooltipProps}
          renderTip={
            contentAndTooltipIdentical ? (
              tipContent
            ) : (
              <div id={this._tooltipContentId}>{tipContent}</div>
            )
          }
          positionContainerDisplay="block"
        >
          <div css={styles?.submenuTriggerContainer}>
            {contentAndTooltipIdentical
              ? button
              : safeCloneElement(button, {
                  'aria-describedby': this._tooltipContentId
                })}
          </div>
        </Tooltip>
      </InstUISettingsProvider>
    )
  }

  renderAvatar() {
    if (!this.hasAvatar) {
      return null
    }

    const { id, children, renderAvatar } = this.props
    const { avatarName, avatarSrc, avatarAlt } = renderAvatar!

    const label =
      avatarAlt ||
      (typeof children === 'string' ? (children as string) : undefined)

    if (!label) {
      warn(
        false,
        `Please supply a label for the avatar with either the "renderAvatar.avatarAlt" or the "children" (as string) prop. It is needed for screen reader support, but missing on the item with the id: "${id}".`
      )
    }

    return avatarName ? (
      <Avatar name={avatarName} src={avatarSrc} alt={label} size="small" />
    ) : null
  }

  renderDropdownMenu() {
    const { id, renderSubmenu, status, styles } = this.props

    if (!renderSubmenu || !this.shouldRenderSubmenu) {
      return null
    }

    if (typeof renderSubmenu.props.show !== 'undefined') {
      warn(
        false,
        `TopNavBar.Item Drilldown submenus are controlled by the component. The "show" prop will be ignored on the submenu of the item with id: "${id}".`
      )
    }

    if (renderSubmenu.props.trigger) {
      warn(
        false,
        `TopNavBar.Item submenus have the item itself as their trigger. The "trigger" prop will be ignored on the Drilldown submenu of item with id: "${id}".`
      )
    }

    return safeCloneElement(renderSubmenu, {
      trigger: (
        <div css={styles?.submenuTriggerContainer}>{this.renderContent()}</div>
      ),
      show: this.state.isSubmenuOpen,
      onToggle: createChainedFunction(
        renderSubmenu.props?.onToggle,
        this.handleMenuToggle
      ),
      positionContainerDisplay: 'block',
      placement: 'bottom start',
      withArrow: false,
      minWidth: renderSubmenu.props?.minWidth || '18.5rem',
      maxHeight: renderSubmenu.props?.maxHeight || `calc(100vh - 10rem)`,

      ...(status === 'disabled' && {
        disabled: true,
        show: false,
        onToggle: undefined
      })
    })
  }

  renderPopover() {
    const { id, customPopoverConfig, styles } = this.props

    if (!customPopoverConfig || !this.shouldRenderPopover) {
      return null
    }

    // @ts-expect-error throw a warning just in case they pass trigger
    if (customPopoverConfig.renderTrigger) {
      warn(
        false,
        `TopNavBar.Item popovers have the item itself as their trigger. The "renderTrigger" prop will be ignored on the popover of item with id: "${id}".`
      )
    }

    const popoverProps: PopoverProps = {
      // defaults:
      placement: 'bottom start',
      withArrow: true,
      shouldReturnFocus: true,
      shouldContainFocus: false,

      // user input:
      ...customPopoverConfig,

      // fix overrides:
      positionContainerDisplay: 'block',
      renderTrigger: (
        <div css={styles?.submenuTriggerContainer}>{this.renderContent()}</div>
      ),
      onShowContent: createChainedFunction(
        customPopoverConfig.onShowContent,
        () => {
          if (!this.isCustomPopoverControlled) {
            this.setState({ isPopoverOpen: true })
          }
        }
      ),
      onHideContent: createChainedFunction(
        customPopoverConfig.onHideContent,
        () => {
          if (!this.isCustomPopoverControlled) {
            this.setState({ isPopoverOpen: false })
          }
        }
      ),
      isShowingContent: this.state.isPopoverOpen,
      // @ts-expect-error This is a force override for Popover, because it puts
      // aria-expanded on the trigger when shouldContainFocus="true",
      // even when it should be on the item's <button>
      'aria-expanded': undefined
    }

    return <Popover {...popoverProps}>{customPopoverConfig.children}</Popover>
  }

  render() {
    const { styles } = this.props

    let content

    if (this.shouldRenderPopover) {
      content = (
        <InstUISettingsProvider
          theme={{
            componentOverrides: {
              View: {
                // moves popovers above navbar, below tooltips
                stackingTopmost: submenuStacking
              }
            }
          }}
        >
          {this.renderPopover()}
        </InstUISettingsProvider>
      )
    } else if (this.shouldRenderSubmenu) {
      content = (
        <InstUISettingsProvider
          theme={{
            componentOverrides: {
              View: {
                // moves submenus above navbar, below tooltips
                stackingTopmost: submenuStacking
              }
            }
          }}
        >
          {this.renderDropdownMenu()}
        </InstUISettingsProvider>
      )
    } else {
      content = this.renderContent()
    }

    return (
      <div ref={this.handleRef} css={styles?.topNavBarItem} data-cid="TopNavBarItem">
        {content}
      </div>
    )
  }
}

export { TopNavBarItem }
export default TopNavBarItem
