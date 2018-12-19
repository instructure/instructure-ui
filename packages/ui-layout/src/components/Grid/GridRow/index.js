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
import classnames from 'classnames'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'
import themeable from '@instructure/ui-themeable'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { omitProps, pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import GridCol from '../GridCol'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Grid
---
**/
@themeable(theme, styles)
export default class GridRow extends Component {
  static propTypes = {
    children: CustomPropTypes.Children.oneOf([GridCol, ScreenReaderContent]),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
    visualDebug: PropTypes.bool,
    isLastRow: PropTypes.bool
  }

  startAtClass () {
    return !!this.props.startAt &&
      (
        `startAt${capitalizeFirstLetter(this.props.startAt)}`
      )
  }

  rowSpacingClass () {
    return (
      `rowSpacing${capitalizeFirstLetter(this.props.rowSpacing)}`
    )
  }

  colSpacingClass () {
    return (
      `colSpacing${capitalizeFirstLetter(this.props.colSpacing)}`
    )
  }

  renderChildren () {
    const {
      children,
      ...props
    } = this.props

    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [GridCol])) {
        return safeCloneElement(child, {
          ...pickProps(this.props, GridRow.propTypes),
          ...child.props, /* child props should override parent */
          isLastRow: props.isLastRow,
          isLastCol: ((index + 1) === Children.count(children))
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles.lastRow]: this.props.isLastRow,
      [styles[`hAlign--${this.props.hAlign}`]]: true,
      [styles[`vAlign--${this.props.vAlign}`]]: true,
      [styles[this.rowSpacingClass()]]: true,
      [styles[this.colSpacingClass()]]: this.props.colSpacing !== 'none',
      [styles[this.startAtClass()]]: !!this.props.startAt
    }

    const props = omitProps(this.props, GridRow.propTypes)

    return (
      <span
        {...props}
        className={classnames(classes)}
      >
        {this.renderChildren()}
      </span>
    )
  }
}
