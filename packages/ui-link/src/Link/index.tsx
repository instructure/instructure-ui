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
  Children,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo
} from 'react'
import type { ForwardedRef } from 'react'

import { View } from '@instructure/ui-view'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { isActiveElement, findFocusable } from '@instructure/ui-dom-utils'
import {
  getElementType,
  getInteraction,
  matchComponentTypes,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { combineDataCid } from '@instructure/ui-utils'
import { logWarn as warn } from '@instructure/console'

import { useStyle } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { LinkProps } from './props'

import type { ViewOwnProps } from '@instructure/ui-view'

export interface LinkHandle {
  focus(): void
  readonly focused: boolean
  readonly focusable: Element[]
}

/**
---
category: components
---
**/
// Create a component-like object for getElementType compatibility
const LinkComponentForGetElementType = {
  displayName: 'Link',
  defaultProps: {
    interaction: undefined,
    color: 'link',
    iconPlacement: 'start',
    isWithinText: true,
    forceButtonRole: true
  }
} as any

const Link = forwardRef<LinkHandle, LinkProps>(
  (props: LinkProps, ref: ForwardedRef<LinkHandle>) => {
    const {
      children,
      onClick,
      onMouseEnter,
      onFocus,
      onBlur,
      href,
      margin,
      renderIcon,
      iconPlacement = 'start',
      forceButtonRole = true,
      role,
      display,
      elementRef,
      ...rest
    } = props

    const linkRef = useRef<Element | null>(null)

    const containsTruncateText = useMemo(() => {
      let truncateText = false

      Children.forEach(children, (child) => {
        if (child && matchComponentTypes(child, ['TruncateText'])) {
          truncateText = true
        }
      })

      warn(
        // if display prop is used, warn about icon or TruncateText
        !truncateText || display === undefined,
        '[Link] Using the display property with TruncateText may cause layout issues.'
      )

      return truncateText
    }, [children, display])

    const hasVisibleChildrenValue = useMemo(
      () => hasVisibleChildren(children),
      [children]
    )

    const displayValue = useMemo(() => {
      if (display) {
        return display // user-entered display property
      }

      if (renderIcon) {
        return containsTruncateText ? 'inline-flex' : 'inline-block'
      } else {
        return containsTruncateText ? 'block' : 'auto'
      }
    }, [display, containsTruncateText, renderIcon])

    const interaction = getInteraction({
      props,
      interactionTypes: ['disabled']
    })

    const element = getElementType(LinkComponentForGetElementType, props)

    const roleValue = useMemo(() => {
      if (forceButtonRole) {
        return onClick && element !== 'button' ? 'button' : role
      }
      return role
    }, [forceButtonRole, onClick, element, role])

    const styles = useStyle({
      generateStyle: (componentTheme: any, _params: any, sharedTokens: any) => {
        return generateStyle(
          componentTheme,
          props,
          {
            containsTruncateText,
            hasVisibleChildren: hasVisibleChildrenValue
          },
          sharedTokens
        )
      },
      generateComponentTheme,
      componentId: 'Link',
      displayName: 'Link'
    })

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (linkRef.current) {
            ;(linkRef.current as HTMLElement).focus()
          }
        },
        get focused() {
          return isActiveElement(linkRef.current)
        },
        get focusable() {
          return findFocusable(linkRef.current)
        }
      }),
      []
    )

    const handleElementRef = (el: Element | null) => {
      linkRef.current = el

      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }

    const handleClick: React.MouseEventHandler<ViewOwnProps> = (event) => {
      if (interaction === 'disabled') {
        event.preventDefault()
        event.stopPropagation()
      } else if (typeof onClick === 'function') {
        onClick(event)
      }
    }

    const handleFocus: React.FocusEventHandler<ViewOwnProps> = (event) => {
      if (typeof onFocus === 'function') {
        onFocus(event)
      }
    }

    const handleBlur: React.FocusEventHandler<ViewOwnProps> = (event) => {
      if (typeof onBlur === 'function') {
        onBlur(event)
      }
    }

    const renderIconElement = () => {
      warn(
        // if display prop is used, warn about icon or TruncateText
        display === undefined,
        '[Link] Using the display property with an icon may cause layout issues.'
      )
      return <span css={styles?.icon}>{callRenderProp(renderIcon)}</span>
    }

    const isDisabled = interaction === 'disabled'

    const type =
      element === 'button' || element === 'input' ? 'button' : undefined

    const tabIndex = roleValue === 'button' && !isDisabled ? 0 : undefined

    return (
      <View
        {...passthroughProps(rest)}
        elementRef={handleElementRef}
        as={element}
        display={displayValue}
        margin={margin}
        href={href}
        onMouseEnter={onMouseEnter}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-disabled={isDisabled ? 'true' : undefined}
        role={roleValue}
        type={type}
        tabIndex={tabIndex}
        css={styles?.link}
        data-cid={combineDataCid('Link', props)}
      >
        {renderIcon && iconPlacement === 'start' ? renderIconElement() : null}
        {children}
        {renderIcon && iconPlacement === 'end' ? renderIconElement() : null}
      </View>
    )
  }
)

Link.displayName = 'Link'

export default Link
export { Link }
