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

import { themeable } from '@instructure/ui-themeable'
import { matchComponentTypes, safeCloneElement, omitProps } from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { View } from '@instructure/ui-layout'

import { Row } from '../Row'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Table
id: Table.Body
---
**/
@themeable(theme, styles)
class Body extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * `Table.Row`
     */
    children: ChildrenPropTypes.oneOf([Row]),
    hover: PropTypes.bool,
    isStacked: PropTypes.bool,
    headers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    children: null
  }

  render () {
    const { children, hover, isStacked, headers } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Body.propTypes), Body)}
        as={isStacked ? 'div' : 'tbody'}
        className={styles.root}
        role={isStacked ? "rowgroup" : null}
      >
        {Children.map(children, (child) => matchComponentTypes(child, [Row])
          ? safeCloneElement(child, {
            key: child.props.name,
            hover,
            isStacked,
            headers,
          })
          : null)}
      </View>
    )
  }
}

export default Body
export { Body }
