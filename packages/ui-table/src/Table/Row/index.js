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
import { Component, Children } from 'react'
import PropTypes from 'prop-types'

import {
  omitProps,
  matchComponentTypes,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

import { ColHeader } from '../ColHeader'
import { RowHeader } from '../RowHeader'
import { Cell } from '../Cell'

/**
---
parent: Table
id: Table.Row
---
**/
@withStyle(generateStyles)
class Row extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
     * `Table.ColHeader`, `Table.RowHeader` or `Table.Cell`
     */
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: ChildrenPropTypes.oneOf([ColHeader, RowHeader, Cell]),
    hover: PropTypes.bool,
    isStacked: PropTypes.bool,
    headers: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    )
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    children: null
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { children, styles, isStacked, headers } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Row.propTypes), Row)}
        as={isStacked ? 'div' : 'tr'}
        css={styles.row}
        role={isStacked ? 'row' : null}
      >
        {Children.toArray(children)
          .filter(Boolean)
          .map((child, index) => {
            if (matchComponentTypes(child, [ColHeader])) {
              return child
            }
            if (matchComponentTypes(child, [RowHeader])) {
              return safeCloneElement(child, {
                key: child.props.name,
                isStacked
              })
            }
            if (matchComponentTypes(child, [Cell])) {
              return safeCloneElement(child, {
                key: child.props.name,
                isStacked,
                header: headers && headers[index]
              })
            }
            return null
          })}
      </View>
    )
  }
}

export default Row
export { Row }
