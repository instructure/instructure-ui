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
import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-layout'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Table
id: Table.Cell
---
**/
@themeable(theme, styles)
class Cell extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isStacked: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Control the text alignment in cell
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    textAlign: 'start',
    children: null
  }

  render () {
    const { children, textAlign, isStacked, header } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Cell.propTypes), Cell)}
        as={isStacked ? 'div' : 'td'}
        className={classnames({
          [styles.root]: true,
          [styles[`textAlign--${textAlign}`]]: textAlign,
        })}
        role={isStacked ? "cell" : null}
      >
        {header && callRenderProp(header)}
        {header && ': '}
        {callRenderProp(children)}
      </View>
    )
  }
}

export default Cell
export { Cell }
