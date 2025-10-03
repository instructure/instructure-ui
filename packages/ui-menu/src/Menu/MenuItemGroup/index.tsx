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
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle
} from 'react'

import { withStyle } from '@instructure/emotion'
import {
  omitProps,
  safeCloneElement,
  matchComponentTypes,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'

import { MenuItem } from '../MenuItem'
import type { OnMenuItemSelect, MenuItemProps } from '../MenuItem/props'
import type { MenuSeparatorProps } from '../MenuItemSeparator/props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuGroupProps, MenuGroupState } from './props'

type MenuItemChild = ComponentElement<MenuItemProps, any>
type MenuSeparatorChild = ComponentElement<MenuSeparatorProps, any>

/**
---
parent: Menu
id: Menu.Group
---
**/
const MenuItemGroupComponent = forwardRef<any, MenuGroupProps>((props, ref) => {
  const {
    disabled = false,
    children = null,
    isTabbable = false,
    allowMultiple = false,
    defaultSelected = [],
    selected: selectedProp,
    label,
    controls,
    onMouseOver,
    onSelect,
    itemRef,
    makeStyles,
    styles
  } = props

  const elementRef = useRef<Element | null>(null)

  const selectedFromChildren = useCallback((propsToCheck: MenuGroupProps) => {
    const { children: childrenToCheck, allowMultiple: allowMultipleToCheck } =
      propsToCheck
    const selected: MenuGroupState['selected'] = []

    const items = (
      Children.toArray(childrenToCheck) as (
        | MenuItemChild
        | MenuSeparatorChild
      )[]
    ).filter((child) => {
      return matchComponentTypes<MenuItemChild>(child, [MenuItem])
    }) as MenuItemChild[]

    items.forEach((item, index) => {
      if (
        (selected.length === 0 || allowMultipleToCheck) &&
        (item.props.selected || item.props.defaultSelected)
      ) {
        selected.push(item.props.value || index)
      }
    })

    return selected.length > 0 ? selected : null
  }, [])

  const initialSelected = useMemo(() => {
    return selectedFromChildren(props) || defaultSelected
  }, [])

  const [selectedState, setSelectedState] =
    useState<MenuGroupState['selected']>(initialSelected)

  const selected = useMemo(() => {
    if (
      typeof selectedProp === 'undefined' &&
      typeof selectedState === 'undefined'
    ) {
      return []
    } else {
      return typeof selectedProp === 'undefined'
        ? [...selectedState]
        : [...selectedProp]
    }
  }, [selectedProp, selectedState])

  useEffect(() => {
    makeStyles?.()
  }, [makeStyles])

  useImperativeHandle(
    ref,
    () => ({
      ref: elementRef.current
    }),
    []
  )

  const updateSelected = useCallback(
    (
      e: React.MouseEvent,
      value: MenuItemProps['value'],
      items: MenuGroupState['selected'],
      itemSelected: MenuItemProps['selected'],
      item: any
    ) => {
      let updated = allowMultiple ? [...items] : []
      const location = updated.indexOf(value!)

      if (itemSelected === true && location < 0) {
        updated.push(value!)
      } else if (itemSelected === false && location !== -1) {
        updated.splice(location, 1)
      } else if (!allowMultiple && updated.length < 1) {
        // don't allow nothing selected if it's not allowMultiple/checkbox
        updated = [...items]
      }

      if (typeof onSelect === 'function') {
        onSelect(e, updated, itemSelected, item)
      }

      return updated
    },
    [allowMultiple, onSelect]
  )

  const handleSelect: OnMenuItemSelect = useCallback(
    (e, value, itemSelected, item) => {
      if (disabled) {
        e.preventDefault()
        return
      }

      if (selectedProp) {
        updateSelected(e, value, selectedProp, itemSelected, item)
      } else {
        setSelectedState((state) => {
          return updateSelected(e, value, state, itemSelected, item)
        })
      }
    },
    [disabled, selectedProp, updateSelected]
  )

  const renderLabel = () => {
    return hasVisibleChildren(label) ? (
      <span css={styles?.label}>{label}</span>
    ) : (
      label
    )
  }

  const renderChildren = () => {
    const childrenArray = children as (MenuItemChild | MenuSeparatorChild)[]
    let index = -1

    return Children.map(childrenArray, (child) => {
      if (matchComponentTypes<MenuItemChild>(child, [MenuItem])) {
        ++index
        const value = child.props.value || index

        return safeCloneElement(child, {
          tabIndex: isTabbable && index === 0 ? 0 : -1,
          controls,
          value,
          children: child.props.children,
          type: allowMultiple ? 'checkbox' : 'radio',
          ref: itemRef,
          disabled: disabled || child.props.disabled,
          selected: selected.indexOf(value) > -1,
          onSelect: handleSelect,
          onMouseOver
        })
      } else {
        return child
      }
    })
  }

  const omittedProps = omitProps(props, allowedProps)

  return (
    <span {...omittedProps} css={styles?.menuItemGroup} ref={elementRef as any}>
      {renderLabel()}
      <div css={styles?.items} aria-disabled={disabled ? 'true' : undefined}>
        {renderChildren()}
      </div>
    </span>
  )
})

MenuItemGroupComponent.displayName = 'MenuItemGroup'

const StyledMenuItemGroup: any = withStyle(
  generateStyle,
  generateComponentTheme
)(MenuItemGroupComponent as any)
const MenuItemGroup = withDeterministicId()(StyledMenuItemGroup)

MenuItemGroup.componentId = 'Menu.Group'
;(MenuItemGroup as any).propTypes = propTypes
;(MenuItemGroup as any).allowedProps = allowedProps

export default MenuItemGroup
export { MenuItemGroup }
