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
  isValidElement,
  cloneElement,
  Children,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react'

import { View } from '@instructure/ui-view'

import { useStyle } from '@instructure/emotion'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { BreadcrumbLink } from './BreadcrumbLink'

import generateStyle from './styles'
import type { BreadcrumbProps } from './props'

/**
---
category: components
---
**/

interface BreadcrumbComponent
  extends React.ForwardRefExoticComponent<
    BreadcrumbProps & React.RefAttributes<Element>
  > {
  Link: typeof BreadcrumbLink
}

const Breadcrumb = forwardRef<Element, BreadcrumbProps>(
  ({ size = 'medium', children = null, margin, label }, ref) => {
    const elementRef = useRef<Element | null>(null)

    useImperativeHandle(ref, () => elementRef.current as Element)

    const styles = useStyle({
      generateStyle,
      params: { size },
      componentId: 'Breadcrumb',
      displayName: 'Breadcrumb'
    })

    const addAriaCurrent = (child: React.ReactNode) => {
      const updatedChild = cloneElement(
        child as React.ReactElement<{ 'aria-current'?: string }>,
        {
          'aria-current': 'page'
        }
      )
      return updatedChild
    }

    const renderChildren = () => {
      const numChildren = Children.count(children)
      const inlineStyle = {
        maxWidth: `${Math.floor(100 / numChildren)}%`
      }
      let isAriaCurrentSet = false

      return Children.map(children, (child, index) => {
        const isLastElement = index === numChildren - 1
        if (isValidElement(child)) {
          const isCurrentPage =
            (child as ReactElement<any>).props.isCurrentPage || false
          if (isAriaCurrentSet && isCurrentPage) {
            console.warn(
              `Warning: Multiple elements with isCurrentPage=true found. Only one element should be set to current.`
            )
          }
          if (isCurrentPage) {
            isAriaCurrentSet = true
          }
        }
        return (
          <li css={styles?.crumb} style={inlineStyle}>
            {!isAriaCurrentSet &&
            isLastElement &&
            (child as React.ReactElement<any>).props.isCurrentPage !== false
              ? addAriaCurrent(child)
              : child}
            {index < numChildren - 1 && (
              <IconArrowOpenEndSolid color="auto" css={styles?.separator} />
            )}
          </li>
        )
      })
    }

    return (
      <View
        role="navigation"
        as="div"
        margin={margin}
        aria-label={label}
        elementRef={(el) => {
          elementRef.current = el
        }}
        data-cid="Breadcrumb"
      >
        <ol css={styles?.breadcrumb}>{renderChildren()}</ol>
      </View>
    )
  }
) as BreadcrumbComponent

Breadcrumb.displayName = 'Breadcrumb'
Breadcrumb.Link = BreadcrumbLink

export default Breadcrumb
export { Breadcrumb, BreadcrumbLink }
export type { BreadcrumbComponent }
