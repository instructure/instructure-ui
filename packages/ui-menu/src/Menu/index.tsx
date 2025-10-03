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

import {
  ComponentElement,
  Children,
  ReactElement,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import keycode from 'keycode'

import { Popover } from '@instructure/ui-popover'
import {
  safeCloneElement,
  matchComponentTypes,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { containsActiveElement } from '@instructure/ui-dom-utils'

import { MenuContext } from '../MenuContext'
import { MenuItem } from './MenuItem'
import type { MenuItemProps } from './MenuItem/props'
import { MenuItemGroup } from './MenuItemGroup'
import type { MenuGroupProps } from './MenuItemGroup/props'
import { MenuItemSeparator } from './MenuItemSeparator'
import type { MenuSeparatorProps } from './MenuItemSeparator/props'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuProps } from './props'

type MenuChild = ComponentElement<MenuProps, any>
type MenuItemChild = ComponentElement<MenuItemProps, any>
type MenuGroupChild = ComponentElement<MenuGroupProps, any>
type MenuSeparatorChild = ComponentElement<MenuSeparatorProps, any>

/**
---
category: components
---
**/
const MenuComponent = forwardRef<any, MenuProps>((props, ref) => {
  const {
    label = null,
    disabled = false,
    trigger = null,
    placement = 'bottom center',
    defaultShow = false,
    mountNode = null,
    shouldHideOnSelect = true,
    withArrow = true,
    offsetX = 0,
    offsetY = 0,
    children,
    type,
    onToggle,
    onKeyDown,
    onKeyUp,
    onSelect,
    menuRef,
    popoverRef,
    show: showProp,
    onDismiss,
    onFocus,
    onMouseOver,
    positionContainerDisplay,
    controls,
    id,
    deterministicId,
    makeStyles,
    styles
  } = props

  // State
  const [hasFocus, setHasFocus] = useState(false)

  // Refs
  const menuItemsRef = useRef<any[]>([])
  const popoverRef_internal = useRef<Popover | null>(null)
  const triggerRef = useRef<any | null>(null)
  const menuRef_internal = useRef<HTMLElement | null>(null)
  const activeSubMenuRef = useRef<any>(null)
  const elementRef = useRef<Element | null>(null)

  // Generate deterministic IDs
  const labelIdRef = useRef(deterministicId?.('Menu__label'))
  const menuIdRef = useRef(id || deterministicId?.())
  const labelId = labelIdRef.current!
  const menuId = menuIdRef.current!

  // Effects
  useEffect(() => {
    makeStyles?.()
  }, [makeStyles])

  // Callbacks
  const registerMenuItem = useCallback((item: any) => {
    menuItemsRef.current.push(item)
  }, [])

  const removeMenuItem = useCallback((item: any) => {
    const index = menuItemsRef.current.findIndex((i) => i === item)
    error(index >= 0, '[Menu] Could not find registered menu item.')
    if (index >= 0) {
      menuItemsRef.current.splice(index, 1)
    }
  }, [])

  const getFocusedIndex = useCallback(() => {
    return menuItemsRef.current.findIndex((item) => {
      return item && item.focused === true
    })
  }, [])

  const moveFocus = useCallback(
    (step: number) => {
      const count = menuItemsRef.current ? menuItemsRef.current.length : 0

      if (count <= 0) {
        return
      }

      const focusedIndex = getFocusedIndex()
      const current = focusedIndex < 0 && step < 0 ? 0 : focusedIndex

      const nextItem = menuItemsRef.current[(current + count + step) % count]

      error(
        typeof nextItem !== 'undefined' &&
          typeof nextItem.focus !== 'undefined',
        '[Menu] Could not focus next menu item.'
      )

      nextItem.focus()
    },
    [getFocusedIndex]
  )

  const hide = useCallback((event: React.UIEvent | React.FocusEvent) => {
    if (popoverRef_internal.current) {
      popoverRef_internal.current.hide(event)
    }
  }, [])

  const show = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    if (popoverRef_internal.current) {
      popoverRef_internal.current.show(event)
    }
  }, [])

  const hideActiveSubMenu = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (activeSubMenuRef.current) {
        activeSubMenuRef.current.hide(event)
        activeSubMenuRef.current = null
      }
    },
    []
  )

  const handleRef = useCallback(
    (el: HTMLElement | null) => {
      menuRef_internal.current = el
      if (typeof menuRef === 'function') {
        menuRef(el)
      }
      // If there is no trigger `<ul>` is the ref, otherwise the trigger
      if (!trigger) {
        elementRef.current = el
      }
    },
    [menuRef, trigger]
  )

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (type === 'flyout' && event.keyCode === keycode.codes.right) {
        event.persist()
        show(event)
      }
    },
    [type, show]
  )

  const handleTriggerMouseOver = useCallback(
    (event: React.MouseEvent) => {
      if (type === 'flyout') {
        show(event)
      }
    },
    [type, show]
  )

  const handleToggle = useCallback(
    (shown: boolean, menuInstance?: any) => {
      if (typeof onToggle === 'function') {
        onToggle(shown, menuInstance)
      }
    },
    [onToggle]
  )

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const key = event && event.keyCode
      const { down, up, tab, left } = keycode.codes
      const pgdn = keycode.codes['page down']
      const pgup = keycode.codes['page up']

      if (key === down || key === pgdn) {
        event.preventDefault()
        event.stopPropagation()
        moveFocus(1)
        hideActiveSubMenu(event)
      } else if (key === up || key === pgup) {
        event.preventDefault()
        event.stopPropagation()
        moveFocus(-1)
        hideActiveSubMenu(event)
      } else if (key === tab || key === left) {
        event.persist()
        hide(event)
      }

      if (typeof onKeyDown === 'function') {
        onKeyDown(event)
      }
    },
    [moveFocus, hideActiveSubMenu, hide, onKeyDown]
  )

  const handleMenuItemSelect = useCallback<NonNullable<MenuProps['onSelect']>>(
    (event, value, selected, item) => {
      if (shouldHideOnSelect) {
        hide(event)
      }

      if (typeof onSelect === 'function') {
        onSelect(event, value, selected, item)
      }
    },
    [shouldHideOnSelect, hide, onSelect]
  )

  const handleMenuItemFocus = useCallback(() => {
    setHasFocus(true)
  }, [])

  const handleMenuItemBlur = useCallback(() => {
    setHasFocus(getFocusedIndex() >= 0)
  }, [getFocusedIndex])

  const handleMenuItemMouseOver = useCallback<
    NonNullable<MenuItemProps['onMouseOver']>
  >(
    (event, menuItem) => {
      if (
        activeSubMenuRef.current &&
        menuItem !== activeSubMenuRef.current._trigger
      ) {
        hideActiveSubMenu(event)
      }
    },
    [hideActiveSubMenu]
  )

  const handleSubMenuToggle = useCallback<NonNullable<MenuProps['onToggle']>>(
    (shown, subMenu) => {
      if (shown) {
        activeSubMenuRef.current = subMenu
      }
    },
    []
  )

  const handleSubMenuDismiss = useCallback(
    (event: React.UIEvent | React.FocusEvent, documentClick: boolean) => {
      if (
        (event &&
          (event as React.KeyboardEvent).keyCode === keycode.codes.tab) ||
        documentClick
      ) {
        hide(event)
      }
    },
    [hide]
  )

  // Imperative handle for ref
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        const shown = popoverRef_internal.current
          ? popoverRef_internal.current.shown
          : true
        if (shown) {
          error(
            !!menuRef_internal.current?.focus,
            '[Menu] Could not focus the menu.'
          )
          menuRef_internal.current!.focus()
        } else {
          error(
            !!triggerRef.current?.focus,
            '[Menu] Could not focus the trigger.'
          )
          triggerRef.current!.focus!()
        }
      },
      focused: () => {
        const shown = popoverRef_internal.current
          ? popoverRef_internal.current.shown
          : true
        if (shown) {
          return containsActiveElement(menuRef_internal.current) || hasFocus
        } else {
          return containsActiveElement(triggerRef.current)
        }
      },
      hide,
      show,
      get shown() {
        return popoverRef_internal.current
          ? popoverRef_internal.current.shown
          : true
      },
      menuItems: menuItemsRef.current,
      _trigger: triggerRef.current,
      _activeSubMenu: activeSubMenuRef.current
    }),
    [hasFocus, hide, show]
  )

  const renderChildren = useCallback(() => {
    let count = 0

    return Children.map(
      children as
        | MenuChild
        | MenuItemChild
        | MenuGroupChild
        | MenuSeparatorChild,
      (child) => {
        if (
          !matchComponentTypes(child, [
            'MenuItemSeparator',
            'MenuItem',
            'MenuItemGroup',
            'Menu'
          ])
        ) {
          return
        }

        count += 1

        const isTabbable = !hasFocus && count === 1

        if (
          matchComponentTypes<MenuSeparatorChild>(child, ['MenuItemSeparator'])
        ) {
          return child
        }

        const menuItemChild = child

        const itemControls =
          menuItemChild.props['aria-controls'] ||
          menuItemChild.props.controls ||
          props['aria-controls'] ||
          controls

        if (matchComponentTypes<MenuItemChild>(child, ['MenuItem'])) {
          return safeCloneElement(child, {
            controls: itemControls,
            children: child.props.children,
            disabled: disabled || child.props.disabled,
            onFocus: handleMenuItemFocus,
            onBlur: handleMenuItemBlur,
            onSelect: handleMenuItemSelect,
            onMouseOver: handleMenuItemMouseOver,
            tabIndex: isTabbable ? 0 : -1
          })
        }

        if (matchComponentTypes<MenuGroupChild>(child, ['MenuItemGroup'])) {
          return safeCloneElement(child, {
            label: child.props.label,
            controls: itemControls,
            disabled: disabled || child.props.disabled,
            onFocus: handleMenuItemFocus,
            onBlur: handleMenuItemBlur,
            onSelect: handleMenuItemSelect,
            onMouseOver: handleMenuItemMouseOver,
            isTabbable
          })
        }

        if (matchComponentTypes(child, ['Menu'])) {
          const submenuDisabled = disabled || child.props.disabled

          return safeCloneElement(child, {
            type: 'flyout',
            controls: itemControls,
            disabled: submenuDisabled,
            onSelect: handleMenuItemSelect,
            placement: 'end top',
            offsetX: -5,
            offsetY: 5,
            withArrow: false,
            onToggle: handleSubMenuToggle,
            onDismiss: handleSubMenuDismiss,
            trigger: (
              <MenuItem
                onMouseOver={handleMenuItemMouseOver}
                onFocus={handleMenuItemFocus}
                onBlur={handleMenuItemBlur}
                tabIndex={isTabbable ? 0 : -1}
                type="flyout"
                disabled={submenuDisabled}
                renderLabelInfo={child.props.renderLabelInfo}
              >
                {child.props.title || child.props.label}
              </MenuItem>
            )
          })
        }
        return
      }
    )
  }, [
    children,
    hasFocus,
    disabled,
    props,
    controls,
    handleMenuItemFocus,
    handleMenuItemBlur,
    handleMenuItemSelect,
    handleMenuItemMouseOver,
    handleSubMenuToggle,
    handleSubMenuDismiss
  ])

  const renderMenu = useCallback(() => {
    const labelledBy = props['aria-labelledby']

    return (
      <MenuContext.Provider
        value={{
          removeMenuItem,
          registerMenuItem
        }}
      >
        <div
          role="menu"
          aria-label={label || undefined}
          tabIndex={0}
          css={styles?.menu}
          aria-labelledby={labelledBy || (trigger ? labelId : undefined)}
          aria-controls={controls}
          aria-disabled={disabled ? 'true' : undefined}
          onKeyDown={handleMenuKeyDown}
          onKeyUp={onKeyUp}
          ref={handleRef}
        >
          {renderChildren()}
        </div>
      </MenuContext.Provider>
    )
  }, [
    props,
    removeMenuItem,
    registerMenuItem,
    label,
    styles,
    trigger,
    labelId,
    controls,
    disabled,
    handleMenuKeyDown,
    onKeyUp,
    handleRef,
    renderChildren
  ])

  return trigger ? (
    <Popover
      isShowingContent={showProp}
      defaultIsShowingContent={defaultShow}
      onHideContent={(event, { documentClick }) => {
        if (typeof onDismiss === 'function') {
          onDismiss(event, documentClick)
        }
        handleToggle(false)
      }}
      onShowContent={() => handleToggle(true)}
      mountNode={mountNode}
      placement={placement}
      withArrow={withArrow}
      id={menuId}
      on={['click']}
      shouldContainFocus
      shouldReturnFocus
      onFocus={onFocus}
      onMouseOver={onMouseOver}
      positionContainerDisplay={positionContainerDisplay}
      offsetX={offsetX}
      offsetY={offsetY}
      elementRef={(element) => {
        elementRef.current = element
      }}
      ref={(el) => {
        popoverRef_internal.current = el
        if (typeof popoverRef === 'function') {
          popoverRef(el)
        }
      }}
      renderTrigger={safeCloneElement(trigger as ReactElement, {
        ref: (el: (React.ReactInstance & { ref?: Element }) | null) => {
          triggerRef.current = el
        },
        'aria-haspopup': true,
        id: labelId,
        onMouseOver: handleTriggerMouseOver,
        onKeyDown: handleTriggerKeyDown,
        disabled: (trigger as ReactElement).props.disabled || disabled
      })}
      defaultFocusElement={() =>
        popoverRef_internal.current?._contentElement?.querySelector(
          '[class$="menuItem"]'
        )
      }
    >
      {renderMenu()}
    </Popover>
  ) : (
    renderMenu()
  )
})

MenuComponent.displayName = 'Menu'

const StyledMenu: any = withStyle(
  generateStyle,
  generateComponentTheme
)(MenuComponent as any)
const MenuWithId = withDeterministicId()(StyledMenu)

const Menu = MenuWithId as typeof MenuComponent & {
  componentId: string
  propTypes: typeof propTypes
  allowedProps: typeof allowedProps
  Item: typeof MenuItem
  Group: typeof MenuItemGroup
  Separator: typeof MenuItemSeparator
}

Menu.componentId = 'Menu'
;(Menu as any).propTypes = propTypes
;(Menu as any).allowedProps = allowedProps
Menu.Item = MenuItem
Menu.Group = MenuItemGroup
Menu.Separator = MenuItemSeparator

export default Menu
export { Menu, MenuItem, MenuItemGroup, MenuItemSeparator }
