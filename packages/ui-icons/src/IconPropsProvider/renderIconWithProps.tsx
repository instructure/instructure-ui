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

import { IconPropsProvider } from './IconPropsProvider'
import { InstUIIconOwnProps } from '../props'

/**
 * Renders an icon wrapped in IconPropsProvider to apply size and color via React context.
 * Handles both component references and React elements.
 *
 * @param icon - The icon to render (component reference or React element)
 * @param size - Semantic size token (e.g., 'xs', 'sm', 'md', 'lg', 'xl', '2xl').
 * @param color - Semantic color token (e.g., 'baseColor', 'errorColor', 'ai').
 * @returns Icon element wrapped in IconPropsProvider context
 */
function renderIconWithProps(
  icon: Renderable,
  size: InstUIIconOwnProps['size'],
  color: InstUIIconOwnProps['color']
): React.ReactElement {
  let iconElement: React.ReactNode

  if (typeof icon === 'function') {
    // It's a component (class or function) - use createElement
    iconElement = React.createElement(icon as React.ComponentType)
  } else {
    // It's already a React element
    iconElement = icon as React.ReactNode
  }

  return (
    <IconPropsProvider size={size} color={color}>
      {iconElement}
    </IconPropsProvider>
  )
}

export { renderIconWithProps }
