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
  forwardRef,
  useMemo,
  cloneElement,
  isValidElement
} from 'react'
import type { ForwardedRef } from 'react'
import { jsx } from '@emotion/react'

import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
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

import type { LinkProps } from './props'

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

const Link = forwardRef<Element, LinkProps>(
  (props: LinkProps, ref: ForwardedRef<Element>) => {
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
      variant: variantProp,
      size: sizeProp,
      ...rest
    } = props

    // This block handle deprecated variant values by mapping them to new variant + size props
    let variant: 'inline' | 'standalone' | undefined = variantProp as
      | 'inline'
      | 'standalone'
      | undefined
    let size: 'small' | 'medium' | 'large' | undefined = sizeProp

    if (variantProp === 'inline-small' || variantProp === 'standalone-small') {
      warn(
        false,
        `[Link] The variant value "${variantProp}" is deprecated. Use variant="${variantProp.replace(
          '-small',
          ''
        )}" with size="small" instead.`
      )
      variant = variantProp.replace('-small', '') as 'inline' | 'standalone'
      // Only set size from deprecated variant if size prop is not explicitly provided
      if (!sizeProp) {
        size = 'small'
      }
    } else if (
      (variantProp === 'inline' || variantProp === 'standalone') &&
      !sizeProp
    ) {
      // When using new variant values without explicit size, default to medium
      // This maintains the old behavior where 'inline' and 'standalone' were medium-sized
      size = 'medium'
    }

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
      generateStyle,
      params: {
        ...props,
        variant,
        size,
        display: displayValue,
        margin,
        containsTruncateText,
        hasVisibleChildren: hasVisibleChildrenValue
      },
      componentId: 'Link',
      displayName: 'Link'
    })

    const handleElementRef = (el: Element | null) => {
      linkRef.current = el

      if (typeof elementRef === 'function') {
        elementRef(el)
      }

      // Forward ref to the DOM element for compatibility with Position/Popover/Tooltip
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        ;(ref as React.MutableRefObject<Element | null>).current = el
      }
    }

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      if (interaction === 'disabled') {
        event.preventDefault()
        event.stopPropagation()
      } else if (typeof onClick === 'function') {
        onClick(event)
      }
    }

    const handleFocus: React.FocusEventHandler<HTMLElement> = (event) => {
      if (typeof onFocus === 'function') {
        onFocus(event)
      }
    }

    const handleBlur: React.FocusEventHandler<HTMLElement> = (event) => {
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

      // Map Link sizes to Lucide icon semantic size tokens
      const linkSizeToIconSize = {
        small: 'xs',
        medium: 'sm',
        large: 'md'
      } as const

      const iconSize = linkSizeToIconSize[size || 'medium']

      // Lucide icons - pass size prop to control icon size
      // Wrap with span for gap/spacing but without fontSize override
      const isLucideIcon =
        renderIcon &&
        isValidElement(renderIcon) &&
        (renderIcon as any).type?.displayName?.startsWith('wrapLucideIcon')

      if (isLucideIcon && isValidElement(renderIcon)) {
        // Lucide icons - clone the element with size prop
        return (
          <span css={styles?.icon}>
            {cloneElement(renderIcon, { size: iconSize } as any)}
          </span>
        )
      }

      // Non-Lucide icons or functions - render without size prop
      return <span css={styles?.icon}>{callRenderProp(renderIcon as any)}</span>
    }

    const isDisabled = interaction === 'disabled'

    const type =
      element === 'button' || element === 'input' ? 'button' : undefined

    // Determine tabIndex based on role and disabled state
    const tabIndex = useMemo(() => {
      if (isDisabled) {
        // Disabled links should not be focusable
        return -1
      }
      if (roleValue === 'button') {
        // Elements with button role need explicit tabIndex
        return 0
      }
      // Otherwise let the browser handle default focusability
      return undefined
    }, [isDisabled, roleValue])

    return jsx(
      element,
      {
        ...passthroughProps(rest),
        ref: handleElementRef,
        href,
        onMouseEnter,
        onClick: handleClick,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'aria-disabled': isDisabled ? 'true' : undefined,
        role: roleValue,
        type,
        tabIndex,
        css: styles?.link,
        'data-cid': combineDataCid('Link', props)
      },
      renderIcon && iconPlacement === 'start' ? renderIconElement() : null,
      children,
      renderIcon && iconPlacement === 'end' ? renderIconElement() : null
    )
  }
)

Link.displayName = 'Link'

export default Link
export { Link }
