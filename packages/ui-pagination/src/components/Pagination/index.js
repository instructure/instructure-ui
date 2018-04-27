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

import IconLeft from '@instructure/ui-icons/lib/Solid/IconArrowOpenLeft'
import IconRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import findTabbable from '@instructure/ui-a11y/lib/utils/findTabbable'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PaginationButton from './PaginationButton'
import theme from './theme'
import styles from './styles.css'

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

  componentDidUpdate () {
    if (this.props.shouldHandleFocus === false || this.compactView === false) {
      return
    }

    const focusable = findTabbable(this._root)

    if (this.currentPageIndex === (this.pages.length - 1)) { // last page
      focusable[focusable.length - 1].focus()
    } else if (this.currentPageIndex === 0) { // first page
      focusable[0].focus()
    }
  }

  get compactView () {
    return (this.props.variant === 'compact') && this.pages.length > 5
  }

  get pages () {
    return React.Children.map(this.props.children,
      (page) => React.cloneElement(page, { disabled: this.props.disabled })
    )
  }

  get currentPageIndex () {
    return this.pages.findIndex((p) => p.props.current)
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

  renderPages () {
    const allPages = [...this.pages]
    let visiblePages = [...allPages]

    if (this.compactView) {
      const firstIndex = 0
      const lastIndex = allPages.length - 1

      const sliceStart = Math.max(this.currentPageIndex - 1, firstIndex)
      const sliceEnd = Math.min(this.currentPageIndex + 4, lastIndex)

      visiblePages = allPages.slice(sliceStart, sliceEnd)

      const firstPage = allPages[firstIndex]
      const lastPage = allPages[lastIndex]

      if ((sliceStart - firstIndex) > 1) visiblePages.unshift(<span key="first" aria-hidden="true">...</span>)
      if ((sliceStart - firstIndex) > 0) visiblePages.unshift(firstPage)
      if ((lastIndex - sliceEnd + 1) > 1) visiblePages.push(<span key="last" aria-hidden="true">...</span>)
      if ((lastIndex - sliceEnd + 1) > 0) visiblePages.push(lastPage)
    }

    return (
      <View display="inline-block">{visiblePages}</View>
    )
  }

  renderArrowButton (Icon, title, direction) {
    const { onClick, disabled } = this.pages[this.currentPageIndex + direction].props
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="icon"
        title={title}
      >
        <Icon />
        <ScreenReaderContent>{title}</ScreenReaderContent>
      </Button>
    )
  }

  get showPrevButton () {
    return (this.currentPageIndex > 0) && this.compactView
  }

  get showNextButton () {
    return (this.currentPageIndex < this.pages.length - 1) && this.compactView
  }

  render () {
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
          { this.showPrevButton ? this.renderArrowButton(IconLeft, this.props.labelPrev, -1) : null }
          { this.renderPages() }
          { this.showNextButton ? this.renderArrowButton(IconRight, this.props.labelNext, 1) : null }
        </View>
      </View>
    )
  }
}

export { default as PaginationButton } from './PaginationButton'
