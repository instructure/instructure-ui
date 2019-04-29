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

import themeable from '@instructure/ui-themeable'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import capitalizeFirstLetter from '@instructure/ui-utils/lib/capitalizeFirstLetter'
import safeCloneElement from '@instructure/ui-react-utils/lib/safeCloneElement'
import matchComponentTypes from '@instructure/ui-react-utils/lib/matchComponentTypes'
import { omitProps, pickProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import GridRow from './GridRow'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@themeable(theme, styles)
export default class Grid extends Component {
  static propTypes = {
    children: ChildrenPropTypes.oneOf([GridRow, ScreenReaderContent]),
    colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']),
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
  };

  startAtClass () {
    return !!this.props.startAt && (`startAt${capitalizeFirstLetter(this.props.startAt)}`)
  }

  renderChildren () {
    const children = Children.toArray(this.props.children)

    return children.map((child, index) => {
      if (matchComponentTypes(child, [GridRow])) {
        return safeCloneElement(child, {
          ...pickProps(this.props, Grid.propTypes),
          ...child.props, /* child props should override parent */
          isLastRow: ((index + 1) === children.length)
        })
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.startAtClass()]]: !!this.props.startAt,
      [styles.visualDebug]: this.props.visualDebug
    }

    const props = omitProps(this.props, Grid.propTypes)

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

export { default as GridCol } from './GridCol'
export { default as GridRow } from './GridRow'
