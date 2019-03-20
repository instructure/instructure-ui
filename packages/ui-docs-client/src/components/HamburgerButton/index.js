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
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import Button from '../Button'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class HamburgerButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    expanded: PropTypes.bool,
    controls: PropTypes.string
  }

  static defaultProps = {
    expanded: false,
    controls: undefined
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['expanded']]: this.props.expanded
    }
    const {
      controls,
      children,
      expanded,
      ...props
    } = this.props
    return (
      <Button
        aria-controls={controls}
        aria-expanded={expanded ? 'true' : 'false'}
        {...props}
      >
        <span className={classnames(classes)}>
          <span className={styles.line}>
            <ScreenReaderContent>{children}</ScreenReaderContent>
          </span>
        </span>
      </Button>
    )
  }
}
