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

import Link from '@instructure/ui-elements/lib/components/Link'
import themeable from '@instructure/ui-themeable'
import { darken } from '@instructure/ui-themeable/lib/utils/color'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <Link
            theme={{
              color: '#0084D1',
              hoverColor: darken('#0084D1', 10),
              textDecoration: 'none',
              hoverTextDecoration: 'underline'
            }}
            href="#index"
          >
            <h1 className={styles.heading}>
              {this.props.name || 'Documentation'}
            </h1>
          </Link>
          { this.props.version && (
            <div className={styles.version}>
              <Link
                theme={{
                  color: '#005A8F',
                  hoverColor: darken('#005A8F', 10),
                  textDecoration: 'none',
                  hoverTextDecoration: 'underline'
                }}
                href="#CHANGELOG"
              >
                v{this.props.version}
              </Link>
            </div>
          ) }
        </div>
      </div>
    )
  }
}
