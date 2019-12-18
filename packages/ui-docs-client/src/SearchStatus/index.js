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

import { themeable } from '@instructure/ui-themeable'
import { IconSearchLine } from '@instructure/ui-icons'
import { SVGIcon } from '@instructure/ui-svg-images'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class SearchStatus extends Component {
  static propTypes = {
    size: PropTypes.string,
    status: PropTypes.oneOf(['inactive', 'blurred', 'active', 'success', 'failure'])
  }

  static defaultProps = {
    size: '1.25rem',
    status: 'inactive'
  }

  render () {
    const {
      size,
      status
    } = this.props

    const successFace = (
      <SVGIcon viewBox="0 0 500 500" inline={false}>
        <circle cx="250" cy="250" r="250" className={styles.faceSuccess} />
        <circle cx="164.5" cy="178.5" r="44" className={styles.features} />
        <circle cx="335.5" cy="178.5" r="44" className={styles.features} />
        <path d="M250 389.5c55.8 0 101-45.2 101-101H149C149 344.3 194.2 389.5 250 389.5z" className={styles.features} />
      </SVGIcon>
    )

    const failureFace = (
      <SVGIcon viewBox="0 0 500 500" inline={false}>
        <circle cx="250" cy="250" r="250" className={styles.faceFailure} />
        <circle cx="164.5" cy="192.5" r="44" className={styles.features} />
        <circle cx="335.5" cy="192.5" r="44" className={styles.features} />
        <path d="M250 288.5c-55.8 0-101 45.2-101 101h202C351 333.7 305.8 288.5 250 288.5z" className={styles.features} />
        <polygon points="276 111.4 361.6 81.2 373 107.3 287.4 137.5" className={styles.features} />
        <polygon points="224 111.4 138.4 81.2 127 107.3 212.7 137.5" className={styles.features} />
      </SVGIcon>
    )

    if (status === 'inactive') {
      return <IconSearchLine color="primary" size="x-small" inline={false} />
    } else {
      return (
        <span
          className={classnames({
            [styles.root]: true,
            [styles[status]]: true
          })}
          style={{
            width: size,
            height: size,
            fontSize: size
          }}
        >
          {(status === 'active' || status === 'blurred') &&
            <span>
              <span className={styles.box} />
              <span className={styles.box} />
              <span className={styles.box} />
              <span className={styles.box} />
            </span>
          }
          {status === 'success' && successFace}
          {status === 'failure' && failureFace}
        </span>
      )
    }

  }
}

export default SearchStatus
export { SearchStatus }
