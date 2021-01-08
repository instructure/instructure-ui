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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import {
  safeCloneElement,
  matchComponentTypes,
  omitProps,
  pickProps
} from '@instructure/ui-react-utils'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { GridRow } from '../GridRow'
import { GridCol } from '../GridCol'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Grid extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: ChildrenPropTypes.oneOf([GridRow, ScreenReaderContent]),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf([
      'start',
      'center',
      'end',
      'space-around',
      'space-between'
    ]),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
    visualDebug: PropTypes.bool
  }

  static defaultProps = {
    colSpacing: 'medium',
    rowSpacing: 'medium',
    hAlign: 'start',
    startAt: 'small',
    vAlign: 'top',
    visualDebug: false,
    children: null
  }

  static Row = GridRow
  static Col = GridCol

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  renderChildren() {
    const { styles, makeStyles, ...props } = this.props
    const children = Children.toArray(this.props.children)

    return children.map((child, index) => {
      if (matchComponentTypes(child, [GridRow])) {
        return safeCloneElement(child, {
          ...pickProps(props, Grid.propTypes),
          ...child.props /* child props should override parent */,
          isLastRow: index + 1 === children.length
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render() {
    const { styles, ...restProps } = this.props

    const props = omitProps(restProps, Grid.propTypes)

    return (
      <span {...props} css={styles.grid}>
        {this.renderChildren()}
      </span>
    )
  }
}

export default Grid
export { Grid, GridRow, GridCol }
