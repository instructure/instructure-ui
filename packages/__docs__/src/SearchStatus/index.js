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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyle, jsx } from '@instructure/emotion'
import { IconSearchLine } from '@instructure/ui-icons'

import generateStyle from './styles'
import generateComponentTheme from './theme'

@withStyle(generateStyle, generateComponentTheme)
class SearchStatus extends Component {
  static propTypes = {
    size: PropTypes.string,
    status: PropTypes.oneOf(['inactive', 'active']),
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    size: '1.25rem',
    status: 'inactive'
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { size, status, styles } = this.props
    if (status === 'inactive') {
      return <IconSearchLine color="primary" size="x-small" inline={false} />
    } else {
      return (
        <span
          css={styles.searchStatus}
          style={{
            width: size,
            height: size,
            fontSize: size
          }}
        >
          <span>
            <span css={styles.box} />
            <span css={styles.box} />
            <span css={styles.box} />
            <span css={styles.box} />
          </span>
        </span>
      )
    }
  }
}

export default SearchStatus
export { SearchStatus }
