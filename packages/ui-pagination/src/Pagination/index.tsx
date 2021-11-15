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

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { findTabbable, getActiveElement } from '@instructure/ui-dom-utils'
import { withStyle, jsx } from '@instructure/emotion'

import { PaginationButton } from './PaginationButton'
import { PaginationArrowButton } from './PaginationArrowButton'
import { PaginationPageInput } from './PaginationPageInput'

import generateStyle from './styles'

import type { PaginationPageProps } from './PaginationButton/props'
import type {
  PaginationNavigationProps,
  PaginationArrowDirections
} from './PaginationArrowButton/props'

import { propTypes, allowedProps } from './props'
import type { PaginationProps, PaginationSnapshot } from './props'

/** This is an [].findIndex optimized to work on really big, but sparse, arrays */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'arr' implicitly has an 'any' type.
const fastFindIndex = (arr, fn) =>
  Number(Object.keys(arr).find((k) => fn(arr[Number(k)])))

const childrenArray = (props: PaginationProps) => {
  const { children } = props

  if (!children) {
    return []
  }

  return Array.isArray(children)
    ? (children as React.ReactElement<PaginationPageProps>[])
    : ([children] as React.ReactElement<PaginationPageProps>[])
}

function propsHaveCompactView(props: PaginationProps) {
  return props.variant === 'compact' && childrenArray(props).length > 5
}

type ArrowConfig = {
  pageIndex: number
  label: string
  shouldEnableIcon: boolean
  handleButtonRef: (el: HTMLButtonElement) => void
}

/**
---
category: components
---
**/

@withStyle(generateStyle, null)
@testable()
class Pagination extends Component<PaginationProps> {
  static readonly componentId = 'Pagination'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    disabled: false,
    withFirstAndLastButton: false,
    showDisabledButtons: false,
    variant: 'full',
    as: 'div',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    labelNumberInput: (numberOfPages: number) => `of ${numberOfPages}`,
    screenReaderLabelNumberInput: (
      currentPage: number,
      numberOfPages: number
    ) => `Select page (${currentPage} of ${numberOfPages})`,
    shouldHandleFocus: true
  }

  static Page = PaginationButton
  static Navigation = PaginationArrowButton

  _labelId: string

  ref: Element | null = null
  _inputRef: Element | null = null

  _firstButton: HTMLButtonElement | null = null
  _prevButton: HTMLButtonElement | null = null
  _nextButton: HTMLButtonElement | null = null
  _lastButton: HTMLButtonElement | null = null

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  constructor(...args) {
    // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
    super(...args)

    this._labelId = uid('Pagination')
  }

  get _root() {
    console.warn(
      '_root property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  get inputMode() {
    return this.props.variant === 'input'
  }

  get childPages() {
    return childrenArray(this.props)
  }

  get withFirstAndLastButton() {
    return this.inputMode || this.props.withFirstAndLastButton
  }

  get showDisabledButtons() {
    return this.inputMode || this.props.showDisabledButtons
  }

  getSnapshotBeforeUpdate(): PaginationSnapshot {
    const activeElement = getActiveElement()

    if (
      activeElement === this._firstButton ||
      activeElement === this._prevButton ||
      activeElement === this._nextButton ||
      activeElement === this._lastButton
    ) {
      return { lastFocusedButton: activeElement as HTMLButtonElement }
    } else {
      return { lastFocusedButton: undefined }
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(
    prevProps: PaginationProps,
    _prevState: unknown,
    snapshot: PaginationSnapshot
  ) {
    this.props.makeStyles?.()

    if (
      !this.props.shouldHandleFocus ||
      (!propsHaveCompactView(prevProps) && !propsHaveCompactView(this.props))
    ) {
      return
    } else {
      this.focusElementAfterUpdate(snapshot)
    }
  }

  focusElementAfterUpdate(snapshot: PaginationSnapshot) {
    const { lastFocusedButton } = snapshot

    if (lastFocusedButton) {
      const focusable = findTabbable(this.ref)
      const direction = lastFocusedButton.dataset.direction

      // By default we want to focus the previously focused button
      let nextFocusElement: Element = lastFocusedButton

      // In case the button is not focusable anymore
      // (disabled or not in the DOM), we focus to the next available page
      if (!focusable.includes(nextFocusElement)) {
        if (direction === 'first' || direction === 'prev') {
          nextFocusElement = focusable[0]
        }
        if (direction === 'next' || direction === 'last') {
          nextFocusElement = focusable[focusable.length - 1]
        }
      }

      ;(nextFocusElement as HTMLElement).focus()
    }
  }

  get compactView() {
    return propsHaveCompactView(this.props)
  }

  transferDisabledPropToChildren(children: PaginationProps['children']) {
    return children && this.props.disabled
      ? React.Children.map(children, (page) =>
          React.cloneElement(page, { disabled: this.props.disabled })
        )
      : children
  }

  handleElementRef = (el: Element | null) => {
    this.ref = el
    if (el) {
      if (typeof this.props.elementRef === 'function') {
        this.props.elementRef(el)
      }
    }
  }

  handleInputRef = (el: Element | null) => {
    this._inputRef = el
  }

  renderLabel() {
    const display = this.props.variant === 'full' ? 'inline-block' : 'block'
    const visibleLabel = hasVisibleChildren(this.props.label)

    return (
      <View
        as="span"
        padding={visibleLabel ? 'small' : '0'}
        display={visibleLabel ? display : 'auto'}
        id={this._labelId}
      >
        {this.props.label}
      </View>
    )
  }

  renderPageInput(currentPageIndex: number) {
    return (
      <PaginationPageInput
        numberOfPages={this.childPages.length}
        currentPageIndex={currentPageIndex}
        onChange={this.handleInputChange.bind(this)}
        screenReaderLabel={this.props.screenReaderLabelNumberInput!}
        label={this.props.labelNumberInput}
        disabled={this.props.disabled}
        inputRef={this.handleInputRef}
      />
    )
  }

  handleInputChange(event: Event, pageIndex: number) {
    this.childPages[pageIndex].props.onClick?.(event as any)
  }

  renderPages(currentPageIndex: number) {
    const allPages = this.childPages
    let visiblePages = allPages

    if (this.compactView) {
      const firstIndex = 0
      const lastIndex = allPages.length - 1

      const sliceStart = Math.min(
        lastIndex - 3,
        Math.max(currentPageIndex - 1, firstIndex)
      )
      const sliceEnd = Math.min(currentPageIndex + 4, lastIndex)

      visiblePages = allPages.slice(sliceStart, sliceEnd)

      const firstPage = allPages[firstIndex]
      const lastPage = allPages[lastIndex]

      if (sliceStart - firstIndex > 1)
        visiblePages.unshift(
          <span key="first" aria-hidden="true">
            &hellip;
          </span>
        )
      if (sliceStart - firstIndex > 0) visiblePages.unshift(firstPage)
      if (lastIndex - sliceEnd + 1 > 1)
        visiblePages.push(
          <span key="last" aria-hidden="true">
            &hellip;
          </span>
        )
      if (lastIndex - sliceEnd + 1 > 0) visiblePages.push(lastPage)
    }

    return (
      <View display="inline-block">
        {this.transferDisabledPropToChildren(visiblePages)}
      </View>
    )
  }

  getArrowVariant(
    direction: PaginationArrowDirections,
    currentPageIndex: number,
    pagesCount: number
  ): ArrowConfig {
    switch (direction) {
      case 'first':
        return {
          pageIndex: 0,
          label: this.props.labelFirst || 'First Page',
          shouldEnableIcon: currentPageIndex > 1,
          handleButtonRef: (el) => {
            this._firstButton = el
          }
        }
      case 'prev':
        return {
          pageIndex: currentPageIndex - 1,
          label: this.props.labelPrev || 'Previous Page',
          shouldEnableIcon: currentPageIndex > 0,
          handleButtonRef: (el) => {
            this._prevButton = el
          }
        }
      case 'next':
        return {
          pageIndex: currentPageIndex + 1,
          label: this.props.labelNext || 'Next Page',
          shouldEnableIcon: currentPageIndex < pagesCount - 1,
          handleButtonRef: (el) => {
            this._nextButton = el
          }
        }
      case 'last':
        return {
          pageIndex: pagesCount - 1,
          label: this.props.labelLast || 'Last Page',
          shouldEnableIcon: currentPageIndex < pagesCount - 2,
          handleButtonRef: (el) => {
            this._lastButton = el
          }
        }
    }
  }

  renderArrowButton(
    direction: PaginationArrowDirections,
    currentPageIndex: number
  ) {
    const { childPages } = this

    // We don't display the arrows in "compact" variant under 6 items
    if (!(propsHaveCompactView(this.props) || this.inputMode)) {
      return null
    }

    if (
      !this.withFirstAndLastButton &&
      (direction === 'first' || direction === 'last')
    ) {
      return null
    }

    const {
      pageIndex,
      label,
      shouldEnableIcon,
      handleButtonRef
    } = this.getArrowVariant(direction, currentPageIndex, childPages.length)

    const page = childPages[pageIndex]

    const disabled =
      page?.props?.disabled || this.props.disabled || !shouldEnableIcon
    const onClick = page?.props
      ?.onClick as React.MouseEventHandler<PaginationNavigationProps>

    return shouldEnableIcon || this.showDisabledButtons ? (
      <PaginationArrowButton
        direction={direction}
        data-direction={direction}
        label={label}
        onClick={onClick}
        disabled={disabled}
        buttonRef={handleButtonRef}
      />
    ) : null
  }

  render() {
    if (!this.props.children) return null

    const currentPageIndex = fastFindIndex(
      this.props.children,
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'p' implicitly has an 'any' type.
      (p) => p && p.props && p.props.current
    )

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Pagination.allowedProps),
      Pagination
    )

    return (
      <View
        {...passthroughProps}
        role="navigation"
        as={this.props.as}
        elementRef={this.handleElementRef}
        margin={this.props.margin}
        css={this.props.styles?.pagination}
        aria-labelledby={this.props.label ? this._labelId : undefined}
      >
        {this.props.label && this.renderLabel()}
        <View display="inline-block" css={this.props.styles?.pages}>
          {this.renderArrowButton('first', currentPageIndex)}
          {this.renderArrowButton('prev', currentPageIndex)}

          {this.inputMode
            ? this.renderPageInput(currentPageIndex)
            : this.renderPages(currentPageIndex)}

          {this.renderArrowButton('next', currentPageIndex)}
          {this.renderArrowButton('last', currentPageIndex)}
        </View>
      </View>
    )
  }
}

export default Pagination
export { Pagination, PaginationButton }
