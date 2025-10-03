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
  forwardRef,
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useImperativeHandle,
  useMemo
} from 'react'
import keycode from 'keycode'

import { IconCheckSolid, IconArrowOpenEndSolid } from '@instructure/ui-icons'
import {
  omitProps,
  getElementType,
  withDeterministicId,
  callRenderProp
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { isActiveElement, findDOMNode } from '@instructure/ui-dom-utils'
import { withStyle } from '@instructure/emotion'

import { MenuContext } from '../../MenuContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuItemProps } from './props'

/**
---
parent: Menu
id: Menu.Item
---
**/
const MenuItemComponent = forwardRef<any, MenuItemProps>((props, ref) => {
  const {
    type = 'button',
    disabled = false,
    selected: selectedProp,
    defaultSelected,
    onSelect,
    onClick,
    onMouseOver,
    onKeyDown,
    onKeyUp,
    value,
    children,
    renderLabelInfo,
    controls,
    href,
    target,
    deterministicId,
    makeStyles,
    styles
  } = props

  const context = useContext(MenuContext)
  const elementRef = useRef<Element | null>(null)
  const [selectedState, setSelectedState] = useState(!!defaultSelected)
  const labelIdRef = useRef(deterministicId?.('MenuItem__label'))
  const labelId = labelIdRef.current!

  const selected =
    typeof selectedProp === 'undefined' ? selectedState : selectedProp

  useEffect(() => {
    makeStyles?.()
  }, [makeStyles])

  useEffect(() => {
    if (context && context.registerMenuItem) {
      context.registerMenuItem(imperativeHandle as any)
    }
    return () => {
      if (context && context.removeMenuItem) {
        context.removeMenuItem(imperativeHandle as any)
      }
    }
  }, [context])

  const focus = useCallback(() => {
    const refNode = findDOMNode(elementRef.current) as HTMLElement
    refNode.focus()
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const newSelected = !selected

      if (disabled) {
        e.preventDefault()
        return
      }

      if (typeof selectedProp === 'undefined') {
        setSelectedState(newSelected)
      }

      if (typeof onSelect === 'function') {
        e.persist()
        onSelect(e, value, newSelected, imperativeHandle as any)
      }

      if (typeof onClick === 'function') {
        onClick(e)
      }
    },
    [disabled, selected, selectedProp, onSelect, value, onClick]
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (enterKey) {
        // handle space key on keyUp for FF
        const refNode = findDOMNode(elementRef.current) as HTMLElement
        refNode.click()
      }
    }
  }, [])

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (spaceKey) {
        const refNode = findDOMNode(elementRef.current) as HTMLElement
        refNode.click()
      }
    }
  }, [])

  const handleMouseOver = useCallback(
    (event: React.MouseEvent) => {
      if (!isActiveElement(elementRef.current)) {
        focus()
      }

      if (typeof onMouseOver === 'function') {
        onMouseOver(event, imperativeHandle as any)
      }
    },
    [focus, onMouseOver]
  )

  const imperativeHandle = useMemo(
    () => ({
      focus,
      get focused() {
        return isActiveElement(elementRef.current)
      },
      ref: elementRef.current,
      get _node() {
        console.warn(
          '_node property is deprecated and will be removed in v9, please use ref instead'
        )
        return elementRef.current
      }
    }),
    [focus]
  )

  useImperativeHandle(ref, () => imperativeHandle, [imperativeHandle])

  const role = useMemo(() => {
    switch (type) {
      case 'checkbox':
        return 'menuitemcheckbox'
      case 'radio':
        return 'menuitemradio'
      default:
        return 'menuitem'
    }
  }, [type])

  const elementType = useMemo(() => {
    return getElementType(MenuItemComponent, props)
  }, [props])

  const renderContent = () => {
    return (
      <span>
        {(type === 'checkbox' || type === 'radio') && (
          <span css={styles?.icon}>{selected && <IconCheckSolid />}</span>
        )}
        <span css={styles?.label} id={labelId}>
          {children}
        </span>
        {type === 'flyout' && (
          <span css={styles?.icon}>
            <IconArrowOpenEndSolid />
          </span>
        )}
        {renderLabelInfo && (
          <span css={styles?.labelInfo}>{callRenderProp(renderLabelInfo)}</span>
        )}
      </span>
    )
  }

  const omittedProps = omitProps(props, allowedProps)
  const ElementType = elementType

  return (
    <ElementType
      tabIndex={-1} // note: tabIndex can be overridden by Menu or MenuItemGroup components
      {...omittedProps}
      href={href}
      target={target}
      role={role}
      aria-labelledby={labelId}
      aria-disabled={disabled ? 'true' : undefined}
      aria-controls={controls}
      aria-checked={
        type === 'checkbox' || type === 'radio'
          ? selected
            ? 'true'
            : 'false'
          : undefined
      }
      onClick={handleClick}
      onKeyUp={createChainedFunction(onKeyUp, handleKeyUp)}
      onKeyDown={createChainedFunction(onKeyDown, handleKeyDown)}
      ref={elementRef as any}
      css={styles?.menuItem}
      onMouseOver={handleMouseOver}
    >
      {renderContent()}
    </ElementType>
  )
})

MenuItemComponent.displayName = 'MenuItem'

const StyledMenuItem: any = withStyle(
  generateStyle,
  generateComponentTheme
)(MenuItemComponent as any)
const MenuItem = withDeterministicId()(StyledMenuItem)

MenuItem.componentId = 'Menu.Item'
;(MenuItem as any).propTypes = propTypes
;(MenuItem as any).allowedProps = allowedProps

export default MenuItem
export { MenuItem }
