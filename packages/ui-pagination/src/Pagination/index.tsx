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
  cloneElement,
  Children,
  Component,
  ReactElement,
  ReactNode
} from 'react'

import { View } from '@instructure/ui-view'
import { omitProps, withDeterministicId } from '@instructure/ui-react-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { findTabbable, getActiveElement } from '@instructure/ui-dom-utils'
import { withStyle } from '@instructure/emotion'

import { PaginationButton } from './PaginationButton'
import { PaginationArrowButton } from './PaginationArrowButton'
import { PaginationPageInput } from './PaginationPageInput'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { PaginationPageProps } from './PaginationButton/props'
import type { PaginationArrowDirections } from './PaginationArrowButton/props'

import { allowedProps } from './props'
import type { PaginationProps, PaginationSnapshot, ChildPage } from './props'

/** This is an [].findIndex optimized to work on really big, but sparse, arrays */
const fastFindIndex = (
  arr: ChildPage[],
  fn: (page: ChildPage) => boolean | undefined
) => Number(Object.keys(arr).find((k) => fn(arr[Number(k)])))

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
  if (props.children)
    return props.variant === 'compact' && childrenArray(props).length > 5
  return props.variant === 'compact' && props.totalPageNumber! > 5
}

type ArrowConfig = {
  pageIndex: number
  label: string
  shouldEnableIcon: boolean
  handleButtonRef: (el: Element | null) => void
}

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class Pagination extends Component<PaginationProps> {
  static readonly componentId = 'Pagination'

  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    withFirstAndLastButton: false,
    showDisabledButtons: false,
    variant: 'full',
    as: 'div',
    labelNumberInput: (numberOfPages: number) => `of ${numberOfPages}`,
    screenReaderLabelNumberInput: (
      currentPage: number,
      numberOfPages: number
    ) => `Select page (${currentPage} of ${numberOfPages})`,
    shouldHandleFocus: true,
    totalPageNumber: 0,
    currentPage: 1,
    siblingCount: 1,
    boundaryCount: 1,
    ellipsis: '…',
    renderPageIndicator: (page: number) => page,
    margin: 'space8'
  }

  static Page = PaginationButton
  static Navigation = PaginationArrowButton

  private readonly _labelId: string

  private _firstButton: HTMLButtonElement | null = null
  private _prevButton: HTMLButtonElement | null = null
  private _nextButton: HTMLButtonElement | null = null
  private _lastButton: HTMLButtonElement | null = null

  ref: Element | null = null
  currentPageRef: PaginationButton | null = null

  constructor(props: PaginationProps) {
    super(props)

    this._labelId = props.deterministicId!()
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

    // set focus on the currently active page
    if (
      this.props.currentPage !== prevProps.currentPage &&
      document.activeElement !== this._firstButton &&
      document.activeElement !== this._prevButton &&
      document.activeElement !== this._nextButton &&
      document.activeElement !== this._lastButton
    ) {
      // @ts-expect-error fix typing
      this.currentPageRef?.ref?.focus?.()
    }

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

      ;(nextFocusElement as HTMLElement)?.focus()
    }
  }

  get compactView() {
    return propsHaveCompactView(this.props)
  }

  transferDisabledPropToChildren(children: PaginationProps['children']) {
    return children && this.props.disabled
      ? Children.map(children, (page) =>
          cloneElement(page, { disabled: this.props.disabled })
        )
      : children
  }

  handleElementRef = (el: Element | null) => {
    this.ref = el
    if (el && typeof this.props.elementRef === 'function') {
      this.props.elementRef(el)
    }
  }

  handleInputRef = (el: HTMLInputElement | null) => {
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
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

  renderDefaultPageInput = () => {
    const { currentPage, totalPageNumber } = this.props
    return (
      <PaginationPageInput
        numberOfPages={totalPageNumber!}
        currentPageIndex={currentPage! - 1}
        onChange={(_e, nextPageIndex) =>
          this.props.onPageChange?.(nextPageIndex + 1, currentPage!)
        }
        screenReaderLabel={this.props.screenReaderLabelNumberInput!}
        label={this.props.labelNumberInput}
        disabled={this.props.disabled}
        inputRef={this.handleInputRef}
      />
    )
  }

  renderPageInput(currentPageIndex: number) {
    if (!this.props.children) return this.renderDefaultPageInput()
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

  handleInputChange(
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>,
    pageIndex: number
  ) {
    this.childPages[pageIndex].props.onClick?.(event)
  }

  handleNavigation = (nextIndex: number, previousIndex: number) => {
    const { onPageChange } = this.props
    if (typeof onPageChange === 'function') {
      onPageChange(nextIndex, previousIndex)
    }
  }

  renderPagesInInterval = (from: number, to: number, currentPage: number) => {
    if (to - from > 1000)
      throw new Error('Pagination: too many pages (more than 1000)')
    const pages: ReactElement[] = []
    for (let i = from; i <= to; i++) {
      pages.push(
        <Pagination.Page
          ref={(e) => {
            if (i === currentPage) {
              this.currentPageRef = e
            }
          }}
          key={i}
          onClick={() => this.handleNavigation(i, currentPage)}
          current={i === currentPage}
          {...(this.props.screenReaderLabelPageButton
            ? {
                screenReaderLabel: this.props.screenReaderLabelPageButton(
                  i,
                  this.props.totalPageNumber!
                )
              }
            : {})}
        >
          {this.props.renderPageIndicator?.(i, currentPage)}
        </Pagination.Page>
      )
    }
    return pages
  }

  renderDefaultPages = () => {
    const {
      ellipsis,
      currentPage,
      totalPageNumber,
      siblingCount,
      boundaryCount,
      variant
    } = this.props
    const pages: ReactNode[] = []
    if (
      totalPageNumber! <= 2 * boundaryCount! ||
      totalPageNumber! <= 1 + siblingCount! + boundaryCount! ||
      variant === 'full'
    ) {
      return (
        <ul css={this.props.styles?.pageIndicatorList}>
          {this.renderPagesInInterval(1, totalPageNumber!, currentPage!)}
        </ul>
      )
    }

    if (currentPage! > boundaryCount! + siblingCount! + 1) {
      pages.push(this.renderPagesInInterval(1, boundaryCount!, currentPage!))
      pages.push(
        <li key="ellipsis1" style={{ all: 'unset' }}>
          {ellipsis}
        </li>
      )
      if (
        currentPage! - siblingCount! >
        totalPageNumber! - boundaryCount! + 1
      ) {
        pages.push(
          this.renderPagesInInterval(
            totalPageNumber! - boundaryCount! + 1,
            totalPageNumber!,
            currentPage!
          )
        )
        return <ul css={this.props.styles?.pageIndicatorList}>{pages}</ul>
      }
      pages.push(
        this.renderPagesInInterval(
          currentPage! - siblingCount!,
          currentPage!,
          currentPage!
        )
      )
    } else {
      pages.push(
        this.renderPagesInInterval(
          1,
          Math.max(currentPage!, boundaryCount!),
          currentPage!
        )
      )
    }

    if (currentPage! < totalPageNumber! - (siblingCount! + boundaryCount!)) {
      pages.push(
        this.renderPagesInInterval(
          Math.max(currentPage!, boundaryCount!) + 1,
          currentPage! + siblingCount!,
          currentPage!
        )
      )
      pages.push(
        <li key="ellipsis2" style={{ all: 'unset' }}>
          {ellipsis}
        </li>
      )
      pages.push(
        this.renderPagesInInterval(
          totalPageNumber! - boundaryCount! + 1,
          totalPageNumber!,
          currentPage!
        )
      )
    } else {
      pages.push(
        this.renderPagesInInterval(
          currentPage! + 1,
          totalPageNumber!,
          currentPage!
        )
      )
    }
    return <ul css={this.props.styles?.pageIndicatorList}>{pages}</ul>
  }

  renderPages(currentPageIndex: number) {
    if (!this.props.children) return this.renderDefaultPages()
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
          <li style={{ all: 'unset' }} key="first" aria-hidden="true">
            {this.props.ellipsis}
          </li>
        )
      if (sliceStart - firstIndex > 0) visiblePages.unshift(firstPage)
      if (lastIndex - sliceEnd + 1 > 1)
        visiblePages.push(
          <li style={{ all: 'unset' }} key="last" aria-hidden="true">
            {this.props.ellipsis}
          </li>
        )
      if (lastIndex - sliceEnd + 1 > 0) visiblePages.push(lastPage)
    }

    return (
      <View display="inline-block" as="ul" margin="0" padding="0">
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
            this._firstButton = el as HTMLButtonElement
          }
        }
      case 'prev':
        return {
          pageIndex: currentPageIndex - 1,
          label: this.props.labelPrev || 'Previous Page',
          shouldEnableIcon: currentPageIndex > 0,
          handleButtonRef: (el) => {
            this._prevButton = el as HTMLButtonElement
          }
        }
      case 'next':
        return {
          pageIndex: currentPageIndex + 1,
          label: this.props.labelNext || 'Next Page',
          shouldEnableIcon: currentPageIndex < pagesCount - 1,
          handleButtonRef: (el) => {
            this._nextButton = el as HTMLButtonElement
          }
        }
      case 'last':
        return {
          pageIndex: pagesCount - 1,
          label: this.props.labelLast || 'Last Page',
          shouldEnableIcon: currentPageIndex < pagesCount - 2,
          handleButtonRef: (el) => {
            this._lastButton = el as HTMLButtonElement
          }
        }
    }
  }

  renderDefaultArrowButton = (direction: PaginationArrowDirections) => {
    if (
      !this.withFirstAndLastButton &&
      (direction === 'first' || direction === 'last')
    ) {
      return null
    }
    // We don't display the arrows in "compact" variant under 6 items
    if (!(propsHaveCompactView(this.props) || this.inputMode)) {
      return null
    }
    const { totalPageNumber, currentPage } = this.props
    const { label, shouldEnableIcon, handleButtonRef } = this.getArrowVariant(
      direction,
      currentPage! - 1,
      totalPageNumber!
    )

    const disabled = this.props.disabled || !shouldEnableIcon
    const onClick = () => {
      if (direction === 'first') {
        this.handleNavigation(1, currentPage!)
      }
      if (direction === 'prev') {
        this.handleNavigation(Math.max(currentPage! - 1, 1), currentPage!)
      }
      if (direction === 'next') {
        this.handleNavigation(
          Math.min(currentPage! + 1, totalPageNumber!),
          currentPage!
        )
      }
      if (direction === 'last') {
        this.handleNavigation(totalPageNumber!, currentPage!)
      }
    }

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

  renderArrowButton(
    direction: PaginationArrowDirections,
    currentPageIndex: number
  ) {
    if (!this.props.children) return this.renderDefaultArrowButton(direction)
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

    const { pageIndex, label, shouldEnableIcon, handleButtonRef } =
      this.getArrowVariant(direction, currentPageIndex, childPages.length)

    const page = childPages[pageIndex]

    const disabled =
      page?.props?.disabled || this.props.disabled || !shouldEnableIcon
    const onClick = page?.props?.onClick

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
    const currentPageIndex = fastFindIndex(
      this.childPages,
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
        data-cid="Pagination"
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
