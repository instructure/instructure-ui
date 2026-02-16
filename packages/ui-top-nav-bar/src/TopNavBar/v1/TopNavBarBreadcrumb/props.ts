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

import { ComponentElement } from 'react'
import type { ViewOwnProps } from '@instructure/ui-view'
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import { TopNavBarContextType } from '../TopNavBarContext'
import { ChildrenOfType, OtherHTMLAttributes } from '@instructure/shared-types'
import TopNavBarBreadcrumb from './index'

import { Breadcrumb } from '@instructure/ui-breadcrumb'
import type { BreadcrumbProps } from '@instructure/ui-breadcrumb'

type TopNavBarBreadcrumbProps = TopNavBarBreadcrumbOwnProps &
  WithStyleProps<null, TopNavBarBreadcrumbStyle> &
  OtherHTMLAttributes<TopNavBarBreadcrumbOwnProps>

type TopNavBarBreadcrumbState = { active: boolean }

type BreadcrumbChild = React.ComponentElement<
  TopNavBarBreadcrumbProps,
  TopNavBarBreadcrumb
>

type TopNavBarBreadcrumbOwnProps = {
  /**
   * The children to be rendered within the `<TopNavBarBreadcrumb />`. Children must be type of `Breadcrumb`.
   */
  children: ChildrenOfType<ComponentElement<BreadcrumbProps, Breadcrumb>>

  /**
   * A callback function to be called, if the user clicks on the hamburger icon.
   */
  onClick?: (
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>
  ) => void

  /**
   * A function that returns a reference to root HTML element
   */
  elementRef?: (el: HTMLDivElement | null) => void
}

type TopNavBarBreadcrumbStyle = ComponentStyle<
  | 'topNavBarBreadcrumb'
  | 'iconContainer'
  | 'icon'
  | 'breadcrumbContainer'
  | 'linkContainer'
>

type TopNavBarBreadcrumbStyleProps = {
  inverseColor: TopNavBarContextType['inverseColor']
}

type PropKeys = keyof TopNavBarBreadcrumbOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>
const allowedProps: AllowedPropKeys = ['children', 'onClick', 'elementRef']

export type {
  TopNavBarBreadcrumbProps,
  TopNavBarBreadcrumbState,
  TopNavBarBreadcrumbStyle,
  TopNavBarBreadcrumbStyleProps,
  BreadcrumbChild
}

export { allowedProps }
