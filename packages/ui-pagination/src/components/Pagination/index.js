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

import Button from '@instructure/ui-elements/lib/components/Button'
import Container from '@instructure/ui-container/lib/components/Container'

import IconLeft from '@instructure/ui-icons/lib/Solid/IconArrowOpenLeft'
import IconRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

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
    variant: PropTypes.oneOf(['full', 'compact'])
  }

  static defaultProps = {
    disabled: false,
    variant: 'full'
  }

  hasCurrentPage () {
    return this._current >= 0
  }

  isCompact () {
    return this.props.variant === 'compact' && this.hasCurrentPage()
  }

  renderLabel () {
    if (this.props.label) {
      const display = this.isCompact() ? 'block' : 'inline'
      return (
        <Container padding="small" display={display}>{this.props.label}</Container>
      )
    }
  }

  renderPages () {
    const allPages = this._pages
    let pages = allPages

    if (this.isCompact()) {
      const firstIndex = 0
      const lastIndex = allPages.length - 1

      const sliceStart = Math.max(this._current - 1, firstIndex)
      const sliceEnd = Math.min(this._current + 4, lastIndex)
      pages = allPages.slice(sliceStart, sliceEnd)

      const firstPage = allPages[firstIndex]
      const lastPage = allPages[lastIndex]

      if ((sliceStart - firstIndex) > 1) pages.unshift(<span key="first" aria-hidden>...</span>)
      if ((sliceStart - firstIndex) > 0) pages.unshift(firstPage)
      if ((lastIndex - sliceEnd + 1) > 1) pages.push(<span key="last" aria-hidden>...</span>)
      if ((lastIndex - sliceEnd + 1) > 0) pages.push(lastPage)
    }

    return (
      <Container display="inline">
        {pages}
      </Container>
    )
  }

  renderArrowButton (Icon, title) {
    if (this.isCompact()) {
      const diff = Icon === IconLeft ? -1 : 1
      const relPage = this._pages[this._current + diff]
      const relProps = omitProps(relPage.props, PaginationButton.propTypes)
      return (
        <Button
          variant="icon"
          {...relProps}
          title={title}
        >
          <Icon />
        </Button>
      )
    }
  }

  render () {
    this._pages = React.Children.map(this.props.children,
      (page) => React.cloneElement(page, { disabled: this.props.disabled })
    )
    // Don't render for single or empty pages
    if (this._pages.length < 2) return null

    this._current = this._pages.findIndex((p) => p.props.current)
    const props = omitProps(this.props, Pagination.propTypes, ['padding', 'margin'])

    return (
      <Container role="navigation" as="div" {...props} className={styles.root}>
        {this.renderLabel()}
        <Container display="inline" className={styles.pages}>
          {this._current > 0 && this.renderArrowButton(IconLeft, this.props.labelPrev)}
          {this.renderPages()}
          {this._current < this._pages.length - 1 && this.renderArrowButton(IconRight, this.props.labelNext)}
        </Container>
      </Container>
    )
  }
}

export { default as PaginationButton } from './PaginationButton'
