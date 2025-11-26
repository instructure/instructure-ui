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
import type { Renderable } from '@instructure/shared-types'
import { callRenderProp } from './callRenderProp'

/**
 * Check if an element/component is a Lucide icon by checking its displayName
 * @param element - Element or component to check
 * @returns True if it's a Lucide icon (displayName starts with 'wrapLucideIcon(')
 */
const isLucideIcon = (element: any): boolean => {
  if (React.isValidElement(element)) {
    const displayName = (element.type as any)?.displayName
    return displayName?.startsWith('wrapLucideIcon(')
  }
  return element?.displayName?.startsWith('wrapLucideIcon(')
}

/**
 * ---
 * category: utilities/react
 * ---
 * Renders a Lucide icon with props, handling multiple input formats.
 * Only applies props if the icon is a Lucide icon (detected via displayName).
 * For non-Lucide icons, renders without applying props.
 *
 * Supported use cases:
 * 1. Component/function with Lucide displayName: `renderIcon={UserIcon}` - Calls with props
 * 2. JSX element: `renderIcon={<UserIcon />}` - Clones and overrides props
 * 3. Arrow function returning Lucide: `renderIcon={() => <UserIcon />}` - Detects Lucide from result
 *
 * @module renderLucideIconWithProps
 * @param elementToRender - The element to render (component/JSX/function)
 * @param propsToApply - Props to pass to or override on the element (only for Lucide icons)
 * @returns Rendered React element or null
 */
function renderLucideIconWithProps<P extends Record<string, unknown>>(
  elementToRender: Renderable<P> | React.ReactElement | undefined,
  propsToApply: P
): React.ReactElement | null {
  if (!elementToRender) return null

  // Check once if the input is a Lucide icon
  const isInputLucide = isLucideIcon(elementToRender)

  // Use case 2: JSX element like <UserIcon />
  if (React.isValidElement(elementToRender)) {
    return isInputLucide
      ? React.cloneElement(elementToRender, propsToApply as any)
      : elementToRender
  }

  // Use cases 1 & 3: Component/function reference
  // callRenderProp "extracts" the JSX element by either:
  // 1. Creating it from a component reference: React.createElement(UserIcon, props)
  // 2. Calling the function to get the JSX it returns: (() => <UserIcon />)()
  // The extracted result is then checked below to apply props if needed (use case 3)
  const result = callRenderProp(
    elementToRender,
    isInputLucide ? propsToApply : ({} as P)
  )

  // Check if the result is a React element that needs props applied
  if (React.isValidElement(result)) {
    // Use case 3: Arrow function returning Lucide icon (e.g., () => <UserIcon />)
    // If function wasn't directly Lucide but result is, apply props now
    if (!isInputLucide && isLucideIcon(result)) {
      return React.cloneElement(result, {
        ...(result.props as Record<string, unknown>),
        ...propsToApply
      })
    }

    // Use case 1: Function with Lucide displayName that ignored props
    // Force props application by cloning the result
    if (isInputLucide) {
      return React.cloneElement(result, {
        ...(result.props as Record<string, unknown>),
        ...propsToApply
      })
    }
  }

  return result
}

export default renderLucideIconWithProps
export { renderLucideIconWithProps }
