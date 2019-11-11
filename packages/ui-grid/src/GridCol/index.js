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
import { capitalizeFirstLetter } from '@instructure/ui-utils'
import { omitProps } from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'

// TODO: get numcols from theme config
const COL_WIDTHS = ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/**
---
parent: Grid
id: Grid.Col
---
**/
@themeable(theme, styles)
class GridCol extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node,
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    textAlign: PropTypes.oneOf(['start', 'end', 'center', 'inherit']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']),
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

  startAtClass () {
    return !!this.props.startAt && (
      `startAt${capitalizeFirstLetter(this.props.startAt)}`
    )
  }

  colSpacingClass () {
    return (
      `colSpacing${capitalizeFirstLetter(this.props.colSpacing)}`
    )
  }

  rowSpacingClass () {
    return (
      `rowSpacing${capitalizeFirstLetter(this.props.rowSpacing)}`
    )
  }

  breakpointClass (breakpoint) {
    let { width } = this.props

    if (width && typeof width === 'object') {
      width = width[breakpoint]
    }

    if (!width) return

    return `${breakpoint}--${width}`
  }

  breakpointOffsetClass (breakpoint) {
    let { offset } = this.props

    if (offset && typeof offset === 'object') {
      offset = offset[breakpoint]
    }

    if (!offset) return

    return `${breakpoint}-offset--${offset}`
  }

  enabledBreakpoints () {
    const breakpoints = ['small', 'medium', 'large', 'x-large', null]
    return breakpoints.slice(breakpoints.indexOf(this.props.startAt))
  }

  breakpointIsEnabled (breakpoint) {
    return (this.enabledBreakpoints().indexOf(breakpoint) >= 0)
  }

  breakpointIsEnabledForWidth (breakpoint) {
    return !!this.props.width && this.breakpointIsEnabled(breakpoint)
  }

  breakpointIsEnabledForOffset (breakpoint) {
    return !!this.props.offset && this.breakpointIsEnabled(breakpoint)
  }

  render () {
    const {
      children,
      visualDebug
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[this.startAtClass()]]: !!this.props.startAt,
      [styles[`vAlign--${this.props.vAlign}`]]: true,
      [styles[`textAlign--${this.props.textAlign}`]]: true,
      [styles[this.colSpacingClass()]]: true,
      [styles[this.rowSpacingClass()]]: true,

      [styles.lastRow]: this.props.isLastRow,
      [styles.lastCol]: this.props.isLastCol,

      [styles[this.breakpointClass('small')]]: this.breakpointIsEnabledForWidth('small'),
      [styles[this.breakpointClass('medium')]]: this.breakpointIsEnabledForWidth('medium'),
      [styles[this.breakpointClass('large')]]: this.breakpointIsEnabledForWidth('large'),
      [styles[this.breakpointClass('x-large')]]: this.breakpointIsEnabledForWidth('x-large'),

      [styles[this.breakpointOffsetClass('small')]]: this.breakpointIsEnabledForOffset('small'),
      [styles[this.breakpointOffsetClass('medium')]]: this.breakpointIsEnabledForOffset('medium'),
      [styles[this.breakpointOffsetClass('large')]]: this.breakpointIsEnabledForOffset('large'),
      [styles[this.breakpointOffsetClass('x-large')]]: this.breakpointIsEnabledForOffset('x-large'),

      [styles.visualDebug]: visualDebug
    }

    const props = omitProps(this.props, GridCol.propTypes)

    return (
      <span
        {...props}
        ref={this.props.elementRef}
        className={classnames(classes)}
      >
        {children}
      </span>
    )
  }
}

export default GridCol
export { GridCol }
