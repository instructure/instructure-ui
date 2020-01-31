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

import { IconButton } from '@instructure/ui-buttons'
import { IconArrowOpenStartSolid, IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { themeable } from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DatePicker
---
**/
@themeable(theme, styles)
class DatePickerPagination extends Component {
  static propTypes = {
    previousLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  handlePrevClick = (e) => {
    this.props.onPrev(e)
  }

  handleNextClick = (e) => {
    this.props.onNext(e)
  }

  render () {
    return (
      <div className={styles.root}>
        <IconButton
          withBackground={false}
          withBorder={false}
          onClick={this.handlePrevClick}
          renderIcon={
            <IconArrowOpenStartSolid className={styles.arrowIcon} />
          }
          screenReaderLabel={this.props.previousLabel}
        />
        {this.props.children}
        <IconButton
          withBackground={false}
          withBorder={false}
          onClick={this.handleNextClick}
          renderIcon={
            <IconArrowOpenEndSolid className={styles.arrowIcon} />
          }
          screenReaderLabel={this.props.nextLabel}
        />
      </div>
    )
  }
}

export default DatePickerPagination
export { DatePickerPagination }
