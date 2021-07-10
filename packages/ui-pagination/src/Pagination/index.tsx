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
/** @jsx jsx */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { Children } from '@instructure/ui-prop-types'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { findTabbable, getActiveElement } from '@instructure/ui-dom-utils'
import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import { PaginationButton } from './PaginationButton'
import { PaginationArrowButton } from './PaginationArrowButton'

import generateStyle from './styles'

/** This is an [].findIndex optimized to work on really big, but sparse, arrays */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'arr' implicitly has an 'any' type.
const fastFindIndex = (arr, fn) =>
  Number(Object.keys(arr).find((k) => fn(arr[Number(k)])))

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
function propsHaveCompactView(props) {
  return props.variant === 'compact' && props?.children?.length > 5
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
function shouldShowPrevButton(props, currentPageIndex) {
  return propsHaveCompactView(props) && currentPageIndex > 0
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
function shouldShowNextButton(props, currentPageIndex) {
  return (
    propsHaveCompactView(props) && currentPageIndex < props.children.length - 1
  )
}

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  disabled?: boolean
  label?: React.ReactNode
  labelNext?: string
  labelPrev?: string
  variant?: 'full' | 'compact'
  margin?: Spacing
  as?: React.ReactElement
  elementRef?: (...args: any[]) => any
  shouldHandleFocus?: boolean
}

/**
---
category: components
---
**/

@withStyle(generateStyle, null)
@testable()
class Pagination extends Component<Props> {
  static componentId = 'Pagination'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type Pagination.Page
     */
    children: Children.oneOf([PaginationButton]),
    /**
     * Disables interaction with all pages
     */
    disabled: PropTypes.bool,
    /**
     * Visible label for component
     */
    label: PropTypes.node,
    /**
     * Accessible label for next button
     */
    labelNext: PropTypes.string,
    /**
     * Accessible label for previous button
     */
    labelPrev: PropTypes.string,
    /**
     * The compact variant truncates the page navigation to show only the first,
     * last, and pages immediately surrounding the current page. Fewer than 5 pages,
     * no next/previous arrow buttons will be shown, and all pages will be listed
     */
    variant: PropTypes.oneOf(['full', 'compact']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * the element type to render as
     */
    as: PropTypes.elementType,
    /**
     * provides a reference to the underlying html root element
     */
    elementRef: PropTypes.func,
    /**
     * For accessibility, Pagination sets focus on the first or last Pagination.Pages,
     * respectively, when the Previous or Next arrow buttons are removed from the DOM.
     * Set this property to `false` to prevent this behavior.
     */
    shouldHandleFocus: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    label: undefined,
    labelNext: undefined,
    labelPrev: undefined,
    margin: undefined,
    disabled: false,
    variant: 'full',
    as: 'div',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    shouldHandleFocus: true
  }

  static Page = PaginationButton
  static Navigation = PaginationArrowButton

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  constructor(...args) {
    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
    super(...args)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'Pagina... Remove this comment to see the full error message
    this._labelId = uid('Pagination')

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_prevButton' does not exist on type 'Pag... Remove this comment to see the full error message
    this._prevButton = null
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_nextButton' does not exist on type 'Pag... Remove this comment to see the full error message
    this._nextButton = null
  }

  getSnapshotBeforeUpdate() {
    const activeElement = getActiveElement()

    return {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_prevButton' does not exist on type 'Pag... Remove this comment to see the full error message
      prevButtonFocused: this._prevButton === activeElement,
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_nextButton' does not exist on type 'Pag... Remove this comment to see the full error message
      nextButtonFocused: this._nextButton === activeElement
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
    if (
      !this.props.shouldHandleFocus ||
      (!propsHaveCompactView(prevProps) && !propsHaveCompactView(this.props))
    ) {
      return
    }

    const { prevButtonFocused, nextButtonFocused } = snapshot || {}

    if (prevButtonFocused || nextButtonFocused) {
      // @ts-expect-error ts-migrate(2339) FIXME:
      const focusable = findTabbable(this._root)
      const focusIndex = prevButtonFocused ? 0 : focusable.length - 1
      // @ts-expect-error ts-migrate(2554) FIXME:
      focusable[focusIndex].focus()
    }
  }

  get compactView() {
    return propsHaveCompactView(this.props)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'children' implicitly has an 'any' type.
  transferDisabledPropToChildren(children) {
    return this.props.disabled
      ? React.Children.map(children, (page) =>
          React.cloneElement(page, { disabled: this.props.disabled })
        )
      : children
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    if (el) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'Paginatio... Remove this comment to see the full error message
      this._root = el
      if (typeof this.props.elementRef === 'function') {
        this.props.elementRef(el)
      }
    }
  }

  renderLabel() {
    const display = this.props.variant === 'compact' ? 'block' : 'inline-block'
    const visibleLabel = hasVisibleChildren(this.props.label)

    return (
      <View
        as="span"
        padding={visibleLabel ? 'small' : '0'}
        display={visibleLabel ? display : 'auto'}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'Pagina... Remove this comment to see the full error message
        id={this._labelId}
      >
        {this.props.label}
      </View>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentPageIndex' implicitly has an 'an... Remove this comment to see the full error message
  renderPages(currentPageIndex) {
    const allPages = this.props.children
    let visiblePages = allPages

    if (this.compactView) {
      const firstIndex = 0
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      const lastIndex = allPages.length - 1

      const sliceStart = Math.min(
        lastIndex - 3,
        Math.max(currentPageIndex - 1, firstIndex)
      )
      const sliceEnd = Math.min(currentPageIndex + 4, lastIndex)

      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      visiblePages = allPages.slice(sliceStart, sliceEnd)

      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      const firstPage = allPages[firstIndex]
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      const lastPage = allPages[lastIndex]

      if (sliceStart - firstIndex > 1)
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        visiblePages.unshift(
          <span key="first" aria-hidden="true">
            &hellip;
          </span>
        )
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      if (sliceStart - firstIndex > 0) visiblePages.unshift(firstPage)
      if (lastIndex - sliceEnd + 1 > 1)
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        visiblePages.push(
          <span key="last" aria-hidden="true">
            &hellip;
          </span>
        )
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      if (lastIndex - sliceEnd + 1 > 0) visiblePages.push(lastPage)
    }

    return (
      <View display="inline-block">
        {this.transferDisabledPropToChildren(visiblePages)}
      </View>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'label' implicitly has an 'any' type.
  renderArrowButton(label, direction, currentPageIndex) {
    // eslint-disable-next-line react/prop-types
    const { onClick, disabled } =
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
      this.props.children[currentPageIndex + direction].props

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    const handleButtonRef = (el) => {
      if (direction < 0) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_prevButton' does not exist on type 'Pag... Remove this comment to see the full error message
        this._prevButton = el
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_nextButton' does not exist on type 'Pag... Remove this comment to see the full error message
        this._nextButton = el
      }
    }

    return (
      <PaginationArrowButton
        direction={direction === -1 ? 'prev' : 'next'}
        label={label}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        onClick={onClick}
        disabled={disabled}
        buttonRef={handleButtonRef}
      />
    )
  }

  render() {
    if (!this.props.children) return null

    const currentPageIndex = fastFindIndex(
      this.props.children,
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'p' implicitly has an 'any' type.
      (p) => p && p.props && p.props.current
    )

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Pagination.propTypes),
      Pagination
    )

    return (
      <View
        {...passthroughProps}
        role="navigation"
        as={this.props.as}
        elementRef={this.handleElementRef}
        margin={this.props.margin}
        css={this.props.styles.pagination}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'Pagina... Remove this comment to see the full error message
        aria-labelledby={this.props.label && this._labelId}
      >
        {this.props.label && this.renderLabel()}
        <View display="inline-block" css={this.props.styles.pages}>
          {shouldShowPrevButton(this.props, currentPageIndex) &&
            this.renderArrowButton(this.props.labelPrev, -1, currentPageIndex)}
          {this.renderPages(currentPageIndex)}
          {shouldShowNextButton(this.props, currentPageIndex) &&
            this.renderArrowButton(this.props.labelNext, 1, currentPageIndex)}
        </View>
      </View>
    )
  }
}

export default Pagination
export { Pagination, PaginationButton }
