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

import Heading from '@instructure/ui-elements/es/components/Heading'
import Link from '@instructure/ui-elements/lib/components/Link'
import themeable from '@instructure/ui-themeable'
import { darken } from '@instructure/ui-themeable/lib/utils/color'

import PandaLogo from './instui-panda.js'
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
        <div className={styles.logo}>
          <PandaLogo />
        </div>
        <div className={styles.banner} role="banner">
          <Heading level="h2" as="h1">
            <Link href="#index">
              {this.props.name || 'Documentation'}
            </Link>
          </Heading>
          { this.props.version && (
            <div>
              <Link href="#CHANGELOG">
                v{this.props.version}
              </Link>
            </div>
          ) }
        </div>
      </div>
    )
  }
}
