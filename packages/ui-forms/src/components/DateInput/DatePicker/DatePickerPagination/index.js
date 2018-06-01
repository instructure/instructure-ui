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
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import IconArrowOpenStart from '@instructure/ui-icons/lib/Solid/IconArrowOpenStart'
import IconArrowOpenEnd from '@instructure/ui-icons/lib/Solid/IconArrowOpenEnd'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DatePicker
---
**/
@themeable(theme, styles)
export default class DatePickerPagination extends Component {
  static propTypes = {
    previousLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    children: PropTypes.node
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
        <Button
          variant="icon"
          onClick={this.handlePrevClick}
          icon={
            <IconArrowOpenStart className={styles.arrowIcon} />
          }
        >
          <ScreenReaderContent>{this.props.previousLabel}</ScreenReaderContent>
        </Button>
        {this.props.children}
        <Button
          variant="icon"
          onClick={this.handleNextClick}
          icon={
            <IconArrowOpenEnd
              className={styles.arrowIcon}
              title={this.props.nextLabel}
            />
          }
        >
          <ScreenReaderContent>{this.props.nextLabel}</ScreenReaderContent>
        </Button>
      </div>
    )
  }
}
