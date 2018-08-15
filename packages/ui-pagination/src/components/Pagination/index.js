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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@instructure/ui-buttons/lib/components/Button'
import View from '@instructure/ui-layout/lib/components/View'

import IconStart from '@instructure/ui-icons/lib/Solid/IconArrowOpenStart'
import IconEnd from '@instructure/ui-icons/lib/Solid/IconArrowOpenEnd'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import findTabbable from '@instructure/ui-a11y/lib/utils/findTabbable'
import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import PaginationButton from './PaginationButton'
import theme from './theme'
import styles from './styles.css'

/** This is an [].findIndex optimized to work on really big, but sparse, arrays */
const fastFindIndex = (arr, fn) => Number(Object.keys(arr).find(k => fn(arr[Number(k)])))

function propsHaveCompactView (props) {
  return props.variant === 'compact' && props.children.length > 5
}

function shouldShowPrevButton (props, currentPageIndex) {
  return propsHaveCompactView(props) && (currentPageIndex > 0)
}

function shouldShowNextButton (props, currentPageIndex) {
  return propsHaveCompactView(props) && (currentPageIndex < props.children.length - 1)
}

/**
---
category: components/navigation
---
**/
@themeable(theme, styles)
export default class Pagination extends Component {
  static propTypes = {
    /**
    * children of type PaginationButton
    */
    children: CustomPropTypes.Children.oneOf([PaginationButton]),
    /**
    * Disables interaction with all pages
    */
    disabled: PropTypes.bool,
    /**
    * Visible label for component
    */
    label: PropTypes.string,
    /**
    * Accessible label for next button
    */
    labelNext: PropTypes.string,
    /**
    * Accessible label for previous button
    */
    labelPrev: PropTypes.string,
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
    as: CustomPropTypes.elementType,
    /**
    * provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    /**
    * For accessibility, Pagination sets focus on the first or last PaginationButtons,
    * respectively, when the Previous or Next arrow buttons are removed from the DOM.
    * Set this property to `false` to prevent this behavior.
    */
    shouldHandleFocus: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    variant: 'full',
    as: 'div',
    elementRef: (el) => {},
    shouldHandleFocus: true
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.shouldHandleFocus) {
      return
    }

    if (!propsHaveCompactView(this.props) && !propsHaveCompactView(nextProps)) {
      return
    }

    const focusable = findTabbable(this._root)
    if (focusable[0] === document.activeElement && !shouldShowPrevButton(nextProps)) {
      // Previous Page button has focus, but will no longer be rendered
      this._moveFocusTo = 'first'
      return
    }

    if (focusable[focusable.length - 1] === document.activeElement && !shouldShowNextButton(nextProps)) {
      // Next Page button has focus, but will no longer be rendered
      this._moveFocusTo = 'last'
      return
    }
  }

  componentDidUpdate () {
    if (this.props.shouldHandleFocus === false || this.compactView === false) {
      return
    }

    if (this._moveFocusTo != null) {
      const focusable = findTabbable(this._root)
      const focusIndex = this._moveFocusTo === 'first' ? 0 : focusable.length - 1
      focusable[focusIndex].focus()
      delete this._moveFocusTo
    }
  }

  get compactView () {
    return propsHaveCompactView(this.props)
  }

  transferDisabledPropToChildren(children) {
    return this.props.disabled
      ? React.Children.map(children, page => React.cloneElement(page, { disabled: this.props.disabled }))
      : children
  }

  handleElementRef = (el) => {
    if (el) {
      this._root = el
      if (typeof this.props.elementRef === 'function') {
        this.props.elementRef(el)
      }
    }
  }

  renderLabel () {
    if (this.props.label) {
      const display = (this.props.variant === 'compact') ? 'block' : 'inline-block'
      return (
        <View padding="small" display={display}>{this.props.label}</View>
      )
    }
  }

  renderPages (currentPageIndex) {
    const allPages = this.props.children
    let visiblePages = allPages

    if (this.compactView) {
      const firstIndex = 0
      const lastIndex = allPages.length - 1

      const sliceStart = Math.max(currentPageIndex - 1, firstIndex)
      const sliceEnd = Math.min(currentPageIndex + 4, lastIndex)

      visiblePages = allPages.slice(sliceStart, sliceEnd)

      const firstPage = allPages[firstIndex]
      const lastPage = allPages[lastIndex]

      if ((sliceStart - firstIndex) > 1) visiblePages.unshift(<span key="first" aria-hidden="true">...</span>)
      if ((sliceStart - firstIndex) > 0) visiblePages.unshift(firstPage)
      if ((lastIndex - sliceEnd + 1) > 1) visiblePages.push(<span key="last" aria-hidden="true">...</span>)
      if ((lastIndex - sliceEnd + 1) > 0) visiblePages.push(lastPage)
    }

    return (
      <View display="inline-block">{this.transferDisabledPropToChildren(visiblePages)}</View>
    )
  }

  renderArrowButton (icon, label, direction, currentPageIndex) {
    const { onClick, disabled } = this.props.children[currentPageIndex + direction].props
    return (
      <Tooltip tip={<PresentationContent>{label}</PresentationContent>}>
        <Button
          onClick={onClick}
          disabled={this.props.disabled || disabled}
          variant="icon"
          size="small"
          icon={icon}
        >
          <ScreenReaderContent>{label}</ScreenReaderContent>
        </Button>
      </Tooltip>
    )
  }

  render () {
    const currentPageIndex = fastFindIndex(this.props.children, p => p && p.props && p.props.current)

    return (
      <View
        {...omitProps(this.props, { ...Pagination.propTypes, ...View.propTypes })}
        role="navigation"
        as={this.props.as}
        elementRef={this.handleElementRef}
        margin={this.props.margin}
        className={styles.root}
      >
        {this.renderLabel()}
        <View display="inline-block" className={styles.pages}>
          { shouldShowPrevButton(this.props, currentPageIndex) && this.renderArrowButton(IconStart, this.props.labelPrev, -1, currentPageIndex) }
          { this.renderPages(currentPageIndex) }
          { shouldShowNextButton(this.props, currentPageIndex) && this.renderArrowButton(IconEnd, this.props.labelNext, 1, currentPageIndex) }
        </View>
      </View>
    )
  }
}

export { default as PaginationButton } from './PaginationButton'
