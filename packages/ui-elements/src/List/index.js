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
import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { omitProps, safeCloneElement } from '@instructure/ui-react-utils'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'

import { ListItem } from './ListItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class List extends Component {
  static propTypes = {
    /**
    * Only accepts `<List.Item>` as a child
    */
    children: ChildrenPropTypes.oneOf([ListItem]),
    as: PropTypes.oneOf(['ul', 'ol']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'unstyled', 'inline']),
    delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow', 'dashed', 'solid']),
    /**
    * Sets the margin separating each ListItem.
    */
    itemSpacing: PropTypes.oneOf([
      'none',
      'xxx-small',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    itemSpacing: undefined,
    elementRef: undefined,
    as: 'ul',
    margin: 'none',
    variant: 'default',
    delimiter: 'none',
    size: 'medium'
  }

  static Item = ListItem

  renderChildren () {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child, {
        variant: this.props.variant,
        delimiter: this.props.delimiter,
        size: this.props.size,
        spacing: this.props.itemSpacing
      })
    })
  }

  render () {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, List.propTypes),
      List
    )

    const {
      as,
      margin,
      variant,
      elementRef
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: variant,
      [styles.unordered]: as === 'ul',
      [styles.ordered]: as === 'ol'
    }

    return (
      <View
        {...passthroughProps}
        className={classnames(classes)}
        as={as}
        margin={margin}
        elementRef={elementRef}
        __dangerouslyIgnoreExperimentalWarnings
      >
        {this.renderChildren()}
      </View>
    )
  }
}

export default List
export { List, ListItem }
