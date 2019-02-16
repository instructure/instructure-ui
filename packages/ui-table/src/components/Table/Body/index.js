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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import { View } from '@instructure/ui-layout'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TableControlled
---
**/
@themeable(theme, styles)
class Body extends Component {
  static propTypes = {
    /**
     * Table.Row
     */
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    hover: PropTypes.bool,
    colAlign: PropTypes.oneOf(['start', 'center', 'end']),
  }

  render () {
    const { children, size, hover, colAlign } = this.props

    return (
      <View
        {...omitProps(this.props, Body.propTypes)}
        as="tbody"
        className={styles.root}
      >
        {Children.map(children, (child) => {
          return safeCloneElement(child, {
            key: `${child.props.name}`,
            size,
            hover,
            colAlign,
          })
        })}
      </View>
    )
  }
}

export default Body
