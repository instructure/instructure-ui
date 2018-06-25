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
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PaginationButton from './PaginationButton'
import theme from './theme'
import styles from './styles.css'

function propsHaveCompactView (props) {
  return props.variant === 'compact' && props.children.length > 5
}

function getCurrentPageIndex (props) {
  return props.children.findIndex((p) => p.props.current)
}

function shouldShowPrevButton (props) {
  return propsHaveCompactView(props) && getCurrentPageIndex(props) > 0
}

function shouldShowNextButton (props) {
  return propsHaveCompactView(props) && getCurrentPageIndex(props) < props.children.length - 1
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

  get pages () {
    return React.Children.map(this.props.children,
      (page) => React.cloneElement(page, { disabled: this.props.disabled })
    )
  }

  get currentPageIndex () {
    return getCurrentPageIndex(this.props)
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

  renderArrowButton (icon, title, direction) {
    const { onClick, disabled } = this.pages[this.currentPageIndex + direction].props
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="icon"
        size="small"
        title={title}
        icon={icon}
      >
        <ScreenReaderContent>{title}</ScreenReaderContent>
      </Button>
    )
  }

  get showPrevButton () {
    return shouldShowPrevButton(this.props)
  }

  get showNextButton () {
    return shouldShowNextButton(this.props)
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
          { this.showPrevButton ? this.renderArrowButton(IconStart, this.props.labelPrev, -1) : null }
          { this.renderPages() }
          { this.showNextButton ? this.renderArrowButton(IconEnd, this.props.labelNext, 1) : null }
        </View>
      </View>
    )
  }
}

export { default as PaginationButton } from './PaginationButton'
