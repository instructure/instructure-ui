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

import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

/**
---
parent: Table
id: Table.RowHeader
---
**/
@withStyle(generateStyles)
class RowHeader extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isStacked: PropTypes.bool,
    /**
     * Control the text alignment in row header
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    textAlign: 'start',
    children: null
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { children, isStacked, styles } = this.props

    return (
      <View
        {...View.omitViewProps(
          omitProps(this.props, RowHeader.propTypes),
          RowHeader
        )}
        as={isStacked ? 'div' : 'th'}
        css={styles.rowHeader}
        scope="row"
        role={isStacked ? 'rowheader' : null}
      >
        {callRenderProp(children)}
      </View>
    )
  }
}

export default RowHeader
export { RowHeader }
