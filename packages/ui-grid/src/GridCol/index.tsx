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

import { omitProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

// TODO: get numcols from theme config
const COL_WIDTHS = ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  colSpacing?: 'none' | 'small' | 'medium' | 'large'
  rowSpacing?: 'none' | 'small' | 'medium' | 'large'
  textAlign?: 'start' | 'end' | 'center' | 'inherit'
  hAlign?: 'start' | 'center' | 'end' | 'space-around' | 'space-between'
  vAlign?: 'top' | 'middle' | 'bottom'
  startAt?: any // TODO: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null])
  visualDebug?: boolean
  width?:
    | any
    | {
        small?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        medium?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        large?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        xLarge?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
      }
  offset?:
    | any
    | {
        small?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        medium?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        large?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
        xLarge?: any // TODO: PropTypes.oneOf(COL_WIDTHS)
      }
  isLastRow?: boolean
  isLastCol?: boolean
  elementRef?: (...args: any[]) => any
}

/**
---
parent: Grid
id: Grid.Col
---
**/
@withStyle(generateStyle, generateComponentTheme)
class GridCol extends Component<Props> {
  static componentId = 'Grid.Col'

  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.node,
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    textAlign: PropTypes.oneOf(['start', 'end', 'center', 'inherit']),
    hAlign: PropTypes.oneOf([
      'start',
      'center',
      'end',
      'space-around',
      'space-between'
    ]),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
    visualDebug: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.oneOf(COL_WIDTHS),
      PropTypes.shape({
        small: PropTypes.oneOf(COL_WIDTHS),
        medium: PropTypes.oneOf(COL_WIDTHS),
        large: PropTypes.oneOf(COL_WIDTHS),
        xLarge: PropTypes.oneOf(COL_WIDTHS)
      })
    ]),
    offset: PropTypes.oneOfType([
      PropTypes.oneOf(COL_WIDTHS),
      PropTypes.shape({
        small: PropTypes.oneOf(COL_WIDTHS),
        medium: PropTypes.oneOf(COL_WIDTHS),
        large: PropTypes.oneOf(COL_WIDTHS),
        xLarge: PropTypes.oneOf(COL_WIDTHS)
      })
    ]),
    isLastRow: PropTypes.bool,
    isLastCol: PropTypes.bool,
    elementRef: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    textAlign: 'inherit',
    children: null,
    isLastCol: false,
    isLastRow: false,
    elementRef: undefined
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const { children, styles } = this.props

    const props = omitProps(this.props, GridCol.propTypes)

    return (
      <span {...props} ref={this.props.elementRef} css={styles.gridCol}>
        {children}
      </span>
    )
  }
}

export default GridCol
export { GridCol }
